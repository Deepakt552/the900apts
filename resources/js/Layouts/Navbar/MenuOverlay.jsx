import React, { useState, useEffect } from "react";
import APP_CONFIG from "../../Pages/config";
import { Link, usePage } from "@inertiajs/react";
import { Phone, Mail, ArrowUpRight, ArrowRight, MapPin, Clock } from "lucide-react";

const MenuOverlay = ({ isOpen, onClose }) => {
    const { url } = usePage();
    const { publicLinks = [] } = usePage().props;

    const defaultMenuItems = [
        {
            number: "01",
            label: "Home",
            subtitle: "Luxury Koreatown Living",
            href: route("Home"),
            route: "Home",
            image: `${APP_CONFIG.HOME_URL}The-900-Apartments-Exterior.webp`,
            tag: "WELCOME TO THE 900",
        },
        {
            number: "02",
            label: "Floor Plans",
            subtitle: "Studio, 1 & 2 Bedroom Suites",
            href: route("availability"),
            route: "availability",
            image: `${APP_CONFIG.HOME_URL}pic/IMG_3494.webp`,
            tag: "DESIGNER RESIDENCES",
        },
        {
            number: "03",
            label: "Amenities",
            subtitle: "Resort Pool, Spa & Sky Lounge",
            href: route("amenity"),
            route: "amenity",
            image: `${APP_CONFIG.HOME_URL}Header/Ameneties.webp`,
            tag: "CURATED EXPERIENCES",
        },
        {
            number: "04",
            label: "Gallery",
            subtitle: "Architecture & Interior Visuals",
            href: route("gallery"),
            route: "gallery",
            image: `${APP_CONFIG.HOME_URL}img/Apt/roof.webp`,
            tag: "VISUAL TOUR",
        },
        {
            number: "05",
            label: "Neighborhood",
            subtitle: "In & Around Koreatown",
            href: route("neighborhood"),
            route: "neighborhood",
            image: `${APP_CONFIG.HOME_URL}img/footer.webp`,
            tag: "LOS ANGELES, CA",
        },
        {
            number: "06",
            label: "Contact",
            subtitle: "Connect With Our Team",
            href: route("Contact"),
            route: "Contact",
            image: `${APP_CONFIG.HOME_URL}pic/Coworking%20Room.webp`, 
            tag: "LEASING OFFICE",
        },
        {
            number: "07",
            label: "General Info",
            subtitle: "Policies, Accessibility & Details",
            href: route("generalInfo"),
            route: "generalInfo",
            image: `${APP_CONFIG.HOME_URL}Header/Genral%20info.webp`,
            tag: "RESIDENT INFORMATION",
        },
    ];

    const menuItems =
        publicLinks.length > 0
            ? publicLinks.map((item, index) => ({
                number: String(index + 1).padStart(2, "0"),
                label: item.label,
                subtitle: "The 900 Residences",
                href: item.url,
                route: item.route_name ?? null,
                image: defaultMenuItems[index % defaultMenuItems.length].image,
                tag: "THE 900 RESIDENCES",
            }))
            : defaultMenuItems;

    const [activeHoverIndex, setActiveHoverIndex] = useState(0);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Set initial active index to the current page or 0
            const currentIndex = menuItems.findIndex(
                (item) => item.route && route().current(item.route)
            );
            if (currentIndex !== -1) {
                setActiveHoverIndex(currentIndex);
            } else {
                setActiveHoverIndex(0);
            }
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const activeItem = menuItems[activeHoverIndex] || menuItems[0];

    return (
        <div
            id="site-menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
            className={`fixed inset-0 w-full h-full 
                  bg-[#e8e9f0] z-[500]
                  transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto
                  ${isOpen
                    ? "opacity-100 visible pointer-events-auto"
                    : "opacity-0 invisible pointer-events-none"
                }
                  flex flex-col justify-between`}
        >
            {/* =========================================================================
                SVG KOREAN TRADITIONAL CHANGSAL LATTICE BACKGROUND PATTERN
            ========================================================================== */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="menu-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#menu-changsal-pattern)" />
            </svg>

            {/* Background Ambient Warmth */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c77950]/10 rounded-full blur-[140px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/60 rounded-full blur-[120px] pointer-events-none z-0" />

            {/* =========================
                MENU TOP BAR (Seamless with Navbar)
            ========================== */}
            <header className="sticky top-0 left-0 w-full h-[48px] md:h-[62px] flex items-center justify-between px-0 pr-2 sm:pr-4 md:pr-8 bg-[#e8e9f0]/95 backdrop-blur-[20px] border-b border-[#c77950] z-30 shadow-xs">
                {/* Logo Skewed Badge */}
                <div className="relative h-[64px] sm:h-[72px] md:h-[80px] mt-0 z-[110] flex-shrink-0 drop-shadow-[0_10px_22px_rgba(0,0,0,0.3)]">
                    <div
                        className="absolute top-0 left-[-35px] w-[calc(100%+35px)] sm:w-[calc(100%+45px)] h-full bg-gradient-to-r from-[#c77950] to-[#b3633b] border-r border-[#c77950] border-b border-[#c77950] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(199,121,80,0.35)] rounded-br-[10px]"
                        style={{
                            transform: "skewX(-28deg)",
                            transformOrigin: "top left",
                        }}
                    />
                    <div className="relative z-[2] h-full flex items-center px-[22px] sm:px-[32px] md:px-[45px] pr-[50px] sm:pr-[68px] md:pr-[80px]">
                        <img
                            src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
                            alt="THE 900 Logo"
                            className="h-[34px] sm:h-[42px] md:h-[54px] w-auto object-contain brightness-0 invert mt-[-2px] md:mt-0 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                        />
                    </div>
                </div>

                {/* Quick Phone & Email (Hidden on Mobile) */}
                <div className="hidden lg:flex items-center gap-5 ml-2 xl:ml-4 flex-shrink-0">
                    <a
                        href={`tel:${APP_CONFIG.Phone}`}
                        className="group flex items-center gap-2 whitespace-nowrap text-[#1a1f2c] hover:text-[#c77950] transition-colors"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#d6d8e5] bg-white text-[#c77950] shadow-xs group-hover:bg-[#c77950] group-hover:text-white transition-all">
                            <Phone size={13} strokeWidth={1.8} />
                        </span>
                        <span className="text-[13.5px] sm:text-sm font-extrabold tracking-wide text-[#1a1f2c] group-hover:text-[#c77950]">
                            {APP_CONFIG.Phone}
                        </span>
                    </a>

                    <div className="h-5 w-px bg-[#d6d8e5]" />

                    <a
                        href={`mailto:${APP_CONFIG.email}`}
                        className="group flex items-center gap-2 whitespace-nowrap text-[#1a1f2c] hover:text-[#c77950] transition-colors"
                    >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full border border-[#d6d8e5] bg-white text-[#c77950] shadow-xs group-hover:bg-[#c77950] group-hover:text-white transition-all">
                            <Mail size={13} strokeWidth={1.8} />
                        </span>
                        <span className="text-[13.5px] sm:text-sm font-bold tracking-wide text-[#1a1f2c] group-hover:text-[#c77950]">
                            {APP_CONFIG.email}
                        </span>
                    </a>
                </div>

                {/* Close Button & Apply */}
                <div className="flex items-center gap-2 sm:gap-3 z-10">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://www.rentcafe.com/apartments/ca/los-angeles/the-900/default.aspx"
                        className="hidden sm:inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-[11px] sm:text-[12px] font-bold tracking-[1.2px] uppercase px-4 sm:px-5 py-2 rounded-full shadow-[0_3px_14px_rgba(199,121,80,0.4)] hover:shadow-[0_5px_20px_rgba(199,121,80,0.6)] transition-all h-[36px] sm:h-[38px] md:h-[40px]"
                    >
                        <span className="leading-none flex items-center">APPLY NOW</span>
                        <ArrowRight size={14} strokeWidth={2.5} className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </a>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close Menu"
                        className="flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-full bg-white border border-[#c77950] text-[#c77950] hover:bg-[#c77950] hover:text-white text-[11px] sm:text-[11.5px] font-bold tracking-[1.5px] uppercase shadow-xs transition-all duration-300 h-[36px] sm:h-[38px] md:h-[40px] cursor-pointer"
                    >
                        <span className="leading-none flex items-center">CLOSE</span>
                        <span className="text-xs font-bold leading-none">✕</span>
                    </button>
                </div>
            </header>

            {/* =========================
                MAIN EDITORIAL CONTENT GRID
            ========================== */}
            <nav aria-label="Site Directory Navigation" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 md:px-12 py-8 lg:py-12 z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">

                {/* LEFT: EDITORIAL NAVIGATION */}
                <div className="flex flex-col justify-center">
                    <div className="mb-4 sm:mb-6">
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[3px] uppercase text-[#c77950] flex items-center gap-2">
                            <span className="w-6 h-[1.5px] bg-[#c77950]" />
                            EXPLORE RESIDENCES
                        </span>
                    </div>

                    <nav className="flex flex-col gap-1 sm:gap-2">
                        {menuItems.map((item, index) => {
                            const isCurrent =
                                item.route && route().current(item.route);
                            const isHovered = activeHoverIndex === index;

                            return (
                                <Link
                                    key={index}
                                    href={item.href}
                                    onClick={onClose}
                                    onMouseEnter={() => setActiveHoverIndex(index)}
                                    className={`group flex items-center justify-between py-2 sm:py-2.5 border-b transition-all duration-300 no-underline ${isHovered || isCurrent
                                        ? "border-[#c77950] translate-x-2"
                                        : "border-[#d6d8e5]/60 hover:border-[#c77950]/50"
                                        }`}
                                >
                                    <div className="flex items-baseline gap-3 sm:gap-5">
                                        <span
                                            className={`font-mono text-xs sm:text-sm font-bold transition-colors duration-300 ${isHovered || isCurrent
                                                ? "text-[#c77950]"
                                                : "text-[#8a92a6] group-hover:text-[#c77950]"
                                                }`}
                                        >
                                            {item.number}
                                        </span>

                                        <span
                                            className={`font-cormorant text-2xl sm:text-3xl md:text-4xl lg:text-[2.6rem] font-bold tracking-[1px] uppercase transition-all duration-300 ${isHovered || isCurrent
                                                ? "text-[#c77950] italic"
                                                : "text-[#1a1f2c] group-hover:text-[#c77950]"
                                                }`}
                                        >
                                            {item.label}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`text-xs font-semibold tracking-wider text-[#5a627a] hidden sm:block transition-opacity duration-300 ${isHovered || isCurrent
                                                ? "opacity-100 text-[#c77950]"
                                                : "opacity-0 group-hover:opacity-80"
                                                }`}
                                        >
                                            {item.subtitle}
                                        </span>
                                        <ArrowUpRight
                                            size={20}
                                            className={`transition-all duration-300 ${isHovered || isCurrent
                                                ? "text-[#c77950] translate-x-1 -translate-y-1 opacity-100"
                                                : "text-[#8a92a6] opacity-0 group-hover:opacity-100"
                                                }`}
                                        />
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* RIGHT: CINEMATIC IMAGE PREVIEW SHOWCASE */}
                <div className="hidden lg:flex flex-col gap-5">
                    {/* Visual Card */}
                    <div className="relative rounded-[32px] overflow-hidden border-4 border-white shadow-[0_25px_60px_rgba(26,31,44,0.12)] aspect-[16/11] bg-[#1a1f2c] group">
                        <img
                            key={activeItem.image}
                            src={activeItem.image}
                            alt={activeItem.label}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 animate-fade-in"
                        />

                        {/* Subtle Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Top Badge */}
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/40 shadow-sm">
                            <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#c77950]">
                                {activeItem.tag}
                            </span>
                        </div>

                        {/* Bottom Overlay Label */}
                        <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white">
                            <div>
                                <span className="font-cormorant text-2xl md:text-3xl font-bold tracking-wide block drop-shadow-md">
                                    {activeItem.label}
                                </span>
                                <span className="text-xs text-white/85 font-light tracking-wider drop-shadow-sm">
                                    {activeItem.subtitle}
                                </span>
                            </div>

                            <Link
                                href={activeItem.href}
                                onClick={onClose}
                                className="flex items-center gap-1 bg-[#c77950] text-white text-[11px] font-bold tracking-[1.5px] uppercase px-4 py-2 rounded-full shadow-md hover:bg-[#b3633b] transition-all"
                            >
                                <span>VIEW</span>
                                <span>→</span>
                            </Link>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="grid grid-cols-2 gap-3">
                        <Link
                            href="/Contact#inquiry-section"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 bg-white border border-[#c77950] text-[#c77950] hover:bg-[#c77950] hover:text-white font-bold text-xs tracking-[1.5px] uppercase py-3.5 px-4 rounded-full shadow-xs transition-all text-center"
                        >
                            Schedule Tour
                        </Link>

                        <Link
                            href="/availability"
                            onClick={onClose}
                            className="flex items-center justify-center gap-2 bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white font-bold text-xs tracking-[1.5px] uppercase py-3.5 px-4 rounded-full shadow-[0_4px_15px_rgba(199,121,80,0.35)] transition-all text-center"
                        >
                            Floor Plans & Apply
                        </Link>
                    </div>
                </div>

            </nav>

            {/* =========================
                BOTTOM CONCIERGE INFO BAR
            ========================== */}
            <footer className="sticky bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-[#d6d8e5] py-3.5 px-4 sm:px-8 md:px-12 z-20">
                <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
                    {/* Location */}
                    <div className="flex items-center gap-2 text-[#1a1f2c]">
                        <MapPin size={14} className="text-[#c77950] flex-shrink-0" />
                        <span className="font-medium">2880 James M Wood Blvd, Los Angeles, CA 90006</span>
                    </div>



                    {/* Hours */}
                    <div className="hidden md:flex items-center gap-2 text-[#5a627a]">
                        <Clock size={14} className="text-[#c77950] flex-shrink-0" />
                        <span>Mon – Fri: 9:00 AM – 5:30 PM</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MenuOverlay;

