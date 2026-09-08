import React from "react";
import {
    Building2,
    UtensilsCrossed,
    Crown,
    Laptop,
    Sparkles,
    Train,
    Footprints,
    PawPrint,
    CheckCircle2,
} from "lucide-react";

const stats = [
    {
        tag: "MODERN LIVING",
        title: "Inspired Modern Living",
        icon: Building2,
        desc: "Minimalist serenity meets sleek high-rise architecture and integrated smart home technology.",
        highlights: ["Quartz Countertops", "Keyless Smart Entry"],
    },
    {
        tag: "PRIME LOCATION",
        title: "K-Town Epicenter",
        icon: UtensilsCrossed,
        desc: "Direct access to Michelin-recognized culinary icons, 24/7 cafes, and Chapman Plaza.",
        highlights: ["Michelin Dining Access", "Metro & DTLA Transit"],
    },
    {
        tag: "RESORT WELLNESS",
        title: "Curated Wellness",
        icon: Crown,
        desc: "Panoramic rooftop deck, state-of-the-art gym, and open-air BBQ terraces.",
        highlights: ["Rooftop Deck", "Fitness Studio"],
    },
    {
        tag: "WORK & LEISURE",
        title: "Recreation & Coworking",
        icon: Laptop,
        desc: "High-speed coworking focus hubs, private meeting spaces, and an entertaining recreation lounge.",
        highlights: ["Coworking Space", "Recreation Room"],
    },
];

const StatsCard = () => {
    return (
        <section className="w-full py-12 px-4 sm:px-6 bg-gradient-to-b from-[#e8e9f0] to-[#f2f3f8]">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((item, index) => {
                        const Icon = item.icon;

                        return (
                            <div
                                key={index}
                                className="group relative flex flex-col justify-between rounded-[28px] bg-white/95 border border-white/80 p-6 sm:p-7 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#c77950]/50 hover:shadow-[0_18px_40px_rgba(199,121,80,0.18)]"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-3 mb-5">
                                        <div className="w-13 h-13 rounded-2xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] group-hover:bg-[#c77950] group-hover:text-white transition-all duration-300">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <span className="rounded-full bg-[#c77950]/10 border border-[#c77950]/20 px-2.5 py-0.5 text-[10.5px] font-bold text-[#c77950]">
                                            {item.tag}
                                        </span>
                                    </div>

                                    <h3 className="font-montserrat text-lg sm:text-xl font-bold text-[#1a1f2c] group-hover:text-[#c77950] transition-colors">
                                        {item.title}
                                    </h3>

                                    <p className="font-sans text-xs sm:text-[13px] leading-relaxed text-[#5a627a] mt-2.5">
                                        {item.desc}
                                    </p>
                                </div>

                                <div className="mt-5 pt-4 border-t border-[#e8e9f0] space-y-1.5">
                                    {item.highlights.map((h, hIdx) => (
                                        <div key={hIdx} className="flex items-center gap-1.5 text-xs text-[#1a1f2c] font-medium">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                            <span>{h}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsCard;
