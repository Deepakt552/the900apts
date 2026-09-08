import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import { Link, usePage } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    User,
    Settings,
    Menu,
    X,
    Sun,
    Moon,
    LogOut,
    Home,
    Mail,
    ChevronDown,
    Briefcase,
    Newspaper,
    ChartColumn,
    Users,
    ExternalLink,
    Globe,
    FileSearch,
    ChevronLeft,
    ChevronRight,
    Phone
} from "lucide-react";
import APP_CONFIG from "../Pages/config";

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const userRole = user.role || 'user';
    
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", JSON.stringify(sidebarCollapsed));
    }, [sidebarCollapsed]);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const isActive = (routeName) => {
        return route().current(routeName);
    };

    const hasAccess = (item) => {
        if (!item.roles) return true;
        return item.roles.includes(userRole);
    };

    const navigationItems = [
        { name: "Dashboard", route: "dashboard", icon: LayoutDashboard },
        {
            name: "Users",
            route: "admin.users.index",
            icon: Users,
            roles: ["admin"],
        },
        { name: "Inquiries", route: "contact.inquiries.index", icon: Mail },
        {
            name: "Careers",
            route: "admin.job-descriptions.index",
            icon: Briefcase,
            roles: ["admin", "HR"],
        },
        {
            name: 'Job Inquiry',
            route: 'admin.careers.index',
            href: route('admin.careers.index'),
            icon: FileSearch,
            roles: ['admin', 'HR'],
        },
        {
            name: "Blog Management",
            route: "admin.blogs.index",
            icon: Newspaper,
            roles: ["admin", "Marketing"],
        },
        { name: "Profile", route: "profile.edit", icon: User },
        {
            name: "Analytics",
            route: "admin.blog.analytics",
            icon: ChartColumn,
            roles: ["admin"],
        },
        {
            name: 'Email Setting',
            route: 'settings.mail',
            icon: Mail,
            roles: ['admin'],
        },
        {
            name: "Public Links",
            route: "admin.public-links.index",
            icon: Globe,
            roles: ["admin"],
        },
        {
            name: "View Website",
            href: "Home",
            route: "Home",
            icon: ExternalLink,
            roles: ["admin", "Marketing", "HR", "user"],
        },
    ];

    const filteredNavItems = navigationItems.filter(hasAccess);

    return (
        <div className="h-screen flex overflow-hidden bg-[#e8e9f0] text-[#1a1f2c] font-sans selection:bg-[#c77950]/30 selection:text-[#1a1f2c]">
            {/* Traditional Korean Changsal Lattice SVG Background Pattern */}
            <svg
                className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="admin-changsal-pattern"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        <path
                            d="M 0 0 L 80 0 L 80 80 L 0 80 Z"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="1"
                        />
                        <path
                            d="M 20 0 L 20 20 L 0 20 M 60 0 L 60 20 L 80 20 M 0 60 L 20 60 L 20 80 M 80 60 L 60 60 L 60 80"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="1.2"
                        />
                        <path
                            d="M 40 10 L 40 70 M 10 40 L 70 40"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="0.8"
                            strokeDasharray="4 4"
                        />
                        <path
                            d="M 40 25 L 55 40 L 40 55 L 25 40 Z"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="1"
                        />
                        <circle cx="40" cy="40" r="2.5" fill="#c77950" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#admin-changsal-pattern)" />
            </svg>

            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar - Full height with collapse support */}
            <div
                className={`fixed inset-y-0 left-0 z-50 bg-white/95 border-r border-[#d6d8e5] shadow-[0_10px_35px_rgba(30,35,60,0.08)] backdrop-blur-xl transform transition-all duration-300 ease-in-out flex flex-col h-full
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    ${sidebarCollapsed ? "w-20" : "w-64"}
                `}
            >
                {/* Sidebar Header with EXACT Skewed Copper Logo Banner aligned to Top Navbar */}
                <div className="relative h-[62px] flex items-center justify-between border-b border-[#c77950] px-0 flex-shrink-0 bg-white">
                    {/* Exact Public Skewed Copper Banner */}
                    <div
                        className="relative h-full z-[110] flex-shrink-0 drop-shadow-[0_10px_22px_rgba(0,0,0,0.3)] w-full"
                    >
                        <div
                            className="absolute top-0 left-[-35px] w-[calc(100%+35px)] h-full bg-gradient-to-r from-[#c77950] to-[#b3633b] border-r border-[#c77950] border-b border-[#c77950] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(199,121,80,0.35)]"
                            style={{
                                transform: 'skewX(-28deg)',
                                transformOrigin: 'top left',
                            }}
                        />

                        {!sidebarCollapsed ? (
                            <div className="relative z-[2] h-full flex items-center justify-between px-[20px] sm:px-[25px] pr-[30px]">
                                <Link
                                    href="/"
                                    className="flex items-center gap-2 transition-transform duration-300 hover:scale-[1.02]"
                                    title="THE 900 Home"
                                >
                                    <img
                                        src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
                                        alt="THE 900 Logo"
                                        className="h-[30px] sm:h-[34px] w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                                    />
                                    <span className="text-[9px] font-extrabold uppercase tracking-[2px] text-white/90 drop-shadow-sm ml-1">
                                        ADMIN
                                    </span>
                                </Link>

                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="lg:hidden text-white/80 hover:text-white p-1"
                                    aria-label="Close sidebar"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                        ) : (
                            <div className="relative z-[2] h-full flex items-center justify-center">
                                <Link
                                    href="/"
                                    className="flex items-center justify-center transition-transform duration-300 hover:scale-[1.02]"
                                    title="THE 900 Home"
                                >
                                    <img
                                        src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
                                        alt="THE 900 Logo"
                                        className="h-[26px] w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                                    />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Navigation */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 custom-scrollbar">
                    {filteredNavItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.route);

                        return (
                            <Link
                                key={item.name}
                                href={route(item.route)}
                                title={sidebarCollapsed ? item.name : ""}
                                className={`
                                    group flex items-center gap-3 px-3.5 py-2.5 text-xs font-bold rounded-xl
                                    transition-all duration-200 tracking-wide
                                    ${sidebarCollapsed ? "justify-center px-2" : ""}
                                    ${
                                        active
                                            ? "bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-[0_4px_16px_rgba(199,121,80,0.35)] scale-[1.02]"
                                            : "text-[#5a627a] hover:text-[#c77950] hover:bg-[#f6f7fa] border border-transparent hover:border-[#c77950]/20"
                                    }
                                `}
                            >
                                <Icon
                                    className={`h-4.5 w-4.5 flex-shrink-0 transition-colors ${
                                        active
                                            ? "text-white"
                                            : "text-[#8c94a8] group-hover:text-[#c77950]"
                                    }`}
                                />
                                {!sidebarCollapsed && <span>{item.name}</span>}
                            </Link>
                        );
                    })}
                </nav>

                {/* Sidebar Footer */}
                <div
                    className={`border-t border-[#e8e9f0] p-3.5 flex-shrink-0 bg-[#fafbfe]
                    ${sidebarCollapsed ? "space-y-3" : ""}
                `}
                >
                    <button
                        onClick={toggleSidebar}
                        className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-[#5a627a] hover:text-[#1a1f2c] hover:bg-white border border-[#e8e9f0] hover:border-[#c77950]/30 rounded-lg transition-all mb-2 shadow-2xs"
                        title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {sidebarCollapsed ? (
                            <ChevronRight className="h-4 w-4 text-[#c77950]" />
                        ) : (
                            <>
                                <ChevronLeft className="h-4 w-4 text-[#c77950]" />
                                <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#5a627a]">Collapse Sidebar</span>
                            </>
                        )}
                    </button>

                    {!sidebarCollapsed && (
                        <div className="flex items-center justify-between pt-2 border-t border-[#e8e9f0]">
                            <div className="flex items-center min-w-0">
                                <div className="h-8 w-8 rounded-full bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-xs font-bold text-[#c77950] flex-shrink-0">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="ml-2.5 min-w-0">
                                    <p className="text-xs font-bold text-[#1a1f2c] truncate">
                                        {user.name}
                                    </p>
                                    <div className="inline-flex items-center gap-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#c77950]" />
                                        <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-[#c77950]">
                                            {userRole}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <Link
                                href={route("logout")}
                                method="post"
                                as="button"
                                className="rounded-lg p-1.5 text-[#8c94a8] hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
                                title="Sign out"
                            >
                                <LogOut className="h-4 w-4" />
                            </Link>
                        </div>
                    )}

                    {sidebarCollapsed && (
                        <div className="flex flex-col items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-[#c77950]/15 border border-[#c77950]/30 flex items-center justify-center text-xs font-bold text-[#c77950]">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content - Full Height & Full Width */}
            <div
                className={`flex-1 flex flex-col min-w-0 w-full overflow-hidden transition-all duration-300 z-10
                ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-64"}
            `}
            >
                {/* Top Navigation Header - SAME AS PUBLIC NAVBAR (Full Width, Glassmorphism, Copper Bottom Border) */}
                <nav className="h-[62px] border-b border-[#c77950] bg-white/95 backdrop-blur-[20px] shadow-[0_4px_25px_rgba(30,35,60,0.08)] flex-shrink-0 z-20 w-full">
                    <div className="px-4 sm:px-6 lg:px-8 h-full w-full">
                        <div className="flex h-full justify-between items-center w-full">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden rounded-lg p-2 text-[#5a627a] hover:bg-gray-100 hover:text-[#1a1f2c] transition-colors"
                                    aria-label="Open sidebar"
                                >
                                    <Menu className="h-5 w-5 text-[#c77950]" />
                                </button>
                                
                                <div className="flex shrink-0 items-center">
                                    {header}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 sm:gap-4">
                                {/* Quick Live Website Button */}
                                <Link
                                    href="/"
                                    target="_blank"
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-[0_4px_16px_rgba(199,121,80,0.35)] transition-all hover:-translate-y-0.5"
                                >
                                    <span>Public Website</span>
                                    <ExternalLink className="w-3 h-3" />
                                </Link>

                                <div className="relative">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <span className="inline-flex rounded-md">
                                                <button
                                                    type="button"
                                                    className="
                                                        inline-flex items-center gap-2 rounded-full
                                                        border border-[#c77950]/30
                                                        bg-white hover:bg-[#fafbfe]
                                                        px-3.5 py-1.5 sm:py-2 text-xs font-bold
                                                        text-[#1a1f2c] hover:text-[#c77950]
                                                        focus:outline-none transition-all shadow-2xs
                                                    "
                                                >
                                                    <div className="w-5 h-5 rounded-full bg-[#c77950] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span className="hidden sm:inline">{user.name}</span>
                                                    <ChevronDown className="h-3.5 w-3.5 text-[#c77950]" />
                                                </button>
                                            </span>
                                        </Dropdown.Trigger>

                                        <Dropdown.Content
                                            align="right"
                                            width="48"
                                            contentClasses="bg-white border border-[#c77950]/30 rounded-2xl shadow-[0_15px_40px_rgba(30,35,60,0.15)] py-1.5 overflow-hidden"
                                        >
                                            <Dropdown.Link
                                                href={route("profile.edit")}
                                                className="
                                                    flex items-center gap-2.5
                                                    px-4 py-2.5 text-xs font-bold
                                                    text-[#1a1f2c] hover:text-[#c77950]
                                                    hover:bg-[#c77950]/10 transition-colors
                                                "
                                            >
                                                <User className="h-4 w-4 text-[#c77950]" />
                                                <span>Profile Settings</span>
                                            </Dropdown.Link>

                                            <Dropdown.Link
                                                href="/"
                                                className="
                                                    flex items-center gap-2.5
                                                    px-4 py-2.5 text-xs font-bold
                                                    text-[#1a1f2c] hover:text-[#c77950]
                                                    hover:bg-[#c77950]/10 transition-colors
                                                "
                                            >
                                                <Home className="h-4 w-4 text-[#c77950]" />
                                                <span>Public Website</span>
                                            </Dropdown.Link>

                                            <div className="border-t border-[#e8e9f0] my-1" />

                                            <Dropdown.Link
                                                href={route("logout")}
                                                method="post"
                                                as="button"
                                                className="
                                                    flex w-full items-center gap-2.5
                                                    px-4 py-2.5 text-xs font-bold
                                                    text-red-600 hover:text-red-700
                                                    hover:bg-red-50 transition-colors
                                                "
                                            >
                                                <LogOut className="h-4 w-4 text-red-600" />
                                                <span>Sign Out</span>
                                            </Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Page Content - Full Width Container */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#e8e9f0] w-full">
                    <main className="p-4 sm:p-6 lg:p-8 w-full">{children}</main>
                </div>
            </div>
        </div>
    );
}