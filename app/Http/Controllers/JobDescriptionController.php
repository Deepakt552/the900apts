<?php
// app/Http/Controllers/Admin/JobDescriptionController.php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\JobDescription;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JobDescriptionController extends Controller
{

    /**
     * Display the specified job description.
     */
    public function show($id)
    {
        $jobDescription = JobDescription::with(['createdBy:id,name', 'updatedBy:id,name'])
            ->findOrFail($id);

        return Inertia::render('Admin/JobDescription/Show', [
            'jobDescription' => $jobDescription,
        ]);
    }
    /**
     * Display a listing of job descriptions.
     */
    public function index(Request $request)
    {
        $query = JobDescription::query()
            ->with(['createdBy:id,name'])
            ->orderBy('created_at', 'desc');

        // Search functionality
        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        $jobDescriptions = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/JobDescription/Index', [
            'jobDescriptions' => $jobDescriptions,
            'filters' => $request->only('search'),
        ]);
    }

    /**
     * Show the form for creating a new job description.
     */
    public function create()
    {
        return Inertia::render('Admin/JobDescription/Create');
    }

    /**
     * Store a newly created job description in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'slug' => 'nullable|string|max:255|regex:/^[a-z0-9-]+$/',
            'content' => 'required|string|min:50',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Use custom slug if provided, otherwise generate from title
        if ($request->filled('slug')) {
            $slug = $this->generateUniqueSlug($request->slug);
        } else {
            $slug = $this->generateUniqueSlug($request->title);
        }

        // Extract images from content
        $images = $this->extractImagesFromContent($request->content);

        $jobDescription = JobDescription::create([
            'title' => $request->title,
            'slug' => $slug,
            'content' => $request->content,
            'images' => $images,
            'status' => $request->status ?? true,
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ]);

        return redirect()->route('admin.job-descriptions.index')
            ->with('success', 'Job Description created successfully!');
    }
    /**
     * Show the form for editing the specified job description.
     */
    public function edit($id)
    {
        $jobDescription = JobDescription::findOrFail($id);

        return Inertia::render('Admin/JobDescription/Edit', [
            'jobDescription' => $jobDescription,
        ]);
    }

    /**
     * Update the specified job description in storage.
     */
    public function update(Request $request, $id)
    {
        $jobDescription = JobDescription::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255' . $id,
            'slug' => 'nullable|string|max:255|regex:/^[a-z0-9-]+$/',
            'content' => 'required|string|min:50',
            'status' => 'boolean',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        // Update slug if custom provided or title changed
        if ($request->filled('slug')) {
            $slug = $this->generateUniqueSlug($request->slug, $id);
            $jobDescription->slug = $slug;
        } elseif ($jobDescription->title !== $request->title) {
            $slug = $this->generateUniqueSlug($request->title, $id);
            $jobDescription->slug = $slug;
        }

        // Extract images from content
        $images = $this->extractImagesFromContent($request->content);

        $jobDescription->update([
            'title' => $request->title,
            'content' => $request->content,
            'images' => $images,
            'status' => $request->status ?? true,
            'updated_by' => auth()->id(),
            'slug' => $jobDescription->slug
        ]);

        return redirect()->route('admin.job-descriptions.index')
            ->with('success', 'Job Description updated successfully!');
    }
    /**
     * Generate a unique slug.
     */
    private function generateUniqueSlug($text, $excludeId = null)
    {
        $baseSlug = Str::slug($text);
        $slug = $baseSlug;
        $count = 1;

        while (
            JobDescription::withTrashed()
                ->when($excludeId, function ($q) use ($excludeId) {
                    $q->where('id', '!=', $excludeId);
                })
                ->where('slug', $slug)
                ->exists()
        ) {
            $slug = $baseSlug . '-' . $count;
            $count++;
        }

        return $slug;
    }
    // private function generateUniqueSlug($text, $excludeId = null)
    // {
    //     // If it's already a slug-like string, use it directly
    //     if (preg_match('/^[a-z0-9-]+$/', $text)) {
    //         $slug = $text;
    //     } else {
    //         $slug = Str::slug($text);
    //     }

    //     $originalSlug = $slug;
    //     $counter = 1;

    //     $query = JobDescription::where('slug', $slug);
    //     if ($excludeId) {
    //         $query->where('id', '!=', $excludeId);
    //     }

    //     while ($query->exists()) {
    //         $slug = $originalSlug . '-' . $counter;
    //         $counter++;
    //         $query = JobDescription::where('slug', $slug);
    //         if ($excludeId) {
    //             $query->where('id', '!=', $excludeId);
    //         }
    //     }

    //     return $slug;
    // }
    /**
     * Remove the specified job description from storage.
     */
    public function destroy($id)
    {
        $jobDescription = JobDescription::findOrFail($id);
        $jobDescription->delete();

        return redirect()->route('admin.job-descriptions.index')
            ->with('success', 'Job Description deleted successfully!');
    }

    /**
     * Upload image for ReactQuill editor.
     */
    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()->first('image')
            ], 422);
        }

        try {
            $image = $request->file('image');
            $path = $image->store('job-description', 'public');
            $url = Storage::url($path);

            return response()->json([
                'url' => $url,
                'success' => 'Image uploaded successfully!'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Image upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Extract all image URLs from HTML content.
     */
    private function extractImagesFromContent($content)
    {
        $images = [];
        if ($content) {
            $dom = new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadHTML($content);
            libxml_clear_errors();

            $imgTags = $dom->getElementsByTagName('img');
            foreach ($imgTags as $img) {
                $src = $img->getAttribute('src');
                if ($src && filter_var($src, FILTER_VALIDATE_URL)) {
                    $images[] = $src;
                }
            }
        }
        return $images;
    }
}