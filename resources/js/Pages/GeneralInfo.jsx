import React, { useEffect, useRef } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "./config";
import config from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import {
    Building2,
    Wallet,
    PawPrint,
    Tag,
    Laptop,
    Phone,
    Mail,
    MapPin,
    Clock,
    ShieldCheck,
    CheckCircle2,
    ArrowRight,
    ExternalLink,
    Car,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const GeneralInfo = () => {
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

    const infoCards = [
        {
            icon: Building2,
            title: "Leasing Office & Concierge",
            tag: "LEASING & CONCIERGE",
            items: [
                { label: "Direct Phone", value: config.Phone, href: `tel:${config.Phone}` },
                { label: "Email Inquiries", value: config.email, href: `mailto:${config.email}` },
                { label: "Office Address", value: "2880 James M Wood Blvd, Los Angeles, CA 90006" },
                { label: "Hours", value: "Mon – Fri: 9:00 AM – 5:30 PM | Sat & Sun: By Appointment" },
            ],
        },
        {
            icon: Wallet,
            title: "Fees, Deposits & Terms",
            tag: "TERMS & DEPOSITS",
            items: [
                { label: "Security Deposit", value: "Deposit is less than one month (O.A.C.)" },
                { label: "Application Fee", value: "$50 per adult applicant" },
                { label: "Lease Terms", value: "Flexible 6 to 12+ month options available" },
                { label: "Utilities", value: "Resident responsible for electric, water & trash" },
            ],
        },
        {
            icon: PawPrint,
            title: "Pet Policy & Amenities",
            tag: "PET POLICIES",
            items: [
                { label: "Allowed Pets", value: "Cats & Dogs welcomed (Max 2 pets per home)" },
                { label: "Weight Allowance", value: "Up to 35 lbs per pet" },
                { label: "Monthly Pet Rent", value: "$50 per pet" },
                { label: "Refundable Pet Deposit", value: "$500 per pet" },
            ],
        },
        {
            icon: Tag,
            title: "Move-In Specials & Application",
            tag: "MOVE-IN SPECIALS",
            items: [
                { label: "Current Incentives", value: "Contact leasing for Special Promotions" },
                { label: "Inquiries Phone", value: config.Phone, href: `tel:${config.Phone}` },
                { label: "Inquiries Email", value: config.email, href: `mailto:${config.email}` },
                {
                    label: "Application Portal",
                    value: "Apply online in under 10 minutes",
                    isButton: true,
                    buttonText: "Apply Now",
                    buttonHref: "https://www.rentcafe.com/apartments/ca/los-angeles/the-900/default.aspx",
                },
            ],
        },
    ];

    const additionalPolicies = [
        {
            icon: Car,
            title: "Parking & EV Charging",
            desc: "Secure subterranean garage with assigned resident stalls and Level-2 EV charging ports. Guest parking passes available via leasing desk.",
        },
        {
            icon: ShieldCheck,
            title: "Package Management & Security",
            desc: "Automated parcel lockers, smartphone intercom access, and continuous monitored community access control.",
        },
        {
            icon: Clock,
            title: "Online Resident Services",
            desc: "Pay rent online, submit 24-hour maintenance requests, and reserve amenity clubrooms through the resident portal.",
        },
    ];

    return (
        <>
            <Head>
                <title>General Information & Resident Policies · The 900 Residences</title>
                <meta
                    name="description"
                    content="Essential information for future and current residents of The 900 Residences: leasing hours, deposits, pet policies, parking, and fees."
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
                            id="general-info-changsal-pattern"
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
                    <rect width="100%" height="100%" fill="url(#general-info-changsal-pattern)" />
                </svg>

                {/* ================= HERO BANNER ================= */}
                <section className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pb-24 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/Header/Genral%20info.webp)`,
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
                                    THE 900 • RESIDENT INFORMATION
                                </span>
                            </div>

                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
                                General Information
                            </h1>

                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]">
                                Essential details on leasing policies, deposits, pet guidelines, parking, and seamless resident services.
                            </p>

                            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
                                <a
                                    href="https://www.rentcafe.com/residentservices/apartmentsforrent/userlogin.aspx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_6px_25px_rgba(199,121,80,0.45)] transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <span>RESIDENT PORTAL</span>
                                    <ExternalLink className="w-4 h-4" />
                                </a>

                                <Link
                                    href="/Contact"
                                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/50 hover:border-transparent text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                                >
                                    <span>CONTACT LEASING</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 4 ESSENTIAL POLICY CARDS ================= */}
                <section className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {infoCards.map((card, idx) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={idx}
                                    className="relative rounded-[32px] bg-white/95 border border-white/80 p-7 sm:p-9 backdrop-blur-xl shadow-[0_12px_35px_rgba(30,35,60,0.06)] hover:border-[#c77950]/50 hover:shadow-[0_20px_45px_rgba(199,121,80,0.18)] transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                                >
                                    {/* Corner Fretwork Accents */}
                                    <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#c77950]/30 rounded-tl-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t border-r border-[#c77950]/30 rounded-tr-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b border-l border-[#c77950]/30 rounded-bl-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#c77950]/30 rounded-br-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />

                                    <div>
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="w-13 h-13 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] shadow-xs">
                                                <Icon className="w-6 h-6" />
                                            </div>
                                            <span className="text-[11px] font-bold tracking-wider uppercase text-[#c77950] bg-[#c77950]/10 px-3 py-1 rounded-full border border-[#c77950]/20">
                                                {card.tag}
                                            </span>
                                        </div>

                                        <h3 className="font-montserrat font-bold text-xl sm:text-2xl text-[#1a1f2c]">
                                            {card.title}
                                        </h3>
                                        <div className="w-10 h-[2px] bg-[#c77950] my-3" />

                                        <div className="space-y-3.5 mt-5">
                                            {card.items.map((item, itemIdx) => (
                                                <div key={itemIdx} className="pb-3 border-b border-[#e8e9f0] last:border-0 last:pb-0">
                                                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5a627a]">
                                                        {item.label}
                                                    </span>
                                                    {item.isButton ? (
                                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mt-1.5 pt-0.5">
                                                            <p className="text-sm sm:text-base font-medium text-[#1a1f2c]">
                                                                {item.value}
                                                            </p>
                                                            <a
                                                                href={item.buttonHref}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs font-bold tracking-wider uppercase shadow-[0_3px_12px_rgba(199,121,80,0.35)] hover:shadow-[0_5px_18px_rgba(199,121,80,0.55)] transition-all hover:-translate-y-0.5 w-fit shrink-0"
                                                            >
                                                                <span>{item.buttonText || "APPLY NOW"}</span>
                                                                <ExternalLink className="w-3.5 h-3.5" />
                                                            </a>
                                                        </div>
                                                    ) : item.href ? (
                                                        <a
                                                            href={item.href}
                                                            className="text-sm sm:text-base font-semibold text-[#1a1f2c] hover:text-[#c77950] transition-colors block mt-0.5"
                                                        >
                                                            {item.value}
                                                        </a>
                                                    ) : (
                                                        <p className="text-sm sm:text-base font-medium text-[#1a1f2c] mt-0.5">
                                                            {item.value}
                                                        </p>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ================= RESIDENT PORTAL HERO CALLOUT ================= */}
                <section className="py-6 px-4 sm:px-6 max-w-7xl mx-auto">
                    <div className="rounded-[32px] bg-white/95 border border-[#d6d8e5] p-8 sm:p-12 shadow-[0_15px_40px_rgba(0,0,0,0.06)] flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-start gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] shrink-0 shadow-xs">
                                <Laptop className="w-7 h-7" />
                            </div>
                            <div>
                                <span className="text-xs font-bold text-[#c77950] tracking-wider uppercase">
                                    ONLINE RESIDENT HUB
                                </span>
                                <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-[#1a1f2c] mt-1">
                                    RentCafe Resident Portal
                                </h3>
                                <p className="text-sm sm:text-base text-[#5a627a] mt-2 max-w-xl font-normal leading-relaxed">
                                    Easily pay your rent online, set up autopay, submit 24-hour maintenance tickets, and check community announcements anytime.
                                </p>
                            </div>
                        </div>
                        <a
                            href="https://www.rentcafe.com/residentservices/apartmentsforrent/userlogin.aspx"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white font-bold text-xs sm:text-sm tracking-wider uppercase shadow-[0_6px_25px_rgba(199,121,80,0.45)] transition-all shrink-0 hover:-translate-y-0.5"
                        >
                            <span>LOG IN TO PORTAL</span>
                            <ExternalLink className="w-4 h-4" />
                        </a>
                    </div>
                </section>

                {/* ================= 3 COMMUNITY POLICIES ================= */}
                <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <span className="text-xs font-bold text-[#c77950] tracking-widest uppercase bg-white px-4 py-1.5 rounded-full border border-[#d6d8e5] shadow-xs">
                            COMMUNITY GUIDELINES & SERVICES
                        </span>
                        <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a1f2c] mt-3">
                            Living at The 900 Residences
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {additionalPolicies.map((pol, pIdx) => {
                            const Icon = pol.icon;
                            return (
                                <div
                                    key={pIdx}
                                    className="p-7 rounded-[28px] bg-white/95 border border-white/80 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:border-[#c77950]/50 hover:shadow-[0_15px_40px_rgba(199,121,80,0.15)] transition-all duration-300"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] mb-4 shadow-xs">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-montserrat font-bold text-lg text-[#1a1f2c]">
                                        {pol.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-[#5a627a] mt-2 leading-relaxed font-normal">
                                        {pol.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
};

export default GeneralInfo;