import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowRight, Play } from "lucide-react";

const HeroContent = () => {
    return (
        <div className="max-w-[660px] w-full z-12 animate-fade-in-up flex flex-col justify-start mt-1 sm:mt-2.5 md:mt-4 lg:mt-8 xl:mt-10">
            {/* Modern Tagline Badge */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-[#c77950]/70 shadow-[0_4px_20px_rgba(0,0,0,0.35)] mb-1.5 sm:mb-2.5 md:mb-3.5 w-fit">
                <span className="w-2 h-2 rounded-full bg-[#c77950] shadow-[0_0_8px_#c77950] animate-pulse" />
                <span className="font-montserrat text-[10px] xs:text-[11px] sm:text-xs font-bold tracking-[2px] sm:tracking-[3px] uppercase text-[#e8e9f0]">
                    WELCOME TO THE 900
                </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-montserrat text-[26px] xs:text-[29px] sm:text-[36px] md:text-[44px] lg:text-[3.2rem] xl:text-[3.4rem] font-extrabold leading-[1.12] tracking-tight text-white mb-1.5 sm:mb-2.5 md:mb-3 drop-shadow-[0_8px_30px_rgba(0,0,0,0.95)]">
                Modern Luxury Koreatown Living,
                <span className="font-cormorant italic font-normal text-[32px] xs:text-[37px] sm:text-[44px] md:text-[50px] lg:text-[4.2rem] xl:text-[4.4rem] leading-[1.04] block mt-0.5 sm:mt-1.5 text-[#ffd9c7] drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]">
                    Available Now
                </span>
            </h1>

            {/* Architectural Divider */}
            <div className="w-14 sm:w-16 md:w-20 h-[2.5px] sm:h-[3px] bg-gradient-to-r from-[#c77950] via-[#ffd9c7] to-transparent my-1.5 sm:my-2.5 md:my-3 lg:my-4" />

            {/* Description Paragraph */}
            <p className="font-sans text-[13px] xs:text-[14px] sm:text-[15.5px] md:text-[16.5px] lg:text-lg font-normal leading-relaxed text-white/95 mb-3 sm:mb-4 md:mb-5 lg:mb-7 max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[560px] drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                Spacious designer residences featuring in-home laundry, private concierge, curated resort amenities, and immediate access to the best of Los Angeles.
            </p>

            {/* Buttons (Side-by-side on Mobile, Inline on Desktop) */}
            <div className="flex flex-row flex-wrap items-center gap-2 sm:gap-3.5">
                <Link
                    href="/availability"
                    className="inline-flex items-center gap-1.5 sm:gap-2 justify-center
                    bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29]
                    text-white text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-wider uppercase
                    px-4 sm:px-6 py-2 sm:py-2.5 md:py-3 rounded-full border border-transparent
                    shadow-[0_4px_18px_rgba(199,121,80,0.45)]
                    hover:shadow-[0_6px_25px_rgba(199,121,80,0.65)]
                    transition-all duration-300 hover:-translate-y-0.5 h-[38px] sm:h-[42px] md:h-[44px] w-auto"
                >
                    <span>FLOOR PLANS & PRICING</span>
                    <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Link>

                <Link
                    href="/virtual-tour"
                    className="inline-flex items-center gap-1.5 sm:gap-2 justify-center
                     bg-white/95 hover:bg-white text-[#1a1f2c] hover:text-[#c77950] text-[11px] xs:text-xs sm:text-[13px] font-bold tracking-wider uppercase
                     px-4 sm:px-5 py-2 sm:py-2.5 md:py-3 rounded-full border border-white/90 hover:border-[#c77950]
                     backdrop-blur-[14px] shadow-[0_4px_18px_rgba(0,0,0,0.2)]
                     transition-all duration-300 hover:-translate-y-0.5 h-[38px] sm:h-[42px] md:h-[44px] w-auto"
                >
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-[#c77950] text-[#c77950]" />
                    <span>VIRTUAL TOUR</span>
                </Link>
            </div>
        </div>
    );
};

export default HeroContent;

