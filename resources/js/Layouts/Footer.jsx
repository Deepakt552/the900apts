import React from "react";
import {
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Accessibility,
    ShieldCheck,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import APP_CONFIG from "../Pages/config";

const quickLinks = [
    { name: "HOME", path: "/" },
    { name: "FLOOR PLANS", path: "/availability" },
    { name: "AMENITIES", path: "/amenity" },
    { name: "GALLERY", path: "/gallery" },
    { name: "NEIGHBORHOOD", path: "/neighborhood" },
    { name: "CONTACT", path: "/Contact" },
    { name: "GENERAL INFORMATION", path: "/generalInfo" },
];

const socialLinks = [
    { icon: FaInstagram, url: "https://instagram.com/the900apartments", name: "Instagram" },
    { icon: FaFacebookF, url: "https://facebook.com/the900apartments", name: "Facebook" },
    {
        icon: FaLinkedinIn,
        url: "https://linkedin.com/company/the900apartments",
        name: "LinkedIn",
    },
];

export default function Footer() {
    return (
        <footer className="relative bg-[#e8e9f0] text-[#1a1f2c] border-t border-[#d6d8e5] overflow-hidden">
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
                        id="footer-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#footer-changsal-pattern)" />
            </svg>

            {/* HERO FOOTER */}
            <section
                className="relative min-h-[200px] sm:min-h-[240px] bg-cover bg-center flex items-center overflow-hidden z-10"
                style={{
                    backgroundImage: `url(${APP_CONFIG.HOME_URL}img/footer.webp)`,
                }}
            >
                {/* Luminous overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/70" />
                <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-8 py-10">
                    <div className="max-w-xl">
                        <span className="text-3xl sm:text-4xl md:text-5xl font-cormorant font-bold leading-tight block text-white drop-shadow">
                            Live Beautifully.
                        </span>
                        <span className="text-2xl sm:text-3xl font-cormorant italic text-[#e3b8a3] block mt-1 drop-shadow">
                            Live Effortlessly at The 900.
                        </span>
                        <p className="text-white/90 text-sm sm:text-base font-light mt-3 drop-shadow">
                            Schedule your private tour with our leasing directors today.
                        </p>
                        <Link href="/Contact#inquiry-section">
                            <button className="mt-5 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white uppercase tracking-[2px] text-xs font-bold shadow-[0_6px_25px_rgba(199,121,80,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all">
                                <span>Explore Residences</span>
                                <ArrowRight size={15} />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* MAIN FOOTER */}
            <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* BRAND */}
                    <div>
                        <Link href="/">
                            <img
                                src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
                                alt="The 900 Apartments"
                                className="w-28 hover:opacity-80 transition"
                            />
                        </Link>
                        <p className="mt-4 text-[#5a627a] leading-relaxed max-w-xs text-xs font-normal">
                            Premium residences crafted with timeless architecture, bespoke comfort, and exceptional Koreatown lifestyle experiences.
                        </p>
                        <h3 className="mt-5 mb-3 text-[#c77950] uppercase tracking-[2.5px] text-xs font-bold">
                            Follow Our Journey
                        </h3>
                        <div className="flex gap-2.5">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#d6d8e5] bg-white flex items-center justify-center text-[#5a627a] hover:text-[#c77950] hover:border-[#c77950]/60 shadow-sm transition"
                                    aria-label={`Visit us on ${social.name}`}
                                >
                                    <social.icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-[#c77950] uppercase tracking-[2.5px] text-xs font-bold mb-4">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((item, index) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className="flex items-center gap-2.5 text-xs text-[#333a4d] hover:text-[#c77950] transition font-medium"
                                    >
                                        <span className="text-[#c77950] font-mono text-[10px]">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="text-[#c77950] uppercase tracking-[2.5px] text-xs font-bold mb-4">
                            Contact Us
                        </h3>
                        <div className="space-y-3.5 text-xs text-[#5a627a] font-normal">
                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={16}
                                    className="text-[#c77950] shrink-0 mt-0.5"
                                />
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(APP_CONFIG.address + " " + APP_CONFIG.address1)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-[#c77950] transition leading-relaxed text-[#333a4d]"
                                >
                                    {APP_CONFIG.address}
                                    <br />
                                    {APP_CONFIG.address1}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone
                                    size={16}
                                    className="text-[#c77950] shrink-0"
                                />
                                <a
                                    href={`tel:${APP_CONFIG.Phone}`}
                                    className="hover:text-[#c77950] transition font-bold text-sm text-[#1a1f2c]"
                                >
                                    {APP_CONFIG.Phone}
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail
                                    size={16}
                                    className="text-[#c77950] shrink-0"
                                />
                                <a
                                    href={`mailto:${APP_CONFIG.email}`}
                                    className="hover:text-[#c77950] transition font-bold text-sm text-[#1a1f2c]"
                                >
                                    {APP_CONFIG.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-3 pt-1">
                                <Accessibility
                                    size={16}
                                    className="text-[#c77950] shrink-0"
                                />
                                <Link
                                    href="/Accessibility"
                                    className="hover:text-[#c77950] transition text-[#333a4d]"
                                >
                                    Accessibility Statement
                                </Link>
                            </div>
                            <div className="flex items-center gap-3">
                                <ShieldCheck
                                    size={16}
                                    className="text-[#c77950] shrink-0"
                                />
                                <Link
                                    href="/PrivacyPolicy"
                                    className="hover:text-[#c77950] transition text-[#333a4d]"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* WORKING HOURS */}
                    <div>
                        <h3 className="text-[#c77950] uppercase tracking-[2.5px] text-xs font-bold mb-4">
                            Office Hours
                        </h3>
                        <div className="space-y-3 text-xs text-[#5a627a] font-normal">
                            <div className="p-3.5 rounded-2xl bg-white border border-[#d6d8e5] shadow-sm">
                                <p className="font-bold text-[#1a1f2c]">
                                    {APP_CONFIG.Onlyweek}
                                </p>
                                <p className="text-[#5a627a] mt-0.5">{APP_CONFIG.Onlyhours}</p>
                            </div>
                            <div className="p-3.5 rounded-2xl bg-white border border-[#d6d8e5] shadow-sm">
                                <p className="font-bold text-[#1a1f2c]">Saturday & Sunday</p>
                                <p className="text-[#5a627a] mt-0.5">By Appointment Only</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* COPYRIGHT & COMPLIANCE BAR */}
            <div className="border-t border-[#d6d8e5] py-6 bg-[#dee0ea]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* LEFT - COPYRIGHT */}
                        <div className="text-xs text-[#5a627a] text-center sm:text-left font-normal">
                            © {new Date().getFullYear()} The 900 Apartments. All Rights Reserved.
                        </div>

                        {/* RIGHT - EQUAL HOUSING & ADA LOGOS ONLY (BLACK) */}
                        <div className="flex items-center gap-4">
                            <span className="sr-only">Accessibility and Housing Standards</span>
                            <img
                                src="/equal-housing.png"
                                alt="Equal Housing Opportunity - We do business in accordance with Federal and California Fair Housing Laws"
                                title="Equal Housing Opportunity"
                                className="h-6 sm:h-7 w-auto object-contain invert mix-blend-multiply opacity-85 hover:opacity-100 transition-opacity"
                            />
                            <img
                                src="/disability-icon.png"
                                alt="Handicap Accessible - Reasonable accommodations provided upon request"
                                title="Handicap Accessible"
                                className="h-6 sm:h-7 w-auto object-contain invert mix-blend-multiply opacity-85 hover:opacity-100 transition-opacity"
                            />
                        </div>
                    </div>

                    {/* CALIFORNIA & LOS ANGELES FAIR HOUSING COMPLIANCE NOTICE */}
                    <div className="text-[11px] leading-relaxed text-[#68718e] text-center sm:text-left border-t border-[#d0d3df] pt-3">
                        <p>
                            <strong>Equal Housing Opportunity:</strong> The 900 complies with the Federal Fair Housing Act, California Fair Employment and Housing Act (FEHA), and the Unruh Civil Rights Act. We welcome requests for reasonable accommodations and modifications for persons with disabilities. 
                            <span className="block sm:inline sm:ml-2">
                                <strong>Hearing/Speech Impaired (TTY):</strong> California Relay Service — Dial <strong>711</strong>.
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

