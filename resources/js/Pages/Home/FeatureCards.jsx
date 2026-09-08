import React from "react";
import {
    LayoutGrid,
    ImageIcon,
    PhoneCall,
    FileText,
    ArrowUpRight,
    Sparkles,
    Mail,
    Phone,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import APP_CONFIG from "../config";

const features = [
    {
        num: "01",
        tag: "RESIDENCES",
        icon: LayoutGrid,
        title: "Plans & Availability",
        description:
            "Browse available designer residences, compare spacious studio to 2-bedroom floor plans, and find your ideal Los Angeles home.",
        button: "View Plans",
        link: "/availability",
    },
    {
        num: "02",
        tag: "MEDIA",
        icon: ImageIcon,
        title: "Visual Gallery",
        description:
            "Explore sunlit interiors, custom terrazzo finishes, and architectural spaces through our curated gallery.",
        button: "View Gallery",
        link: "/gallery",
    },
    {
        num: "03",
        tag: "INQUIRIES",
        icon: PhoneCall,
        title: "Contact Us",
        description:
            "Connect directly with our dedicated team to schedule a private walkthrough or inquire about current lease specials.",
        contacts: [
            { icon: Phone, text: APP_CONFIG.Phone, href: `tel:${APP_CONFIG.Phone}` },
            { icon: Mail, text: APP_CONFIG.email, href: `mailto:${APP_CONFIG.email}` },
        ],
        button: "Contact Us",
        link: "/Contact",
    },
    {
        num: "04",
        tag: "DISCOVERY",
        icon: FileText,
        title: "General Information",
        description:
            "Review comprehensive building specifications, pet policies, parking options, neighborhood highlights, and resident perks.",
        button: "Read Details",
        link: "/generalInfo",
    },
];

export default function FeatureCards() {
    return (
        <section
            className="relative py-24 sm:py-32 bg-[#e8e9f0] overflow-hidden border-t border-[#d6d8e5]"
        >
            {/* =========================================================================
                SVG KOREAN TRADITIONAL GEOMETRIC LATTICE BACKGROUND PATTERN
            ========================================================================== */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04] mix-blend-multiply"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="feature-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#feature-changsal-pattern)" />
            </svg>

            {/* Ambient Background Warmth */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[500px] bg-[#c77950]/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/70 rounded-full blur-[130px] pointer-events-none" />

            <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16">

                {/* Header Tagline & Section Title */}
                <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#c77950]/30 shadow-xs mb-4">
                        <span className="w-2 h-2 rounded-full bg-[#c77950] animate-pulse" />
                        <span className="text-[10.5px] sm:text-xs font-bold tracking-[2.5px] uppercase text-[#c77950]">
                            ESSENTIAL EXPLORATION • THE 900
                        </span>

                    </div>

                    <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1f2c] tracking-tight leading-[1.15]">
                        Discover Everything You Need to{" "}
                        <span className="font-cormorant italic font-normal text-4xl sm:text-5xl md:text-6xl text-[#c77950] block sm:inline">
                            Make The 900 Home
                        </span>
                    </h2>

                    {/* Geometric Ornamental Divider */}
                    <div className="flex items-center justify-center gap-3 mt-6 opacity-75">
                        <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#c77950]" />
                        <div className="w-2 h-2 rotate-45 border border-[#c77950] bg-white/80" />
                        <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#c77950]" />
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
                    {features.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <Link
                                key={index}
                                href={item.link}
                                className="group relative flex flex-col justify-between rounded-[32px] bg-white/95 border border-white/80 p-8 sm:p-9 backdrop-blur-2xl shadow-[0_12px_35px_rgba(30,35,60,0.06)] transition-all duration-500 hover:-translate-y-2.5 hover:border-[#c77950]/50 hover:shadow-[0_25px_50px_rgba(199,121,80,0.22)] overflow-hidden min-h-[440px]"
                            >
                                {/* Top Accent Gradient Hover Border */}
                                <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-[32px] bg-gradient-to-r from-[#ffd9c7] via-[#c77950] to-[#b3633b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Traditional Korean Corner Fretwork Accents */}
                                <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs group-hover:border-[#c77950]/70 transition-colors" />
                                <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs group-hover:border-[#c77950]/70 transition-colors" />
                                <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs group-hover:border-[#c77950]/70 transition-colors" />
                                <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs group-hover:border-[#c77950]/70 transition-colors" />

                                {/* Large Ambient Number Watermark */}
                                <div className="absolute -top-3 -right-2 font-cormorant text-8xl font-bold text-[#c77950]/[0.07] group-hover:text-[#c77950]/[0.14] select-none pointer-events-none transition-colors duration-500">
                                    {item.num}
                                </div>

                                <div>
                                    {/* Top Row: Icon Medallion & Tag */}
                                    <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#c77950]/15 to-[#c77950]/5 border border-[#c77950]/30 shadow-xs flex items-center justify-center text-[#c77950] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#c77950] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(199,121,80,0.35)]">
                                            <Icon size={26} strokeWidth={1.8} />
                                        </div>

                                        <span className="px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/20 text-[10.5px] font-bold tracking-wider text-[#c77950] uppercase">
                                            {item.tag}
                                        </span>
                                    </div>

                                    {/* Card Title */}
                                    <h3 className="text-2xl sm:text-[26px] font-cormorant font-bold text-[#1a1f2c] group-hover:text-[#c77950] transition-colors duration-300 leading-tight">
                                        {item.title}
                                    </h3>

                                    {/* Divider */}
                                    <div className="mt-3.5 h-[1.5px] w-8 bg-[#c77950]/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#c77950]" />

                                    {/* Card Description */}
                                    <p className="mt-4 text-[13.5px] sm:text-sm leading-relaxed text-[#5a627a] font-normal">
                                        {item.description}
                                    </p>

                                    {/* Contact Specific Chips if present */}
                                    {item.contacts && (
                                        <div className="mt-5 space-y-2 pt-2 border-t border-[#e8e9f0]">
                                            {item.contacts.map((c, cIdx) => {
                                                const CIcon = c.icon;
                                                return (
                                                    <div
                                                        key={cIdx}
                                                        className="flex items-center gap-2 text-[13px] sm:text-sm font-bold text-[#1a1f2c] bg-white/80 rounded-xl px-3 py-1.5 border border-[#d6d8e5]/80"
                                                    >
                                                        <CIcon size={14} className="text-[#c77950] shrink-0" />
                                                        <span className="truncate">{c.text}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Bottom Interactive Action CTA */}
                                <div className="mt-8 pt-5 border-t border-[#e8e9f0] flex items-center justify-between relative z-10">
                                    <span className="text-[#c77950] font-bold text-xs uppercase tracking-[2px] group-hover:text-[#b3633b] transition-colors">
                                        {item.button}
                                    </span>

                                    <div className="w-8 h-8 rounded-full bg-[#c77950]/10 flex items-center justify-center text-[#c77950] group-hover:bg-[#c77950] group-hover:text-white transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 shadow-2xs">
                                        <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
