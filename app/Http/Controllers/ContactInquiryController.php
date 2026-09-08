<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ContactInquiry;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Illuminate\Support\Facades\Response;
use App\Services\EmailService;

class ContactInquiryController extends Controller
{
    
    protected $emailService;

    /**
     * Constructor with dependency injection
     */
    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }
    /**
     * Store a newly created contact inquiry.
     */
    public function store(Request $request)
    {
        // Validation rules
        $validator = Validator::make($request->all(), [
            'firstName' => 'required|string|max:100',
            'lastName' => 'required|string|max:100',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:30',
            'unitSize' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'zip' => 'nullable|string|max:20',
            'hearAbout' => 'nullable|string|max:150',
            'message' => 'nullable|string',
        ]);

        // Check if validation fails
        if ($validator->fails()) {
            // For Inertia, return back with errors
            return back()->withErrors($validator)->withInput();
        }

        try {
            $formattedMessage = $request->message;
            if ($request->filled('unitSize')) {
                $formattedMessage = "[Preferred Unit Size: " . $request->unitSize . "]\n\n" . ($request->message ?? '');
            }

            // Create new contact inquiry
            $inquiry = ContactInquiry::create([
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'state' => $request->state,
                'zip' => $request->zip,
                'source' => $request->hearAbout,
                'message' => $formattedMessage,
                'ip_address' => $request->ip(),
                'status' => 'unread'
            ]);
            try {

                $emailData = [
                    'link_with' => 0, // Shortlisted
                    'Subject' => 'Contact Form Inquiry',
                    'link_id' => $inquiry->id,
                    'email_id' => 'contact_inquiry_' . $inquiry->id,
                    'send_data' => [
                        'name' => $inquiry->first_name.' '.$inquiry->last_name,
                        'email' => $inquiry->email,
                        'phone' => $inquiry->phone,
                        'message' => $inquiry->message,
                        'address' => $inquiry->address,
                        'job_title' => $inquiry->job_title ?? 'Not get title',
                        'application_id' => $inquiry->id,
                        'applied_at' => now()->format('F j, Y \a\t g:i A'),
                    ],
                    'attachment_path' => '',
                    'attachment_name' => '',
                ];

                // dd($emailData);

                $result = $this->emailService->sendEmail($emailData);

                if (!$result['status']) {
                    Log::warning('Email notification failed but application was saved', [
                        'application_id' => $inquiry->id,
                        'error' => $result['message']
                    ]);
                }

            } catch (\Exception $emailException) {
                Log::error('Email sending error for application', [
                    'application_id' => $inquiry->id,
                    'error' => $emailException->getMessage()
                ]);
                // Don't fail the application submission if email fails
            }

            // Log successful submission
            Log::info('New contact inquiry submitted', ['id' => $inquiry->id, 'email' => $inquiry->email]);

            // For Inertia, redirect back with success message
            return back()->with('success', 'Thank you! We will be in touch.');

        } catch (\Exception $e) {
            // Log error
            Log::error('Contact inquiry submission failed', ['error' => $e->getMessage()]);

            // For Inertia, redirect back with error
            return back()->with('error', 'An error occurred while submitting your inquiry. Please try again.');
        }
    }

    /**
     * Display a listing of contact inquiries.
     */
    public function index(Request $request)
    {
        $query = ContactInquiry::query();

        // Apply search filter
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'LIKE', "%{$search}%")
                    ->orWhere('last_name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('message', 'LIKE', "%{$search}%");
            });
        }

        // Apply status filter
        if ($request->status && $request->status !== 'all') {
            $query->where('status', $request->status);
        }

        $inquiries = $query->orderBy('created_at', 'desc')->paginate(20);

        // Append query parameters to pagination links
        $inquiries->appends($request->only(['search', 'status']));

        if ($request->wantsJson()) {
            return response()->json($inquiries);
        }

        return Inertia::render('Admin/Inquiries/Index', [
            'inquiries' => $inquiries
        ]);
    }
    /**
     * Display the specified contact inquiry.
     */
    public function show($id)
    {
        $inquiry = ContactInquiry::findOrFail($id);

        if (request()->wantsJson()) {
            return response()->json($inquiry);
        }
        $inquiry->update(['status' => 'read']);
        return Inertia::render('Admin/Inquiries/Show', [
            'inquiry' => $inquiry
        ]);
    }

    /**
     * Update the status of a contact inquiry.
     */
    public function updateStatus(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'status' => 'required|in:unread,read'
        ]);

        if ($validator->fails()) {
            if (request()->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
            return back()->withErrors($validator);
        }

        $inquiry = ContactInquiry::findOrFail($id);
        $inquiry->update(['status' => $request->status]);

        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Status updated successfully',
                'data' => $inquiry
            ]);
        }

        return back()->with('success', 'Status updated successfully');
    }

    /**
     * Remove the specified contact inquiry.
     */
    public function destroy($id)
    {
        $inquiry = ContactInquiry::findOrFail($id);
        $inquiry->delete();

        if (request()->wantsJson()) {
            return response()->json([
                'success' => true,
                'message' => 'Inquiry deleted successfully'
            ]);
        }

        return back()->with('success', 'Inquiry deleted successfully');
    }

    public function bulkDelete(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:contact_inquiries,id'
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
            return back()->withErrors($validator);
        }

        try {
            ContactInquiry::whereIn('id', $request->ids)->delete();

            Log::info('Bulk delete inquiries', ['count' => count($request->ids)]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => 'Inquiries deleted successfully'
                ]);
            }

            return back()->with('success', 'Inquiries deleted successfully');
        } catch (\Exception $e) {
            Log::error('Bulk delete failed', ['error' => $e->getMessage()]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete inquiries'
                ], 500);
            }

            return back()->with('error', 'Failed to delete inquiries');
        }
    }
    public function bulkStatus(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ids' => 'required|array',
            'ids.*' => 'exists:contact_inquiries,id',
            'status' => 'required|in:unread,read'
        ]);

        if ($validator->fails()) {
            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'errors' => $validator->errors()
                ], 422);
            }
            return back()->withErrors($validator);
        }

        try {
            $updated = ContactInquiry::whereIn('id', $request->ids)
                ->update(['status' => $request->status]);

            Log::info('Bulk status update', [
                'count' => $updated,
                'status' => $request->status
            ]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => true,
                    'message' => "{$updated} inquiries marked as {$request->status}",
                    'count' => $updated
                ]);
            }

            return back()->with('success', "{$updated} inquiries marked as {$request->status}");
        } catch (\Exception $e) {
            Log::error('Bulk status update failed', ['error' => $e->getMessage()]);

            if ($request->wantsJson()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to update inquiries'
                ], 500);
            }

            return back()->with('error', 'Failed to update inquiries');
        }
    }
    /**
     * Export contact inquiries to CSV.
     */
    public function export(Request $request)
    {
        try {
            $query = ContactInquiry::query();

            // Apply filters
            if ($request->search) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('first_name', 'LIKE', "%{$search}%")
                        ->orWhere('last_name', 'LIKE', "%{$search}%")
                        ->orWhere('email', 'LIKE', "%{$search}%")
                        ->orWhere('phone', 'LIKE', "%{$search}%")
                        ->orWhere('message', 'LIKE', "%{$search}%");
                });
            }

            if ($request->status && $request->status !== 'all') {
                $query->where('status', $request->status);
            }

            $inquiries = $query->orderBy('created_at', 'desc')->get();

            // If no data, return empty CSV or error
            if ($inquiries->isEmpty()) {
                return response()->json([
                    'success' => false,
                    'message' => 'No inquiries found to export'
                ], 404);
            }

            $fileName = 'inquiries_' . date('Y-m-d_H-i-s') . '.csv';

            $headers = [
                'Content-Type' => 'text/csv',
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Pragma' => 'public',
            ];

            $columns = [
                'ID',
                'First Name',
                'Last Name',
                'Email',
                'Phone',
                'Address',
                'City',
                'State',
                'Zip',
                'Source',
                'Message',
                'Status',
                'Created At'
            ];

            $callback = function () use ($inquiries, $columns) {
                $file = fopen('php://output', 'w');

                // Add UTF-8 BOM for Excel compatibility
                fprintf($file, chr(0xEF) . chr(0xBB) . chr(0xBF));

                fputcsv($file, $columns);

                foreach ($inquiries as $inquiry) {
                    fputcsv($file, [
                        $inquiry->id,
                        $inquiry->first_name,
                        $inquiry->last_name,
                        $inquiry->email,
                        $inquiry->phone,
                        $inquiry->address,
                        $inquiry->city,
                        $inquiry->state,
                        $inquiry->zip,
                        $inquiry->source,
                        $inquiry->message,
                        $inquiry->status,
                        $inquiry->created_at->format('Y-m-d H:i:s')
                    ]);
                }

                fclose($file);
            };

            return response()->stream($callback, 200, $headers);

        } catch (\Exception $e) {
            Log::error('Export failed', ['error' => $e->getMessage()]);

            // Return error response
            return response()->json([
                'success' => false,
                'message' => 'Failed to export inquiries: ' . $e->getMessage()
            ], 500);
        }
    }
}