import React, { useEffect, useRef, useState } from "react";
import { Head } from "@inertiajs/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Building2,
    PhoneCall,
    Mail,
    Clock,
    MapPin,
    Calendar,
    FileText,
    HeartHandshake,
    Car,
    ExternalLink,
    ChevronDown,
    Sparkles,
    CheckCircle2,
} from "lucide-react";
import APP_CONFIG from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import ContactForm from "./ContactForm";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const heroRef = useRef(null);
    const cardsRef = useRef([]);
    const mainSectionRef = useRef(null);
    const faqRef = useRef(null);

    const [faqOpen, setFaqOpen] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (heroRef.current) {
                gsap.fromTo(
                    heroRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
                );
            }

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.fromTo(
                        card,
                        { opacity: 0, y: 25 },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            delay: index * 0.08,
                            scrollTrigger: {
                                trigger: card,
                                start: "top 90%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });

            if (mainSectionRef.current) {
                gsap.fromTo(
                    mainSectionRef.current,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: mainSectionRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });

        return () => ctx.revert();
    }, []);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    const contactCards = [
        {
            icon: PhoneCall,
            title: "Direct Phone",
            value: APP_CONFIG.Phone,
            detail: "Call our leasing directly",
            actionLabel: "Call Now",
            actionHref: `tel:${APP_CONFIG.Phone}`,
            isExternal: false,
        },
        {
            icon: Mail,
            title: "Email Inquiries",
            value: APP_CONFIG.email,
            detail: "Fast response guarantee",
            actionLabel: "Send Email",
            actionHref: `mailto:${APP_CONFIG.email}`,
            isExternal: false,
        },
        {
            icon: MapPin,
            title: "Leasing Office",
            value: "2880 James M Wood Blvd",
            detail: "Los Angeles, CA 90006",
            actionLabel: "Get Directions",
            actionHref: `https://maps.google.com/?q=${encodeURIComponent(APP_CONFIG.address + " " + APP_CONFIG.address1)}`,
            isExternal: true,
        },
        {
            icon: Clock,
            title: "Office Hours",
            value: "Mon – Fri: 9:00 AM – 5:30 PM",
            detail: "Saturday & Sunday by appointment",
            actionLabel: "Schedule Tour",
            actionHref: "#inquiry-section",
            isExternal: false,
        },
    ];

    const faqs = [
        {
            icon: Calendar,
            question: "How do I schedule an in-person or virtual tour?",
            answer: "You can schedule a tour by submitting the inquiry form below, calling 213-900-0900, or booking directly online. We offer in-person, self-guided, and live video tours.",
        },
        {
            icon: FileText,
            question: "What lease terms and move-in options are available?",
            answer: "We offer flexible lease terms ranging from 6 to 12+ months with competitive pricing and select move-in specials. Inquire for current availability.",
        },
        {
            icon: HeartHandshake,
            question: "What is the pet policy at The 900 Residences?",
            answer: "We are proudly pet-friendly! We welcome both cats and dogs (up to 2 pets per home) with dedicated on-site pet spa amenities.",
        },
        {
            icon: Car,
            question: "Is resident and guest parking available on-site?",
            answer: "Yes, we offer secure, gated subterranean parking with assigned spaces and Level-2 EV charging stations. Guest validation is available at the leasing desk.",
        },
    ];

    return (
        <>
            <Head>
                <title>Contact Us · The 900 Residences Koreatown LA</title>
                <meta
                    name="description"
                    content="Connect with The 900 Residences leasing office in Koreatown, Los Angeles. Schedule a private tour or inquire about luxury apartments."
                />
            </Head>

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
                            id="contact-changsal-pattern"
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
                    <rect width="100%" height="100%" fill="url(#contact-changsal-pattern)" />
                </svg>

                <Navbar />

                {/* ========================================================================= */}
                {/* 1. CRISP ARCHITECTURAL HERO SECTION */}
                {/* ========================================================================= */}
                <section className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[560px] flex items-center justify-center overflow-hidden pt-28 pb-20 sm:pb-24 rounded-b-[36px] sm:rounded-b-[52px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    {/* Clubroom Architectural Background - Crisp & Vivid */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.HOME_URL}pic1/CLUBROOM.png)`,
                        }}
                    >
                        {/* Pure Cinematic Tint: Crisp contrast without any foggy white overlay */}
                        <div className="absolute inset-0 bg-black/45 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/50" />
                    </div>

                    {/* Subtle Warm Accent */}
                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#c77950]/15 rounded-full blur-[100px]" />

                    {/* Clean Hero Content */}
                    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 md:px-8 w-full text-center">
                        <div ref={heroRef} className="flex flex-col items-center">
                            {/* Main Title */}
                            <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)]">
                                Contact Us
                            </h1>

                            {/* Clean Subtitle */}
                            <p className="text-white/95 text-sm sm:text-base md:text-lg mt-3.5 font-light leading-relaxed max-w-xl mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                                Connect with our leasing team to schedule a private tour or learn more about living at The 900 Residences.
                            </p>

                            {/* Clean Action Buttons */}
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
                                <a
                                    href="#inquiry-section"
                                    className="px-8 py-3.5 rounded-full text-xs font-bold tracking-[1.5px] uppercase bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white shadow-[0_6px_25px_rgba(199,121,80,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all"
                                >
                                    Send Inquiry Form ↓
                                </a>
                                <a
                                    href={`tel:${APP_CONFIG.Phone}`}
                                    className="px-8 py-3.5 rounded-full text-xs font-bold tracking-[1.5px] uppercase bg-white hover:bg-[#f8f9fc] text-[#1a1f2c] border border-white shadow-[0_6px_25px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                                >
                                    <PhoneCall className="w-3.5 h-3.5 text-[#c77950]" />
                                    <span>{APP_CONFIG.Phone}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* 2. CONTACT INFO PILLARS (4 CLEAN LIGHT CARDS) */}
                {/* ========================================================================= */}
                <section className="relative z-20 -mt-10 sm:-mt-14 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {contactCards.map((card, index) => {
                            const Icon = card.icon;
                            return (
                                <div
                                    key={index}
                                    ref={(el) => (cardsRef.current[index] = el)}
                                    className="relative bg-white border border-[#d6d8e5] hover:border-[#c77950]/60 p-5 rounded-2xl shadow-[0_8px_25px_rgba(30,35,60,0.06)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(199,121,80,0.12)] overflow-hidden group"
                                >
                                    {/* Corner Fretwork Accents */}
                                    <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#c77950]/30 rounded-tl-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#c77950]/30 rounded-tr-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#c77950]/30 rounded-bl-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />
                                    <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#c77950]/30 rounded-br-xs group-hover:border-[#c77950] transition-colors pointer-events-none" />

                                    <div>
                                        <div className="w-10 h-10 rounded-xl bg-[#c77950]/15 border border-[#c77950]/25 flex items-center justify-center text-[#c77950] mb-3.5">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[11px] font-bold uppercase tracking-[1.5px] text-[#6c748c]">
                                            {card.title}
                                        </span>
                                        <p className="font-bold text-[#1a1f2c] text-sm sm:text-base mt-1 break-words">
                                            {card.value}
                                        </p>
                                        <p className="text-xs text-[#5a627a] mt-0.5 font-normal">
                                            {card.detail}
                                        </p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-[#e8e9f0]">
                                        <a
                                            href={card.actionHref}
                                            target={card.isExternal ? "_blank" : "_self"}
                                            rel={card.isExternal ? "noopener noreferrer" : ""}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c77950] hover:text-[#b3633b] transition-colors uppercase tracking-[1px]"
                                        >
                                            <span>{card.actionLabel}</span>
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* 3. CORE INQUIRY & LOCATION SECTION (SIDE-BY-SIDE) */}
                {/* ========================================================================= */}
                <section
                    id="inquiry-section"
                    ref={mainSectionRef}
                    className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                        {/* LEFT: Concise Location & Concierge Info Card (5 Cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-6">
                            {/* Card Box */}
                            <div className="bg-white border border-[#d6d8e5] rounded-3xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(30,35,60,0.08)]">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c77950]/15 border border-[#c77950]/30 text-[#c77950] text-[11px] font-bold uppercase tracking-[1.5px] mb-3">
                                    <Building2 className="w-3.5 h-3.5 text-[#c77950]" />
                                    <span>Residences & Leasing</span>
                                </div>

                                <h2 className="font-cormorant text-2xl sm:text-3xl font-bold text-[#1a1f2c]">
                                    The 900 Residences
                                </h2>

                                <p className="text-xs sm:text-sm text-[#5a627a] mt-2 leading-relaxed font-normal">
                                    Located in the vibrant heart of Koreatown, Los Angeles. Close to premier dining, nightlife, and transit corridors.
                                </p>

                                {/* Embedded Clean Google Map */}
                                <div className="mt-5 rounded-2xl overflow-hidden border border-[#d6d8e5] shadow-sm h-[220px] relative">
                                    <iframe
                                        title="The 900 Residences Location"
                                        src="https://maps.google.com/maps?q=2880%20James%20M%20Wood%20Blvd,%20Los%20Angeles,%20CA%2090006&t=&z=15&ie=UTF8&iwloc=&output=embed"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>

                                {/* Direct Direction Link */}
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(APP_CONFIG.address + " " + APP_CONFIG.address1)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-[#f8f9fc] hover:bg-white border border-[#d6d8e5] hover:border-[#c77950]/60 text-[#333a4d] hover:text-[#1a1f2c] text-xs font-bold uppercase tracking-[1.5px] transition-all shadow-sm"
                                >
                                    <MapPin className="w-3.5 h-3.5 text-[#c77950]" />
                                    <span>Open In Google Maps</span>
                                </a>

                                {/* Quick Highlights */}
                                <div className="mt-6 pt-5 border-t border-[#e8e9f0] flex flex-col gap-3 text-xs text-[#5a627a]">
                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-[#c77950] shrink-0" />
                                        <span className="font-medium text-[#333a4d]">Fast response within 2 business hours</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">
                                        <Car className="w-4 h-4 text-[#c77950] shrink-0" />
                                        <span className="font-medium text-[#333a4d]">Gated subterranean parking & EV chargers</span>
                                    </div>
                                    <div className="flex items-center gap-2.5">

                                        <span className="font-medium text-[#333a4d]">In-person, self-guided & virtual video tours</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Modern Clean Contact Form (7 Cols) */}
                        <div className="lg:col-span-7">
                            <ContactForm />
                        </div>
                    </div>
                </section>

                {/* ========================================================================= */}
                {/* 4. STREAMLINED FAQ SECTION (LIGHT THEME) */}
                {/* ========================================================================= */}
                <section
                    ref={faqRef}
                    className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pb-20 sm:pb-24"
                >
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold uppercase tracking-[2.5px] text-[#c77950]">
                            Common Questions
                        </span>
                        <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a1f2c] mt-1">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="flex flex-col gap-3">
                        {faqs.map((faq, index) => {
                            const Icon = faq.icon;
                            const isOpen = faqOpen === index;
                            return (
                                <div
                                    key={index}
                                    className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen
                                            ? "bg-white border-[#c77950]/60 shadow-[0_8px_25px_rgba(199,121,80,0.1)]"
                                            : "bg-white/80 border-[#d6d8e5] hover:border-[#c77950]/40 shadow-sm"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => toggleFaq(index)}
                                        className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
                                    >
                                        <div className="flex items-center gap-3.5">
                                            <div
                                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isOpen
                                                        ? "bg-[#c77950] text-white"
                                                        : "bg-[#c77950]/15 text-[#c77950]"
                                                    }`}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <span className="font-bold text-sm sm:text-base text-[#1a1f2c]">
                                                {faq.question}
                                            </span>
                                        </div>

                                        <ChevronDown
                                            className={`w-4 h-4 text-[#8f96ac] transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#c77950]" : ""
                                                }`}
                                        />
                                    </button>

                                    {isOpen && (
                                        <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-[#5a627a] font-normal leading-relaxed border-t border-[#e8e9f0]">
                                            {faq.answer}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </section>

                <Footer />
            </div>
        </>
    );
}



