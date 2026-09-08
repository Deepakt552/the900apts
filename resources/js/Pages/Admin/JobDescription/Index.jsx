// resources/js/Pages/Admin/JobDescription/Index.jsx

import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
    Plus,
    Edit,
    Trash2,
    Eye,
    Search,
    Calendar,
    Check,
    X,
    Loader2,
    AlertCircle,
    Hash,
    Filter,
    RefreshCw,
} from 'lucide-react';

export default function Index({ jobDescriptions, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [statusFilter, setStatusFilter] = useState(filters?.status || '');
    const [isDeleting, setIsDeleting] = useState(false);

    // Handle search
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('admin.job-descriptions.index'),
            { search, status: statusFilter },
            { preserveState: true, replace: true }
        );
    };

    // Reset filters
    const resetFilters = () => {
        setSearch('');
        setStatusFilter('');
        router.get(
            route('admin.job-descriptions.index'),
            {},
            { preserveState: true, replace: true }
        );
    };

    // Handle delete with SweetAlert2
    const handleDelete = (id, title) => {
        Swal.fire({
            title: 'Delete Job Description?',
            text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDeleting(true);
                router.delete(route('admin.job-descriptions.destroy', id), {
                    onSuccess: () => {
                        toast.success('Deleted Successfully');
                        setIsDeleting(false);
                    },
                    onError: () => {
                        toast.error('Failed to delete');
                        setIsDeleting(false);
                    },
                });
            }
        });
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Truncate text
    const truncateText = (text, length = 50) => {
        if (!text) return '';
        return text.length > length ? text.substring(0, length) + '...' : text;
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Job Descriptions
                    </h1>
                </div>
            }
        >
            <Head title="Job Descriptions · The 900 Residences" />

            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
                            Career Positions Management
                        </h2>
                        <p className="mt-1 text-xs text-[#5a627a] font-medium">
                            Create, update, and publish career openings on the public portal
                        </p>
                    </div>
                    <div>
                        <Link
                            href={route('admin.job-descriptions.create')}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add New Position</span>
                        </Link>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-4 sm:p-5 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                    <form onSubmit={handleSearch} className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8c94a8]" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by title or content..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#d6d8e5] bg-white text-[#1a1f2c] placeholder-[#8c94a8] text-xs sm:text-sm focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#c77950]" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="pl-8 pr-8 py-2.5 rounded-xl border border-[#d6d8e5] bg-white text-[#1a1f2c] text-xs font-bold uppercase tracking-wider focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                            >
                                <option value="">All Status</option>
                                <option value="1">Active</option>
                                <option value="0">Inactive</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                        >
                            Search
                        </button>
                        {(search || statusFilter) && (
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="px-4 py-2.5 bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:text-[#c77950] hover:border-[#c77950] rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-2xs"
                            >
                                <RefreshCw className="w-3.5 h-3.5 text-[#c77950]" />
                                Reset
                            </button>
                        )}
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-xs">
                            <thead className="bg-[#f6f7fa] border-b border-[#e8e9f0]">
                                <tr>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Title & Slug
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Content Preview
                                    </th>
                                    <th className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Status
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
                                {jobDescriptions.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-[#8c94a8]">
                                            <div className="flex flex-col items-center gap-2">
                                                <AlertCircle className="w-10 h-10 text-[#d6d8e5]" />
                                                <p className="text-sm font-bold text-[#1a1f2c]">
                                                    No Job Descriptions Found
                                                </p>
                                                <p className="text-xs text-[#8c94a8]">
                                                    Try adjusting your search or filters
                                                </p>
                                                <Link
                                                    href={route('admin.job-descriptions.create')}
                                                    className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                    Create Position
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    jobDescriptions.data.map((job, index) => (
                                        <tr
                                            key={job.id}
                                            className="hover:bg-[#f6f7fa]/80 transition-colors"
                                        >
                                            <td className="px-5 py-4 whitespace-nowrap text-xs font-bold text-[#8c94a8]">
                                                {jobDescriptions.from + index}
                                            </td>
                                            <td className="px-5 py-4">
                                                <div>
                                                    <div className="text-xs font-bold text-[#1a1f2c]">
                                                        {job.title}
                                                    </div>
                                                    <div className="flex items-center gap-1 text-[10px] text-[#8c94a8] mt-0.5 font-mono">
                                                        <Hash className="w-3 h-3 text-[#c77950]" />
                                                        {job.slug}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div
                                                    className="text-xs text-[#5a627a] line-clamp-2 max-w-sm"
                                                    dangerouslySetInnerHTML={{
                                                        __html: truncateText(job.content.replace(/<[^>]*>/g, ''), 80)
                                                    }}
                                                />
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${job.status
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                            : 'bg-rose-50 text-rose-700 border-rose-200'
                                                        }`}
                                                >
                                                    {job.status ? (
                                                        <>
                                                            <Check className="w-3 h-3" />
                                                            Active
                                                        </>
                                                    ) : (
                                                        <>
                                                            <X className="w-3 h-3" />
                                                            Inactive
                                                        </>
                                                    )}
                                                </span>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5 text-xs text-[#5a627a] font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-[#c77950]" />
                                                    {formatDate(job.created_at)}
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 whitespace-nowrap text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={route('admin.job-descriptions.show', job.id)}
                                                        className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition"
                                                        title="View"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </Link>
                                                    <Link
                                                        href={route('admin.job-descriptions.edit', job.id)}
                                                        className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition"
                                                        title="Edit"
                                                    >
                                                        <Edit className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(job.id, job.title)}
                                                        disabled={isDeleting}
                                                        className="p-2 text-[#8c94a8] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition disabled:opacity-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {jobDescriptions.data.length > 0 && (
                        <div className="px-5 py-4 border-t border-[#e8e9f0] bg-[#fafbfe]">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                <p className="text-xs text-[#5a627a]">
                                    Showing {jobDescriptions.from} to {jobDescriptions.to} of {jobDescriptions.total} results
                                </p>
                                <div className="flex gap-1.5 flex-wrap justify-center">
                                    {jobDescriptions.links && jobDescriptions.links.map((link, index) => (
                                        <button
                                            key={index}
                                            onClick={() => {
                                                if (link.url && !link.active) {
                                                    router.get(link.url, {}, { preserveState: true });
                                                }
                                            }}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${link.active
                                                    ? 'bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-xs'
                                                    : 'bg-white text-[#1a1f2c] border border-[#d6d8e5] hover:border-[#c77950] hover:text-[#c77950]'
                                                } ${!link.url ? 'opacity-40 cursor-not-allowed' : ''}`}
                                            disabled={!link.url}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}