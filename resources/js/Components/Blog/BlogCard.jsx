// components/BlogCard.jsx
import React, { useState } from 'react';
import { Link, router, usePage, Head } from '@inertiajs/react';
import {
    Clock,
    Calendar,
    User,
    Eye,
    Heart,
    MessageCircle,
    ArrowRight,
} from "lucide-react";

const BlogCard = ({ blog, setShowLoginModal, setSelectedBlogForComment, setShowCommentModal }) => {
    // console.log(blog);
    const { props } = usePage();
    const { auth } = props;
    const isLoggedIn = auth?.user ? true : false;
    const [Countlikes, setCountlikes] = useState(blog.likes ?? 0);
    const [likedBlogs, setLikedBlogs] = useState(() => {
        return new Set();
    });

    const [activecolorlike, setActivecolorlike] = useState(() => {
        return blog.is_like == 1 ? new Set([blog.id]) : new Set();
    });
    const [activecolorcomment, setActiveColorComment] = useState(() => {
        return blog.is_comment == 1 ? new Set([blog.id]) : new Set();
    });
    const [commentedBlogs, setCommentedBlogs] = useState(new Set());
    const [blogComments, setBlogComments] = useState({});

    // console.log(blog.is_like);
    // console.log(likedBlogs);
    // console.log(activecolorlike);
    // console.log(activecolorcomment);
    const handleLike = async (blogId, e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

            const newLikedBlogs = new Set(likedBlogs);
            const activecolorlikeblog = new Set(activecolorlike);
            if (newLikedBlogs.has(blogId) || activecolorlike.has(blogId)) {
                newLikedBlogs.delete(blogId);
                activecolorlikeblog.delete(blogId);
                setCountlikes(Countlikes - 1);
                await fetch('/blog/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({ post_id: blogId, like: '0' }),
                });
            } else {
                newLikedBlogs.add(blogId);
                activecolorlikeblog.add(blogId);
                setCountlikes(Countlikes + 1);
                await fetch('/blog/like', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken,
                    },
                    body: JSON.stringify({ post_id: blogId, like: '1' }),
                });
            }
            setLikedBlogs(newLikedBlogs);
            setActivecolorlike(activecolorlikeblog);

        } catch (err) {
            console.error('Failed to update like', err);
        }
    };

    // Handle comment action
    const handleComment = (blogId, blogTitle, e) => {
        e.stopPropagation();

        if (!isLoggedIn) {
            setShowLoginModal(true);
            return;
        }

        setSelectedBlogForComment({
            id: blogId,
            title: blogTitle,
            comments: blogComments[blogId] || []
        });
        setShowCommentModal(true);
    };

    // Blog card click handler
    const handleBlogClick = (slug) => {
        try {
            router.get(route('blog.show', { slug }), {}, {
                preserveScroll: false,
            });
        } catch (error) {
            console.log('Blog clicked:', slug);
            // alert('Blog detail page will be implemented soon!');
        }
    };

    return (
        <div data-aos="zoom-in"
            className="group bg-dark-50 rounded-xl md:rounded-2xl border border-gold-400/20 overflow-hidden hover:border-gold-400 hover:shadow-lg md:hover:shadow-xl hover:shadow-gold-400/10 transition-all duration-300 cursor-pointer flex flex-col h-full"
            onClick={() => handleBlogClick(blog.slug)}
        >
            <div className="relative h-40 sm:h-36 md:h-48 lg:h-56 overflow-hidden">
                <img
                    src={blog.image || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80'}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark-500/80 to-transparent h-8 md:h-12"></div>
            </div>

            <div className="p-3 md:p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-2 md:mb-3">
                    <div className="flex items-center text-xs text-gray-400">
                        <Clock size={14} className="mr-1 text-gold-400" />
                        <span className="truncate text-xs">{blog.readTime || '5 min'}</span>
                        <span className="mx-1 md:mx-2 text-gray-500">•</span>
                        <Calendar size={14} className="mr-1 text-gold-400" />
                        <span className="truncate text-xs">{blog.date || 'N/A'}</span>
                    </div>
                </div>

                <h3 className="text-sm md:text-lg lg:text-xl font-bold text-white mb-2 md:mb-3 line-clamp-2 group-hover:text-gold-400 transition-colors">
                    {blog.title || 'Untitled'}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm mb-3 md:mb-4 line-clamp-2 md:line-clamp-3 flex-1">
                    {blog.excerpt || blog.summary || 'No description available'}
                </p>
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 md:gap-1.5 mb-3 md:mb-4">
                        {blog.tags.slice(0, 2).map((tag, index) => (
                            <span
                                key={index}
                                className="px-1.5 md:px-2.5 py-0.5 md:py-1 bg-dark-200 text-gray-300 text-xs font-medium rounded-full hover:bg-dark-100 hover:text-gold-400 transition-colors truncate max-w-[100px] md:max-w-[120px] border border-gold-400/10"
                            >
                                #{tag}
                            </span>
                        ))}
                        {blog.tags.length > 2 && (
                            <span className="px-1.5 md:px-2.5 py-0.5 md:py-1 text-gray-500 text-xs">
                                +{blog.tags.length - 2}
                            </span>
                        )}
                    </div>
                )}

                <div className="pt-3 md:pt-4 border-t border-gold-400/10 mt-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center min-w-0">
                            {/* <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-gradient-to-br from-gold-400/10 to-gold-500/10 rounded-full flex items-center justify-center mr-2 md:mr-3 flex-shrink-0 border border-gold-400/20">
                                <i className="fas fa-user text-gold-400 text-xs md:text-sm lg:text-base"></i>
                            </div>
                            <div className="min-w-0">
                                <p className="font-medium text-white text-xs md:text-sm lg:text-base truncate">
                                    {blog.author || 'Admin'}
                                </p>
                                <p className="text-xs text-gray-500 hidden md:block">{blog.author || 'Author'}</p>
                            </div> */}
                        </div>

                        <div className="flex items-center space-x-1 md:space-x-2 lg:space-x-3 ml-1 md:ml-2">
                            <button
                                className="flex items-center text-gray-500 hover:text-gold-400 transition-colors cursor-pointer"
                                title={isLoggedIn ? "Views" : "Login to view"}
                            >
                                <Eye size={16} className="mr-1" />
                                <span className="font-medium text-xs md:text-sm">
                                    {blog.views || 0}
                                </span>
                            </button>
                            {/* <button
                                onClick={(e) => handleLike(blog.id, e)}
                                className={`flex items-center transition-colors cursor-pointer ${
                                    activecolorlike.has(blog.id)
                                        ? 'text-red-500'
                                        : 'text-gray-500 hover:text-red-500'
                                }`}
                                title={isLoggedIn ? "Like this article" : "Login to like"}
                            >
                                <Heart
                                    size={16}
                                    className={`mr-1 ${
                                        activecolorlike.has(blog.id) ? "fill-current" : ""
                                    }`}
                                />
                                <span className="font-medium text-xs md:text-sm">
                                    {Countlikes}
                                </span>
                            </button> */}
                            <button
                                onClick={(e) => handleComment(blog.id, blog.title, e)}
                                className={`flex items-center transition-colors cursor-pointer ${
                                    activecolorcomment.has(blog.id)
                                        ? 'text-gold-400'
                                        : 'text-gray-500 hover:text-gold-400'
                                }`}
                                title={isLoggedIn ? "Comment on this article" : "Login to comment"}
                            >
                                <MessageCircle size={16} className="mr-1" />
                                <span className="font-medium text-xs md:text-sm">
                                    {blog.comments || 0}
                                </span>
                            </button>

                            <Link
                                key={blog.id}
                                href={route('blog.show', { id: blog.id, slug: blog.slug })}
                                className="text-gold-400 font-medium text-xs md:text-sm lg:text-base flex items-center hover:text-gold-500 transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <span className="hidden sm:inline">Read Article</span>
                                <span className="sm:hidden">Read</span>
                                <ArrowRight size={14} className="ml-1 md:ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;