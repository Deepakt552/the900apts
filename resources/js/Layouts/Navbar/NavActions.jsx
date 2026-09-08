import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight } from "lucide-react";

const NavActions = ({ onMenuToggle, isMenuOpen, isScrolled = true }) => {
    return (
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 z-[2]">
            {/* Tour CTA - Hidden on Mobile */}
            <Link
                href="/Contact#inquiry-section"
                className={`hidden lg:flex items-center gap-1.5
                           text-[11px]
                           font-bold
                           tracking-[1.2px]
                           uppercase
                           px-4 py-1.5
                           rounded-full
                           shadow-xs
                           transition-all duration-300
                           h-[34px]
                           ${
                               isScrolled
                                   ? "border border-[#c77950] bg-white text-[#c77950] hover:bg-[#c77950] hover:text-white shadow-[0_2px_8px_rgba(199,121,80,0.2)]"
                                   : "border border-[#c77950] bg-[#c77950]/20 text-white hover:bg-[#c77950] hover:shadow-[0_4px_12px_rgba(199,121,80,0.4)]"
                           }`}
            >
                Schedule Tour
            </Link>

            {/* Availability - Hidden on Mobile */}
            <Link
                href="/availability"
                className={`hidden md:flex items-center gap-1.5
                           text-[11px]
                           font-bold
                           tracking-[1.2px]
                           uppercase
                           px-4 py-1.5
                           rounded-full
                           shadow-xs
                           transition-all duration-300
                           h-[34px]
                           ${
                               isScrolled
                                   ? "border border-[#d6d8e5] bg-white text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950]"
                                   : "border border-white/40 bg-black/40 text-white hover:bg-black/60 hover:border-[#c77950]"
                           }`}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="w-3 h-3 fill-none stroke-current stroke-2"
                >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Availability
            </Link>

            {/* Apply Now */}
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.rentcafe.com/apartments/ca/los-angeles/the-900/default.aspx"
                className="relative overflow-hidden group
                           inline-flex items-center justify-center gap-1.5
                           bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29]
                           text-white
                           font-bold
                           uppercase
                           tracking-[1.2px]
                           text-[10.5px] sm:text-[11px]
                           px-3 sm:px-4 py-1.5
                           rounded-full
                           border border-transparent
                           shadow-[0_3px_12px_rgba(199,121,80,0.35)]
                           transition-all duration-300
                           hover:-translate-y-[1px]
                           hover:shadow-[0_5px_18px_rgba(199,121,80,0.55)]
                           h-[32px] sm:h-[34px]"
            >
                <span className="relative z-10 whitespace-nowrap leading-none flex items-center">
                    APPLY NOW
                </span>

                <ArrowRight
                    size={13}
                    strokeWidth={2.5}
                    className="relative z-10 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                />

                <span
                    className="absolute inset-0
                               -translate-x-full
                               bg-gradient-to-r
                               from-transparent
                               via-white/30
                               to-transparent
                               transition-transform
                               duration-700
                               group-hover:translate-x-full"
                />
            </a>

            {/* Menu Button */}
            <button
                type="button"
                onClick={onMenuToggle}
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="site-menu-overlay"
                className={`flex items-center gap-2
                            px-3 sm:px-3.5
                            py-1.5
                            rounded-full
                            transition-all duration-300
                            h-[32px] sm:h-[34px]
                            shadow-xs
                            ${
                                isMenuOpen
                                    ? "border border-[#c77950] bg-[#c77950] text-white"
                                    : isScrolled
                                        ? "border border-[#d6d8e5] bg-white text-[#1a1f2c] hover:border-[#c77950] hover:text-[#c77950]"
                                        : "border border-[#c77950]/80 bg-black/40 text-white hover:border-[#c77950] hover:bg-[#c77950]/20 hover:shadow-[0_0_15px_rgba(199,121,80,0.3)]"
                            }`}
            >
                <span className={`hidden sm:block text-[10.5px] font-bold tracking-[1.5px] uppercase ${isMenuOpen ? "text-white" : isScrolled ? "text-[#1a1f2c]" : "text-white"}`}>
                    MENU
                </span>

                <div className="relative w-4 h-[12px] flex flex-col justify-between">
                    <span
                        className={`block h-[1.75px] w-full rounded transition-all duration-300 ${
                            isMenuOpen
                                ? "translate-y-[5px] rotate-45 bg-white"
                                : isScrolled ? "bg-[#1a1f2c]" : "bg-white"
                        }`}
                    />

                    <span
                        className={`block h-[1.75px] w-[70%] self-end rounded bg-[#c77950] transition-all duration-300 ${
                            isMenuOpen ? "opacity-0 translate-x-2" : ""
                        }`}
                    />

                    <span
                        className={`block h-[1.75px] w-full rounded transition-all duration-300 ${
                            isMenuOpen
                                ? "-translate-y-[5px] -rotate-45 bg-white"
                                : isScrolled ? "bg-[#1a1f2c]" : "bg-white"
                        }`}
                    />
                </div>
            </button>
        </div>
    );
};

export default NavActions;

