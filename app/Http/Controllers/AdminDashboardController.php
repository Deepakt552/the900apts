<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Get total counts using Query Builder
        $totalBlogs = DB::table('blogs')->count();
        $publishedBlogs = DB::table('blogs')->where('status', 'published')->count();
        $totalApplications = DB::table('career_applications')->count();
        $shortlistedApplications = DB::table('career_applications')->where('status', 'shortlisted')->count();
        $totalInquiries = DB::table('contact_inquiries')->count();
        $unreadInquiries = DB::table('contact_inquiries')->where('status', 'unread')->count();
        $totalViews = DB::table('blog_views')->count();
        $todayViews = DB::table('blog_views')->whereDate('created_at', today())->count();
        $totalComments = DB::table('blog_comments')->count();
        $jobPositions = DB::table('job_descriptions')->where('status', 1)->count();

        // Get recent blogs with status and date
        $recentBlogs = DB::table('blogs')
            ->select('id', 'title', 'status', 'publish_date', 'created_at')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($blog) {
                // Safely format the date
                $date = 'N/A';
                
                if (!empty($blog->publish_date)) {
                    try {
                        $date = Carbon::parse($blog->publish_date)->format('M d');
                    } catch (\Exception $e) {
                        $date = 'N/A';
                    }
                } else if (!empty($blog->created_at)) {
                    try {
                        $date = Carbon::parse($blog->created_at)->format('M d');
                    } catch (\Exception $e) {
                        $date = 'N/A';
                    }
                }

                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'status' => $blog->status,
                    'date' => $date,
                    'status_label' => ucfirst($blog->status),
                    'status_color' => $this->getStatusColor($blog->status)
                ];
            });

        // Get recent comments with user and blog info
        $recentComments = DB::table('blog_comments as bc')
            ->leftJoin('users as u', 'bc.user_id', '=', 'u.id')
            ->leftJoin('blogs as b', 'bc.blog_id', '=', 'b.id')
            ->select(
                'bc.id',
                'bc.comment',
                'bc.created_at',
                'u.name as user_name',
                'b.title as blog_title'
            )
            ->orderBy('bc.created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($comment) {
                // Format time ago
                $timeAgo = 'Unknown';
                if (!empty($comment->created_at)) {
                    try {
                        $timeAgo = Carbon::parse($comment->created_at)->diffForHumans();
                    } catch (\Exception $e) {
                        $timeAgo = 'Unknown';
                    }
                }

                return [
                    'id' => $comment->id,
                    'user_name' => $comment->user_name ?? 'Guest',
                    'blog_title' => $comment->blog_title ?? 'Unknown Blog',
                    'comment' => strlen($comment->comment) > 60 ? substr($comment->comment, 0, 60) . '...' : $comment->comment,
                    'time_ago' => $timeAgo,
                    'created_at' => $comment->created_at
                ];
            });

        // Get recent career applications
        $recentApplications = DB::table('career_applications')
            ->select('id', 'full_name', 'job_title', 'email', 'status', 'created_at')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($app) {
                // Format date
                $appliedDate = 'N/A';
                if (!empty($app->created_at)) {
                    try {
                        $appliedDate = Carbon::parse($app->created_at)->format('M d');
                    } catch (\Exception $e) {
                        $appliedDate = 'N/A';
                    }
                }

                return [
                    'id' => $app->id,
                    'full_name' => $app->full_name,
                    'job_title' => $app->job_title ?? 'N/A',
                    'email' => $app->email,
                    'status' => $app->status,
                    'status_label' => ucfirst($app->status),
                    'status_color' => $this->getApplicationStatusColor($app->status),
                    'applied_date' => $appliedDate
                ];
            });

        // Get latest contact inquiries
        $recentInquiries = DB::table('contact_inquiries')
            ->select('id', 'first_name', 'last_name', 'email', 'message', 'status', 'created_at')
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get()
            ->map(function ($inquiry) {
                // Format time ago
                $timeAgo = 'Unknown';
                if (!empty($inquiry->created_at)) {
                    try {
                        $timeAgo = Carbon::parse($inquiry->created_at)->diffForHumans();
                    } catch (\Exception $e) {
                        $timeAgo = 'Unknown';
                    }
                }

                return [
                    'id' => $inquiry->id,
                    'name' => $inquiry->first_name . ' ' . $inquiry->last_name,
                    'email' => $inquiry->email,
                    'message' => strlen($inquiry->message) > 50 ? substr($inquiry->message, 0, 50) . '...' : $inquiry->message,
                    'status' => $inquiry->status,
                    'time_ago' => $timeAgo
                ];
            });

        // Get blog view statistics for chart (last 7 days)
        $viewsLast7Days = DB::table('blog_views')
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', Carbon::now()->subDays(7))
            ->groupBy('date')
            ->orderBy('date', 'asc')
            ->get();

        return inertia('Dashboard', [
            'stats' => [
                'total_blogs' => $totalBlogs,
                'published_blogs' => $publishedBlogs,
                'total_applications' => $totalApplications,
                'shortlisted_applications' => $shortlistedApplications,
                'total_inquiries' => $totalInquiries,
                'unread_inquiries' => $unreadInquiries,
                'total_views' => $totalViews,
                'today_views' => $todayViews,
                'total_comments' => $totalComments,
                'job_positions' => $jobPositions,
            ],
            'recent_blogs' => $recentBlogs,
            'recent_comments' => $recentComments,
            'recent_applications' => $recentApplications,
            'recent_inquiries' => $recentInquiries,
            'views_chart' => $viewsLast7Days,
        ]);
    }

    private function getStatusColor($status)
    {
        return match ($status) {
            'published' => 'success',
            'draft' => 'warning',
            'schedule' => 'info',
            default => 'secondary',
        };
    }

    private function getApplicationStatusColor($status)
    {
        return match ($status) {
            'shortlisted' => 'success',
            'pending' => 'warning',
            'reviewed' => 'info',
            'rejected' => 'danger',
            default => 'secondary',
        };
    }
}