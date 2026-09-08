<?php

namespace App\Http\Controllers;

use App\Models\CareerApplication;
use App\Models\JobDescription;
use App\Services\EmailService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Database\QueryException;
use Inertia\Inertia;

class CareerApplicationController extends Controller
{
    protected $emailService;

    /**
     * Constructor with dependency injection
     */
    public function __construct(EmailService $emailService)
    {
        $this->emailService = $emailService;
    }

    public function careerIndex()
    {
        // Get all active job descriptions
        $jobDescriptions = JobDescription::where('status', 1)
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Careers', [
            'jobDescriptions' => $jobDescriptions,
        ]);
    }

    // Fix: Use JobDescription $job for route model binding
    public function showJob(JobDescription $job)
    {
        // Check if job is active (status = 1)
        if ($job->status != 1) {
            return redirect()->route('career')->with('error', 'This position is no longer available.');
        }
        return Inertia::render('JobDescription', [
            'job' => $job,
            'skillLevels' => CareerApplication::getSkillLevels()
        ]);
    }

    public function index(Request $request)
    {
        try {
            $query = CareerApplication::query();

            // Search
            if ($request->filled('search')) {
                $search = $request->search;
                $query->where(function ($q) use ($search) {
                    $q->where('full_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhere('skill_level', 'like', "%{$search}%");
                });
            }

            // Filters
            if ($request->filled('status')) {
                $query->where('status', $request->status);
            }

            if ($request->filled('skill_level')) {
                $query->where('skill_level', $request->skill_level);
            }

            $applications = $query->latest()->paginate(10);

            // Statistics
            $stats = [
                'total' => CareerApplication::count(),
                'pending' => CareerApplication::where('status', 'pending')->count(),
                'reviewed' => CareerApplication::where('status', 'reviewed')->count(),
                'shortlisted' => CareerApplication::where('status', 'shortlisted')->count(),
                'rejected' => CareerApplication::where('status', 'rejected')->count(),
            ];

            return inertia('Admin/Careers/Index', [
                'applications' => $applications,
                'stats' => $stats,
                'filters' => $request->only(['search', 'status', 'skill_level'])
            ]);

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to load applications: ' . $e->getMessage());
        }
    }

    public function create()
    {
        return inertia('Admin/Careers/Apply', [
            'skillLevels' => CareerApplication::getSkillLevels()
        ]);
    }

    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'full_name' => 'required|string|max:255',
                'email' => 'required|email|max:255',
                'phone' => 'required|string|max:20',
                'skill_level' => 'required|string|in:' . implode(',', array_keys(CareerApplication::getSkillLevels())),
                'address' => 'required|string',
                'resume' => 'required|file|mimes:pdf,doc,docx|max:5120', // 5MB
                'agree_terms' => 'required|accepted',
                'job_title' => 'required|string',
                'job_descriptions_id' => 'required|string',
            ]);

            if ($validator->fails()) {
                return back()->withErrors($validator)->withInput();
            }

            $validated = $validator->validated();

            // Handle resume upload
            $resumePath = null;
            if ($request->hasFile('resume')) {
                $file = $request->file('resume');
                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();
                $path = $file->storeAs('resumes', $filename, 'public');
                $validated['resume'] = $path;
                $resumePath = $path;
            }

            // Create application record
            $application = CareerApplication::create($validated);

            // Send email notification using EmailService
            try {
                $emailData = [
                    'link_with' => 1, // Job Application
                    'Subject'=>'New Job Application.',
                    'link_id' => $application->id,
                    'email_id' => 'career_application_' . $application->id,
                    'send_data' => [
                        'full_name' => $application->full_name,
                        'email' => $application->email,
                        'phone' => $application->phone,
                        'skill_level' => $application->skill_level, 
                        'address' => $application->address,
                        'job_title' => $validated['job_title'] ?? 'Not get title',
                        'application_id' => $application->id,
                        'applied_at' => now()->format('F j, Y \a\t g:i A'),
                    ],
                    'attachment_path' => $resumePath,
                    'attachment_name' => $application->full_name . '_resume.' . pathinfo($resumePath, PATHINFO_EXTENSION),
                ];

                $result = $this->emailService->sendEmail($emailData);

                if (!$result['status']) {
                    Log::warning('Email notification failed but application was saved', [
                        'application_id' => $application->id,
                        'error' => $result['message']
                    ]);
                }

            } catch (\Exception $emailException) {
                Log::error('Email sending error for application', [
                    'application_id' => $application->id,
                    'error' => $emailException->getMessage()
                ]);
                // Don't fail the application submission if email fails
            }

            return redirect()->back()
                ->with('success', 'Application submitted successfully!');

        } catch (ValidationException $e) {
            return back()->withErrors($e->errors())->withInput();
        } catch (QueryException $e) {
            return back()->with('error', 'Database error occurred. Please try again.')->withInput();
        } catch (\Exception $e) {
            return back()->with('error', 'Failed to submit application. Please try again.')->withInput();
        }
    }

    public function show($id)
    {
        try {
            $application = CareerApplication::findOrFail($id);

            return inertia('Admin/Careers/Show', [
                'application' => $application,
                'statuses' => CareerApplication::getStatuses()
            ]);

        } catch (\Exception $e) {
            return redirect()->route('admin.careers.index')
                ->with('error', 'Application not found.');
        }
    }

    public function destroy($id)
    {
        try {
            $application = CareerApplication::findOrFail($id);

            // Delete resume file
            if (Storage::disk('public')->exists($application->resume)) {
                Storage::disk('public')->delete($application->resume);
            }

            $application->delete();

            return redirect()->route('admin.careers.index')
                ->with('success', 'Application deleted successfully.');

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to delete application.');
        }
    }

    public function downloadResume($id)
    {
        try {
            $application = CareerApplication::findOrFail($id);

            if (!Storage::disk('public')->exists($application->resume)) {
                return back()->with('error', 'Resume file not found.');
            }

            return Storage::disk('public')->download($application->resume);

        } catch (\Exception $e) {
            return back()->with('error', 'Failed to download resume.');
        }
    }

    /**
     * Update the status of a career application
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            // Validate the request
            $validator = Validator::make($request->all(), [
                'status' => 'required|string|in:pending,reviewed,shortlisted,rejected'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid status value provided.',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Find the application
            $application = CareerApplication::findOrFail($id);

            // Update the status
            $application->status = $request->status;
            $application->save();
            // Send email notification using EmailService
            try {
                if ($application->status == 'shortlisted') {

                    $emailData = [
                        'link_with' => 2, // Shortlisted
                        'Subject'=>'Congratulations! You Have Been Shortlisted',
                        'link_id' => $application->id,
                        'email_id' => 'career_application_' . $application->id,
                        'send_data' => [
                            'full_name' => $application->full_name,
                            'email' => $application->email,
                            'phone' => $application->phone,
                            'skill_level' => $application->skill_level,
                            'address' => $application->address,
                            'job_title' => $application->job_title ?? 'Not get title',
                            'application_id' => $application->id,
                            'applied_at' => now()->format('F j, Y \a\t g:i A'),
                        ],
                        'attachment_path' => $application->resume,
                        'attachment_name' => $application->full_name . '_resume.' . pathinfo($application->resume, PATHINFO_EXTENSION),
                    ];

                    // dd($emailData);

                    $result = $this->emailService->sendEmail($emailData);

                    if (!$result['status']) {
                        Log::warning('Email notification failed but application was saved', [
                            'application_id' => $application->id,
                            'error' => $result['message']
                        ]);
                    }
                }

            } catch (\Exception $emailException) {
                Log::error('Email sending error for application', [
                    'application_id' => $application->id,
                    'error' => $emailException->getMessage()
                ]);
                // Don't fail the application submission if email fails
            }


            // Log the status change
            Log::info('Application status updated', [
                'application_id' => $application->id,
                'old_status' => $application->getOriginal('status'),
                'new_status' => $application->status,
                'updated_by' => auth()->id()
            ]);

            // Return success response
            return back()->with('success', 'Application status updated successfully.');

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            Log::error('Application not found for status update', [
                'application_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Application not found.'
            ], 404);

        } catch (\Exception $e) {
            Log::error('Failed to update application status', [
                'application_id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Unable to update application status. Please try again.'
            ], 500);
        }
    }


}