import React, { useState, useEffect } from "react";
import { Link, router, usePage, Head } from "@inertiajs/react";
// import Layout from '@/Layouts/Layout';
import APP_CONFIG from "./config";
import { ArrowLeft } from "lucide-react";
import CommentBox from "../Components/Blog/Comment";
import { LoginPromptModal } from "./blog";
import {
    Clock,
    Calendar,
    User,
    Eye,
    Heart,
    MessageCircle,
    ArrowRight,
} from "lucide-react";

import Navbar from "../Layouts/NavBar";
import Footer from "../Layouts/Footer";

export default function BlogShow({
    blog,
    category,
    related,
    likes,
    comments,
    views,
}) {
    const { props } = usePage();
    const { auth } = props;
    const isLoggedIn = auth?.user ? true : false;

    console.log(blog);
    // Parse tags from JSON string
    const tags =
        typeof blog.tags === "string" ? JSON.parse(blog.tags) : blog.tags || [];

    // Handle null/empty author data
    const authorName =
        blog.author_name && blog.author_name !== "No"
            ? blog.author_name
            : "Anonymous";
    const authorBio = blog.author_bio || "No biography available";

    // Ensure banner image has full URL
    const bannerImage = blog.banner_image?.startsWith("http")
        ? blog.banner_image
        : `/storage/${blog.banner_image}`;

    const [showLoginModal, setShowLoginModal] = useState(false);
    const [Countlikes, setCountlikes] = useState(likes ?? 0);
    const [likedBlogs, setLikedBlogs] = useState(() => {
        return new Set();
    });
    const [activecolorlike, setActivecolorlike] = useState(() => {
        return blog.is_like == 1 ? new Set([blog.id]) : new Set();
    });
    const [activecolorcomment, setActiveColorComment] = useState(() => {
        return blog.is_comment == 1 ? new Set([blog.id]) : new Set();
    });
    const showLoginAlert = () => {
        setShowLoginModal(true);
    };
    const handleLikeClick = async (blogId, e) => {
        if (!isLoggedIn) {
            showLoginAlert();
            return;
        }

        try {
            const csrfToken = document
                .querySelector('meta[name="csrf-token"]')
                .getAttribute("content");

            const newLikedBlogs = new Set(likedBlogs);
            const activecolorlikeblog = new Set(activecolorlike);
            if (newLikedBlogs.has(blogId) || activecolorlike.has(blogId)) {
                newLikedBlogs.delete(blogId);
                activecolorlikeblog.delete(blogId);
                setCountlikes(Countlikes - 1);
                await fetch("/blog/like", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({ post_id: blogId, like: "0" }),
                });
            } else {
                newLikedBlogs.add(blogId);
                activecolorlikeblog.add(blogId);
                setCountlikes(Countlikes + 1);
                await fetch("/blog/like", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify({ post_id: blogId, like: "1" }),
                });
            }
            setLikedBlogs(newLikedBlogs);
            setActivecolorlike(activecolorlikeblog);
        } catch (err) {
            console.error("Failed to update like", err);
        }
    };
    const handleCommentClick = () => {
        if (!isLoggedIn) {
            showLoginAlert();
            return;
        }

        // Scroll to comment box
        const commentBox = document.getElementById("comment-box");
        if (commentBox) {
            commentBox.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    };

    // Handle login redirect
    const handleLoginRedirect = () => {
        router.get(route("login"));
    };

    return (
        <>
            <Navbar />
            <Head>
                <title>{blog.seo_title}</title>
                <meta name="description" content={blog.seo_description} />
                <meta name="keywords" content={blog.seo_keywords} />
            </Head>

            <section className="relative w-full h-[520px] flex md:items-start items-start md:py-0 py-10 overflow-hidden">
                {/* Background image with overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        // src="/herohalf.png"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/blogHero.png)`,
                        }}
                        alt="Modern skyscrapers"
                        className="hidden md:block w-full h-full object-cover object-cover"
                    />
                    <img
                        // src="/heroMobileView.png".
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/blogHero.png)`,
                        }}
                        alt="Modern skyscrapers"
                        className="block md:hidden w-full h-full object-cover object-cover"
                    />

                    <div className="absolute inset-0 bg-dark-500 bg-opacity-60"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-6 lg:px-2 relative z-10 text-white">
                    <div className="w-full md:w-1/2 h-full flex items-center">
                        <div className="max-w-xl mx-auto px-6 md:px-10 py-20 text-white">
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight">
                                INSIGHTS &
                                <span className="text-gold-400"> ANALYSIS</span>
                            </h1>
                            <p className="text-gray-300 text-lg md:text-xl max-w-md leading-relaxed mt-10">
                                Expert insights, market analysis, and industry
                                trends from our team of real estate
                                professionals.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-dark-600">
                <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20">
                    <Link
                        href="/blog"
                        className="flex items-center text-gray-400 hover:text-gold-400 transition-colors group mb-6"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        Back to Blog
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto p-4 md:p-8">
                    {/* Left Column - Blog Content */}
                    <div className="lg:w-2/3">
                        <div className="bg-dark-50 rounded-2xl shadow-2xl overflow-hidden border border-gold-400/20">
                            {/* Banner */}
                            <div className="relative h-64 md:h-96">
                                <img
                                    src={bannerImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-dark-500/80 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8">
                                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                        {blog.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-white/90">
                                        <div className="flex items-center">
                                            <img
                                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                                                alt={authorName}
                                                className="w-8 h-8 rounded-full mr-2 border-2 border-gold-400/30"
                                            />
                                            <span>{authorName}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4 mr-1 text-gold-400"
                                            >
                                                <rect
                                                    width="18"
                                                    height="18"
                                                    x="3"
                                                    y="4"
                                                    rx="2"
                                                ></rect>
                                                <path d="M3 10h18"></path>
                                            </svg>
                                            <span>{blog.formatted_date}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="w-4 h-4 mr-1 text-gold-400"
                                            >
                                                <path d="M12 6v6l4 2"></path>
                                                <circle
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                ></circle>
                                            </svg>
                                            <span>
                                                {blog.time_ago || "5 min"} read
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-8">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 bg-dark-200 rounded-xl border border-gold-400/10">
                                    {/* Buttons */}
                                    <div className="flex items-center space-x-4">
                                        <button className="flex items-center px-4 py-2 rounded-lg transition-colors bg-dark-50 text-gray-300 hover:bg-dark-100 hover:text-gold-400 border border-gold-400/10">
                                            <Eye size={16} className="mr-1" />{" "}
                                            {views || 0}
                                        </button>
                                        {/* <button
                                            onClick={(e) =>
                                                handleLikeClick(blog.id, e)
                                            }
                                            className={`flex items-center px-4 py-2 rounded-lg transition-colors bg-dark-50 border border-gold-400/10 ${
                                                activecolorlike.has(blog.id)
                                                    ? "text-red-500 hover:text-red-600"
                                                    : "text-gray-300 hover:text-gold-400"
                                            }`}
                                        >
                                            <Heart
                                                size={16}
                                                className={`mr-1 ${activecolorlike.has(blog.id) ? "fill-current" : ""}`}
                                            />
                                            {Countlikes}
                                        </button> */}
                                        <button
                                            onClick={handleCommentClick}
                                            className={`flex items-center px-4 py-2 bg-dark-50 border border-gold-400/10 rounded-lg transition-colors ${
                                                activecolorcomment.has(blog.id)
                                                    ? "text-gold-400 hover:text-gold-500"
                                                    : "text-gray-300 hover:text-gold-400"
                                            }`}
                                        >
                                            <MessageCircle
                                                size={16}
                                                className="mr-1"
                                            />{" "}
                                            {comments || 0}
                                        </button>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <article className="prose prose-lg max-w-none prose-invert">
                                    <p className="lead text-3xl text-gray-300 mb-8">
                                        {blog.summary || blog.excerpt}
                                    </p>
                                    <div
                                        className="mb-8 text-gray-300"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                blog.content ||
                                                "No content available",
                                        }}
                                    />
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gold-400/10">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-4 py-2 bg-dark-200 text-gray-300 font-medium rounded-full hover:bg-dark-100 hover:text-gold-400 transition-colors cursor-pointer border border-gold-400/10"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </article>
                                <div id="comment-box" className="mt-8">
                                    <CommentBox postId={blog.id} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:w-1/3 space-y-8">
                        {/* Author Card - Fixed Position */}
                        <div className="sticky top-8 space-y-8">
                            {/* Related Articles */}
                            {related && related.length > 0 && (
                                <div className="bg-dark-50 border border-gold-400/20 rounded-2xl p-6 shadow-sm">
                                    <h3 className="font-bold text-gold-400 text-lg mb-6 pb-2 border-b border-gold-400/10">
                                        Related Articles
                                    </h3>
                                    <div className="space-y-6">
                                        {related.map((item) => {
                                            const relatedImage =
                                                item.banner_image?.startsWith(
                                                    "http",
                                                )
                                                    ? item.banner_image
                                                    : `/storage/${item.banner_image}`;

                                            return (
                                                <a
                                                    key={item.id}
                                                    href={`/blog/${item.id}/showDetail/${item.slug}`}
                                                    className="group flex items-start space-x-4 hover:no-underline"
                                                >
                                                    <div className="flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-gold-400/20">
                                                        <img
                                                            src={relatedImage}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-white text-sm group-hover:text-gold-400 line-clamp-2 mb-1">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-400">
                                                            {item.formatted_date ??
                                                                "-"}
                                                        </p>
                                                        <div className="flex items-center mt-1">
                                                            <span className="text-xs text-gold-400 font-medium group-hover:text-gold-500">
                                                                Read more →
                                                            </span>
                                                        </div>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Author */}
                            <div className="bg-gradient-to-br from-gold-400/10 to-dark-50 rounded-2xl p-6 border border-gold-400/20">
                                <div className="text-center">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                                        alt={authorName}
                                        className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gold-400/30 shadow-lg shadow-gold-400/10"
                                    />
                                    <h3 className="font-bold text-white text-xl mb-2">
                                        {authorName}
                                    </h3>
                                    <p className="text-gold-400 text-sm mb-4 font-medium">
                                        {blog.author_title || "Blog Author"}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gold-400/10">
                                    <h4 className="font-semibold text-gray-300 mb-2">
                                        About the Author
                                    </h4>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {authorBio}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LoginPromptModal
                isOpen={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLoginRedirect}
            />
            <Footer />
        </>
    );
}
