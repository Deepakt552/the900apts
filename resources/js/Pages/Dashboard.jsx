// resources/js/Pages/Admin/Dashboard.jsx
import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { 
    HiOutlineNewspaper, 
    HiOutlineBriefcase, 
    HiOutlineMail, 
    HiOutlineEye,
    HiOutlineChat,
    HiOutlineUserGroup,
    HiOutlineCalendar,
    HiOutlineCheckCircle,
    HiOutlineChevronRight,
    HiOutlineSparkles,
    HiOutlineExternalLink
} from 'react-icons/hi';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

export default function Dashboard({ stats, recent_blogs, recent_comments, recent_applications, recent_inquiries, views_chart }) {
    // Primary Copper (#c77950) & Secondary chart dataset
    const chartData = {
        labels: views_chart.map(item => item.date),
        datasets: [
            {
                label: 'Views',
                data: views_chart.map(item => item.count),
                borderColor: '#c77950',
                backgroundColor: 'rgba(199, 121, 80, 0.12)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#ffffff',
                pointBorderColor: '#c77950',
                pointBorderWidth: 2.5,
                pointRadius: 4.5,
                pointHoverRadius: 6.5,
                pointHoverBackgroundColor: '#c77950',
                pointHoverBorderColor: '#ffffff',
                pointHoverBorderWidth: 2,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1a1f2c',
                titleColor: '#ffd9c7',
                bodyColor: '#ffffff',
                borderColor: 'rgba(199, 121, 80, 0.4)',
                borderWidth: 1,
                cornerRadius: 10,
                padding: 12,
                titleFont: {
                    weight: 'bold',
                    size: 12,
                },
                bodyFont: {
                    size: 13,
                },
                displayColors: false,
                callbacks: {
                    label: (context) => ` ${context.parsed.y} Page Views`,
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    color: '#68718e',
                    font: { size: 11, weight: '600' },
                },
                grid: {
                    color: 'rgba(199, 121, 80, 0.1)',
                },
                border: {
                    dash: [4, 4],
                },
            },
            x: {
                ticks: {
                    color: '#68718e',
                    font: { size: 11, weight: '600' },
                },
                grid: {
                    display: false,
                },
            },
        },
    };

    const statCards = [
        {
            title: 'Total Blogs',
            value: stats.total_blogs,
            subValue: `${stats.published_blogs} published`,
            icon: HiOutlineNewspaper,
            badgeBg: 'bg-[#c77950]/10 text-[#c77950] border border-[#c77950]/25',
            iconBg: 'from-[#c77950] to-[#b3633b]',
        },
        {
            title: 'Job Applications',
            value: stats.total_applications,
            subValue: `${stats.shortlisted_applications} shortlisted`,
            icon: HiOutlineBriefcase,
            badgeBg: 'bg-[#b8643c]/10 text-[#b8643c] border border-[#b8643c]/25',
            iconBg: 'from-[#b8643c] to-[#994e2e]',
        },
        {
            title: 'Contact Inquiries',
            value: stats.total_inquiries,
            subValue: `${stats.unread_inquiries} unread`,
            icon: HiOutlineMail,
            badgeBg: 'bg-[#c77950]/10 text-[#c77950] border border-[#c77950]/25',
            iconBg: 'from-[#c77950] to-[#b3633b]',
        },
        {
            title: 'Blog Views',
            value: stats.total_views,
            subValue: `${stats.today_views} today`,
            icon: HiOutlineEye,
            badgeBg: 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/25',
            iconBg: 'from-emerald-500 to-emerald-600',
        },
    ];

    const getStatusBadge = (status, type = 'blog') => {
        const colors = {
            blog: {
                published: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                draft: 'bg-amber-50 text-amber-700 border border-amber-200',
                schedule: 'bg-[#c77950]/10 text-[#c77950] border border-[#c77950]/25',
            },
            application: {
                shortlisted: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
                pending: 'bg-amber-50 text-amber-700 border border-amber-200',
                reviewed: 'bg-[#c77950]/10 text-[#c77950] border border-[#c77950]/25',
                rejected: 'bg-rose-50 text-rose-700 border border-rose-200',
            },
            inquiry: {
                unread: 'bg-rose-50 text-rose-700 border border-rose-200',
                read: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
            },
        };

        const colorMap = type === 'blog' ? colors.blog : type === 'application' ? colors.application : colors.inquiry;
        return colorMap[status] || 'bg-gray-100 text-gray-700 border border-gray-200';
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-2.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#c77950]" />
                    <h1 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] tracking-wide">
                        Dashboard Overview
                    </h1>
                </div>
            }
        >
            <Head title="Admin Dashboard · The 900 Residences" />

            <div className="space-y-6 sm:space-y-8">
                {/* =========================================================================
                    HERO WELCOME BANNER (PRIMARY & SECONDARY HARMONY)
                ========================================================================== */}
                <div className="relative rounded-[24px] sm:rounded-[32px] bg-white border border-[#d6d8e5] p-6 sm:p-8 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                    {/* Corner Hanok Fretwork */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#c77950]/30 rounded-tl-xs pointer-events-none" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#c77950]/30 rounded-tr-xs pointer-events-none" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#c77950]/30 rounded-bl-xs pointer-events-none" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#c77950]/30 rounded-br-xs pointer-events-none" />

                    {/* Ambient Glow */}
                    <div className="pointer-events-none absolute -right-16 -top-16 w-64 h-64 bg-[#c77950]/10 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/25 text-[#c77950] text-[10px] font-bold uppercase tracking-wider mb-2">
                                <HiOutlineSparkles className="w-3.5 h-3.5" />
                                <span>✦ THE 900 RESIDENCES EXECUTIVE PORTAL ✦</span>
                            </div>
                            <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1f2c] tracking-tight leading-tight">
                                Management Suite & Operations
                            </h2>
                            <p className="text-xs sm:text-sm text-[#5a627a] mt-1 max-w-xl font-medium leading-relaxed">
                                Live overview of leasing inquiries, job applications, editorial publications, and community statistics.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <div className="px-4 py-2 rounded-full bg-[#f6f7fa] border border-[#d6d8e5] text-xs text-[#5a627a] flex items-center gap-2 font-semibold">
                                <HiOutlineCalendar className="w-4 h-4 text-[#c77950]" />
                                <span>
                                    {new Date().toLocaleDateString('en-US', { 
                                        weekday: 'short', 
                                        month: 'short', 
                                        day: 'numeric', 
                                        year: 'numeric' 
                                    })}
                                </span>
                            </div>

                            <Link
                                href="/"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                            >
                                <span>Public Site</span>
                                <HiOutlineExternalLink className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    4 STAT CARDS (PRIMARY & SECONDARY THEMED)
                ========================================================================== */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] hover:border-[#c77950]/50 p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] hover:shadow-[0_15px_35px_rgba(199,121,80,0.12)] transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-[11px] font-bold text-[#8c94a8] uppercase tracking-wider">
                                            {stat.title}
                                        </p>
                                        <h3 className="font-montserrat font-extrabold text-2xl sm:text-3xl text-[#1a1f2c] mt-1.5 leading-none">
                                            {stat.value}
                                        </h3>
                                        <div className="mt-3">
                                            <span className={`inline-block text-[10.5px] font-bold px-2.5 py-0.5 rounded-full ${stat.badgeBg}`}>
                                                {stat.subValue}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* =========================================================================
                    TRAFFIC CHART & PLATFORM SUMMARY
                ========================================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Traffic Chart */}
                    <div className="lg:col-span-2 relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e8e9f0] mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Audience Trend
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Views Overview (Last 7 Days)
                                </h3>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/20 text-[#c77950] text-xs font-bold">
                                {stats.total_views} Total Views
                            </span>
                        </div>

                        <div className="h-64 sm:h-72 w-full">
                            {views_chart.length > 0 ? (
                                <Line data={chartData} options={chartOptions} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-[#8c94a8] text-sm">
                                    No view data recorded yet
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Platform Summary Column */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] flex flex-col justify-between overflow-hidden">
                        <div>
                            <div className="pb-4 border-b border-[#e8e9f0] mb-4">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Platform Metrics
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Summary Statistics
                                </h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-[#c77950]">
                                            <HiOutlineChat className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#1a1f2c] block">Total Comments</span>
                                            <span className="text-[10px] text-[#8c94a8]">Reader interactions</span>
                                        </div>
                                    </div>
                                    <span className="font-montserrat font-extrabold text-lg text-[#1a1f2c]">
                                        {stats.total_comments}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-[#b8643c]/15 border border-[#b8643c]/30 flex items-center justify-center text-[#b8643c]">
                                            <HiOutlineUserGroup className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#1a1f2c] block">Open Roles</span>
                                            <span className="text-[10px] text-[#8c94a8]">Career positions</span>
                                        </div>
                                    </div>
                                    <span className="font-montserrat font-extrabold text-lg text-[#1a1f2c]">
                                        {stats.job_positions}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-600">
                                            <HiOutlineCheckCircle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-[#1a1f2c] block">Published Blogs</span>
                                            <span className="text-[10px] text-[#8c94a8]">Live articles</span>
                                        </div>
                                    </div>
                                    <span className="font-montserrat font-extrabold text-lg text-[#1a1f2c]">
                                        {stats.published_blogs}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-[#e8e9f0] text-center">
                            <Link
                                href={route('admin.blog.analytics')}
                                className="inline-flex items-center gap-1.5 text-xs text-[#c77950] hover:text-[#994e2e] font-bold uppercase tracking-wider transition-colors"
                            >
                                <span>Blog Analytics</span>
                                <HiOutlineChevronRight className="w-3.5 h-3.5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    RECENT INQUIRIES & RECENT APPLICATIONS
                ========================================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Inquiries */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e8e9f0] mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Resident Messages
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Recent Inquiries
                                </h3>
                            </div>
                            <Link
                                href={route('contact.inquiries.index')}
                                className="text-xs text-[#c77950] hover:text-[#994e2e] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                            >
                                <span>View all</span>
                                <HiOutlineChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recent_inquiries.map((inquiry) => (
                                <div
                                    key={inquiry.id}
                                    className="p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors"
                                >
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <p className="text-xs font-bold text-[#1a1f2c] truncate">
                                            {inquiry.name}
                                        </p>
                                        <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${getStatusBadge(inquiry.status, 'inquiry')}`}>
                                            {inquiry.status}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-[#5a627a] truncate">
                                        {inquiry.email}
                                    </p>
                                    <p className="text-xs text-[#1a1f2c] mt-1.5 line-clamp-2 leading-relaxed font-normal">
                                        {inquiry.message}
                                    </p>
                                    <p className="text-[10px] text-[#8c94a8] mt-2 font-medium">
                                        {inquiry.time_ago}
                                    </p>
                                </div>
                            ))}
                            {recent_inquiries.length === 0 && (
                                <p className="text-[#8c94a8] text-xs text-center py-6">
                                    No inquiries received yet
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Applications */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e8e9f0] mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Talent & Careers
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Job Applications
                                </h3>
                            </div>
                            <Link
                                href={route('admin.careers.index')}
                                className="text-xs text-[#c77950] hover:text-[#994e2e] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                            >
                                <span>View all</span>
                                <HiOutlineChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recent_applications.map((app) => (
                                <div
                                    key={app.id}
                                    className="flex items-center justify-between p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors"
                                >
                                    <div className="flex-1 min-w-0 pr-3">
                                        <p className="text-xs font-bold text-[#1a1f2c] truncate">
                                            {app.full_name}
                                        </p>
                                        <p className="text-[11px] text-[#5a627a] truncate mt-0.5">
                                            {app.job_title} • <span className="text-[#c77950] font-semibold">{app.applied_date}</span>
                                        </p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0 ${getStatusBadge(app.status, 'application')}`}>
                                        {app.status_label}
                                    </span>
                                </div>
                            ))}
                            {recent_applications.length === 0 && (
                                <p className="text-[#8c94a8] text-xs text-center py-6">
                                    No applications submitted yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* =========================================================================
                    RECENT BLOGS & COMMENTS ROW
                ========================================================================== */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Blogs */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e8e9f0] mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Editorial
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Recent Articles
                                </h3>
                            </div>
                            <Link
                                href={route('admin.blogs.index')}
                                className="text-xs text-[#c77950] hover:text-[#994e2e] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                            >
                                <span>View all</span>
                                <HiOutlineChevronRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>

                        <div className="space-y-3">
                            {recent_blogs.map((blog) => (
                                <div
                                    key={blog.id}
                                    className="flex items-center justify-between p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors"
                                >
                                    <div className="flex-1 min-w-0 pr-3">
                                        <p className="text-xs font-bold text-[#1a1f2c] truncate">
                                            {blog.title}
                                        </p>
                                        <p className="text-[11px] text-[#5a627a] mt-0.5">
                                            {blog.date}
                                        </p>
                                    </div>
                                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider shrink-0 ${getStatusBadge(blog.status, 'blog')}`}>
                                        {blog.status_label}
                                    </span>
                                </div>
                            ))}
                            {recent_blogs.length === 0 && (
                                <p className="text-[#8c94a8] text-xs text-center py-6">
                                    No articles found
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Recent Comments */}
                    <div className="relative bg-white rounded-2xl sm:rounded-3xl border border-[#d6d8e5] p-5 sm:p-6 shadow-[0_10px_30px_rgba(30,35,60,0.06)] overflow-hidden">
                        <div className="flex items-center justify-between pb-4 border-b border-[#e8e9f0] mb-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-[#c77950]">
                                    Engagement
                                </span>
                                <h3 className="font-cormorant text-xl sm:text-2xl font-bold text-[#1a1f2c] mt-0.5">
                                    Recent Comments
                                </h3>
                            </div>
                            <span className="text-xs font-bold text-[#5a627a]">
                                Total: <strong className="text-[#c77950]">{stats.total_comments}</strong>
                            </span>
                        </div>

                        <div className="space-y-3">
                            {recent_comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="p-3.5 bg-[#f6f7fa] border border-[#e8e9f0] rounded-2xl hover:border-[#c77950]/40 transition-colors"
                                >
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="text-xs font-bold text-[#1a1f2c]">
                                            {comment.user_name}
                                        </p>
                                        <span className="text-[10px] text-[#8c94a8]">
                                            {comment.time_ago}
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#1a1f2c] leading-relaxed">
                                        {comment.comment}
                                    </p>
                                    <p className="text-[10px] text-[#c77950] font-semibold mt-1.5 truncate">
                                        on: {comment.blog_title}
                                    </p>
                                </div>
                            ))}
                            {recent_comments.length === 0 && (
                                <p className="text-[#8c94a8] text-xs text-center py-6">
                                    No comments recorded yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}