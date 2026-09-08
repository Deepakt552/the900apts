import React, { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import {
    Building2,
    Maximize2,
    Calendar,
    PhoneCall,
    Mail,
    Sparkles,
    CheckCircle2,
    ArrowRight,
    MapPin,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Availability = () => {
    const heroRef = useRef(null);
    const mapSectionRef = useRef(null);
    const ctaRef = useRef(null);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
            );
        }

        if (mapSectionRef.current) {
            gsap.fromTo(
                mapSectionRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: mapSectionRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }
    }, []);

    const residenceTypes = [
        { type: "Studio Residences", badge: "Designer Layouts", },
        { type: "1 Bedroom Residences", badge: "Spacious Living", },
        { type: "2 Bedroom Residences", badge: "Dual Balconies", },
    ];

    return (
        <>
            <Head>
                <title>Floor Plans & Availability · The 900 Residences Koreatown</title>
                <meta
                    name="description"
                    content="Explore available designer studio, 1 & 2-bedroom luxury apartments at The 900 Residences in Koreatown, Los Angeles. Interactive 3D Sightmap."
                />
            </Head>
            <Navbar />

            <div className="bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c]">
                {/* ================= HERO SECTION ================= */}
                <section className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pb-24 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)]">
                    {/* Kitchen Architectural Background */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/pic/IMG_3494.webp)`,
                        }}
                    >
                        {/* Pure Cinematic Contrast Scrim */}
                        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50" />
                    </div>

                    {/* Terracotta Ambient Glow */}
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#c77950]/20 rounded-full blur-[110px]" />

                    {/* Hero Content */}
                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center">
                        <div ref={heroRef} className="flex flex-col items-center">
                            {/* Tagline Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#c77950]/60 shadow-lg mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#c77950] animate-pulse" />
                                <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#e8e9f0]">
                                    THE 900 • KOREATOWN RESIDENCES
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                                Floor Plans & Availability
                            </h1>

                            {/* Subtitle */}
                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                Discover thoughtfully designed studio, 1 & 2-bedroom luxury floor plans with smart access, quartz countertops, and panoramic views.
                            </p>

                            {/* Action Buttons */}
                            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
                                <a
                                    href="#sightmap-section"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_6px_25px_rgba(199,121,80,0.45)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <span>EXPLORE 3D SIGHTMAP</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>

                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/50 hover:border-transparent text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                                >
                                    <span>SCHEDULE TOUR</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= RESIDENCE OVERVIEW CARDS ================= */}
                <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        {residenceTypes.map((res, idx) => (
                            <div
                                key={idx}
                                className="rounded-[28px] bg-white/95 border border-white/80 p-6 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:border-[#c77950]/50 hover:shadow-[0_18px_40px_rgba(199,121,80,0.18)] transition-all duration-300"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c77950] bg-[#c77950]/10 px-3 py-1 rounded-full border border-[#c77950]/20">
                                        {res.badge}
                                    </span>
                                    <Building2 className="w-5 h-5 text-[#c77950]" />
                                </div>
                                <h3 className="font-montserrat font-bold text-xl text-[#1a1f2c]">
                                    {res.type}
                                </h3>
                                <p className="font-sans text-sm text-[#5a627a] mt-1 font-medium">
                                    {res.size}
                                </p>
                                <div className="mt-4 pt-3 border-t border-[#e8e9f0] flex items-center justify-between">
                                    <span className="text-xs font-semibold text-[#1a1f2c]">
                                        {res.price}
                                    </span>

                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ================= 3D SIGHTMAP INTERACTIVE SECTION ================= */}
                <section id="sightmap-section" ref={mapSectionRef} className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#d6d8e5] text-xs font-bold text-[#c77950] tracking-wider uppercase mb-2 shadow-xs">

                            <span>INTERACTIVE 3D BUILDING SIGHTMAP</span>
                        </div>
                        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1f2c]">
                            Select Your Level & Residence
                        </h2>
                        <p className="text-sm sm:text-base text-[#5a627a] max-w-xl mx-auto mt-2">
                            Explore real-time unit availability, interior floor plans, pricing, and exact building positions.
                        </p>
                    </div>

                    {/* Sightmap Frame */}
                    <div className="relative rounded-[32px] overflow-hidden bg-white/95 border border-[#d6d8e5] shadow-[0_20px_60px_rgba(0,0,0,0.08)] p-2 sm:p-4">
                        <iframe
                            title="The 900 Availability Map"
                            src="https://sightmap.com/embed/960p70nnv7n?theme=light"
                            width="100%"
                            height="820"
                            style={{ minHeight: "820px", border: "0", borderRadius: "24px" }}
                            frameBorder="0"
                            loading="lazy"
                            allowFullScreen
                        />
                    </div>
                </section>

                {/* ================= LEASING DOCK CALLOUT ================= */}
                <section className="pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
                    <div className="rounded-[32px] bg-gradient-to-r from-[#c77950] via-[#b3633b] to-[#9c4f29] p-8 sm:p-10 text-white shadow-[0_20px_50px_rgba(199,121,80,0.35)] flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="text-center md:text-left">
                            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold">
                                Prefer Personal Assistance?
                            </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <a
                                href={`tel:${APP_CONFIG.Phone}`}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1a1f2c] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:bg-[#ffd9c7] transition-all"
                            >
                                <PhoneCall className="w-4 h-4 text-[#c77950]" />
                                <span>{APP_CONFIG.Phone}</span>
                            </a>
                            <a
                                href={`mailto:${APP_CONFIG.email}`}
                                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/60 hover:border-transparent font-bold text-xs sm:text-sm tracking-wider uppercase backdrop-blur-md shadow-lg transition-all"
                            >
                                <Mail className="w-4 h-4" />
                                <span>{APP_CONFIG.email}</span>
                            </a>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default Availability;
