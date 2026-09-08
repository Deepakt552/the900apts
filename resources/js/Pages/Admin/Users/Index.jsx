import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import {
    Users,
    UserPlus,
    Search,
    Filter,
    Eye,
    Pencil,
    Trash2,
    Loader2,
    ChevronLeft,
    ChevronRight,
    Mail,
    Calendar,
    Shield,
    BadgeCheck
} from 'lucide-react';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

export default function Index({ users, filters, stats }) {
    const [search, setSearch] = useState(filters.search || '');
    const [roleFilter, setRoleFilter] = useState(filters.role || '');
    const [sortBy, setSortBy] = useState(filters.sort_by || 'created_at');
    const [sortDir, setSortDir] = useState(filters.sort_dir || 'desc');
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(
            route('admin.users.index'),
            { search, role: roleFilter, sort_by: sortBy, sort_dir: sortDir },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleFilterChange = (value) => {
        setRoleFilter(value);
        router.get(
            route('admin.users.index'),
            { search, role: value, sort_by: sortBy, sort_dir: sortDir },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleSort = (field) => {
        const newDir = sortBy === field && sortDir === 'asc' ? 'desc' : 'asc';
        setSortBy(field);
        setSortDir(newDir);
        router.get(
            route('admin.users.index'),
            { search, role: roleFilter, sort_by: field, sort_dir: newDir },
            { preserveState: true, preserveScroll: true }
        );
    };

    const handleDelete = (user) => {
        Swal.fire({
            title: 'Delete User?',
            text: `Are you sure you want to delete "${user.name}"? This action cannot be undone.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#f1424b',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            reverseButtons: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setIsDeleting(true);
                const loadingToast = toast.loading('Deleting user...');

                router.delete(route('admin.users.destroy', user.id), {
                    preserveScroll: true,
                    onSuccess: () => {
                        toast.dismiss(loadingToast);
                        toast.success('User deleted successfully.');
                        setIsDeleting(false);
                    },
                    onError: (errors) => {
                        toast.dismiss(loadingToast);
                        toast.error(errors.message || 'Failed to delete user.');
                        setIsDeleting(false);
                    },
                });
            }
        });
    };

    const getRoleBadgeColor = (role) => {
        const colors = {
            admin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
            user: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
            HR: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
            Marketing: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
        };
        return colors[role] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    };

    const getRoleIcon = (role) => {
        const icons = {
            admin: Shield,
            user: Users,
            HR: BadgeCheck,
            Marketing: BadgeCheck,
        };
        return icons[role] || Users;
    };

    const statCards = [
        { label: 'Total Users', value: stats.total, icon: Users },
        { label: 'Admins', value: stats.admin, icon: Shield },
        { label: 'HR Team', value: stats.hr, icon: BadgeCheck },
        { label: 'Marketing', value: stats.marketing, icon: BadgeCheck },
        { label: 'Regular Users', value: stats.user, icon: Users },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Users Management
                    </h1>
                </div>
            }
        >
            <Head title="Users Management · The 900 Residences" />
            <Toaster position="top-right" reverseOrder={false} />

            <div className="w-full space-y-6">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c]">
                            Administrator & Team Directory
                        </h2>
                        <p className="text-xs text-[#5a627a] font-medium mt-1">
                            Manage your organization's administrative credentials, roles, and privileges
                        </p>
                    </div>
                    <Link
                        href={route('admin.users.create')}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Add New User</span>
                    </Link>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5] hover:-translate-y-0.5 transition-all duration-200"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">{stat.label}</p>
                                        <p className="text-2xl sm:text-3xl font-cormorant font-bold text-[#1a1f2c] mt-1">
                                            {stat.value}
                                        </p>
                                    </div>
                                    <div className="p-2.5 rounded-xl bg-[#c77950]/10 text-[#c77950] border border-[#c77950]/20">
                                        <Icon className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5]">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8c94a8]" />
                            <input
                                type="text"
                                placeholder="Search by name, email, or role..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 border border-[#d6d8e5] rounded-xl bg-white text-[#1a1f2c] placeholder-[#8c94a8] text-xs sm:text-sm focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] transition-all shadow-2xs"
                            />
                        </div>
                        <div className="sm:w-48 relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 text-[#c77950]" />
                            <select
                                value={roleFilter}
                                onChange={(e) => handleFilterChange(e.target.value)}
                                className="w-full pl-8 pr-8 py-2.5 border border-[#d6d8e5] rounded-xl bg-white text-[#1a1f2c] text-xs font-bold uppercase tracking-wider focus:ring-2 focus:ring-[#c77950]/20 focus:border-[#c77950] appearance-none transition-all shadow-2xs"
                            >
                                <option value="">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="HR">HR</option>
                                <option value="Marketing">Marketing</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs"
                        >
                            Search
                        </button>
                    </form>
                </div>

                {/* Table */}
                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5] overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-xs">
                            <thead className="bg-[#f6f7fa] border-b border-[#e8e9f0]">
                                <tr>
                                    <th
                                        className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider cursor-pointer hover:text-[#c77950] transition-colors"
                                        onClick={() => handleSort('id')}
                                    >
                                        <div className="flex items-center gap-1">
                                            #
                                            {sortBy === 'id' && (
                                                <span className="text-[#c77950]">
                                                    {sortDir === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider cursor-pointer hover:text-[#c77950] transition-colors"
                                        onClick={() => handleSort('name')}
                                    >
                                        <div className="flex items-center gap-1">
                                            User Name
                                            {sortBy === 'name' && (
                                                <span className="text-[#c77950]">
                                                    {sortDir === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider cursor-pointer hover:text-[#c77950] transition-colors"
                                        onClick={() => handleSort('email')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Email
                                            {sortBy === 'email' && (
                                                <span className="text-[#c77950]">
                                                    {sortDir === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider cursor-pointer hover:text-[#c77950] transition-colors"
                                        onClick={() => handleSort('role')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Role
                                            {sortBy === 'role' && (
                                                <span className="text-[#c77950]">
                                                    {sortDir === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th
                                        className="px-5 py-3.5 text-left text-[11px] font-bold text-[#5a627a] uppercase tracking-wider cursor-pointer hover:text-[#c77950] transition-colors"
                                        onClick={() => handleSort('created_at')}
                                    >
                                        <div className="flex items-center gap-1">
                                            Created Date
                                            {sortBy === 'created_at' && (
                                                <span className="text-[#c77950]">
                                                    {sortDir === 'asc' ? '↑' : '↓'}
                                                </span>
                                            )}
                                        </div>
                                    </th>
                                    <th className="px-5 py-3.5 text-right text-[11px] font-bold text-[#5a627a] uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8e9f0]">
                                {users.data.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-[#8c94a8]">
                                            <div className="flex flex-col items-center">
                                                <Users className="w-10 h-10 text-[#d6d8e5] mb-2" />
                                                <p className="text-sm font-bold text-[#1a1f2c]">No users found</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    users.data.map((user, index) => {
                                        return (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-[#f6f7fa]/80 transition-colors"
                                            >
                                                <td className="px-5 py-4 whitespace-nowrap text-xs font-bold text-[#8c94a8]">
                                                    {users.from + index}
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#c77950] to-[#b3633b] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <span className="text-xs font-bold text-[#1a1f2c]">
                                                            {user.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-xs text-[#5a627a]">
                                                        <Mail className="w-3.5 h-3.5 mr-1.5 text-[#8c94a8]" />
                                                        {user.email}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                                        user.role === 'admin'
                                                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                                                            : user.role === 'HR'
                                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                                            : user.role === 'Marketing'
                                                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                                                            : 'bg-blue-50 text-blue-700 border-blue-200'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap">
                                                    <div className="flex items-center text-xs text-[#5a627a]">
                                                        <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#c77950]" />
                                                        {new Date(user.created_at).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 whitespace-nowrap text-right">
                                                    <div className="flex items-center justify-end gap-1.5">
                                                        <Link
                                                            href={route('admin.users.show', user.id)}
                                                            className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition-all"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <Link
                                                            href={route('admin.users.edit', user.id)}
                                                            className="p-2 text-[#5a627a] hover:text-[#c77950] hover:bg-[#c77950]/10 rounded-xl transition-all"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(user)}
                                                            disabled={isDeleting}
                                                            className="p-2 text-[#8c94a8] hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all disabled:opacity-50"
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
                    {users.data.length > 0 && (
                        <div className="px-5 py-4 border-t border-[#e8e9f0] bg-[#fafbfe]">
                            <div className="flex items-center justify-between flex-wrap gap-4">
                                <div className="text-xs text-[#5a627a]">
                                    Showing <span className="font-bold text-[#1a1f2c]">{users.from}</span> to{' '}
                                    <span className="font-bold text-[#1a1f2c]">{users.to}</span> of{' '}
                                    <span className="font-bold text-[#1a1f2c]">{users.total}</span> results
                                </div>
                                <div className="flex gap-1.5 items-center">
                                    <button
                                        onClick={() => {
                                            router.get(users.prev_page_url || '#', {}, { preserveScroll: true });
                                        }}
                                        disabled={!users.prev_page_url}
                                        className="p-2 border border-[#d6d8e5] rounded-xl text-xs text-[#1a1f2c] bg-white hover:border-[#c77950] hover:text-[#c77950] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                                    >
                                        <ChevronLeft className="w-4 h-4" />
                                    </button>
                                    {users.links.map((link, index) => {
                                        if (link.url === null) {
                                            return null;
                                        }
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => {
                                                    router.get(link.url, {}, { preserveScroll: true });
                                                }}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${link.active
                                                    ? 'bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-xs'
                                                    : 'bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950]'
                                                    }`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                    <button
                                        onClick={() => {
                                            router.get(users.next_page_url || '#', {}, { preserveScroll: true });
                                        }}
                                        disabled={!users.next_page_url}
                                        className="p-2 border border-[#d6d8e5] rounded-xl text-xs text-[#1a1f2c] bg-white hover:border-[#c77950] hover:text-[#c77950] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs"
                                    >
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}