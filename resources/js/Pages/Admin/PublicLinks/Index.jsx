// resources/js/Pages/Admin/PublicLinks/Index.jsx

import React, { useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import {
    LayoutList,
    Plus,
    Search,
    ArrowUpDown,
    X,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    CircleOff,
} from "lucide-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import config from "../../../Pages/config";
import RouteList from "@/Pages/Admin/RouteList";

export default function Index({ publicLinks, filters }) {
    const [selectedRows, setSelectedRows] = useState([]);
    const [showRouteList, setShowRouteList] = useState(false);
    const [search, setSearch] = useState(filters.search || "");
    const [sortField, setSortField] = useState(
        filters.sort_field || "sort_order",
    );
    const [sortDirection, setSortDirection] = useState(
        filters.sort_direction || "asc",
    );
const handleSelectAll = (e) => {
    if (e.target.checked) {
        setSelectedRows(data.map(item => item.id));
    } else {
        setSelectedRows([]);
    }
};
const handleSelectRow = (id) => {
    setSelectedRows(prev =>
        prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
    );
};
const bulkStatus = (status) => {
    Swal.fire({
        title: "Change Status?",
        text: `Update ${selectedRows.length} selected record(s)?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, Update",
        confirmButtonColor: "#4f46e5",
    }).then((result) => {
        if (!result.isConfirmed) return;

        router.post(
            route("admin.public-route.bulk-status"),
            {
                ids: selectedRows,
                status: status, // 0 or 1
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Status updated successfully.");
                    setSelectedRows([]);
                },
                onError: () => {
                    toast.error("Unable to update status.");
                },
            }
        );
    });
};
    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route("admin.public-links.index"),
            {
                search: search,
                sort_field: sortField,
                sort_direction: sortDirection,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleSort = (field) => {
        const direction =
            sortField === field && sortDirection === "asc" ? "desc" : "asc";
        setSortField(field);
        setSortDirection(direction);
        router.get(
            route("admin.public-links.index"),
            {
                search: search,
                sort_field: field,
                sort_direction: direction,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleClearSearch = () => {
        setSearch("");
        router.get(
            route("admin.public-links.index"),
            {
                search: "",
                sort_field: sortField,
                sort_direction: sortDirection,
            },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleDelete = (id, label) => {
        Swal.fire({
            title: "Delete Public Link?",
            html: `Are you sure you want to delete "<strong>${label}</strong>"?<br/><span class="text-sm text-gray-500">This action cannot be undone.</span>`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#dc2626",
            cancelButtonColor: "#6b7280",
            confirmButtonText: "Delete",
            cancelButtonText: "Cancel",
            reverseButtons: true,
            customClass: {
                popup: "dark:bg-gray-800 dark:text-white",
                title: "dark:text-white",
                htmlContainer: "dark:text-gray-300",
                confirmButton: "dark:bg-red-600 dark:hover:bg-red-700",
                cancelButton: "dark:bg-gray-600 dark:hover:bg-gray-700",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("admin.public-links.destroy", id), {
                    onSuccess: () => {
                        toast.success("Public link deleted successfully.");
                    },
                    onError: () => {
                        toast.error("Failed to delete public link.");
                    },
                });
            }
        });
    };

    const getSortIcon = (field) => {
        if (sortField !== field) {
            return <ArrowUpDown className="w-3 h-3 ml-1 inline" />;
        }
        return (
            <ArrowUpDown
                className={`w-3 h-3 ml-1 inline transform ${sortDirection === "asc" ? "" : "rotate-180"}`}
            />
        );
    };

    const StatusBadge = ({ status }) => {
        return (
            <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                    status
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
            >
                {status ? (
                    <>
                        <CheckCircle className="w-3 h-3" />
                        Active
                    </>
                ) : (
                    <>
                        <CircleOff className="w-3 h-3" />
                        Inactive
                    </>
                )}
            </span>
        );
    };

    const { data, links, from, to, total } = publicLinks;

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Public Links
                    </h1>
                </div>
            }
        >
            <Head title="Public Navigation Links · The 900 Residences" />

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />

            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
                            Navigation & Routing Matrix
                        </h2>
                        <p className="mt-1 text-xs text-[#5a627a] font-medium">
                            Manage public navigation items, aliases, and redirect endpoints
                        </p>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => setShowRouteList(true)}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs"
                        >
                            <LayoutList className="w-4 h-4 text-[#c77950]" />
                            <span>Route List</span>
                        </button>

                        <Link
                            href={route("admin.public-links.create")}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            <Plus className="w-4 h-4" />
                            <span>Add Public Link</span>
                        </Link>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5] p-4 sm:p-5">
                    <form
                        onSubmit={handleSearch}
                        className="flex flex-col sm:flex-row items-center gap-3"
                    >
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-[#8c94a8] w-4 h-4" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by number, label, or route name..."
                                className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#d6d8e5] rounded-xl text-[#1a1f2c] placeholder-[#8c94a8] text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-[#8c94a8] hover:text-[#1a1f2c] transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-xs"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5] overflow-hidden">
                    {selectedRows.length > 0 && (
                        <div className="flex gap-2 p-3 bg-[#f6f7fa] border-b border-[#e8e9f0]">
                           <button
                                onClick={() => bulkStatus(1)}
                                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-xs"
                            >
                                Mark Active ({selectedRows.length})
                            </button>

                            <button
                                onClick={() => bulkStatus(0)}
                                className="px-4 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-xs"
                            >
                                Mark Inactive ({selectedRows.length})
                            </button>
                        </div>
                    )}
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-[#f6f7fa] text-[#5a627a] border-b border-[#e8e9f0]">
                                <tr>
                                    <th className="px-4 py-3.5">
                                        <input
                                            type="checkbox"
                                            checked={
                                                data.length > 0 &&
                                                selectedRows.length === data.length
                                            }
                                            onChange={handleSelectAll}
                                            className="h-4 w-4 rounded border-[#d6d8e5] text-[#c77950] focus:ring-2 focus:ring-[#c77950]/20 cursor-pointer"
                                        />
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        <button
                                            onClick={() => handleSort("number")}
                                            className="flex items-center gap-1 hover:text-[#c77950] transition-colors"
                                        >
                                            Number
                                            {getSortIcon("number")}
                                        </button>
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        <button
                                            onClick={() => handleSort("label")}
                                            className="flex items-center gap-1 hover:text-[#c77950] transition-colors"
                                        >
                                            Label
                                            {getSortIcon("label")}
                                        </button>
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        Route Name
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        Target URL
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider">
                                        Created
                                    </th>
                                    <th className="px-4 py-3.5 text-[11px] font-bold uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e9f0]">
                                {data.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="8"
                                            className="px-4 py-12 text-center text-[#8c94a8]"
                                        >
                                            No public links found.
                                        </td>
                                    </tr>
                                ) : (
                                    data.map((link, index) => (
                                        <tr
                                            key={link.id}
                                            className="hover:bg-[#f6f7fa]/80 transition-colors"
                                        >
                                            <td className="px-4 py-3.5">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(link.id)}
                                                    onChange={() => handleSelectRow(link.id)}
                                                    className="h-4 w-4 rounded border-[#d6d8e5] text-[#c77950] focus:ring-2 focus:ring-[#c77950]/20 cursor-pointer"
                                                />
                                            </td>
                                            <td className="px-4 py-3.5 font-bold text-[#8c94a8]">
                                                {index + 1}
                                            </td>
                                            <td className="px-4 py-3.5 font-bold text-[#1a1f2c]">
                                                {link.label}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <code className="px-2 py-0.5 bg-[#f6f7fa] border border-[#d6d8e5] rounded text-[11px] text-[#5a627a] font-mono">
                                                    {link.route_name || "-"}
                                                </code>
                                            </td>
                                            <td className="px-4 py-3.5">
                                                {link.url ? (
                                                    <a
                                                        href={`${config.ORIGIN}${link.url}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#c77950] hover:underline font-mono text-xs inline-block max-w-[200px] truncate"
                                                    >
                                                        {link.url}
                                                    </a>
                                                ) : (
                                                    "-"
                                                )}
                                            </td>
                                            <td className="px-4 py-3.5">
                                                <StatusBadge
                                                    status={link.status}
                                                />
                                            </td>
                                            <td className="px-4 py-3.5 text-xs text-[#5a627a]">
                                                {new Date(
                                                    link.created_at,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </td>
                                            <td className="px-4 py-3.5 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <Link
                                                        href={route(
                                                            "admin.public-links.edit",
                                                            link.id,
                                                        )}
                                                        className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Pencil className="w-4 h-4" />
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                link.id,
                                                                link.label,
                                                            )
                                                        }
                                                        className="p-2 text-[#8c94a8] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
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

                        {/* Pagination */}
                        {total > 0 && (
                            <div className="px-5 py-4 border-t border-[#e8e9f0] flex items-center justify-between flex-wrap gap-3 bg-[#fafbfe]">
                                <div className="text-xs text-[#5a627a]">
                                    Showing{" "}
                                    <span className="font-bold text-[#1a1f2c]">{from}</span>{" "}
                                    to <span className="font-bold text-[#1a1f2c]">{to}</span>{" "}
                                    of{" "}
                                    <span className="font-bold text-[#1a1f2c]">{total}</span>{" "}
                                    results
                                </div>
                                <div className="flex items-center gap-1.5">
                                    {links.map((link, index) => {
                                        if (link.url === null) {
                                            return null;
                                        }

                                        const isActive = link.active;
                                        return (
                                            <Link
                                                key={index}
                                                href={link.url}
                                                className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                                                    isActive
                                                        ? "bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-xs"
                                                        : "bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950]"
                                                }`}
                                                preserveScroll
                                            >
                                                {link.label ===
                                                "pagination.previous" ? (
                                                    <ChevronLeft className="w-4 h-4" />
                                                ) : link.label ===
                                                  "pagination.next" ? (
                                                    <ChevronRight className="w-4 h-4" />
                                                ) : (
                                                    link.label
                                                )}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {showRouteList && (
                <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                    <div className="w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-[#d6d8e5]">
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e8e9f0] bg-[#f6f7fa]">
                            <h2 className="text-sm font-bold text-[#1a1f2c] flex items-center gap-2">
                                <LayoutList className="w-4 h-4 text-[#c77950]" />
                                <span>Public Route Explorer</span>
                            </h2>

                            <button
                                onClick={() => setShowRouteList(false)}
                                className="p-1.5 rounded-xl hover:bg-[#e8e9f0] text-[#5a627a] transition"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-auto p-6">
                            <RouteList />
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
