<?php
// app/Http/Controllers/PublicLinkController.php

namespace App\Http\Controllers;

use App\Models\PublicLink;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Route;

class PublicLinkController extends Controller
{
    // In PublicLinkController.php - search method
    public function searchRoute(Request $request)
    {
        //  dd('search route works');
        $request->validate([
            'q' => 'required|string|min:1'
        ]);

        $keyword = strtolower($request->q);
        $routes = Route::getRoutes();
        $results = [];

        foreach ($routes as $route) {
            // Skip unnamed routes
            if (empty($route->getName())) {
                continue;
            }

            // Get route methods
            $methods = $route->methods();

            // Only include GET routes
            if (!in_array('GET', $methods)) {
                continue;
            }

            // Get route name and URI
            $routeName = strtolower($route->getName());
            $routeUri = strtolower($route->uri());

            // Exclude admin routes (since we're searching for public links)
            if (strpos($routeUri, 'admin/') === 0 || strpos($routeUri, '_debugbar') === 0) {
                continue;
            }

            // Check if matches search
            if (strpos($routeName, $keyword) !== false || strpos($routeUri, $keyword) !== false) {
                $results[] = [
                    'name' => $route->getName(),
                    'uri' => $route->uri(),
                    'url' => '/' . ltrim($route->uri(), '/'),
                    'methods' => $route->methods(),
                ];
            }

            // Limit results
            if (count($results) >= 15) {
                break;
            }
        }

        return response()->json($results);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = PublicLink::query();

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('label', 'LIKE', "%{$search}%")
                    ->orWhere('route_name', 'LIKE', "%{$search}%")
                    ->orWhere('url', 'LIKE', "%{$search}%");
            });
        }

        // Sorting - changed default to 'label' since sort_order is removed
        $sortField = $request->sort_field ?? 'label';
        $sortDirection = $request->sort_direction ?? 'asc';

        $allowedSortFields = ['label', 'route_name', 'url', 'status', 'created_at'];
        if (in_array($sortField, $allowedSortFields)) {
            $query->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy('label', 'asc');
        }

        $publicLinks = $query->paginate(15)->withQueryString();

        return Inertia::render('Admin/PublicLinks/Index', [
            'publicLinks' => $publicLinks,
            'filters' => [
                'search' => $request->search ?? '',
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/PublicLinks/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $this->validatePublicLink($request);

        PublicLink::create($validated);

        return redirect()->route('admin.public-links.index')
            ->with('success', 'Public link created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $publicLink = PublicLink::findOrFail($id);

        return Inertia::render('Admin/PublicLinks/Show', [
            'publicLink' => $publicLink,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $publicLink = PublicLink::findOrFail($id);

        return Inertia::render('Admin/PublicLinks/Edit', [
            'publicLink' => $publicLink,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $publicLink = PublicLink::findOrFail($id);

        $validated = $this->validatePublicLink($request, $publicLink->id);

        $publicLink->update($validated);

        return redirect()->route('admin.public-links.index')
            ->with('success', 'Public link updated successfully.');
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $publicLink = PublicLink::findOrFail($id);
        $publicLink->delete();

        return redirect()->route('admin.public-links.index')
            ->with('success', 'Public link deleted successfully.');
    }

    public function bulkStatus(Request $request)
    {
        $request->validate([
            'ids' => ['required', 'array'],
            'ids.*' => ['exists:public_links,id'],
            'status' => ['required', 'boolean'],
        ]);

        PublicLink::whereIn('id', $request->ids)
            ->update([
                'status' => $request->boolean('status'),
            ]);

        return back()->with('success', 'Status updated successfully.');
    }

    public function routeList()
    {

        $routes = collect(Route::getRoutes())->map(function ($route) {

            $middleware = $route->gatherMiddleware();

            return [
                'name' => $route->getName(),
                'uri' => $route->uri(),
                'url' => url($route->uri()),

                // HTTP Methods
                'methods' => array_values(
                    array_diff($route->methods(), ['HEAD'])
                ),

                // Controller / Action
                'action' => $route->getActionName(),

                // Controller Class
                'controller' => class_basename(
                    explode('@', $route->getActionName())[0]
                ),

                // Method Name
                'controller_method' => str_contains($route->getActionName(), '@')
                    ? explode('@', $route->getActionName())[1]
                    : null,

                // Middleware
                'middleware' => $middleware,

                // Protection Status
                'protected' => collect($middleware)->contains(function ($item) {
                    return str_contains($item, 'auth');
                }),

                'guest_only' => collect($middleware)->contains(function ($item) {
                    return str_contains($item, 'guest');
                }),

                // Prefix
                'prefix' => $route->getPrefix(),

                // Domain
                'domain' => $route->getDomain(),

                // Route Parameters
                'parameters' => $route->parameterNames(),

                // Laravel Action Array
                'namespace' => $route->getAction()['namespace'] ?? null,

                // Route Type
                'is_closure' => $route->getActionName() === 'Closure',

                // Raw Action
                'action_array' => collect($route->getAction())
                    ->except(['uses'])
                    ->toArray(),
            ];
        })
            ->sortBy('uri')
            ->values();

        return response()->json($routes);
    }
    
    public function listView()
    {
        return Inertia::render('Admin/RouteList');
    }
    /**
     * Validate the public link request.
     */
    private function validatePublicLink(Request $request, $id = null)
    {
        $rules = [
            'label' => ['required', 'string', 'max:255'],
            'route_name' => ['nullable', 'string', 'max:255'],
            'url' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'boolean'],
        ];

        $messages = [
            'label.required' => 'The label field is required.',
            'label.max' => 'The label may not be greater than 255 characters.',
            'url.max' => 'The URL may not be greater than 255 characters.',
            'status.required' => 'The status field is required.',
            'status.boolean' => 'The status field must be true or false.',
        ];

        return $request->validate($rules, $messages);
    }

    /**
     * Alternative: Using a more concise validation approach with custom messages.
     * Uncomment this method if you prefer a simpler validation.
     */
    /*
    private function validatePublicLink(Request $request, $id = null)
    {
        return $request->validate([
            'number' => ['required', 'string', 'max:10', Rule::unique('public_links')->ignore($id)],
            'label' => 'required|string|max:255',
            'route_name' => 'nullable|string|max:255',
            'url' => 'nullable|url|max:255',
            'sort_order' => 'required|integer|min:0',
            'status' => 'required|boolean',
        ], [
            'number.required' => 'The number field is required.',
            'number.max' => 'The number may not be greater than 10 characters.',
            'number.unique' => 'This number has already been taken.',
            'label.required' => 'The label field is required.',
            'url.url' => 'Please enter a valid URL.',
            'sort_order.required' => 'The sort order field is required.',
            'status.required' => 'The status field is required.',
        ]);
    }
    */
}