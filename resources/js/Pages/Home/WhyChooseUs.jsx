import React from "react";
import {
    Building2,
    UtensilsCrossed,
    Crown,
    ShieldCheck,
    Sparkles,
    Train,
    Footprints,
    PawPrint,
    CheckCircle2,
} from "lucide-react";

const stats = [
    {
        value: "50+",
        tag: "AMENITY SUITE",
        label: "Curated Amenities",
        icon: <Sparkles className="w-5 h-5 text-[#c77950]" />,
    },
    {
        value: "96",
        suffix: "Score",
        tag: "PEDESTRIAN HUB",
        label: "Walker's Paradise",
        icon: <Footprints className="w-5 h-5 text-[#c77950]" />,
    },
    {
        value: "15",
        suffix: "Min",
        tag: "TRANSIT ACCESS",
        label: "Metro & DTLA Access",
        icon: <Train className="w-5 h-5 text-[#c77950]" />,
    },
    {
        value: "100%",
        tag: "PET FRIENDLY",
        label: "Pet Welcoming",
        icon: <PawPrint className="w-5 h-5 text-[#c77950]" />,
    },
];

const features = [
    {
        num: "01",
        tag: "MODERN DESIGN",
        title: "Inspired Modern Architecture",
        subtitle: "Architectural Serenity Meets Urban Polish",
        icon: <Building2 className="w-7 h-7 text-[#c77950] group-hover:text-white transition-colors duration-300" />,
        description:
            "Clean architectural lines, expansive dual-glazed windows, and warm organic textures designed for mindful, high-end living in Los Angeles.",
        highlights: ["Quartz Countertops", "Smart Keyless Access", "In-Home Washer & Dryer"],
    },
    {
        num: "02",
        tag: "PRIME LOCATION",
        title: "Epicenter of Koreatown",
        subtitle: "World-Class Dining & Nightlife",
        icon: <UtensilsCrossed className="w-7 h-7 text-[#c77950] group-hover:text-white transition-colors duration-300" />,
        description:
            "Direct walking access to legendary BBQ, Michelin-recognized culinary icons, 24-hour dessert cafes, Chapman Plaza, and DTLA transit.",
        highlights: ["Michelin-Rated Dining", "Chapman Plaza & Line Hotel", "15 Min to DTLA & Hollywood"],
    },
    {
        num: "03",
        tag: "RESORT WELLNESS",
        title: "Curated Resort & Wellness",
        subtitle: "Panoramic Rooftop Deck",
        icon: <Crown className="w-7 h-7 text-[#c77950] group-hover:text-white transition-colors duration-300" />,
        description:
            "Inspired by holistic wellness culture featuring a panoramic rooftop deck, fitness studio, and open-air barbecue gardens.",
        highlights: ["Fully equipped Gym", "Rooftop Deck", "Open-air BBQ"],
    },
    {
        num: "04",
        tag: "PEACE OF MIND",
        title: "Secured Access Building & On-Site Security",
        subtitle: "Protected Entry & Dedicated Safety",
        icon: <ShieldCheck className="w-7 h-7 text-[#c77950] group-hover:text-white transition-colors duration-300" />,
        description:
            "Enjoy complete peace of mind with a fully secured access building, controlled entry points, and dedicated on-site security for all residents.",
        highlights: [
            "Secured Access Building",
            "On-Site Security",
            "Controlled Resident Entry",
        ],
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-[#e8e9f0] via-[#f2f3f8] to-[#e8e9f0] px-4 sm:px-8 lg:px-12 xl:px-16 py-20 sm:py-28 border-b border-[#d6d8e5]">
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
                        id="why-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#why-changsal-pattern)" />
            </svg>

            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#c77950]/8 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-white/70 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-6xl text-center">
                {/* 900 Seal Tagline Badge */}
                <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#c77950]/30 shadow-xs mb-4">
                    <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-[#c77950] to-[#b3633b] text-white flex items-center justify-center font-serif text-[9px] font-bold shadow-xs">
                        900
                    </div>
                    <span className="text-[10.5px] sm:text-xs font-bold tracking-[2.5px] uppercase text-[#c77950]">
                        WHY CHOOSE THE 900 • PREMIER RESIDENCES
                    </span>

                </div>

                {/* Section Heading */}
                <h2 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-extrabold text-[#1a1f2c] tracking-tight leading-[1.12]">
                    Elevated Koreatown Living <br />
                    <span className="font-cormorant italic font-normal text-4xl sm:text-5xl md:text-6xl text-[#c77950] block sm:inline">
                        Modern Luxury & Soul
                    </span>
                </h2>

                {/* Geometric Ornamental Divider */}
                <div className="flex items-center justify-center gap-3 mt-6 opacity-75">
                    <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#c77950]" />
                    <div className="w-2 h-2 rotate-45 border border-[#c77950] bg-white/80" />
                    <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#c77950]" />
                </div>

                {/* Subtitle */}
                <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-[#5a627a] font-normal leading-relaxed">
                    Where the dynamic culture of Los Angeles meets refined geometric architecture, curated wellness, and thoughtful hospitality.
                </p>
            </div>

            {/* 4 Feature Cards */}
            <div className="relative z-10 mx-auto mt-14 grid max-w-[1560px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {features.map((feature, idx) => (
                    <article
                        key={idx}
                        className="group relative flex flex-col justify-between rounded-[32px] bg-white/95 border border-white/80 p-7 sm:p-8 backdrop-blur-2xl shadow-[0_12px_35px_rgba(30,35,60,0.06)] transition-all duration-500 hover:-translate-y-2.5 hover:border-[#c77950]/50 hover:shadow-[0_22px_45px_rgba(199,121,80,0.2)] overflow-hidden"
                    >
                        {/* Top Accent Gradient Border Glow on Hover */}
                        <div className="absolute inset-x-0 top-0 h-1.5 rounded-t-[32px] bg-gradient-to-r from-[#ffd9c7] via-[#c77950] to-[#b3633b] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Traditional Korean Corner Fretwork Accents */}
                        <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs group-hover:border-[#c77950]/70 transition-colors" />
                        <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs group-hover:border-[#c77950]/70 transition-colors" />
                        <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs group-hover:border-[#c77950]/70 transition-colors" />
                        <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs group-hover:border-[#c77950]/70 transition-colors" />

                        {/* Ambient Number Watermark */}
                        <div className="absolute -top-3 -right-2 font-cormorant text-8xl font-bold text-[#c77950]/[0.07] group-hover:text-[#c77950]/[0.14] select-none pointer-events-none transition-colors duration-500">
                            {feature.num}
                        </div>

                        {/* Top Row: Icon Medallion & Tag */}
                        <div>
                            <div className="flex items-center justify-between gap-3 mb-6 relative z-10">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#c77950]/15 to-[#c77950]/5 border border-[#c77950]/25 shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:bg-[#c77950] group-hover:shadow-[0_8px_20px_rgba(199,121,80,0.35)]">
                                    {feature.icon}
                                </div>

                                <span className="rounded-full bg-[#c77950]/10 border border-[#c77950]/20 px-3 py-1 text-[11px] font-bold tracking-wider text-[#c77950] uppercase">
                                    {feature.tag}
                                </span>
                            </div>

                            {/* Card Titles */}
                            <h3 className="font-montserrat text-xl sm:text-[22px] font-bold leading-snug text-[#1a1f2c] group-hover:text-[#c77950] transition-colors duration-300">
                                {feature.title}
                            </h3>

                            <p className="font-cormorant italic text-base sm:text-lg text-[#c77950] mt-0.5 font-medium">
                                {feature.subtitle}
                            </p>

                            {/* Expanding Divider */}
                            <div className="mt-3.5 h-[1.5px] w-8 bg-[#c77950]/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[#c77950]" />

                            {/* Description */}
                            <p className="mt-4 text-[13px] sm:text-sm leading-relaxed text-[#5a627a] font-normal">
                                {feature.description}
                            </p>
                        </div>

                        {/* Bottom Feature Highlights Pills */}
                        <div className="mt-6 pt-5 border-t border-[#e8e9f0] space-y-2 relative z-10">
                            {feature.highlights.filter(Boolean).map((h, hIdx) => (
                                <div key={hIdx} className="flex items-center gap-2 text-xs text-[#1a1f2c] font-medium">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                    <span>{h}</span>
                                </div>
                            ))}
                        </div>
                    </article>
                ))}
            </div>

            {/* Bottom Quick Stats Dock */}
            <div className="relative z-10 mx-auto mt-14 max-w-5xl rounded-[32px] bg-white/95 border border-[#d6d8e5] p-6 sm:p-8 backdrop-blur-xl shadow-[0_15px_40px_rgba(30,35,60,0.06)] overflow-hidden">
                {/* Corner Fretwork Accents */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs pointer-events-none" />
                <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs pointer-events-none" />

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#e8e9f0]">
                    {stats.map((stat, idx) => (
                        <div key={idx} className={`flex flex-col items-center text-center ${idx > 0 ? 'pt-4 sm:pt-0' : ''}`}>
                            <div className="w-12 h-12 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center mb-2.5 shadow-xs">
                                {stat.icon}
                            </div>
                            <div className="font-montserrat text-2xl sm:text-3xl font-extrabold text-[#1a1f2c] leading-none">
                                <span className="text-[#c77950]">{stat.value}</span>
                                {stat.suffix && (
                                    <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1a1f2c] ml-1.5">
                                        {stat.suffix}
                                    </span>
                                )}
                            </div>
                            <span className="text-[11px] font-bold text-[#c77950] mt-1.5 uppercase tracking-wider">
                                {stat.tag}
                            </span>
                            <span className="text-[10px] sm:text-[11px] font-medium tracking-[1px] uppercase text-[#5a627a] mt-0.5">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}