import React, { useState } from "react";
import { router } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Swal from "sweetalert2";
import {
    Search,
    Eye,
    Trash2,
    Mail,
    Phone,
    Calendar,
    CheckCircle,
    Clock,
    Filter,
    Download,
    RefreshCw,
    Check,
    X,
} from "lucide-react";

export default function InquiriesIndex({ inquiries }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedInquiries, setSelectedInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Search handler
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            "/contact/inquiries",
            {
                search: searchTerm,
                status: statusFilter,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Status filter handler
    const handleStatusFilter = (status) => {
        setStatusFilter(status);
        router.get(
            "/contact/inquiries",
            {
                search: searchTerm,
                status: status,
                page: 1,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Bulk Mark as Read
    const handleBulkMarkAsRead = () => {
        if (selectedInquiries.length === 0) {
            Swal.fire({
                title: "No Selection",
                text: "Please select at least one inquiry to mark as read.",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        Swal.fire({
            title: "Mark as Read?",
            html: `Are you sure you want to mark <strong>${selectedInquiries.length}</strong> inquiries as read?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#10b981",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, mark as read!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                router.post(
                    "/contact/inquiries/bulk-status",
                    {
                        ids: selectedInquiries,
                        status: "read",
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            setIsLoading(false);
                            setSelectedInquiries([]);
                            Swal.fire({
                                title: "Updated!",
                                text: `${selectedInquiries.length} inquiries marked as read.`,
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                            router.reload();
                        },
                        onError: () => {
                            setIsLoading(false);
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to update inquiries.",
                                icon: "error",
                            });
                        },
                    }
                );
            }
        });
    };

    // Bulk Mark as Unread
    const handleBulkMarkAsUnread = () => {
        if (selectedInquiries.length === 0) {
            Swal.fire({
                title: "No Selection",
                text: "Please select at least one inquiry to mark as unread.",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        Swal.fire({
            title: "Mark as Unread?",
            html: `Are you sure you want to mark <strong>${selectedInquiries.length}</strong> inquiries as unread?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#f59e0b",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Yes, mark as unread!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                router.post(
                    "/contact/inquiries/bulk-status",
                    {
                        ids: selectedInquiries,
                        status: "unread",
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            setIsLoading(false);
                            setSelectedInquiries([]);
                            Swal.fire({
                                title: "Updated!",
                                text: `${selectedInquiries.length} inquiries marked as unread.`,
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                            router.reload();
                        },
                        onError: () => {
                            setIsLoading(false);
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to update inquiries.",
                                icon: "error",
                            });
                        },
                    }
                );
            }
        });
    };

    // Delete single inquiry
    const handleDelete = (id, name) => {
        Swal.fire({
            title: "Delete Inquiry?",
            html: `Are you sure you want to delete <strong>${name}</strong>'s inquiry?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                router.delete(`/contact/inquiries/${id}`, {
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

    // Bulk delete
    const handleBulkDelete = () => {
        if (selectedInquiries.length === 0) {
            Swal.fire({
                title: "No Selection",
                text: "Please select at least one inquiry to delete.",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
            });
            return;
        }

        Swal.fire({
            title: "Delete Selected?",
            html: `Are you sure you want to delete <strong>${selectedInquiries.length}</strong> inquiries?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete all!",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                setIsLoading(true);
                router.post(
                    "/contact/inquiries/bulk-delete",
                    {
                        ids: selectedInquiries,
                    },
                    {
                        preserveScroll: true,
                        onSuccess: () => {
                            setIsLoading(false);
                            setSelectedInquiries([]);
                            Swal.fire({
                                title: "Deleted!",
                                text: `${selectedInquiries.length} inquiries have been deleted.`,
                                icon: "success",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        },
                        onError: () => {
                            setIsLoading(false);
                            Swal.fire({
                                title: "Error!",
                                text: "Failed to delete inquiries.",
                                icon: "error",
                            });
                        },
                    }
                );
            }
        });
    };

    // Toggle select all
    const toggleSelectAll = () => {
        if (selectedInquiries.length === inquiries.data.length) {
            setSelectedInquiries([]);
        } else {
            setSelectedInquiries(inquiries.data.map((item) => item.id));
        }
    };

    // Toggle single selection
    const toggleSelect = (id) => {
        setSelectedInquiries((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    // Individual status update
    const handleStatusUpdate = (id, currentStatus) => {
        const newStatus = currentStatus === "unread" ? "read" : "unread";
        const statusText = newStatus === "read" ? "marked as read" : "marked as unread";

        setIsLoading(true);
        router.put(
            `/contact/inquiries/${id}/status`,
            {
                status: newStatus,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsLoading(false);
                    Swal.fire({
                        title: "Updated!",
                        text: `Inquiry ${statusText}`,
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                },
                onError: () => {
                    setIsLoading(false);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to update status.",
                        icon: "error",
                    });
                },
            }
        );
    };

    // View inquiry details
    const handleView = (id) => {
        router.get(`/contact/inquiries/${id}`);
    };

    // Export to CSV
    const handleExport = () => {
        setIsLoading(true);
        const params = new URLSearchParams({
            search: searchTerm,
            status: statusFilter,
        });
        const exportUrl = `/contact/inquiries/export?${params.toString()}`;
        
        fetch(exportUrl, {
            method: 'GET',
            headers: {
                'Accept': 'text/csv',
            },
        })
        .then(response => {
            setIsLoading(false);
            if (!response.ok) {
                throw new Error('Export failed');
            }
            return response.blob().then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `inquiries_${new Date().toISOString().slice(0, 10)}.csv`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            });
        })
        .catch(error => {
            setIsLoading(false);
            Swal.fire({
                title: "Export Failed",
                text: error.message || "Failed to export inquiries. Please try again.",
                icon: "error",
            });
        });
    };

    // Refresh data
    const handleRefresh = () => {
        setIsLoading(true);
        router.reload({
            preserveScroll: true,
            onFinish: () => setIsLoading(false),
        });
    };

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    // Get status badge with dark mode classes
    const getStatusBadge = (status) => {
        const isUnread = status === "unread";
        return {
            bg: isUnread ? "bg-red-100 dark:bg-red-900/40" : "bg-green-100 dark:bg-green-900/40",
            text: isUnread ? "text-red-800 dark:text-red-300" : "text-green-800 dark:text-green-300",
            icon: isUnread ? Clock : CheckCircle,
            label: isUnread ? "Unread" : "Read",
        };
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Contact Inquiries
                    </h1>
                </div>
            }
        >
            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
                            Inquiry Management
                        </h2>
                        <p className="mt-1 text-xs text-[#5a627a] font-medium">
                            Total: <strong className="text-[#c77950] font-bold">{inquiries.total}</strong> resident inquiries registered
                        </p>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {selectedInquiries.length > 0 && (
                            <>
                                <button
                                    onClick={handleBulkMarkAsRead}
                                    className="inline-flex items-center px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                                >
                                    <Check className="w-3.5 h-3.5 mr-1.5" />
                                    Mark Read ({selectedInquiries.length})
                                </button>
                                <button
                                    onClick={handleBulkMarkAsUnread}
                                    className="inline-flex items-center px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                                >
                                    <Clock className="w-3.5 h-3.5 mr-1.5" />
                                    Mark Unread ({selectedInquiries.length})
                                </button>
                                <button
                                    onClick={handleBulkDelete}
                                    className="inline-flex items-center px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                                >
                                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                                    Delete ({selectedInquiries.length})
                                </button>
                            </>
                        )}
                        <button
                            onClick={handleExport}
                            className="inline-flex items-center px-4 py-2 bg-white hover:bg-[#fafbfe] text-[#1a1f2c] border border-[#d6d8e5] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs hover:border-[#c77950]"
                        >
                            <Download className="w-3.5 h-3.5 mr-1.5 text-[#c77950]" />
                            Export CSV
                        </button>
                        <button
                            onClick={handleRefresh}
                            className="inline-flex items-center px-4 py-2 bg-white hover:bg-[#fafbfe] text-[#1a1f2c] border border-[#d6d8e5] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs hover:border-[#c77950]"
                            disabled={isLoading}
                        >
                            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 text-[#c77950] ${isLoading ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-4 sm:p-5 bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Search by name, email, phone..."
                                    className="w-full pl-10 pr-4 py-2.5 border border-[#d6d8e5] rounded-xl focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] bg-white text-[#1a1f2c] placeholder-gray-400 text-sm transition-all shadow-2xs"
                                />
                                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8c94a8]" />
                            </div>
                        </form>

                        {/* Status Filter */}
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-[#c77950]" />
                            <select
                                value={statusFilter}
                                onChange={(e) => handleStatusFilter(e.target.value)}
                                className="px-4 py-2.5 border border-[#d6d8e5] rounded-xl focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] bg-white text-[#1a1f2c] text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
                            >
                                <option value="all">All Status</option>
                                <option value="unread">Unread</option>
                                <option value="read">Read</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Modern Table Container */}
                <div className="rounded-2xl sm:rounded-3xl border border-[#d6d8e5] overflow-hidden bg-white shadow-[0_10px_30px_rgba(30,35,60,0.06)]">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="min-w-full divide-y divide-[#e8e9f0]">
                            <thead className="bg-[#f6f7fa]">
                                <tr>
                                    <th className="px-6 py-3.5 text-left">
                                        <input
                                            type="checkbox"
                                            checked={inquiries.data.length > 0 && selectedInquiries.length === inquiries.data.length}
                                            onChange={toggleSelectAll}
                                            className="rounded border-[#d6d8e5] text-[#c77950] focus:ring-[#c77950]"
                                        />
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5 text-[#c77950]" />
                                            Name / Email
                                        </div>
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5 text-[#c77950]" />
                                            Phone
                                        </div>
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        Message
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3.5 h-3.5 text-[#c77950]" />
                                            Date
                                        </div>
                                    </th>
                                    <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        Status
                                    </th>
                                    <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e9f0]">
                                {inquiries.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center">
                                            <div className="text-sm text-[#8c94a8]">
                                                No inquiries found
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    inquiries.data.map((inquiry) => {
                                        const statusInfo = getStatusBadge(inquiry.status);
                                        const StatusIcon = statusInfo.icon;
                                        const fullName = `${inquiry.first_name} ${inquiry.last_name}`;

                                        return (
                                            <tr
                                                key={inquiry.id}
                                                className={`hover:bg-[#f6f7fa]/80 transition-colors duration-150 ${
                                                    inquiry.status === "unread" ? "bg-[#c77950]/5" : ""
                                                }`}
                                            >
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedInquiries.includes(inquiry.id)}
                                                        onChange={() => toggleSelect(inquiry.id)}
                                                        className="rounded border-[#d6d8e5] text-[#c77950] focus:ring-[#c77950]"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div>
                                                        <div className="text-xs font-bold text-[#1a1f2c] flex items-center">
                                                            {fullName}
                                                            {inquiry.status === "unread" && (
                                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-rose-50 text-rose-700 border border-rose-200">
                                                                    New
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-xs text-[#5a627a] mt-0.5">
                                                            {inquiry.email}
                                                        </div>
                                                        {inquiry.address && (
                                                            <div className="text-[10px] mt-0.5 text-[#8c94a8]">
                                                                {inquiry.address}, {inquiry.city}, {inquiry.state} {inquiry.zip}
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-medium text-[#1a1f2c]">
                                                        {inquiry.phone || "—"}
                                                    </div>
                                                    {inquiry.source && (
                                                        <div className="text-[10px] text-[#8c94a8]">
                                                            Source: {inquiry.source}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs text-[#5a627a] max-w-xs truncate font-normal">
                                                        {inquiry.message || "No message"}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-xs text-[#5a627a] font-medium">
                                                        {formatDate(inquiry.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <button
                                                        onClick={() => handleStatusUpdate(inquiry.id, inquiry.status)}
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 ${
                                                            inquiry.status === "unread"
                                                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                                        }`}
                                                    >
                                                        <StatusIcon className="w-3 h-3 mr-1" />
                                                        {statusInfo.label}
                                                    </button>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <button
                                                            onClick={() => handleView(inquiry.id)}
                                                            className="p-2 rounded-xl transition-all duration-200 hover:bg-[#c77950]/10 text-[#5a627a] hover:text-[#c77950]"
                                                            title="View Details"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(inquiry.id, fullName)}
                                                            className="p-2 rounded-xl transition-all duration-200 hover:bg-rose-50 text-[#8c94a8] hover:text-rose-600"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {inquiries.links && inquiries.links.length > 0 && (
                        <div className="px-6 py-4 border-t border-[#e8e9f0] bg-[#fafbfe]">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-xs text-[#5a627a]">
                                    Showing {inquiries.from || 0} to {inquiries.to || 0} of {inquiries.total} results
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {inquiries.links.map((link, index) => {
                                        if (link.url === null) {
                                            return (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1.5 rounded-xl text-xs text-[#8c94a8] cursor-not-allowed opacity-50"
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                />
                                            );
                                        }
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => router.get(link.url)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                                                    link.active
                                                        ? "bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-xs"
                                                        : "bg-white text-[#1a1f2c] border border-[#d6d8e5] hover:border-[#c77950] hover:text-[#c77950]"
                                                }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}