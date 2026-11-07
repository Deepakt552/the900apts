import React from 'react';
import { Building2, Maximize2, Footprints } from 'lucide-react';

const HeroFooter = () => {
  return (
    <footer className="mt-2 sm:mt-4 md:mt-6 lg:mt-10 mb-1 sm:mb-2 md:mb-0 w-fit max-w-[calc(100vw-32px)] sm:max-w-full
                       bg-white/95 border border-white/90
                       backdrop-blur-xl px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3.5 
                       rounded-xl sm:rounded-full
                       shadow-[0_10px_30px_rgba(0,0,0,0.22)]
                       flex flex-nowrap items-center justify-between sm:justify-start gap-2.5 xs:gap-3 sm:gap-4 md:gap-5
                       overflow-x-auto no-scrollbar select-none">
      {/* Item 1: Beds */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#c77950]/10 flex items-center justify-center shrink-0">
          <Building2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c77950]" />
        </div>
        <span className="font-montserrat text-[11px] xs:text-xs sm:text-[13px] md:text-[13.5px] font-bold text-[#1a1f2c] tracking-tight sm:tracking-wide whitespace-nowrap">
          Studio – 2 Beds
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-3.5 sm:h-4 bg-[#d6d8e5] shrink-0" />

      {/* Item 2: Sq Ft */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#c77950]/10 flex items-center justify-center shrink-0">
          <Maximize2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c77950]" />
        </div>
        <span className="font-montserrat text-[11px] xs:text-xs sm:text-[13px] md:text-[13.5px] font-bold text-[#1a1f2c] tracking-tight sm:tracking-wide whitespace-nowrap">
          505 – 946 Sq Ft
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-3.5 sm:h-4 bg-[#d6d8e5] shrink-0" />

      {/* Item 3: Walk Score */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#c77950]/10 flex items-center justify-center shrink-0">
          <Footprints className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#c77950]" />
        </div>
        <span className="font-montserrat text-[11px] xs:text-xs sm:text-[13px] md:text-[13.5px] font-bold text-[#1a1f2c] tracking-tight sm:tracking-wide whitespace-nowrap">
          <strong className="text-[#c77950] font-extrabold">96</strong> Walk Score®
        </span>
      </div>
    </footer>
  );
};

export default HeroFooter;

