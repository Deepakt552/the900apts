import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Play } from "lucide-react";

const HeroContent = () => {
    return (
        <div className="max-w-[660px] w-full z-12 animate-fade-in-up flex flex-col justify-start mt-2.5 sm:mt-6 md:mt-10">
            {/* Modern Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-[#c77950]/70 shadow-[0_4px_20px_rgba(0,0,0,0.35)] mb-3 sm:mb-4 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#c77950] shadow-[0_0_8px_#c77950] animate-pulse" />
                <span className="font-montserrat text-[10.5px] xs:text-xs font-bold tracking-[2px] sm:tracking-[3px] uppercase text-[#e8e9f0]">
                    WELCOME TO THE 900
                </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-montserrat text-[30px] xs:text-[35px] sm:text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.14] tracking-tight text-white mb-2.5 sm:mb-4 drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                Modern Luxury Koreatown Living,
                <span className="font-cormorant italic font-normal text-[38px] xs:text-[45px] sm:text-5xl lg:text-[4.4rem] leading-[1.06] block mt-1 sm:mt-2 text-[#ffd9c7] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
                    Available Now
                </span>
            </h1>

            {/* Architectural Divider */}
            <div className="w-16 sm:w-20 h-[3px] bg-gradient-to-r from-[#c77950] via-[#ffd9c7] to-transparent my-3 sm:my-4" />

            {/* Description Paragraph */}
            <p className="font-sans text-[15.5px] xs:text-[16.5px] sm:text-[17.5px] md:text-lg font-normal leading-relaxed text-white/95 mb-4 sm:mb-7 max-w-[560px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Spacious designer residences featuring in-home laundry, private concierge, curated resort amenities, and immediate access to the best of Los Angeles.
            </p>

            {/* Buttons (Stacked on Mobile, Inline on Desktop) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-3.5">
                <Link
                    href="/availability"
                    className="inline-flex items-center gap-2 justify-center
                    bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29]
                    text-white text-xs sm:text-[13px] font-bold tracking-wider uppercase
                    px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-transparent
                    shadow-[0_4px_18px_rgba(199,121,80,0.45)]
                    hover:shadow-[0_6px_25px_rgba(199,121,80,0.65)]
                    transition-all duration-300 hover:-translate-y-0.5 h-[42px] sm:h-[44px] w-auto"
                >
                    <span>FLOOR PLANS & PRICING</span>
                    <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                    href="/virtual-tour"
                    className="inline-flex items-center gap-2 justify-center
                     bg-white/95 hover:bg-white text-[#1a1f2c] hover:text-[#c77950] text-xs sm:text-[13px] font-bold tracking-wider uppercase
                     px-5 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/90 hover:border-[#c77950]
                     backdrop-blur-[14px] shadow-[0_4px_18px_rgba(0,0,0,0.2)]
                     transition-all duration-300 hover:-translate-y-0.5 h-[42px] sm:h-[44px] w-auto"
                >
                    <Play className="w-3.5 h-3.5 fill-[#c77950] text-[#c77950]" />
                    <span>VIRTUAL TOUR</span>
                </Link>
            </div>
        </div>
    );
};

export default HeroContent;

