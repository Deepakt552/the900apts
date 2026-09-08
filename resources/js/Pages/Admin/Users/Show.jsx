import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Mail, 
    Calendar, 
    Shield, 
    BadgeCheck,
    Users,
    User,
    Edit
} from 'lucide-react';

export default function Show({ user }) {
    const getRoleDetails = (role) => {
        const details = {
            admin: { icon: Shield, color: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300', description: 'Full system access' },
            user: { icon: User, color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300', description: 'Standard user access' },
            HR: { icon: BadgeCheck, color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300', description: 'Human Resources access' },
            Marketing: { icon: BadgeCheck, color: 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300', description: 'Marketing access' },
        };
        return details[role] || details.user;
    };

    const RoleIcon = getRoleDetails(user.role).icon;

    const infoCards = [
        { label: 'Name', value: user.name, icon: Users },
        { label: 'Email', value: user.email, icon: Mail },
        { label: 'Role', value: user.role, icon: Shield },
        { label: 'Created Date', value: new Date(user.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }), icon: Calendar },
    ];

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        User Profile Details
                    </h1>
                </div>
            }
        >
            <Head title={`User Profile · ${user.name} · The 900 Residences`} />

            <div className="w-full space-y-6">
                {/* Header Back & Edit Actions */}
                <div className="flex items-center justify-between">
                    <Link
                        href={route('admin.users.index')}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#d6d8e5] text-[#1a1f2c] hover:text-[#c77950] hover:border-[#c77950] rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-2xs group"
                    >
                        <ArrowLeft className="w-4 h-4 text-[#c77950] group-hover:-translate-x-0.5 transition-transform" />
                        <span>Back to Directory</span>
                    </Link>

                    <Link
                        href={route('admin.users.edit', user.id)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                    >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl sm:rounded-3xl shadow-[0_10px_30px_rgba(30,35,60,0.06)] border border-[#d6d8e5] overflow-hidden">
                    {/* Header Card */}
                    <div className="relative bg-gradient-to-r from-[#1a1f2c] to-[#2a324b] px-6 sm:px-8 py-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#c77950] to-[#b3633b] text-white flex items-center justify-center font-bold text-2xl shadow-md border-2 border-white/20">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-[2px] text-[#c77950]">
                                        TEAM MEMBER PROFILE
                                    </span>
                                    <h2 className="text-2xl sm:text-3xl font-cormorant font-bold text-white mt-0.5">{user.name}</h2>
                                    <div className="flex items-center mt-1.5 gap-2">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                                            user.role === 'admin'
                                                ? 'bg-purple-500/20 text-purple-200 border-purple-400/30'
                                                : user.role === 'HR'
                                                ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30'
                                                : user.role === 'Marketing'
                                                ? 'bg-rose-500/20 text-rose-200 border-rose-400/30'
                                                : 'bg-blue-500/20 text-blue-200 border-blue-400/30'
                                        }`}>
                                            <RoleIcon className="w-3 h-3 mr-1" />
                                            {user.role}
                                        </span>
                                        <span className="text-xs text-white/60">
                                            ID: #{user.id}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Details Cards */}
                    <div className="p-6 sm:p-8">
                        <h3 className="text-xs font-bold text-[#8c94a8] uppercase tracking-wider mb-4">
                            Account Information
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {infoCards.map((item, index) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex items-start gap-3 p-4 bg-[#f6f7fa] rounded-2xl border border-[#e8e9f0]"
                                    >
                                        <div className="p-2.5 bg-[#c77950]/10 text-[#c77950] rounded-xl border border-[#c77950]/20">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-[#8c94a8]">
                                                {item.label}
                                            </p>
                                            <p className="text-xs sm:text-sm font-bold text-[#1a1f2c] mt-0.5">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}