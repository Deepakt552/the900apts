import React, { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "../config";
import Footer from "../../Layouts/Footer";
import Navbar from "../../Layouts/Navbar";
import LuxuryNeighborhoodMap from "./LuxuryNeighborhoodMap";
import {
    Train,
    Utensils,
    Coffee,
    ShoppingBag,
    Compass,
    Footprints,
    Sparkles,
    ArrowRight,
    MapPin,
    CheckCircle2,
    Clock,
    Flame,
    Music,
    Car,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const transitMetrics = [
    {
        icon: Footprints,
        title: "96 / 100 Walk Score®",
        subtitle: "Walker's Paradise",
        desc: "Daily errands and world-class dining do not require a car.",
    },
    {
        icon: Train,
        title: "5 Min Walk",
        subtitle: "Wilshire / Vermont Metro",
        desc: "Direct dual-line subway access (B & D Lines) to DTLA & Hollywood.",
    },
    {
        icon: Compass,
        title: "12 Mins",
        subtitle: "Direct DTLA Access",
        desc: "Rapid commute to Financial District, Arts District, and LA Live.",
    },
    {
        icon: Clock,
        title: "15 Mins",
        subtitle: "Hollywood & Mid-City",
        desc: "Effortless reach to Miracle Mile, USC campus, and Beverly Hills.",
    },
];

const neighborhoodHighlights = [
    {
        title: "Iconic K-Town Culinary Scene",
        subtitle: "Culinary & Social Hub",
        category: "Dining & Nightlife",
        desc: "From late-night Michelin-recognized Korean BBQ and buzzing Chapman Plaza lounges to 24/7 comforting dessert cafes and hidden speakeasies.",
        image: `${APP_CONFIG.ORIGIN}/pic/IMG_8449.webp`,
        spots: [
            { name: "Park's BBQ & Quarters", distance: "2 Min Walk" },
            { name: "Chapman Plaza Nightlife", distance: "4 Min Drive" },
            { name: "Sun Nong Dan (24-Hour)", distance: "4 Min Drive" },
        ],
    },
    {
        title: "Unmatched Urban Connectivity",
        subtitle: "Direct Subway & Transit",
        category: "Transit-Oriented",
        desc: "Located 5 minutes on foot from the Wilshire/Vermont Metro station, giving you seamless transit without fighting Los Angeles traffic.",
        image: `${APP_CONFIG.ORIGIN}/pic/IMG_8447.webp`,
        spots: [
            { name: "Wilshire / Vermont Subway", distance: "5 Min Walk" },
            { name: "DTLA Arts & Financial District", distance: "12 Mins" },
            { name: "Hollywood & Vine", distance: "15 Mins" },
        ],
    },
    {
        title: "Storied Arts, Culture & Parks",
        subtitle: "Entertainment & Heritage",
        category: "Art & Leisure",
        desc: "Surround yourself with historic 1920s Art Deco architectural monuments, world-class live concerts at The Wiltern, and scenic lakeside community parks.",
        image: `${APP_CONFIG.ORIGIN}/pic/IMG_8445.webp`,
        spots: [
            { name: "The Wiltern Historic Theater", distance: "4 Min Drive" },
            { name: "Lafayette Park & Recreation", distance: "6 Min Walk" },
            { name: "MacArthur Park & Lake", distance: "8 Min Walk" },
        ],
    },
];

const neighborhoodPerks = [
    {
        icon: Flame,
        title: "24/7 Vibrant Energy",
        desc: "Koreatown is one of LA's only true 24-hour neighborhoods, offering late-night cafes, bakeries, and dining any time of day.",
    },
    {
        icon: ShoppingBag,
        title: "Gourmet Markets at Your Doorstep",
        desc: "Step across the street to El Super for fresh groceries and produce, or visit H Mart and Northgate within minutes.",
    },
    {
        icon: Music,
        title: "World-Class Entertainment",
        desc: "Catch live indie concerts, DJ sets, comedy, and private karaoke rooms across historic and contemporary venues.",
    },
    {
        icon: Car,
        title: "Central Hub to all of LA",
        desc: "Centrally positioned between Downtown Los Angeles, Hollywood, USC, and Beverly Hills for the ultimate commute advantage.",
    },
];

export default function Neighborhood() {
    const heroRef = useRef(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
            );
        }
    }, []);

    return (
        <>
            <Head>
                <title>Koreatown Neighborhood · The 900 Residences LA</title>
                <meta
                    name="description"
                    content="Discover the vibrant Koreatown neighborhood surrounding The 900 Residences. Walking distance to Metro, K-BBQ, Chapman Plaza, and DTLA access."
                />
            </Head>
            <Navbar />

            <div className="relative bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c] overflow-hidden">
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
                            id="neighborhood-changsal-pattern"
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
                    <rect width="100%" height="100%" fill="url(#neighborhood-changsal-pattern)" />
                </svg>

                {/* ================= HERO BANNER ================= */}
                <section className="relative min-h-[480px] sm:min-h-[540px] md:min-h-[580px] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pb-24 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/img/footer.webp)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
                    </div>

                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#c77950]/20 rounded-full blur-[110px]" />

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center">
                        <div ref={heroRef} className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#c77950]/60 shadow-lg mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#c77950] animate-pulse" />
                                <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#e8e9f0]">
                                    THE 900 • KOREATOWN RESIDENCES
                                </span>
                            </div>

                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                                The Epicenter of Koreatown
                            </h1>

                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                Step outside to Michelin-recognized dining, iconic nightlife, and the Wilshire/Vermont Metro station. Everything you love about Los Angeles begins right at your doorstep.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
                                <a
                                    href="#neighborhood-map"
                                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_6px_25px_rgba(199,121,80,0.45)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <span>EXPLORE LOCAL MAP</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>

                                <Link
                                    href="/availability"
                                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/50 hover:border-transparent text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                                >
                                    <span>VIEW AVAILABILITY</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= QUICK TRANSIT & WALKABILITY DOCK (4 RESPONSIVE METRIC CARDS) ================= */}
                <section className="relative z-20 -mt-10 sm:-mt-12 max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="relative rounded-[28px] sm:rounded-[36px] bg-white/95 border border-white/80 p-5 sm:p-7 backdrop-blur-xl shadow-[0_15px_40px_rgba(30,35,60,0.08)] overflow-hidden">
                        {/* Corner Accents */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs pointer-events-none" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs pointer-events-none" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs pointer-events-none" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs pointer-events-none" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 divide-y sm:divide-y-0 lg:divide-x divide-[#e8e9f0]">
                            {transitMetrics.map((metric, mIdx) => {
                                const Icon = metric.icon;
                                return (
                                    <div key={mIdx} className={`flex items-start gap-3.5 ${mIdx > 0 ? "pt-4 sm:pt-0 lg:pl-5" : ""}`}>
                                        <div className="w-11 sm:w-12 h-11 sm:h-12 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] shrink-0 shadow-2xs">
                                            <Icon className="w-5 sm:w-6 h-5 sm:h-6" />
                                        </div>
                                        <div>
                                            <div className="font-montserrat font-extrabold text-lg sm:text-xl text-[#1a1f2c] leading-tight">
                                                {metric.title}
                                            </div>
                                            <div className="text-[11px] font-bold text-[#c77950] uppercase tracking-wider mt-0.5">
                                                {metric.subtitle}
                                            </div>
                                            <p className="text-[11px] text-[#5a627a] mt-1 leading-snug">
                                                {metric.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>


                {/* ================= INTERACTIVE NEIGHBORHOOD MAP ================= */}
                <section id="neighborhood-map" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-10">
                        <span className="text-[11px] font-bold text-[#c77950] tracking-widest uppercase bg-white px-4 py-1.5 rounded-full border border-[#d6d8e5] shadow-xs">
                            INTERACTIVE LOCAL MAP & HOTSPOTS
                        </span>
                        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1f2c] mt-3">
                            Discover What's Nearby
                        </h2>
                        <p className="text-xs sm:text-sm text-[#5a627a] max-w-xl mx-auto mt-2 font-normal">
                            Explore top-rated Korean BBQ, specialty coffee roasters, gourmet grocery markets, and metro connections surrounding 2880 James M Wood Blvd.
                        </p>
                    </div>

                    <LuxuryNeighborhoodMap />
                </section>

                {/* ================= WHY LIVE IN KOREATOWN (4 VALUE PROPOSITIONS) ================= */}
                <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="rounded-[32px] sm:rounded-[44px] bg-white/95 border border-white/80 p-6 sm:p-10 lg:p-12 shadow-[0_15px_45px_rgba(30,35,60,0.06)]">
                        <div className="text-center mb-8 sm:mb-10">
                            <span className="text-[10.5px] font-bold text-[#c77950] tracking-widest uppercase bg-[#c77950]/10 px-4 py-1.5 rounded-full border border-[#c77950]/20">
                                THE 900 ADVANTAGE
                            </span>
                            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#1a1f2c] mt-2.5">
                                Why You'll Love Living in Koreatown
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {neighborhoodPerks.map((perk, pIdx) => {
                                const Icon = perk.icon;
                                return (
                                    <div key={pIdx} className="p-5 rounded-2xl bg-[#fafbfe] border border-[#e8e9f0] hover:border-[#c77950]/40 transition-all group">
                                        <div className="w-11 h-11 rounded-xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] group-hover:bg-[#c77950] group-hover:text-white transition-colors mb-3.5 shadow-2xs">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-montserrat font-bold text-sm sm:text-base text-[#1a1f2c] group-hover:text-[#c77950] transition-colors leading-snug">
                                            {perk.title}
                                        </h4>
                                        <p className="text-xs text-[#5a627a] mt-1.5 leading-relaxed font-normal">
                                            {perk.desc}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= BOTTOM CALLOUT BANNER ================= */}
                <section className="py-16 px-4 sm:px-6 max-w-5xl mx-auto">
                    <div className="relative rounded-[32px] sm:rounded-[40px] bg-gradient-to-r from-[#c77950] via-[#b3633b] to-[#9c4f29] p-8 sm:p-12 text-white shadow-[0_20px_50px_rgba(199,121,80,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                        {/* Corner Hanok Fretwork */}
                        <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/40 rounded-tl-xs pointer-events-none" />
                        <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/40 rounded-tr-xs pointer-events-none" />
                        <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/40 rounded-bl-xs pointer-events-none" />
                        <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/40 rounded-br-xs pointer-events-none" />

                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#ffd9c7] text-[10.5px] font-bold uppercase tracking-wider mb-2">
                                <span>✦ NOW LEASING IN K-TOWN</span>
                            </div>
                            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold">
                                Live Where LA Thrives
                            </h3>
                            <p className="text-white/90 text-xs sm:text-sm md:text-base mt-2 max-w-lg font-light leading-relaxed">
                                Experience studio, 1 & 2 bedroom luxury residences with designer finishes and 360° skyline vistas in the heart of Los Angeles.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <Link
                                href="/availability"
                                className="inline-flex items-center gap-2 px-6 sm:px-7 py-3.5 rounded-full bg-white text-[#1a1f2c] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:bg-[#ffd9c7] transition-all shrink-0"
                            >
                                <span>VIEW AVAILABILITY</span>
                                <ArrowRight className="w-4 h-4 text-[#c77950]" />
                            </Link>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}