import React, { useEffect, useRef } from "react";
import {
    Dumbbell,
    Sofa,
    BriefcaseBusiness,
    Sunset,
    Sparkles,
    Check,
    ArrowUpRight,
    Compass,
    PhoneCall,
    Calendar,
    Building2,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "../config";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Amenities = () => {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    const featureRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            const heroTL = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                },
            });

            if (heroRef.current) {
                const badge = heroRef.current.querySelector(".hero-badge");
                const heading = heroRef.current.querySelector("h2");
                const paragraph = heroRef.current.querySelector("p");

                heroTL
                    .from(badge, {
                        opacity: 0,
                        y: 20,
                        duration: 0.5,
                    })
                    .from(
                        heading,
                        {
                            opacity: 0,
                            y: 25,
                            duration: 0.6,
                            ease: "power2.out",
                        },
                        "-=0.2"
                    )
                    .from(
                        paragraph,
                        {
                            opacity: 0,
                            y: 20,
                            duration: 0.5,
                        },
                        "-=0.3"
                    );
            }

            // Animate every feature section swiftly
            featureRefs.current.forEach((section) => {
                if (!section) return;

                const image = section.querySelector(".feature-image");
                const imageTag = image?.querySelector("img");
                const content = section.querySelector(".feature-content");
                const items = content?.children;

                if (!image || !content) return;

                const reverse = image.classList.contains("lg:order-2");

                // Image Animation
                gsap.from(image, {
                    opacity: 0,
                    x: reverse ? 30 : -30,
                    y: 25,
                    scale: 0.98,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 92%",
                        toggleActions: "play none none none",
                    },
                });

                // Text Animation
                if (items) {
                    gsap.from(items, {
                        opacity: 0,
                        y: 20,
                        stagger: 0.06,
                        duration: 0.6,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    });
                }

                // Image Parallax
                if (imageTag) {
                    gsap.to(imageTag, {
                        yPercent: -6,
                        ease: "none",
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                }
            });

            ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !featureRefs.current.includes(el)) {
            featureRefs.current.push(el);
        }
    };

    // Feature data enriched with luxury details & geometric design heritage
    const features = [
        {
            id: "fitness",
            tag: "WELLNESS & VITALITY",
            title: "State-of-the-Art Fitness Center",
            subtitle: "Holistic Health Meets Elite Performance",
            icon: Dumbbell,
            iconpath: `${APP_CONFIG.ORIGIN}/Home/icons/FitnessCenter.webp`,
            description:
                "Elevate your daily vitality inside a sunlit wellness haven engineered with premier Technogym® cardio stations, free-weight training zones, dedicated yoga sanctuaries, and mindful stretching studios designed for complete rejuvenation.",
            highlights: [
                "Technogym® Touchscreen Cardio & Peloton Stations",
                "Free-Weight & Functional Strength Training Zone",

                "Chilled Hydration & Refreshment Bar",
            ],
            stats: [
                { value: "Exclusive", label: "Resident Access", sublabel: "Wellness Center" },
                { value: "Technogym®", label: "Cardio & Strength", sublabel: "Elite Performance" },
            ],
            buttonText: "Explore Fitness Center",
            href: "/Contact#inquiry-section",
            image: `${APP_CONFIG.ORIGIN}/img/Apt/four.webp`,
            reverse: false,
        },
        {
            id: "clubhouse",
            tag: "HOSPITALITY & LOUNGE",
            title: "Recreation & Social Clubroom",
            subtitle: "Warm Hospitality & Contemporary Luxury",
            icon: Sofa,
            iconpath: `${APP_CONFIG.ORIGIN}/Home/icons/ClubHouseLounge.webp`,
            description:
                "Step into an expansive hospitality-inspired lounge fusing modern comfort with refined elegance. Featuring cozy fireside seating, custom billiards, a demonstration kitchen, and intimate gathering salons.",
            highlights: [
                "Custom Felt Billiards & Game Tables",
                "Resident Catering & Demonstration Kitchen",
                "Fireside Social Lounge & Media Space",
                "Tv Room",
            ],
            stats: [
                { value: "Bespoke", label: "Curated Interiors", sublabel: "Designer Finish" },
                { value: "Private", label: "Event Reservations", sublabel: "On demand" },
            ],
            buttonText: "Discover Clubroom",
            href: "/Contact#inquiry-section",
            image: `${APP_CONFIG.ORIGIN}/pic/CLUBROOM.webp`,
            reverse: true,
        },
        {
            id: "coworking",
            tag: "WORK & INNOVATION",
            title: "Co-Working Lounge & Focus Hub",
            subtitle: "Engineered for Focus, Speed & Collaboration",
            icon: BriefcaseBusiness,
            iconpath: `${APP_CONFIG.ORIGIN}/Home/icons/CoWorkingSpace.webp`,
            description:
                "Fuel your ambitions in an architectural co-working environment boasting high-speed Wi-Fi 6, acoustic privacy booths for remote meetings, ergonomic conference seating, and complimentary specialty espresso for seamless workflow.",
            highlights: [
                "Acoustic Soundproof Zoom & Phone Pods",
                "Conference Presentation Screen & AV Setup",
                "Ultra-High-Speed Gigabit Fiber Internet",
                "Artisanal Coffee & Specialty Tea Bar",
            ],
            stats: [
                { value: "Wi-Fi 6", label: "Gigabit Fiber Network", sublabel: "Ultra-Fast Speed" },
                { value: "Acoustic", label: "Private Phone Pods", sublabel: "Soundproof Focus" },
            ],
            buttonText: "Explore Co-Working Hub",
            href: "/Contact#inquiry-section",
            image: `${APP_CONFIG.ORIGIN}/pic/Coworking Room.webp`,
            reverse: false,
        },
        {
            id: "rooftop",
            tag: "PANORAMIC RETREAT",
            title: "Skyline Rooftop Lounge & Sunset Deck",
            subtitle: "360° Vistas of DTLA & Hollywood Hills",
            icon: Sunset,
            iconpath: `${APP_CONFIG.ORIGIN}/Home/icons/RooftopLounge.webp`,
            description:
                "Ascend to Koreatown's most captivating open-air sanctuary. Soak in sweeping sunsets over the Los Angeles skyline, unwind by ambient firepit tables, host open-air dining at custom BBQ stations, or stargaze from plush cabana daybeds.",
            highlights: [
                "360° Panoramic LA & DTLA Skyline Views",
                "Open-Air Ambient Firepit Lounges & Daybeds",
                "Stainless Steel Outdoor BBQ Kitchen Stations",
                "Atmospheric Evening Lighting & Garden Seating",
            ],
            stats: [
                { value: "360°", label: "Unobstructed City Panorama", sublabel: "Skyline Views" },
                { value: "Alfresco", label: "Sunset Firepit Cabanas", sublabel: "Evening Lounge" },
            ],
            buttonText: "View Rooftop Sky Lounge",
            href: "/Contact#inquiry-section",
            image: `${APP_CONFIG.ORIGIN}/img/Apt/roof.webp`,
            reverse: true,
        },
    ];

    // Image with Lucide fallback
    const renderIcon = (feature) => {
        const IconComponent = feature.icon;

        return (
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-white to-[#f0f1f7] border border-[#c77950]/30 shadow-[0_8px_20px_rgba(199,121,80,0.15)] flex items-center justify-center p-3">
                {/* Subtle Korean Corner Marks */}
                <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-[#c77950]/50" />
                <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-[#c77950]/50" />

                {feature.iconpath ? (
                    <img
                        src={feature.iconpath}
                        alt={feature.title}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain filter drop-shadow-sm"
                        onError={(e) => {
                            e.currentTarget.style.display = "none";
                            if (e.currentTarget.nextElementSibling) {
                                e.currentTarget.nextElementSibling.style.display = "block";
                            }
                        }}
                    />
                ) : null}

                <IconComponent
                    className={`w-8 h-8 text-[#c77950] ${feature.iconpath ? "hidden" : "block"
                        }`}
                    strokeWidth={1.8}
                />
            </div>
        );
    };

    return (
        <div ref={containerRef} className="relative bg-[#e8e9f0] text-[#1a1f2c] font-montserrat overflow-hidden">
            {/* =========================================================================
                SVG KOREAN TRADITIONAL CHANGSAL & GEUM-MUN LATTICE BACKGROUND PATTERN
            ========================================================================== */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] mix-blend-multiply"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    {/* Korean Wan-ja / Changsal Traditional Interlocking Lattice Pattern */}
                    <pattern
                        id="korean-changsal-pattern"
                        width="80"
                        height="80"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Outer Grid Frame */}
                        <path
                            d="M 0 0 L 80 0 L 80 80 L 0 80 Z"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="1"
                        />
                        {/* Inner Interlocking Fretwork */}
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
                        {/* Central Diamond Motif */}
                        <path
                            d="M 40 25 L 55 40 L 40 55 L 25 40 Z"
                            fill="none"
                            stroke="#c77950"
                            strokeWidth="1"
                        />
                        <circle cx="40" cy="40" r="2.5" fill="#c77950" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#korean-changsal-pattern)" />
            </svg>

            {/* Ambient Background Warmth */}
            <div className="absolute top-20 left-1/4 -translate-x-1/2 w-[700px] h-[500px] bg-[#c77950]/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-1/2 right-10 w-[600px] h-[600px] bg-white/70 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-40 left-10 w-[500px] h-[500px] bg-[#c77950]/8 rounded-full blur-[130px] pointer-events-none" />

            {/* =========================================================================
                SECTION HERO HEADER
            ========================================================================== */}
            <section ref={heroRef} className="relative z-10 pt-20 sm:pt-28 pb-12 sm:pb-16">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">

                    {/* English Pill Badge with Geometric Emblem */}
                    <div className="hero-badge inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[#c77950]/40 shadow-[0_4px_20px_rgba(199,121,80,0.15)] mb-6">
                        {/* 900 Seal Icon */}
                        <div className="w-5 h-5 rounded-[4px] bg-gradient-to-br from-[#c77950] to-[#b3633b] text-white flex items-center justify-center font-serif text-[9px] font-bold shadow-xs">
                            900
                        </div>
                        <span className="text-[11px] sm:text-xs font-bold tracking-[3px] uppercase text-[#c77950]">
                            CURATED LIFESTYLE AMENITIES • RESIDENTIAL EXPERIENCES
                        </span>

                    </div>

                    {/* Main Section Heading */}
                    <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] font-bold text-[#1a1f2c] tracking-tight leading-[1.08] max-w-5xl mx-auto">
                        Elevated Spaces Designed for{" "}
                        <span className="italic text-[#c77950] font-normal">Mindful Living</span>
                    </h2>

                    {/* Section Description */}
                    <p className="mt-6 text-[#5a627a] text-sm sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed font-normal">
                        Immerse yourself in a harmonious blend of serenity and modern Los Angeles luxury, thoughtfully crafted for wellness, connection, and peak productivity.
                    </p>

                    {/* Traditional Geometric Ornamental Divider */}
                    <div className="flex items-center justify-center gap-3 mt-8 opacity-75">
                        <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent to-[#c77950]" />
                        <div className="w-2.5 h-2.5 rotate-45 border border-[#c77950] bg-white/80" />
                        <div className="w-1.5 h-1.5 rotate-45 bg-[#c77950]" />
                        <div className="w-2.5 h-2.5 rotate-45 border border-[#c77950] bg-white/80" />
                        <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent to-[#c77950]" />
                    </div>

                </div>
            </section>


            {/* =========================================================================
                FEATURES LIST
            ========================================================================== */}
            <div className="relative z-10 flex flex-col gap-12 sm:gap-20 pb-24 sm:pb-32">
                {features.map((feature, index) => (
                    <section
                        key={feature.id}
                        ref={addToRefs}
                        className="max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 w-full"
                    >
                        <div
                            className={`relative rounded-3xl p-6 sm:p-10 lg:p-12 xl:p-16 transition-all duration-500
                                ${feature.reverse
                                    ? "bg-white/80 backdrop-blur-md border border-white shadow-[0_20px_50px_rgba(26,31,44,0.06)]"
                                    : "bg-white/50 backdrop-blur-md border border-[#d6d8e5]/80 shadow-[0_15px_40px_rgba(26,31,44,0.04)]"
                                }
                            `}
                        >
                            {/* Decorative Korean Lattice Corner Ornaments */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#c77950]/30 pointer-events-none rounded-tl-sm" />
                            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#c77950]/30 pointer-events-none rounded-tr-sm" />
                            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#c77950]/30 pointer-events-none rounded-bl-sm" />
                            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#c77950]/30 pointer-events-none rounded-br-sm" />

                            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center w-full">

                                {/* =========================================
                                    IMAGE SHOWCASE WITH HANOK FRAMEWORK
                                ========================================== */}
                                <div
                                    className={`feature-image w-full lg:col-span-6 xl:col-span-7 relative ${feature.reverse
                                        ? "lg:order-2 order-1"
                                        : "lg:order-1 order-1"
                                        }`}
                                >
                                    {/* Layered Korean Architectural Offset Frame */}
                                    <div className="absolute -inset-2.5 sm:-inset-3 rounded-[32px] border border-[#c77950]/25 bg-gradient-to-br from-[#c77950]/5 to-transparent pointer-events-none hidden sm:block" />

                                    <div className="relative w-full rounded-[28px] overflow-hidden shadow-[0_20px_45px_rgba(26,31,44,0.14)] border-2 border-white h-[320px] sm:h-[420px] md:h-[460px] lg:h-[480px] xl:h-[520px] group bg-dark-500">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />

                                        {/* Subtle Dark Bottom Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                                        {/* Floating Tag Badge */}
                                        <div className="absolute top-4 left-4 sm:top-5 sm:left-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/60 shadow-md">
                                            <div className="w-2 h-2 rounded-full bg-[#c77950]" />
                                            <span className="text-[10px] sm:text-[11px] font-bold tracking-[2px] uppercase text-[#c77950]">
                                                {feature.tag}
                                            </span>
                                        </div>

                                        {/* Index Badge */}
                                        <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 font-cormorant text-2xl sm:text-3xl font-bold text-white/90 drop-shadow-md">
                                            0{index + 1}
                                        </div>
                                    </div>
                                </div>


                                {/* =========================================
                                    CONTENT & DETAILS
                                ========================================== */}
                                <div
                                    className={`feature-content w-full lg:col-span-6 xl:col-span-5 flex flex-col justify-center ${feature.reverse
                                        ? "lg:order-1 order-2"
                                        : "lg:order-2 order-2"
                                        }`}
                                >
                                    {/* Icon & Header Row */}
                                    <div className="flex items-center gap-4">
                                        {renderIcon(feature)}
                                        <div>
                                            <span className="text-xs sm:text-sm font-bold tracking-widest text-[#c77950] uppercase block">
                                                {feature.tag}
                                            </span>
                                            <span className="text-[11px] font-medium tracking-[2px] uppercase text-[#8a92a6] block mt-0.5">
                                                {feature.subtitle}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Main Title */}
                                    <h3 className="font-cormorant text-3xl sm:text-4xl lg:text-[2.6rem] font-bold text-[#1a1f2c] mt-5 leading-[1.12]">
                                        {feature.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[#5a627a] leading-relaxed mt-4 text-sm sm:text-base font-normal">
                                        {feature.description}
                                    </p>

                                    {/* Highlight Feature Chips */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-6">
                                        {feature.highlights.filter(Boolean).map((item, hIdx) => (
                                            <div
                                                key={hIdx}
                                                className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#333a4d] font-medium bg-white/80 rounded-xl px-3.5 py-2.5 border border-[#d6d8e5]/70 shadow-2xs leading-snug"
                                            >
                                                <span className="w-4 h-4 rounded-full bg-[#c77950]/15 text-[#c77950] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Check size={11} strokeWidth={2.5} />
                                                </span>
                                                <span className="break-words whitespace-normal text-left">{item}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-7 pt-6 border-t border-[#d6d8e5]/70">
                                        {feature.stats.map((stat, sIdx) => (
                                            <div key={sIdx} className="flex flex-col">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="font-cormorant text-2xl sm:text-3xl font-bold text-[#c77950]">
                                                        {stat.value}
                                                    </span>
                                                    {stat.suffix && (
                                                        <span className="text-xs font-semibold text-[#8a92a6]">
                                                            {stat.suffix}
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-[#1a1f2c] mt-0.5">
                                                    {stat.label}
                                                </span>
                                                <span className="text-[11px] text-[#8a92a6] font-normal">
                                                    {stat.sublabel}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Interactive Action Button */}
                                    <div className="mt-8">
                                        <a
                                            href={feature.href}
                                            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white font-bold uppercase text-[11px] sm:text-xs tracking-[2px] shadow-[0_6px_20px_rgba(199,121,80,0.35)] hover:shadow-[0_8px_30px_rgba(199,121,80,0.55)] hover:-translate-y-0.5 transition-all group"
                                        >
                                            <span>{feature.buttonText}</span>
                                            <ArrowUpRight
                                                size={15}
                                                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                            />
                                        </a>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>
                ))}
            </div>

            {/* =========================================================================
                BOTTOM CONCIERGE CALLOUT BANNER (UPGRADED LUXURY HANOK EDITION)
            ========================================================================== */}
            <div className="relative z-10 max-w-[1560px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 xl:px-16 pb-24 sm:pb-32">
                <div className="relative rounded-[32px] sm:rounded-[36px] bg-gradient-to-br from-[#161c2d] via-[#1f283d] to-[#161c2d] text-white p-8 sm:p-12 lg:p-16 xl:p-20 overflow-hidden shadow-[0_30px_70px_rgba(22,28,45,0.45)] border border-white/15">

                    {/* SVG Korean Changsal Lattice Background Pattern */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06] mix-blend-screen"
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        height="100%"
                    >
                        <defs>
                            <pattern
                                id="banner-changsal-pattern"
                                width="70"
                                height="70"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 0 0 L 70 0 L 70 70 L 0 70 Z"
                                    fill="none"
                                    stroke="#ffd9c7"
                                    strokeWidth="1"
                                />
                                <path
                                    d="M 17.5 0 L 17.5 17.5 L 0 17.5 M 52.5 0 L 52.5 17.5 L 70 17.5 M 0 52.5 L 17.5 52.5 L 17.5 70 M 70 52.5 L 52.5 52.5 L 52.5 70"
                                    fill="none"
                                    stroke="#ffd9c7"
                                    strokeWidth="1.2"
                                />
                                <path
                                    d="M 35 8.75 L 35 61.25 M 8.75 35 L 61.25 35"
                                    fill="none"
                                    stroke="#ffd9c7"
                                    strokeWidth="0.8"
                                    strokeDasharray="3.5 3.5"
                                />
                                <path
                                    d="M 35 22 L 48 35 L 35 48 L 22 35 Z"
                                    fill="none"
                                    stroke="#ffd9c7"
                                    strokeWidth="1"
                                />
                                <circle cx="35" cy="35" r="2.2" fill="#ffd9c7" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#banner-changsal-pattern)" />
                    </svg>

                    {/* Ambient Glows */}
                    <div className="absolute -top-32 -right-32 w-[450px] h-[450px] bg-[#c77950]/35 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px] bg-[#c77950]/20 rounded-full blur-[100px] pointer-events-none" />

                    {/* Decorative Hanok Corner Ornaments */}
                    <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#c77950]/70 rounded-tl-sm pointer-events-none" />
                    <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#c77950]/70 rounded-tr-sm pointer-events-none" />
                    <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#c77950]/70 rounded-bl-sm pointer-events-none" />
                    <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#c77950]/70 rounded-br-sm pointer-events-none" />

                    <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-10 lg:gap-14">

                        {/* Left Column: Heading, Subtitle & Perks */}
                        <div className="max-w-3xl">
                            {/* Pill Badge */}


                            {/* Main Heading */}
                            <h3 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold leading-[1.1] tracking-tight">
                                Experience The 900 Amenities{" "}
                                <span className="italic text-[#ffd9c7] font-normal block sm:inline">
                                    in Person
                                </span>
                            </h3>

                            {/* Description */}
                            <p className="mt-4 text-white/85 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-2xl">
                                Schedule a personalized walkthrough with our dedicated leasing team. Discover how our resort-inspired wellness spaces, clubrooms, and skyline decks elevate daily life in Koreatown.
                            </p>

                            {/* 3 Concierge Feature Badges */}
                            <div className="flex flex-wrap items-center gap-3 mt-7">
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/95 font-medium">
                                    <Building2 size={14} className="text-[#ffd9c7]" />
                                    <span>Dedicated On-Site Team</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/95 font-medium">
                                    <Calendar size={14} className="text-[#ffd9c7]" />
                                    <span>Flexible Same-Day Appointments</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-xs text-white/95 font-medium">
                                    <Check size={14} className="text-[#ffd9c7]" />
                                    <span>Immediate Move-In Availability</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Interactive Luxury CTA Buttons */}
                        <div className="flex flex-col sm:flex-row xl:flex-col items-stretch sm:items-center xl:items-stretch gap-4 flex-shrink-0 w-full sm:w-auto">
                            <a
                                href="/Contact#inquiry-section"
                                className="inline-flex items-center justify-center gap-2.5 px-9 py-4 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white font-bold uppercase text-xs sm:text-[13px] tracking-[2px] shadow-[0_6px_30px_rgba(199,121,80,0.55)] hover:shadow-[0_8px_40px_rgba(199,121,80,0.75)] hover:-translate-y-0.5 active:translate-y-0 transition-all text-center group"
                            >
                                <span>Schedule Private Tour</span>
                                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>

                            <a
                                href={`tel:${APP_CONFIG.Phone}`}
                                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/30 hover:border-white/60 font-bold uppercase text-xs tracking-[1.5px] transition-all text-center group"
                            >
                                <PhoneCall size={15} className="text-[#ffd9c7] transition-transform duration-300 group-hover:scale-110" />
                                <span>Call: {APP_CONFIG.Phone}</span>
                            </a>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Amenities;