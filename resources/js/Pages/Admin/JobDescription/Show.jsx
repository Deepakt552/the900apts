// resources/js/Pages/Admin/JobDescription/Show.jsx

import React from 'react';
import { Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Calendar,
    User,
    Check,
    X,
    Eye,
    Clock,
    FileText,
    Image as ImageIcon,
    Tag,
    Hash,
    AlertCircle,
    Copy,
    CheckCircle,
} from 'lucide-react';

export default function Show({ jobDescription }) {
    const [copied, setCopied] = React.useState(false);

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleDelete = () => {
        Swal.fire({
            title: 'Delete Job Description?',
            text: `Are you sure you want to delete "${jobDescription.title}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('admin.job-descriptions.destroy', jobDescription.id), {
                    onSuccess: () => {
                        toast.success('Deleted Successfully');
                        router.visit(route('admin.job-descriptions.index'));
                    },
                    onError: () => {
                        toast.error('Failed to delete');
                    },
                });
            }
        });
    };

    const copySlug = () => {
        navigator.clipboard.writeText(jobDescription.slug);
        setCopied(true);
        toast.success('Slug copied to clipboard!');
        setTimeout(() => setCopied(false), 3000);
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Position Details
                    </h1>
                </div>
            }
        >
            <div className="w-full space-y-6">
                {/* Header Actions Card */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-4">
                            <Link
                                href={route('admin.job-descriptions.index')}
                                className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition border border-[#d6d8e5]"
                            >
                                <ArrowLeft className="w-5 h-5 text-[#c77950]" />
                            </Link>
                            <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950]">
                                    ✦ POSITION SPECIFICATION ✦
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c] mt-0.5">
                                    {jobDescription.title}
                                </h1>
                                <div className="flex flex-wrap items-center gap-2.5 mt-1.5 text-xs text-[#5a627a]">
                                    <span className="flex items-center gap-1 font-mono">
                                        <Hash className="w-3.5 h-3.5 text-[#c77950]" />
                                        <span>{jobDescription.slug}</span>
                                        <button
                                            onClick={copySlug}
                                            className="p-1 hover:bg-[#f6f7fa] rounded-lg transition"
                                            title="Copy slug"
                                        >
                                            {copied ? (
                                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                            ) : (
                                                <Copy className="w-3 h-3 text-[#8c94a8]" />
                                            )}
                                        </button>
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#d6d8e5]" />
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${jobDescription.status
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                            : 'bg-rose-50 text-rose-700 border-rose-200'
                                        }`}>
                                        {jobDescription.status ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-[#d6d8e5]" />
                                    <span className="text-[10px] font-bold text-[#8c94a8]">
                                        ID: #{jobDescription.id}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Link
                                href={route('admin.job-descriptions.edit', jobDescription.id)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs transition-all"
                            >
                                <Edit className="w-4 h-4" />
                                <span>Edit</span>
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#d6d8e5] text-rose-600 hover:bg-rose-50 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Meta Information Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#c77950]/10 text-[#c77950] rounded-xl border border-[#c77950]/20">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Created By</p>
                                <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                    {jobDescription.created_by?.name || 'Admin'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#c77950]/10 text-[#c77950] rounded-xl border border-[#c77950]/20">
                                <User className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Updated By</p>
                                <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                    {jobDescription.updated_by?.name || 'Admin'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#c77950]/10 text-[#c77950] rounded-xl border border-[#c77950]/20">
                                <Calendar className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Created Date</p>
                                <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                    {formatDate(jobDescription.created_at)}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-[#c77950]/10 text-[#c77950] rounded-xl border border-[#c77950]/20">
                                <Clock className="w-4 h-4" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">Last Updated</p>
                                <p className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                    {formatDate(jobDescription.updated_at)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Preview Container */}
                <div className="bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                    <div className="border-b border-[#e8e9f0] px-6 py-4 flex items-center justify-between">
                        <h2 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#c77950]" />
                            <span>Position Document Content</span>
                        </h2>
                    </div>

                    <iframe
                        title="Job Description"
                        className="w-full border-0 min-h-[650px] bg-white"
                        srcDoc={`
                            <!DOCTYPE html>
                            <html>
                            <head>
                                <style>
                                    body{
                                        margin: 28px;
                                        font-family: Arial, Helvetica, sans-serif;
                                        line-height: 1.7;
                                        color: #1a1f2c;
                                    }
                                </style>
                            </head>
                            <body>
                                ${jobDescription.content}
                            </body>
                            </html>
                        `}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}