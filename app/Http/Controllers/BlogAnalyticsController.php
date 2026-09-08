<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BlogAnalyticsController extends Controller
{
    public function index()
    {
        // Total Views (unique blog_id + ip_address combinations)
        $totalViews = DB::table('blog_views')
            ->selectRaw('COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as total')
            ->value('total');

        // Unique Visitors (unique IP addresses)
        $uniqueVisitors = DB::table('blog_views')
            ->distinct('ip_address')
            ->count('ip_address');

        // Logged-in Users (user_id is not null)
        $loggedInUsers = DB::table('blog_views')
            ->whereNotNull('user_id')
            ->distinct('user_id')
            ->count('user_id');

        // Average Views Per Day (unique blog + IP per day)
        $avgViewsPerDay = DB::table('blog_views')
            ->selectRaw('COUNT(DISTINCT CONCAT(blog_id, "-", ip_address, "-", DATE(created_at))) / COUNT(DISTINCT DATE(created_at)) as avg_views')
            ->value('avg_views');

        // Views Over Time (last 30 days - unique blog + IP per day)
        $viewsOverTime = DB::table('blog_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as views')
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Views By Device
        $viewsByDevice = DB::table('blog_views')
            ->selectRaw('device, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as count')
            ->groupBy('device')
            ->get();

        // Views By Browser
        $viewsByBrowser = DB::table('blog_views')
            ->selectRaw('browser_name, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as count')
            ->groupBy('browser_name')
            ->get();

        // Top Countries
        $topCountries = DB::table('blog_views')
            ->selectRaw('country, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as views')
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        // Top Blog Posts (unique views per blog)
        $topBlogs = DB::table('blog_views')
            ->join('blogs', 'blogs.id', '=', 'blog_views.blog_id')
            ->selectRaw('blogs.id, blogs.title, COUNT(DISTINCT CONCAT(blog_views.blog_id, "-", blog_views.ip_address)) as views')
            ->groupBy('blogs.id', 'blogs.title')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        // dd([
        //     'totalViews' => $totalViews ?? 0,
        //     'uniqueVisitors' => $uniqueVisitors,
        //     'loggedInUsers' => $loggedInUsers,
        //     'avgViewsPerDay' => round($avgViewsPerDay ?? 0, 2),
        //     'viewsOverTime' => $viewsOverTime,
        //     'viewsByDevice' => $viewsByDevice,
        //     'viewsByBrowser' => $viewsByBrowser,
        //     'topCountries' => $topCountries,
        //     'topBlogs' => $topBlogs,
        // ]);

        return Inertia::render('Admin/BlogAnalytics/Index', [
            'totalViews' => $totalViews ?? 0,
            'uniqueVisitors' => $uniqueVisitors,
            'loggedInUsers' => $loggedInUsers,
            'avgViewsPerDay' => round($avgViewsPerDay ?? 0, 2),
            'viewsOverTime' => $viewsOverTime,
            'viewsByDevice' => $viewsByDevice,
            'viewsByBrowser' => $viewsByBrowser,
            'topCountries' => $topCountries,
            'topBlogs' => $topBlogs,
            'IsModal'=>false
        ]);
    }

    public function SingleAnaylisis($id)
    {
        // dd($id);
        // Total Views (unique blog_id + ip_address combinations)
        $totalViews = DB::table('blog_views')
            ->selectRaw('COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as total')
            ->where('blog_id', $id)
            ->value('total');

        // Unique Visitors (unique IP addresses)
        $uniqueVisitors = DB::table('blog_views')
            ->distinct('ip_address')
            ->where('blog_id', $id)
            ->count('ip_address');

        // Logged-in Users (user_id is not null)
        $loggedInUsers = DB::table('blog_views')
            ->whereNotNull('user_id')
            ->where('blog_id', $id)
            ->distinct('user_id')
            ->count('user_id');

        // Average Views Per Day (unique blog + IP per day)
        $avgViewsPerDay = DB::table('blog_views')
            ->selectRaw('COUNT(DISTINCT CONCAT(blog_id, "-", ip_address, "-", DATE(created_at))) / COUNT(DISTINCT DATE(created_at)) as avg_views')
            ->where('blog_id', $id)
            ->value('avg_views');

        // Views Over Time (last 30 days - unique blog + IP per day)
        $viewsOverTime = DB::table('blog_views')
            ->selectRaw('DATE(created_at) as date, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as views')
            ->where('created_at', '>=', now()->subDays(30))
            ->where('blog_id', $id)
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Views By Device
        $viewsByDevice = DB::table('blog_views')
            ->selectRaw('device, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as count')
            ->groupBy('device')
            ->where('blog_id', $id)
            ->get();

        // Views By Browser
        $viewsByBrowser = DB::table('blog_views')
            ->selectRaw('browser_name, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as count')
            ->groupBy('browser_name')
            ->where('blog_id', $id)
            ->get();

        // Top Countries
        $topCountries = DB::table('blog_views')
            ->selectRaw('country, COUNT(DISTINCT CONCAT(blog_id, "-", ip_address)) as views')
            ->whereNotNull('country')
            ->groupBy('country')
            ->orderByDesc('views')
            ->where('blog_id', $id)
            ->limit(5)
            ->get();

        // Top Blog Posts (unique views per blog)
        $topBlogs = DB::table('blog_views')
            ->join('blogs', 'blogs.id', '=', 'blog_views.blog_id')
            ->selectRaw('blogs.id, blogs.title, COUNT(DISTINCT CONCAT(blog_views.blog_id, "-", blog_views.ip_address)) as views')
            ->groupBy('blogs.id', 'blogs.title')
            ->orderByDesc('views')
            ->limit(5)
            ->get();

        // dd([
        //     'totalViews' => $totalViews ?? 0,
        //     'uniqueVisitors' => $uniqueVisitors,
        //     'loggedInUsers' => $loggedInUsers,
        //     'avgViewsPerDay' => round($avgViewsPerDay ?? 0, 2),
        //     'viewsOverTime' => $viewsOverTime,
        //     'viewsByDevice' => $viewsByDevice,
        //     'viewsByBrowser' => $viewsByBrowser,
        //     'topCountries' => $topCountries,
        //     'topBlogs' => $topBlogs,
        // ]);

        return Inertia::render('Admin/BlogAnalytics/Index', [
            'totalViews' => $totalViews ?? 0,
            'uniqueVisitors' => $uniqueVisitors,
            'loggedInUsers' => $loggedInUsers,
            'avgViewsPerDay' => round($avgViewsPerDay ?? 0, 2),
            'viewsOverTime' => $viewsOverTime,
            'viewsByDevice' => $viewsByDevice,
            'viewsByBrowser' => $viewsByBrowser,
            'topCountries' => $topCountries,
            'topBlogs' => $topBlogs,
            'IsModal'=>true
        ]);
    }
}