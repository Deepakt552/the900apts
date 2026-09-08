import React from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft } from 'lucide-react';
import {
    Clock,
    Calendar,
    User,
    Eye,
    Heart,
    MessageCircle,
    ArrowRight,
} from "lucide-react";

export default function BlogShow({ blog, category, related, likes, comments, views }) {
    // Parse tags from JSON string
    const tags = typeof blog.tags === 'string' ? JSON.parse(blog.tags) : blog.tags || [];

    // Handle null/empty author data
    const authorName = blog.author_name && blog.author_name !== "No" ? blog.author_name : "Anonymous";
    const authorBio = blog.author_bio || "No biography available";

    // Ensure banner image has full URL
    const bannerImage = blog.banner_image?.startsWith('http')
        ? blog.banner_image
        : `/storage/${blog.banner_image}`;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Article Preview
                    </h1>
                </div>
            }
        >
            <Head title={`${blog.title} · The 900 Residences`} />

            <div className="w-full space-y-6">
                {/* Back button and actions */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => window.history.back()}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:text-[#c77950] hover:border-[#c77950] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs group"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#c77950] group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back to Articles</span>
                    </button>

                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${blog.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                        {blog.status}
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 w-full">
                    {/* Left Column - Blog Content */}
                    <div className="lg:w-2/3 space-y-6">
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden border border-[#d6d8e5]">
                            {/* Banner */}
                            <div className="relative h-64 sm:h-80 md:h-96">
                                <img
                                    src={bannerImage}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-8">
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        <span className="px-3.5 py-1 bg-[#c77950] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                                            {category?.category_name || "Residence Life"}
                                        </span>
                                    </div>
                                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-cormorant font-bold text-white leading-tight mb-3">
                                        {blog.title}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-4 text-xs text-white/80">
                                        <div className="flex items-center gap-1.5">
                                            <User className="w-3.5 h-3.5 text-[#c77950]" />
                                            <span>{authorName}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Calendar className="w-3.5 h-3.5 text-[#c77950]" />
                                            <span>{blog.formatted_date ?? "-"}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3.5 h-3.5 text-[#c77950]" />
                                            <span>{blog.time_ago || '5 min read'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Blog Content */}
                            <div className="p-6 sm:p-8 space-y-6">
                                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-[#5a627a] border border-[#d6d8e5]">
                                            <Eye className="w-3.5 h-3.5 text-[#c77950]" />
                                            <span>{views || 0} views</span>
                                        </span>
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-[#5a627a] border border-[#d6d8e5]">
                                            <MessageCircle className="w-3.5 h-3.5 text-[#c77950]" />
                                            <span>{comments || 0} comments</span>
                                        </span>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <article className="prose prose-sm sm:prose-base max-w-none text-[#1a1f2c]">
                                    {blog.summary && (
                                        <p className="lead text-base sm:text-lg font-medium text-[#5a627a] italic border-l-2 border-[#c77950] pl-4 my-4">
                                            {blog.summary}
                                        </p>
                                    )}
                                    <div
                                        className="text-[#1a1f2c] leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: blog.content || 'No content available' }}
                                    />
                                    {tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[#e8e9f0]">
                                            {tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-[#f6f7fa] border border-[#d6d8e5] text-[#5a627a] text-xs font-bold uppercase tracking-wider rounded-xl hover:border-[#c77950] hover:text-[#c77950] transition-colors"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </article>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:w-1/3 space-y-6">
                        <div className="sticky top-6 space-y-6">
                            {/* Author Card */}
                            <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                                <div className="text-center">
                                    <img
                                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${authorName}`}
                                        alt={authorName}
                                        className="w-20 h-20 rounded-2xl mx-auto mb-3 border-2 border-[#c77950]/30 shadow-md bg-[#f6f7fa]"
                                    />
                                    <h3 className="font-cormorant font-bold text-[#1a1f2c] text-xl">{authorName}</h3>
                                    <p className="text-xs text-[#8c94a8] font-bold uppercase tracking-wider mt-0.5">{blog.author_title || "Residence Editorial"}</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-[#e8e9f0]">
                                    <h4 className="text-xs font-bold text-[#5a627a] uppercase tracking-wider mb-1.5">About the Author</h4>
                                    <p className="text-xs text-[#5a627a] leading-relaxed">{authorBio}</p>
                                </div>
                            </div>

                            {/* Related Articles */}
                            {related && related.length > 0 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                                    <h3 className="font-cormorant font-bold text-[#1a1f2c] text-lg mb-4 pb-2 border-b border-[#e8e9f0]">Related Articles</h3>
                                    <div className="space-y-4">
                                        {related.map(item => {
                                            const relatedImage = item.banner_image?.startsWith('http')
                                                ? item.banner_image
                                                : `/storage/${item.banner_image}`;

                                            return (
                                                <a
                                                    key={item.id}
                                                    href={`/blogs/${item.id}/show/${item.slug}`}
                                                    className="group flex items-center gap-3 hover:no-underline"
                                                >
                                                    <div className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-[#d6d8e5]">
                                                        <img
                                                            src={relatedImage}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-[#1a1f2c] text-xs group-hover:text-[#c77950] line-clamp-2 transition-colors">
                                                            {item.title}
                                                        </h4>
                                                        <p className="text-[10px] text-[#8c94a8] mt-1 font-medium">
                                                            {item.formatted_date}
                                                        </p>
                                                    </div>
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}