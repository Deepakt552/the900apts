import { useState, useRef, useEffect } from "react";
import { router, usePage } from '@inertiajs/react';
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export default function CommentBox({ postId }) {
    const { props } = usePage();
    const { auth, comments: serverComments = [] } = props; 

    const user = auth?.user;
    const userId = user?.id;

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const textareaRef = useRef(null);

    dayjs.extend(relativeTime);

    // Auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + "px";
        }
        fetchComments();
    }, [comment]);

     useEffect(() => {
        fetchComments();
    }, []);

    const fetchComments = async () => {
    try {
        const response = await fetch(`/comments/${postId}`);
        const data = await response.json();
        setComments(data.comments);
    } catch (err) {
        console.error("Failed to fetch comments", err);
    }
};

const submitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
        setError("Comment cannot be empty");
        return;
    }

    setLoading(true);
    setError("");
    try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const response = await fetch("/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": csrfToken, 
                },
                body: JSON.stringify({
                    post_id: postId,
                    comment: comment.trim(),
                }),
            });

        const data = await response.json();

        if (data.status === "success") {
            setComment("");
            fetchComments(); 
        } else {
            setError("Failed to post comment");
        }
    } catch (err) {
        console.error(err);
        setError("Failed to post comment");
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="mt-8 flex flex-col items-center w-full">
            {/* COMMENT FORM */}
            {user ? (
                <form onSubmit={submitComment} className="w-full max-w-2xl space-y-3">
                    <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-gold-400/20 to-gold-500/20 rounded-full flex items-center justify-center border border-gold-400/30">
                                <i className="fas fa-user text-gold-400"></i>
                            </div>
                        </div>
                        <div className="flex-1">
                            <textarea
                                ref={textareaRef}
                                className="w-full px-4 py-3 bg-dark-50 border border-gold-400/30 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent resize-none text-white placeholder-gray-500"
                                placeholder="Write your comment here..."
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                disabled={loading}
                                rows="3"
                            />
                            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
                            <div className="flex justify-end mt-3">
                                <button
                                    type="submit"
                                    disabled={loading || !comment.trim()}
                                    className="px-4 py-2 bg-gold-400 text-dark-500 font-medium rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin mr-2"></i>
                                            Posting...
                                        </>
                                    ) : (
                                        'Post Comment'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="w-full max-w-2xl text-center p-6 bg-dark-50 rounded-lg border border-gold-400/20">
                    <p className="text-gray-300">Please login to comment</p>
                    <a href="/login" className="text-gold-400 hover:text-gold-500 transition-colors mt-2 inline-block font-medium">
                        Login
                    </a>
                </div>
            )}

            {/* COMMENTS LIST */}
            <div className="mt-6 w-full max-w-2xl max-h-[50vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Comments ({comments.length})</h4>
                </div>
                
                {comments.length > 0 ? (
                    <div className="space-y-4">
                        {comments.map(c => (
                            <div
                                key={c.id}
                                className="flex flex-col md:flex-row md:items-start md:space-x-4 border border-gold-400/20 p-4 rounded-lg shadow-sm hover:shadow-md hover:shadow-gold-400/5 hover:border-gold-400/40 transition-all bg-dark-50"
                            >
                                {/* User avatar placeholder */}
                                <div className="flex-shrink-0 mb-2 md:mb-0">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-400/20 to-gold-500/20 flex items-center justify-center text-gold-400 font-bold border border-gold-400/30">
                                        {c.user_name[0].toUpperCase()}
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <span className="font-semibold text-white">{c.user_name}</span>
                                        <span className="text-xs text-gray-400">
                                            {dayjs(c.created_at).fromNow()} 
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-300">{c.comment}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 border-2 border-dashed border-gold-400/20 rounded-lg bg-dark-50">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gold-400/10 rounded-full mb-3 border border-gold-400/20">
                            <i className="fas fa-comment text-gold-400"></i>
                        </div>
                        <h4 className="text-lg font-semibold text-white">
                            No comments yet
                        </h4>
                        <p className="text-gray-400 mt-1">
                            Be the first to share your thoughts!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}