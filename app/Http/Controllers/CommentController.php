<?php

namespace App\Http\Controllers;
use App\Models\like;
use Illuminate\Support\Facades\DB;
use App\Models\blog_comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
use Inertia\Inertia;

class CommentController extends Controller
{
    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'blog_id' => 'required|exists:blogs,id',
    //         'comment' => 'required|string|max:1000',
    //     ]);

    //     $comment = BlogComment::create([
    //         'comment' => $validated['comment'],
    //         'blog_id' => $validated['blog_id'],
    //         'user_id' => Auth::id(),
    //         'parent_id' => $request->parent_id ?? null,
    //     ]);

    //     // Return an Inertia response with a flash message
    //     return back()->with('success', 'Comment added successfully!');
    // }

    // public function fetch($blogId)
    // {
    //     $comments = DB::table('blog_comments')
    //         ->join('users', 'blog_comments.user_id', '=', 'users.id')
    //         ->select(
    //             'blog_comments.id',
    //             'blog_comments.comment',
    //             'blog_comments.blog_id',
    //             'blog_comments.parent_id',
    //             'blog_comments.created_at',
    //             'users.id as user_id',
    //             'users.name as user_name'
    //         )
    //         ->where('blog_comments.blog_id', $blogId)
    //         ->orderBy('blog_comments.created_at', 'desc')
    //         ->get();

    //     // Return an Inertia response
    //     return Inertia::render('Blog/CommentSection', [
    //         'comments' => $comments
    //     ]);
    // }


    public function store(Request $request)
    {
        $request->validate([
            'comment' => 'required|string',
            'post_id' => 'required|integer|exists:blogs,id',
            'parent_id' => 'nullable|integer|exists:blog_comments,id',
        ]);

        $comment = blog_comment::create([
            'comment' => $request->comment,
            'blog_id' => $request->post_id,
            'user_id' => Auth::id(),
            'parent_id' => $request->parent_id ?? null,
        ]);

        $responseData = [
            'id' => $comment->id,
            'comment' => $comment->comment,
            'blog_id' => $comment->blog_id,
            'parent_id' => $comment->parent_id,
            'created_at' => $comment->created_at,
            'user_id' => Auth::id(),
            'user_name' => Auth::user()->name ?? null,
        ];

        return response()->json([
            'status' => 'success',
            'message' => 'Comment posted successfully',
            'comment' => $responseData,
        ]);
    }

    public function fetch($blogId)
    {
        $comments = DB::table('blog_comments')
            ->join('users', 'blog_comments.user_id', '=', 'users.id')
            ->select(
                'blog_comments.id',
                'blog_comments.comment',
                'blog_comments.blog_id',
                'blog_comments.parent_id',
                'blog_comments.created_at',
                'users.id as user_id',
                'users.name as user_name'
            )
            ->where('blog_comments.blog_id', $blogId)
            ->orderBy('blog_comments.created_at', 'desc')
            ->get();

        return response()->json([
            'comments' => $comments
        ]);
    }

    public function likestore(Request $request)
    {
        $request->validate([
            'like' => 'required|string', // '1' = like, '0' = unlike
            'post_id' => 'required|integer|exists:blogs,id',
        ]);

        $userId = Auth::id();
        $blogId = $request->post_id;

        if ($request->like === '1') {
            // Check if user already liked
            $like = \App\Models\Like::firstOrCreate(
                ['user_id' => $userId, 'blog_id' => $blogId]
            );
        } else {
            // Unlike: remove existing like
            $like = \App\Models\Like::where('user_id', $userId)
                ->where('blog_id', $blogId)
                ->first();

            if ($like) {
                $like->delete();
            }
        }

        $responseData = [
            'id' => $like->id ?? null,
            'blog_id' => $blogId,
            'user_id' => $userId,
            'user_name' => Auth::user()->name ?? null,
            'liked' => $request->like === '1', // return current state
        ];

        return response()->json([
            'status' => 'success',
            'message' => $request->like === '1' ? 'Like added' : 'Like removed',
            'like' => $responseData,
        ]);
    }

    // public function store(Request $request)
    // {
    //     $allData = $request->all();

    //     $userData = [
    //         'is_authenticated' => Auth::check(),
    //         'user_id' => Auth::id(),
    //         'user_name' => Auth::check() ? Auth::user()->name : null,
    //     ];
    //     // dd();
    //     $comment = blog_comment::create([
    //         'comment' => $request->comment,
    //         'blog_id' => $request->post_id,
    //         'user_id' => Auth::id(),
    //         'parent_id' => $request->parent_id ?? null,
    //     ]);
    //     $responseData = array_merge($comment->toArray(), $userData);

    //     return Inertia::render('Comment', [
    //         'testData' => [
    //             'status' => 'success',
    //             'message' => 'Data received successfully',
    //             'received_data' => $responseData,
    //             'server_time' => now()->toDateTimeString(),
    //             'request_method' => $request->method(),
    //         ]
    //     ]);
    // }
    // public function fetch($blogId)
    // {
    //     $comments = DB::table('blog_comments')
    //         ->join('users', 'blog_comments.user_id', '=', 'users.id')
    //         ->select(
    //             'blog_comments.id',
    //             'blog_comments.comment',
    //             'blog_comments.blog_id',
    //             'blog_comments.parent_id',
    //             'blog_comments.created_at',
    //             'users.id as user_id',
    //             'users.name as user_name'
    //         )
    //         ->where('blog_comments.blog_id', $blogId)
    //         ->orderBy('blog_comments.created_at', 'desc')
    //         ->get();

    //     return Inertia::render('Comment', [
    //         'comments' => $comments
    //     ]);
    // }

}