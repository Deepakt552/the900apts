import React, { useEffect, useRef } from "react";
import { Head } from "@inertiajs/react";
import {
    Accessibility,
    UsersRound,
    MonitorCheck,
    MousePointerClick,
    ShieldCheck,
    Headphones,
    Mail,
    ArrowRight,
    ExternalLink,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

function AccessibilityStatement() {
    const heroRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
            );
        }

        sectionsRef.current.forEach((section, index) => {
            if (!section) return;
            gsap.fromTo(
                section,
                { opacity: 0, y: 35 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    delay: index * 0.08,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 88%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const accessibilitySections = [
        {
            icon: UsersRound,
            title: "General Commitment",
            tag: "INCLUSIVITY",
            content:
                "The900Apts.com strives to ensure that its digital services and website experiences are fully accessible to individuals with disabilities. The 900 has invested resources to help ensure that our website is intuitive, responsive, and readily accessible for all visitors, guided by the foundational belief that every person has the right to live with dignity, equality, comfort, and independence.",
        },
        {
            icon: MonitorCheck,
            title: "Accessibility Standards & WCAG Compliance",
            tag: "WCAG 2.1 COMPLIANCE",
            content:
                "The900Apts.com incorporates modern web accessibility design standards and accessibility software to continuously enhance compliance with the Web Content Accessibility Guidelines (WCAG 2.1 Level AA). These guidelines outline best practices to ensure digital web content is perceptible, operable, understandable, and robust for visitors using screen readers, keyboard-only navigation, and assistive technologies.",
        },
        {
            icon: MousePointerClick,
            title: "Enabling the Accessibility Controls",
            tag: "ASSISTIVE CONTROLS",
            content:
                "The accessibility assistive features on The900Apts.com can be triggered by selecting the accessibility icon located on the page. Upon activating the menu, assistive controls will load promptly, providing visual contrast adjustments, text size enlargement, highlighted links, and screen-reader assistance.",
        },
        {
            icon: ShieldCheck,
            title: "Continuous Evaluation & Disclaimer",
            tag: "ONGOING AUDITS",
            content:
                "The 900 continues proactive efforts to regularly test, evaluate, and enhance the accessibility of our site and digital resident services. In our ongoing effort to remediate potential accessibility barriers, we audit pages with modern automated accessibility tools. Despite our best efforts to make all content fully accessible, certain digital elements may undergo progressive optimization as technology standards advance.",
        },
        {
            icon: Headphones,
            title: "Dedicated Assistance",
            tag: "WE ARE HERE TO HELP",
            content:
                "If you experience any difficulty viewing or navigating any content on The900Apts.com, or require dedicated assistance with floor plans, leasing applications, or resident portal functions, please contact our leasing concierge team during regular business hours.",
        },
        {
            icon: ShieldCheck,
            title: "California & Los Angeles Fair Housing & TTY Notice",
            tag: "FAIR HOUSING & UNRUH ACT",
            content:
                "The 900 Residences strictly complies with the California Unruh Civil Rights Act, the California Fair Employment and Housing Act (FEHA), and the Federal Fair Housing Act. We provide equal housing opportunity and welcome requests for reasonable accommodations and modifications. For deaf, hard of hearing, or speech-disabled individuals, the California Relay Service is available 24 hours a day by dialing 711.",
        },
    ];

    return (
        <>
            <Head>
                <title>Accessibility Statement · The 900 Residences Koreatown LA</title>
                <meta
                    name="description"
                    content="The 900 Residences commitment to digital accessibility, WCAG 2.1 standards, assistive navigation, and inclusive resident experiences."
                />
            </Head>
            <Navbar />

            <div className="relative bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c] overflow-hidden">
                {/* Subtle Architectural Pattern */}
                <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] select-none z-0"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <pattern
                            id="accessibility-changsal-pattern"
                            width="80"
                            height="80"
                            patternUnits="userSpaceOnUse"
                        >
                            <rect
                                x="10"
                                y="10"
                                width="60"
                                height="60"
                                fill="none"
                                stroke="#1a1f2c"
                                strokeWidth="1.2"
                            />
                            <path
                                d="M 40 10 L 40 70 M 10 40 L 70 40"
                                fill="none"
                                stroke="#c77950"
                                strokeWidth="0.8"
                                strokeDasharray="4 4"
                            />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#accessibility-changsal-pattern)" />
                </svg>

                {/* ================= HERO BANNER ================= */}
                <section className="relative min-h-[440px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pb-20 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/Header/Genral%20info.webp)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/50 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
                    </div>

                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-[#c77950]/20 rounded-full blur-[110px]" />

                    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center">
                        <div ref={heroRef} className="flex flex-col items-center">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-xl border border-[#c77950]/60 shadow-lg mb-4">
                                <span className="w-2 h-2 rounded-full bg-[#c77950] animate-pulse" />
                                <span className="text-[11px] font-bold tracking-[2.5px] uppercase text-[#ffd9c7]">
                                    THE 900 • DIGITAL INCLUSION
                                </span>
                            </div>

                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                                Accessibility Statement
                            </h1>

                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                Committed to digital equality, comfort, and seamless browsing experiences for every resident and visitor.
                            </p>

                            <div className="mt-5 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-white/80">
                                <span>Updated: August 10, 2021</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= MAIN CONTENT ================= */}
                <main id="main-content" className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-6 sm:space-y-8">
                    {accessibilitySections.map((sec, idx) => {
                        const Icon = sec.icon;
                        return (
                            <section
                                key={idx}
                                ref={(el) => (sectionsRef.current[idx] = el)}
                                className="group relative rounded-3xl bg-white/95 border border-[#d6d8e5] p-6 sm:p-8 md:p-10 shadow-sm hover:shadow-[0_12px_36px_rgba(199,121,80,0.12)] hover:border-[#c77950]/50 transition-all duration-300"
                            >
                                <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-7">
                                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] shrink-0 group-hover:bg-[#c77950] group-hover:text-white transition-all duration-300 shadow-sm">
                                        <Icon className="w-7 h-7 sm:w-8 sm:h-8" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="inline-block text-[10.5px] font-bold tracking-[1.5px] uppercase text-[#c77950] bg-[#c77950]/10 px-2.5 py-0.5 rounded-full mb-2">
                                            {sec.tag}
                                        </div>
                                        <h2 className="font-montserrat font-bold text-xl sm:text-2xl text-[#1a1f2c] tracking-tight">
                                            {sec.title}
                                        </h2>
                                        <p className="mt-3 text-[#464c60] text-sm sm:text-base leading-relaxed font-normal">
                                            {sec.content}
                                        </p>
                                    </div>
                                </div>
                            </section>
                        );
                    })}

                    {/* ================= CONTACT CARD ================= */}
                    <section className="pt-4">
                        <div className="rounded-3xl bg-gradient-to-r from-[#c77950] via-[#b3633b] to-[#9c4f29] p-8 sm:p-10 md:p-12 text-white shadow-[0_16px_40px_rgba(199,121,80,0.3)] flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-start sm:items-center gap-5 sm:gap-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/15 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shrink-0 shadow-md">
                                    <Mail className="w-8 h-8 sm:w-10 sm:h-10" />
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-[2px] text-[#ffd9c7]">
                                        SUPPORT & FEEDBACK
                                    </span>
                                    <h3 className="font-cormorant text-3xl sm:text-4xl font-bold mt-1">
                                        Report an Accessibility Issue
                                    </h3>
                                    <p className="text-white/90 text-sm sm:text-base mt-2 max-w-xl font-light leading-relaxed">
                                        If you encounter any accessibility issues or require assistance with any part of our site, please reach out directly to our team.
                                    </p>
                                </div>
                            </div>

                            <div className="shrink-0 w-full sm:w-auto text-center sm:text-right">
                                <a
                                    href="mailto:Info@The900Apts.com"
                                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-[#1a1f2c] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-lg hover:bg-[#ffd9c7] transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                                >
                                    <Mail size={16} className="text-[#c77950]" />
                                    <span>Info@The900Apts.com</span>
                                </a>
                            </div>
                        </div>
                    </section>
                </main>
            </div>

            <Footer />
        </>
    );
}

export default AccessibilityStatement;
