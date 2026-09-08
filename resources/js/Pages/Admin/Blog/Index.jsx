import React from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    Search,
    ChevronLeft,
    ChevronRight,
    Plus,
    Eye,
    Edit,
    Trash2,
    Filter,
    MoreVertical, ChartColumn, X
} from 'lucide-react';
import { useState } from "react";
import Swal from 'sweetalert2';

const BlogIndex = ({ blogs, categories = [], filters = {} }) => {
    const [analyticsModal, setAnalyticsModal] = useState({
        open: false,
        blogId: null,
    });
    const blogList = blogs?.data || [];
    const { props } = usePage();
    const flash = props.flash || {};
    console.log(blogList);
    const pagination = {
        total: blogs?.total || 0,
        per_page: blogs?.per_page || 10,
        current_page: blogs?.current_page || 1,
        last_page: blogs?.last_page || 1,
        from: blogs?.from || 0,
        to: blogs?.to || 0,
    };

    const { data, setData, get, delete: destroy } = useForm({
        search: filters.search || '',
    });

    const submitSearch = (e) => {
        e.preventDefault();
        get(route('admin.blogs.index'), {
            preserveState: true,
            replace: true,
        });
    };

    const changePage = (page) => {
        get(route('admin.blogs.index', {
            search: data.search,
            page
        }), {
            preserveState: true,
            replace: true,
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route('admin.blog.destroy', id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        if (flash.success) {

                            Swal.fire({
                                title: "Deleted!",
                                text: flash.success,
                                icon: "success"
                            });
                            // alert(flash.success);
                        }
                    },
                    onError: () => {
                        alert('Error deleting blog post');
                    }
                });
            }
        });
        // if (confirm('Are you sure you want to delete this blog post?')) {
        //     destroy(route('admin.blog.destroy', id), {
        //         preserveScroll: true,
        //         onSuccess: () => {
        //             if (flash.success) {
        //                 alert(flash.success);
        //             }
        //         },
        //         onError: () => {
        //             alert('Error deleting blog post');
        //         }
        //     });
        // }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Blog Posts
                    </h1>
                </div>
            }
        >
            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
                            Article Management
                        </h2>
                        <p className="text-xs text-[#5a627a] font-medium mt-1">
                            Total <strong className="text-[#c77950] font-bold">{pagination.total}</strong> articles published and drafted
                        </p>
                    </div>

                    <Link
                        href={route('createPost')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                        <Plus className="w-4 h-4" />
                        <span>Write New Article</span>
                    </Link>
                </div>

                {/* Search and Filter */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-4 sm:p-5 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                    <form onSubmit={submitSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8c94a8]" />
                            <input
                                type="text"
                                value={data.search}
                                onChange={(e) => setData('search', e.target.value)}
                                placeholder="Search articles by title or keyword..."
                                className="w-full pl-10 pr-4 py-2.5 border border-[#d6d8e5] bg-white text-[#1a1f2c] placeholder-[#8c94a8] rounded-xl text-xs sm:text-sm focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] focus:outline-none transition-all shadow-2xs"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Desktop Table */}
                <div className="hidden md:block bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden border border-[#d6d8e5]">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full divide-y divide-[#e8e9f0]">
                            <thead className="bg-[#f6f7fa]">
                                <tr>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Cover
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Article Title
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Published Date
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Created Date
                                    </th>
                                    <th className="px-5 py-3.5 text-right text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-[#e8e9f0]">
                                {blogList.length ? blogList.map((blog, index) => (
                                    <tr key={blog.id} className="hover:bg-[#f6f7fa]/80 transition-colors">
                                        <td className="px-5 py-4 text-xs font-bold text-[#8c94a8]">
                                            {pagination.from + index}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center">
                                                <img
                                                    src={`/storage/${blog.banner_image}`}
                                                    alt={blog.title}
                                                    className="w-12 h-12 object-cover rounded-xl border border-[#d6d8e5] shadow-2xs"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="text-xs font-bold text-[#1a1f2c] line-clamp-1 max-w-xs">
                                                {blog.title}
                                            </div>
                                        </td>

                                        <td className="px-5 py-4">
                                            <span
                                                className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
                                                ${blog.status === "published"
                                                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                                        : blog.status === "draft"
                                                            ? "bg-gray-100 text-gray-700 border-gray-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    }`}
                                            >
                                                {blog.status}
                                            </span>
                                        </td>

                                        <td className="px-5 py-4 text-xs text-[#5a627a]">
                                            {blog.publish_date
                                                ? (
                                                    <div>{blog.publish_date.split(" ")[0]}</div>
                                                )
                                                : <span className="text-[#8c94a8] font-medium">Unpublished</span>
                                            }
                                        </td>

                                        <td className="px-5 py-4 text-xs text-[#5a627a]">
                                            {blog.created_at && (
                                                <div>{blog.created_at.split(" ")[0]}</div>
                                            )}
                                        </td>

                                        <td className="px-5 py-4 text-right">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <Link
                                                    href={route('admin.blog.show', { id: blog.id, slug: blog.slug })}
                                                    className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition-colors"
                                                    title="View"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>

                                                <Link
                                                    href={route('admin.blog.edit', blog.id)}
                                                    className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>

                                                <button
                                                    onClick={() => handleDelete(blog.id)}
                                                    className="p-2 text-[#8c94a8] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setAnalyticsModal({
                                                            open: true,
                                                            blogId: blog.id,
                                                            blogTitle: blog.title,
                                                        })
                                                    }
                                                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl transition-colors"
                                                    title="Analytics"
                                                >
                                                    <ChartColumn className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-[#8c94a8]">
                                            <div className="text-[#8c94a8]">
                                                <Search className="w-10 h-10 mx-auto mb-2 text-[#d6d8e5]" />
                                                <p className="text-sm font-bold text-[#1a1f2c]">No blog posts found</p>
                                                <p className="text-xs mt-1">Try adjusting your search criteria</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-4">
                    {blogList.length ? blogList.map((blog, index) => (
                        <div key={blog.id} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            #{pagination.from + index}
                                        </span>
                                        <span className={`text-xs px-2 py-1 rounded-full ${blog.status === 'published' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'}`}>
                                            {blog.status}
                                        </span>{blog.publish_date
                                            ? (
                                                <>
                                                    <div>{blog.publish_date.split(" ")[0]}</div>
                                                    <div className="text-xs text-gray-400 dark:text-gray-500">
                                                        {blog.publish_date.split(" ")[1]}
                                                    </div>
                                                </>
                                            )
                                            : <span className="text-red-500 dark:text-red-400 font-medium">Not Published</span>
                                        }
                                    </div>
                                    <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-2">
                                        {blog.title}
                                    </h3>
                                </div>
                                <div className="relative">
                                    <button className="p-1">
                                        <MoreVertical className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <div className="flex items-center gap-1">
                                    <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-xs">
                                        {blog.category_name}
                                    </span>
                                </div>
                                <div className="text-xs">
                                    <div className="flex items-center">
                                        <img
                                            src={`/storage/${blog.banner_image}`}
                                            alt={blog.title}
                                            className="w-[60px] h-[60px] object-cover rounded-md border border-gray-200 dark:border-gray-700"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-gray-700">
                                <div className="flex space-x-3">
                                    <Link
                                        href={route('admin.blog.show', blog.id)}
                                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 text-sm font-medium"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        href={route('admin.blog.edit', blog.id)}
                                        className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 text-sm font-medium"
                                    >
                                        Edit
                                    </Link>
                                </div>
                                <div className="">
                                    <button
                                        onClick={() => handleDelete(blog.id)}
                                        className="text-red-600 hover:text-red-800 dark:text-red-400 text-sm font-medium"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() =>
                                            setAnalyticsModal({
                                                open: true,
                                                blogId: blog.id,
                                                blogTitle: blog.title,
                                            })
                                        }
                                        className="text-emerald-600 hover:text-emerald-800 ml-2"
                                        title="Analytics"
                                    >
                                        {/* <ChartColumn className="w-4 h-4" />  */}
                                        Anaylsis
                                    </button>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-8 text-center">
                            <Search className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                            <p className="text-gray-700 dark:text-gray-300 font-medium">No blog posts found</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Try adjusting your search</p>
                            <Link
                                href={route('createPost')}
                                className="mt-4 inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
                            >
                                Create New Post
                            </Link>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination.last_page > 1 && (
                    <div className="bg-white rounded-2xl border border-[#d6d8e5] p-4 shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div className="text-xs text-[#5a627a]">
                                Showing <span className="font-bold text-[#1a1f2c]">{pagination.from}</span> to <span className="font-bold text-[#1a1f2c]">{pagination.to}</span> of{' '}
                                <span className="font-bold text-[#1a1f2c]">{pagination.total}</span> results
                            </div>

                            <div className="flex items-center justify-center gap-1.5">
                                <button
                                    disabled={pagination.current_page === 1}
                                    onClick={() => changePage(pagination.current_page - 1)}
                                    className="p-2 border rounded-xl border-[#d6d8e5] bg-white text-[#1a1f2c] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#c77950] hover:text-[#c77950] transition-all shadow-2xs"
                                    title="Previous"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {Array.from({ length: Math.min(5, pagination.last_page) }, (_, i) => {
                                    let page;
                                    if (pagination.last_page <= 5) {
                                        page = i + 1;
                                    } else if (pagination.current_page <= 3) {
                                        page = i + 1;
                                    } else if (pagination.current_page >= pagination.last_page - 2) {
                                        page = pagination.last_page - 4 + i;
                                    } else {
                                        page = pagination.current_page - 2 + i;
                                    }

                                    return (
                                        <button
                                            key={page}
                                            onClick={() => changePage(page)}
                                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${page === pagination.current_page
                                                ? 'bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-xs'
                                                : 'bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950]'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    );
                                })}

                                <button
                                    disabled={pagination.current_page === pagination.last_page}
                                    onClick={() => changePage(pagination.current_page + 1)}
                                    className="p-2 border rounded-xl border-[#d6d8e5] bg-white text-[#1a1f2c] disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#c77950] hover:text-[#c77950] transition-all shadow-2xs"
                                    title="Next"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {analyticsModal.open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-[90vh] relative overflow-hidden border border-[#d6d8e5]">
                            <div className="flex items-center justify-between border-b border-[#e8e9f0] px-6 py-4 bg-[#f6f7fa]">
                                <h2 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                                    <ChartColumn className="w-4 h-4 text-[#c77950]" />
                                    <span>Article Analytics · {analyticsModal.blogTitle}</span>
                                </h2>

                                <button
                                    onClick={() =>
                                        setAnalyticsModal({
                                            open: false,
                                            blogId: null,
                                        })
                                    }
                                    className="p-1.5 rounded-xl hover:bg-[#e8e9f0] text-[#5a627a] transition"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <iframe
                                title="Blog Analytics"
                                src={`/admin/single-blog-analytics/${analyticsModal.blogId}`}
                                className="w-full h-[calc(90vh-60px)]"
                            />
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
};

export default BlogIndex;