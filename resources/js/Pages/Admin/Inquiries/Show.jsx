import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import {
    ArrowLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Clock,
    MessageSquare,
    User,
    CheckCircle,
    Trash2,
} from "lucide-react";

export default function InquiryShow({ inquiry }) {
    const [isLoading, setIsLoading] = useState(false);

    const fullName = `${inquiry.first_name} ${inquiry.last_name}`;
    const formattedDate = new Date(inquiry.created_at).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    const getStatusBadge = (status) => {
        const isUnread = status === "unread";
        return {
            bg: isUnread ? "bg-red-100 dark:bg-red-900/40" : "bg-green-100 dark:bg-green-900/40",
            text: isUnread ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300",
            icon: isUnread ? Clock : CheckCircle,
            label: isUnread ? "Unread" : "Read",
            border: isUnread ? "border-red-200 dark:border-red-800" : "border-green-200 dark:border-green-800",
        };
    };

    const statusInfo = getStatusBadge(inquiry.status);
    const StatusIcon = statusInfo.icon;

    const handleDelete = () => {
        Swal.fire({
            title: "Delete Inquiry?",
            html: `Are you sure you want to delete <strong>${fullName}</strong>'s inquiry?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                router.delete(`/contact/inquiries/${inquiry.id}`, {
                    preserveScroll: true,
                    onSuccess: () => {
                        setIsLoading(false);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Inquiry has been deleted.",
                            icon: "success",
                            timer: 2000,
                            showConfirmButton: false,
                        });
                        router.get("/contact/inquiries");
                    },
                    onError: () => {
                        setIsLoading(false);
                        Swal.fire({
                            title: "Error!",
                            text: "Failed to delete inquiry.",
                            icon: "error",
                        });
                    },
                });
            }
        });
    };

    const handleStatusToggle = () => {
        const newStatus = inquiry.status === "unread" ? "read" : "unread";
        setIsLoading(true);
        router.put(
            `/contact/inquiries/${inquiry.id}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    Swal.fire({
                        title: "Status Updated",
                        text: `Inquiry marked as ${newStatus}.`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
                onError: () => {
                    setIsLoading(false);
                    Swal.fire({
                        title: "Error",
                        text: "Failed to update inquiry status.",
                        icon: "error",
                    });
                },
            }
        );
    };

    const handleBack = () => {
        router.get("/contact/inquiries");
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Inquiry Details
                    </h1>
                </div>
            }
        >
            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all bg-white hover:bg-[#fafbfe] text-[#1a1f2c] border border-[#d6d8e5] hover:border-[#c77950] shadow-2xs"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#c77950]" />
                        <span>Back to Inquiries</span>
                    </button>
                    <button
                        onClick={handleDelete}
                        disabled={isLoading}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs disabled:opacity-50"
                    >
                        <Trash2 className="w-4 h-4" />
                        <span>Delete Inquiry</span>
                    </button>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Status Hero Card */}
                        <div className="relative rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 sm:p-7 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-[2px] text-[#c77950]">
                                        ✦ RESIDENT PROSPECT ✦
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c] mt-1">
                                        {fullName}
                                    </h2>
                                    <div className="mt-1 text-xs text-[#5a627a] font-medium">
                                        Submitted {formattedDate}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleStatusToggle}
                                        disabled={isLoading}
                                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border ${
                                            inquiry.status === "unread"
                                                ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                                                : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
                                        }`}
                                    >
                                        <StatusIcon className="w-3.5 h-3.5" />
                                        <span>{statusInfo.label}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Card */}
                        <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                            <h3 className="text-base font-bold text-[#1a1f2c] mb-4 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                                <Mail className="w-4 h-4 text-[#c77950]" />
                                <span>Contact Details</span>
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-3.5 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                        Email Address
                                    </div>
                                    <div className="text-xs font-bold text-[#1a1f2c] mt-1">
                                        <a href={`mailto:${inquiry.email}`} className="text-[#c77950] hover:underline">
                                            {inquiry.email}
                                        </a>
                                    </div>
                                </div>
                                <div className="p-3.5 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                        Phone Number
                                    </div>
                                    <div className="text-xs font-bold text-[#1a1f2c] mt-1">
                                        {inquiry.phone ? (
                                            <a href={`tel:${inquiry.phone}`} className="text-[#c77950] hover:underline">
                                                {inquiry.phone}
                                            </a>
                                        ) : (
                                            "Not provided"
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Information Card */}
                        {(inquiry.address || inquiry.city || inquiry.state || inquiry.zip) && (
                            <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                                <h3 className="text-base font-bold text-[#1a1f2c] mb-4 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                                    <MapPin className="w-4 h-4 text-[#c77950]" />
                                    <span>Address Information</span>
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2 p-3.5 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                            Street Address
                                        </div>
                                        <div className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                            {inquiry.address || "Not provided"}
                                        </div>
                                    </div>
                                    <div className="p-3.5 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                            City & State
                                        </div>
                                        <div className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                            {inquiry.city || "—"}, {inquiry.state || "—"}
                                        </div>
                                    </div>
                                    <div className="p-3.5 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]">
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                            ZIP Code
                                        </div>
                                        <div className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                            {inquiry.zip || "Not provided"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Message & Metadata */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Message Card */}
                        <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                            <h3 className="text-base font-bold text-[#1a1f2c] mb-3 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                                <MessageSquare className="w-4 h-4 text-[#c77950]" />
                                <span>Message Body</span>
                            </h3>
                            <div className="p-4 rounded-2xl bg-[#f6f7fa] border border-[#e8e9f0] min-h-[160px]">
                                <p className="text-xs text-[#1a1f2c] whitespace-pre-wrap leading-relaxed">
                                    {inquiry.message || "No message provided"}
                                </p>
                            </div>
                        </div>

                        {/* Metadata Card */}
                        <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-6 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                            <h3 className="text-base font-bold text-[#1a1f2c] mb-3 flex items-center gap-2 border-b border-[#e8e9f0] pb-3">
                                <Calendar className="w-4 h-4 text-[#c77950]" />
                                <span>Inquiry Details</span>
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs py-1 border-b border-[#e8e9f0]">
                                    <span className="text-[#8c94a8]">Inquiry ID</span>
                                    <span className="font-bold text-[#1a1f2c]">#{inquiry.id}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs py-1 border-b border-[#e8e9f0]">
                                    <span className="text-[#8c94a8]">Submission Date</span>
                                    <span className="font-bold text-[#1a1f2c]">{formattedDate}</span>
                                </div>
                                {inquiry.source && (
                                    <div className="flex justify-between items-center text-xs py-1 border-b border-[#e8e9f0]">
                                        <span className="text-[#8c94a8]">Lead Source</span>
                                        <span className="font-bold text-[#c77950]">{inquiry.source}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}