<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\BlogAnalyticsController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CareerApplicationController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GalleryController;
use App\Http\Controllers\JobDescriptionController;
use App\Http\Controllers\MailSettingController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ContactInquiryController;
use App\Http\Controllers\PublicLinkController;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

Route::get('/', function () {
    return Inertia::render('Home/index');
})->name('Home');

Route::get('/amenity', function () {
    return Inertia::render('Amenities');
})->name('amenity');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');
Route::get('/gallery/images', [GalleryController::class, 'getImages']);

Route::get('/neighborhood', function () {
    return Inertia::render('Neighbor/Neighborhood');
})->name('neighborhood');


Route::get('/Accessibility', function () {
    return Inertia::render('Accessibility');
})->name('Accessibility');

Route::get('/PrivacyPolicy', function () {
    return Inertia::render('PrivacyPolicy');
})->name('PrivacyPolicy');


Route::get('/luxuryNeighborhoodMap', function () {
    return Inertia::render('Neighbor/LuxuryNeighborhoodMap');
})->name('luxuryNeighborhoodMap');

Route::get('/Contact', function () {
    return Inertia::render('Contact');
})->name('Contact');

Route::get('/generalInfo', function () {
    return Inertia::render('GeneralInfo');
})->name('generalInfo');

Route::get('/availability', function () {
    return Inertia::render('Availability');
})->name('availability');


Route::get('/blog', [BlogController::class, 'blogListing'])->name('blog');
Route::get('/blog/{id}/showDetail/{slug?}', [BlogController::class, 'showOne'])
    ->name('blog.show');
Route::get('/blogs/load-more', [BlogController::class, 'loadMoreBlogs'])->name('blogs.load-more');

Route::get('/comment', function () {
    return Inertia::render('Comment');
})->name('comment');

Route::get('/comments/{postId}', [CommentController::class, 'fetch']);
Route::post('/comment', [CommentController::class, 'store'])->name('comments.store');
Route::put('/comments/{id}', [CommentController::class, 'update']);
Route::delete('/comments/{id}', [CommentController::class, 'destroy']);
Route::post('/blog/like', [CommentController::class, 'likestore']);

// Carrers 
Route::get('/careers', [CareerApplicationController::class, 'careerIndex'])
    ->name('career');
Route::get('/career/{job}', [CareerApplicationController::class, 'showjob'])->name('career.job');
Route::get('/career/apply', [CareerApplicationController::class, 'create'])
    ->name('career.apply');
Route::post('/career/apply', [CareerApplicationController::class, 'store'])
    ->name('career.store');

Route::get('/dashboard', [AdminDashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/virtual-tour', function () {
    return Inertia::render('VirtualTour');
})->name('virtual-tour');

// Public Contact Inquiry Route
Route::post('/contact/inquiries', [ContactInquiryController::class, 'store'])->name('contact.inquiries.store');

Route::middleware('auth')->group(function () {

    Route::post(
        '/admin/public-links/bulk-status',
        [PublicLinkController::class, 'bulkStatus']
    )->name('admin.public-route.bulk-status');

    Route::get('/admin/single-blog-analytics/{blogid}', [BlogAnalyticsController::class, 'SingleAnaylisis'])->name('admin.blog.SingleAnaylisis');
    Route::get('/admin/blog-analytics', [BlogAnalyticsController::class, 'index'])->name('admin.blog.analytics');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/admin/routes', [PublicLinkController::class, 'listView'])->name('adminroutelist');
    Route::get('/all-routes', [PublicLinkController::class, 'routeList'])->name('routesInformation');

    Route::prefix('contact')->name('contact.')->group(function () {
        // List inquiries
        Route::get('/inquiries', [ContactInquiryController::class, 'index'])->name('inquiries.index');

        // Export - THIS MUST COME BEFORE THE {id} ROUTE
        Route::get('/inquiries/export', [ContactInquiryController::class, 'export'])->name('inquiries.export');

        // Bulk operations
        Route::post('/inquiries/bulk-status', [ContactInquiryController::class, 'bulkStatus'])->name('inquiries.bulk-status');
        Route::post('/inquiries/bulk-delete', [ContactInquiryController::class, 'bulkDelete'])->name('inquiries.bulk-delete');

        // Single inquiry operations - THESE MUST COME AFTER THE EXPORT ROUTE
        Route::get('/inquiries/{id}', [ContactInquiryController::class, 'show'])->name('inquiries.show');
        Route::put('/inquiries/{id}/status', [ContactInquiryController::class, 'updateStatus'])->name('inquiries.update-status');
        Route::delete('/inquiries/{id}', [ContactInquiryController::class, 'destroy'])->name('inquiries.destroy');
    });

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('admin.dashboard');

    //blogs
    Route::get('/admin/blogs', [BlogController::class, 'index'])->name('admin.blogs.index');
    Route::get('/blogs/{id}/show/{slug?}', [BlogController::class, 'show'])
        ->name('admin.blog.show');

    Route::get('/blogs/{id}/edit/{slug?}', [BlogController::class, 'edit'])->name('admin.blog.edit');
    Route::put('/blogs/{id}', [BlogController::class, 'update'])->name('admin.blog.update');

    Route::delete('/blogs/{id}', [BlogController::class, 'destroy'])->name('admin.blog.destroy');
    Route::delete('/blog-images/{id}', [BlogController::class, 'deleteImage'])->name('admin.blog.image.delete');

    Route::get('/blogs/create', [BlogController::class, 'create'])->name('admin.blog.create');
    Route::post('/blogs', [BlogController::class, 'store'])->name('admin.blog.store');
    Route::get('/createPost', function () {
        // dd(Blog_category::all());
        return Inertia::render('Admin/Blog/create', [
            'categories' => null,
            'users' => User::select('id', 'name', 'email')->get()
        ]);
        // return Inertia::render('Admin/Blog/create');
    })->name('createPost');
    //blogs
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {

    Route::get('/careers', [CareerApplicationController::class, 'index'])
        ->name('careers.index');
    Route::get('/careers/{id}', [CareerApplicationController::class, 'show'])
        ->name('careers.show');
    Route::delete('/careers/{id}', [CareerApplicationController::class, 'destroy'])
        ->name('careers.destroy');
    Route::get('/careers/{id}/download-resume', [CareerApplicationController::class, 'downloadResume'])
        ->name('careers.download-resume');
    // Update status route
    Route::put('/careers/{id}/status', [CareerApplicationController::class, 'updateStatus'])
        ->name('careers.update-status');
    // Route::patch('/careers/{id}/status', [CareerApplicationController::class, 'updateStatus'])
    //     ->name('careers.update-status-patch');
});

Route::middleware(['auth'])->prefix('admin')->name('admin.')->group(function () {
    Route::resource('public-links', PublicLinkController::class);
    // Route search endpoint - ADD THIS NEW ROUTE
    Route::get('/search-routes', [PublicLinkController::class, 'searchRoute'])
        ->name('public-links.search-routes');
    Route::resource('job-descriptions', JobDescriptionController::class);

    // Custom route for image upload
    Route::post('job-descriptions/upload-image', [JobDescriptionController::class, 'uploadImage'])
        ->name('job-descriptions.upload-image');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class);
});

//MailSettingController
Route::prefix('settings')->group(function () {
    Route::get('/mail', [MailSettingController::class, 'index'])->name('settings.mail');
    Route::put('/mail', [MailSettingController::class, 'update'])->name('settings.mail.update');
});
//MailSettingController

require __DIR__ . '/auth.php';
