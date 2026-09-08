import React, { useEffect, useRef, useState } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import APP_CONFIG from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import {
    Building2,
    Wine,
    Laptop,
    Bike,
    Dumbbell,
    Flame,
    Mail,
    Wifi,
    Car,
    CheckCircle2,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Sparkles,
    Utensils,
    Home,
    Bath,
    KeyRound,
    Sun,
    Activity,
    Check,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ================= DATA =================
const rooftopSlides = [
    {
        title: "Sunset Skyline & Evening Glow",
        subtitle: "Panoramic golden hour vistas overlooking Downtown LA and the Koreatown horizon",
        badge: "Lush Roof Deck",
        subBadge: "Sunset Vista",
        image: `${APP_CONFIG.ORIGIN}/gallary/rooftop 2.webp`,
        alt: "Rooftop sunset view overlooking the Los Angeles skyline",
    },
    {
        title: "Atmospheric Twilight & String Lights",
        subtitle: "Illuminated evening sanctuary with ambient bistro lighting and succulent garden terraces",
        badge: "Night Sky Deck",
        subBadge: "Night Skyline",
        image: `${APP_CONFIG.ORIGIN}/gallary/roofptop enbient lioght.webp`,
        alt: "Rooftop twilight view and string lights",
    },
    {
        title: "Open-Air Skydeck & Sun Lounges",
        subtitle: "Spacious outdoor terrace with cantilever umbrellas, modern seating, and open skies",
        badge: "Sun Deck",
        subBadge: "Lounge Terrace",
        image: `${APP_CONFIG.ORIGIN}/gallary/rooftop.webp`,
        alt: "Open-air rooftop lounge deck with umbrellas",
    },
    {
        title: "Rooftop Lawn Games & Skyline Patio",
        subtitle: "Cornhole, outdoor seating, and panoramic city views under the California sun",
        badge: "Outdoor Games",
        subBadge: "Skyline Fun",
        image: `${APP_CONFIG.ORIGIN}/gallary/cornhole.webp`,
        alt: "Rooftop cornhole game lounge with skyline views",
    },
];

const residentAmenitiesSlides = [
    {
        title: "Lush Skydeck Lounge & Sunset Views",
        subtitle: "Rooftop deck with unique lounge spaces, barbecue grills, and open-air city views",
        category: "Relax with a View",
        image: `${APP_CONFIG.ORIGIN}/gallary/rooftop.webp`,
        tag: "Rooftop Deck",
    },
    {
        title: "Resident Clubroom & Rec Lounge",
        subtitle: "Entertaining kitchen, dining table, HD screens, lounge seating, and shuffleboard",
        category: "Game on. Pedal on.",
        image: `${APP_CONFIG.ORIGIN}/gallary/recatrtion room 2.webp`,
        tag: "Clubroom",
    },
    {
        title: "Fully-Outfitted Co-Working Space",
        subtitle: "Communal desks, conference room, Zoom booths, focus stations and kitchenette",
        category: "Work & Focus",
        image: `${APP_CONFIG.ORIGIN}/gallary/cowroking space.webp`,
        tag: "Co-Working",
    },
    {
        title: "State-of-the-Art Fitness Center",
        subtitle: "High-performance Matrix cardio, free weights, and functional strength turf",
        category: "Working Out",
        image: `${APP_CONFIG.ORIGIN}/pic/GYM.webp`,
        tag: "Fitness Center",
    },
    {
        title: "Resident Socials & Entertainment",
        subtitle: "Lounge gatherings, custom shuffleboard games, and expansive entertaining spaces",
        category: "Community Living",
        image: `${APP_CONFIG.ORIGIN}/gallary/Recreation room.webp`,
        tag: "Social Rec Room",
    },
];

const residentAmenitiesList = [
    {
        title: "Modern lobby with custom art installation",
        desc: "Designer entry with bespoke artwork, concierge desk and resident lounge",
        icon: Building2,
        tag: "Lobby",
    },
    {
        title: "Resident clubroom with lounge area & kitchen",
        desc: "Entertaining kitchen, dining table, TV & shuffleboard for resident socials",
        icon: Wine,
        tag: "Clubroom",
    },
    {
        title: "Fully-outfitted co-working space & Zoom booths",
        desc: "Communal desks, conference room, phone booth, lounge & kitchenette",
        icon: Laptop,
        tag: "Co-Working",
    },
    {
        title: "Bike room with secure storage",
        desc: "Dedicated resident bicycle racks with easy street-level access",
        icon: Bike,
        tag: "Transit",
    },
    {
        title: "State-of-the-art fitness center",
        desc: "Cardio machines, free weights, functional training and 24/7 keyless access",
        icon: Dumbbell,
        tag: "Fitness",
    },
    {
        title: "Roof deck with lounge, BBQ & firepits",
        desc: "Panoramic skyline views, dining areas, barbecue grills, firepits and TV",
        icon: Flame,
        tag: "Roof Deck",
    },
    {
        title: "Mailbox area with dedicated parcel room",
        desc: "Secure automated package delivery lockers and mail room",
        icon: Mail,
        tag: "Packages",
    },
    {
        title: "Community high-speed WiFi",
        desc: "Seamless commercial fiber internet across all common amenity areas",
        icon: Wifi,
        tag: "Fast WiFi",
    },
    {
        title: "Direct-access parking garage",
        desc: "Gated subterranean resident parking with EV charging stations",
        icon: Car,
        tag: "Parking",
    },
];

const homeSpaces = [
    {
        id: "kitchen",
        label: "Kitchen",
        subtitle: "Artisan Terrazzo & Stainless Suite",
        icon: Utensils,
        image: `${APP_CONFIG.ORIGIN}/pic/The-900-Apartments-Interior-Kitchen.webp`,
        altImage: `${APP_CONFIG.ORIGIN}/pic/Kitchen.webp`,
        badge: "Chef's Terrazzo Kitchen",
        title: "Culinary Elegance & Premium Terrazzo",
        description: "Expansive Terrazzo countertops paired with full tile backsplashes, Samsung French door refrigeration, stainless Frigidaire appliances, and custom push-to-open flat-panel cabinetry.",
        features: [
            { name: "Frigidaire Stainless Range, Dishwasher & Microwave", desc: "Full stainless suite for high performance" },
            { name: "Samsung French Door Fridge with Bottom Freezer", desc: "Spacious smart cooling and fresh storage" },
            { name: "Terrazzo Countertops & Full Kitchen Backsplash", desc: "Durable artisan stone surfaces" },
            { name: "Custom Push-to-Open Cabinetry", desc: "Seamless European flat-panel design" },
            { name: "Kitchen Island with Decorative Pendants", desc: "Select homes featuring breakfast bar islands" },
            { name: "Kohler Luxury Plumbing Fixtures", desc: "Deep undermount sinks with pull-down sprayers" },
        ],
        hotspots: [
            { x: "4%", y: "50%", label: "Samsung French Door" },
            { x: "36%", y: "32%", label: "Push-to-Open" },
            { x: "48%", y: "62%", label: "Terrazzo Counters" },
        ],
    },
    {
        id: "living",
        label: "Living & Balcony",
        subtitle: "Open-Concept Layouts & Vistas",
        icon: Home,
        image: `${APP_CONFIG.ORIGIN}/gallary/living room.webp`,
        altImage: `${APP_CONFIG.ORIGIN}/gallary/living room 2.webp`,
        badge: "Open-Concept Residences",
        title: "Fluid Living Spaces with Panoramic Vistas",
        description: "Open-concept architectural floor plans with rich wood-look flooring, custom tailored window treatments, and expansive floor-to-ceiling windows.",
        features: [
            { name: "Studio, 1 & 2 Bedroom Apartment Homes", desc: "Carefully calibrated 505 to 946 sq ft layouts" },
            { name: "Thoughtful Open-Concept Architectural Plans", desc: "Seamless room flow maximizing living space" },
            { name: "Wood-Look Flooring Throughout Living Areas", desc: "Elegant wide-plank contemporary styling" },
            { name: "Custom Tailored Window Treatments", desc: "Privacy and solar control for large windows" },
            { name: "Private Balconies with Swing Doors", desc: "Outdoor fresh air and skyline vistas in select units" },
            { name: "Abundant Natural Light & City Views", desc: "Expansive dual-glazed windows capturing bright California light" },
        ],
        hotspots: [
            { x: "34%", y: "30%", label: "Natural Light & Views" },
            { x: "82%", y: "50%", label: "Open-Concept Flow" },
            { x: "36%", y: "78%", label: "Wood-Look Flooring" },
        ],
    },
    {
        id: "bath",
        label: "Spa Baths",
        subtitle: "Backlit LED Mirrors & Soaking Tubs",
        icon: Bath,
        image: `${APP_CONFIG.ORIGIN}/pic/Bathroom.webp`,
        altImage: `${APP_CONFIG.ORIGIN}/pic/IMG_8446.webp`,
        badge: "Spa-Inspired Bath Retreat",
        title: "Serene Finishes & Backlit Vanities",
        description: "Start and end your day in refined comfort with custom LED backlit vanity mirrors, imported porcelain floor tiles, eco-efficient dual flush toilets, and private en suite layouts.",
        features: [
            { name: "Backlit Bath Vanity LED Mirrors", desc: "Soft ambient lighting and modern framing" },
            { name: "Imported Tile Flooring in Bathrooms", desc: "Slip-resistant luxury porcelain surfaces" },
            { name: "Water-Conserving Dual Flush Toilets", desc: "Modern dual-action eco-friendly sanitation" },
            { name: "En Suite Bathrooms in Select Units", desc: "Exclusive master bath entries in homes #217-#617" },
            { name: "Kohler Fixtures & Soaking Tubs", desc: "Deep relaxing soaking bathtubs and matte hardware" },
            { name: "Built-In Linen & Vanity Storage", desc: "Organized storage for daily essentials" },
        ],
        hotspots: [
            { x: "18%", y: "28%", label: "Backlit LED Mirror" },
            { x: "84%", y: "78%", label: "Kohler Soaking Tub" },
            { x: "56%", y: "90%", label: "Porcelain Tile Floors" },
        ],
    },
    {
        id: "smart",
        label: "Smart & Storage",
        subtitle: "LG Laundry & Keyless Access",
        icon: KeyRound,
        image: `${APP_CONFIG.ORIGIN}/gallary/washer dryer.webp`,
        altImage: `${APP_CONFIG.ORIGIN}/gallary/washer dryer.webp`,
        badge: "Convenience & Technology",
        title: "Effortless Smart Access & Custom Closets",
        description: "Enjoy in-home stacked LG washer and dryer machines, keyless electronic door entry, expansive custom organized closet systems, and available fully furnished residence packages.",
        features: [
            { name: "Stacked LG Washer & Dryer in Every Home", desc: "In-unit laundry convenience included" },
            { name: "Keyless Electronic Smart Door Entry", desc: "Keyless smartphone and code resident access" },
            { name: "Custom Closet Organization Systems", desc: "Built-in shelving, drawers and hanging bars" },
            { name: "Spacious Walk-In Closets in Select Homes", desc: "Generous wardrobe storage for couples and singles" },
            { name: "Fully Furnished Options Available", desc: "Turnkey designer packages ready for move-in" },
            { name: "High-Speed Fiber Internet Ready", desc: "Instant high-bandwidth connections" },
        ],
        hotspots: [
            { x: "52%", y: "45%", label: "Stacked LG Dryer" },
            { x: "52%", y: "75%", label: "LG Direct Drive Washer" },
            { x: "24%", y: "36%", label: "Louvered Closet Door" },
        ],
    },
];

export default function Amenities() {
    const heroRef = useRef(null);
    const showcaseRefs = useRef([]);

    // Resident Amenities Carousel state
    const [amenitySlide, setAmenitySlide] = useState(0);
    const [isAmenityPaused, setIsAmenityPaused] = useState(false);

    // Rooftop Showcase 1 Carousel state
    const [rooftopSlide, setRooftopSlide] = useState(0);
    const [isRooftopPaused, setIsRooftopPaused] = useState(false);

    // Active Home Space tab
    const [activeSpaceId, setActiveSpaceId] = useState("kitchen");
    const activeSpace = homeSpaces.find((s) => s.id === activeSpaceId) || homeSpaces[0];

    // Dual work/workout toggle state for Showcase 3
    const [activeSynergyTab, setActiveSynergyTab] = useState("work");

    // Auto-advance resident amenities carousel
    useEffect(() => {
        if (isAmenityPaused) return;
        const timer = setInterval(() => {
            setAmenitySlide((prev) => (prev + 1) % residentAmenitiesSlides.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isAmenityPaused]);

    // Auto-advance rooftop carousel
    useEffect(() => {
        if (isRooftopPaused) return;
        const timer = setInterval(() => {
            setRooftopSlide((prev) => (prev + 1) % rooftopSlides.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [isRooftopPaused]);

    // GSAP Scroll animations
    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current,
                { opacity: 0, y: 25 },
                { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
            );
        }

        showcaseRefs.current.forEach((sec) => {
            if (sec) {
                gsap.fromTo(
                    sec,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        scrollTrigger: {
                            trigger: sec,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        });
    }, []);

    const addToRefs = (el) => {
        if (el && !showcaseRefs.current.includes(el)) {
            showcaseRefs.current.push(el);
        }
    };

    return (
        <>
            <Head>
                <title>The Essentials Made Exceptional · Amenities at The 900</title>
                <meta
                    name="description"
                    content="At The 900, the amenities are tailor-made living essentials designed to complement your modern life on the go. Coworking, fitness center, and lush roof deck."
                />
            </Head>
            <Navbar />

            <div className="relative bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c] overflow-x-hidden">
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
                            id="amenities-page-changsal-pattern"
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
                    <rect width="100%" height="100%" fill="url(#amenities-page-changsal-pattern)" />
                </svg>

                {/* ================= 1. HERO SECTION (100% RESPONSIVE) ================= */}
                <section className="relative min-h-[460px] xs:min-h-[500px] sm:min-h-[580px] md:min-h-[640px] flex items-center justify-center overflow-hidden pt-24 sm:pt-28 pb-16 sm:pb-24 rounded-b-[32px] sm:rounded-b-[56px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/Header/Ameneties.webp)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/50 sm:bg-black/45 backdrop-brightness-95" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/50" />
                    </div>

                    <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] md:w-[800px] h-[300px] sm:h-[400px] bg-[#c77950]/20 rounded-full blur-[100px] sm:blur-[130px]" />

                    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 w-full text-center">
                        <div ref={heroRef} className="flex flex-col items-center">
                            {/* The Essentials Badge */}
                            <div className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-black/50 backdrop-blur-xl border border-[#c77950]/60 shadow-xl mb-3.5 sm:mb-5">
                                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#c77950] animate-pulse shrink-0" />
                                <span className="text-[10px] sm:text-xs font-bold tracking-[2.5px] sm:tracking-[3.5px] uppercase text-[#ffd9c7]">
                                    THE ESSENTIALS
                                </span>
                            </div>

                            {/* Headline */}
                            <h1 className="font-cormorant text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[1.08] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]">
                                Made <span className="italic font-normal text-[#ffd9c7]">Exceptional</span>
                            </h1>

                            {/* Narrative Paragraph */}
                            <p className="text-white/95 text-xs xs:text-sm sm:text-base md:text-lg mt-3.5 sm:mt-5 font-light leading-relaxed max-w-3xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] px-1 sm:px-0">
                                At The 900, the amenities are tailor-made living essentials designed to complement your modern life on the go. That means work and play come natural with everything from a fully-outfitted co-working space and fitness center to a lush roof deck with spaces perfect for relaxing and unwinding. A comfortably sophisticated living experience featuring spaces with artful touches and refined design from the lobby to the roof deck.
                            </p>

                            {/* Hero Action Buttons - Single Horizontal Row */}
                            <div className="mt-7 sm:mt-8 flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
                                <a
                                    href="#home-features"
                                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#9c4f29] text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_6px_25px_rgba(199,121,80,0.45)] transition-all duration-300 hover:-translate-y-0.5 shrink-0 whitespace-nowrap"
                                >
                                    <span>EXPLORE FINISHES</span>
                                    <ArrowRight className="w-4 h-4" />
                                </a>

                                <Link
                                    href="/availability"
                                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/50 hover:border-transparent text-xs sm:text-sm font-bold tracking-wider uppercase backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 shadow-lg shrink-0 whitespace-nowrap"
                                >
                                    <span>VIEW AVAILABILITY</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 2. EDITORIAL 3 SHOWCASES ================= */}
                <section className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-[1560px] mx-auto space-y-12 sm:space-y-18 lg:space-y-24">
                    {/* Showcase 1: Relax with a view */}
                    <div
                        ref={addToRefs}
                        className="relative rounded-[28px] sm:rounded-[40px] bg-white/95 border border-white/80 p-5 sm:p-10 lg:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
                            <div className="lg:col-span-7 relative group">
                                <div
                                    className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] rounded-[22px] sm:rounded-[32px] overflow-hidden shadow-xl border-2 sm:border-4 border-white/90 bg-neutral-900 select-none"
                                    onMouseEnter={() => setIsRooftopPaused(true)}
                                    onMouseLeave={() => setIsRooftopPaused(false)}
                                >
                                    {rooftopSlides.map((slide, idx) => (
                                        <div
                                            key={idx}
                                            className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                                idx === rooftopSlide
                                                    ? "opacity-100 z-10 scale-100"
                                                    : "opacity-0 z-0 scale-105 pointer-events-none"
                                            }`}
                                        >
                                            <img
                                                src={slide.image}
                                                alt={slide.alt}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                loading={idx === 0 ? "eager" : "lazy"}
                                            />
                                            {/* Atmospheric Gradient Scrim */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />

                                            {/* Top Tag / Badge */}
                                            <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 px-3 sm:px-4 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-md">
                                                {slide.badge}
                                            </div>

                                            {/* Bottom Slide Info Overlay */}
                                            <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-6 text-white">
                                                <div className="flex items-center gap-1.5 mb-1">
                                                    <Sun className="w-3.5 h-3.5 text-[#c77950]" />
                                                    <span className="text-[10.5px] sm:text-xs font-bold tracking-wider uppercase text-[#ffd9c7]">
                                                        {slide.subBadge}
                                                    </span>
                                                </div>
                                                <h3 className="font-montserrat font-bold text-sm sm:text-lg text-white leading-tight">
                                                    {slide.title}
                                                </h3>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Navigation Arrows */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setRooftopSlide(
                                                (prev) =>
                                                    (prev - 1 + rooftopSlides.length) %
                                                    rooftopSlides.length
                                            );
                                        }}
                                        className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#c77950] text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md backdrop-blur-sm"
                                        aria-label="Previous rooftop slide"
                                    >
                                        <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setRooftopSlide(
                                                (prev) => (prev + 1) % rooftopSlides.length
                                            );
                                        }}
                                        className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-[#c77950] text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md backdrop-blur-sm"
                                        aria-label="Next rooftop slide"
                                    >
                                        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5" />
                                    </button>

                                    {/* Top-Right Badge Counter & Dots */}
                                    <div className="absolute top-3 sm:top-5 right-3 sm:right-5 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/55 backdrop-blur-md border border-white/20">
                                        <span className="text-[10px] sm:text-xs font-semibold text-white/90 mr-1">
                                            0{rooftopSlide + 1} / 0{rooftopSlides.length}
                                        </span>
                                        {rooftopSlides.map((_, dotIdx) => (
                                            <button
                                                key={dotIdx}
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setRooftopSlide(dotIdx);
                                                }}
                                                className={`h-1.5 rounded-full transition-all ${
                                                    dotIdx === rooftopSlide
                                                        ? "w-4 bg-[#c77950]"
                                                        : "w-1.5 bg-white/50 hover:bg-white"
                                                }`}
                                                aria-label={`Go to rooftop slide ${dotIdx + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/25 text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase w-fit mb-2.5 sm:mb-4">
                                    <Flame className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    <span>OUTDOOR OASIS</span>
                                </div>
                                <h2 className="font-cormorant text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1f2c] leading-[1.12]">
                                    Relax with a view.
                                </h2>
                                <div className="w-12 sm:w-16 h-[2px] bg-[#c77950] my-3 sm:my-4" />
                                <p className="text-xs sm:text-base text-[#5a627a] font-normal leading-relaxed">
                                    Take in beautiful sights and comforts from the roof deck with unique spaces for lounging, games or kicking your feet up by the fire.
                                </p>

                                <div className="mt-5 sm:mt-7 pt-4 sm:pt-6 border-t border-[#e8e9f0] grid grid-cols-2 gap-2.5 sm:gap-3.5">
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Cozy Firepits</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>BBQ Grills</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Outdoor TV Lounge</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Social Dining</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Showcase 2: Game on. Pedal on. */}
                    <div
                        ref={addToRefs}
                        className="relative rounded-[28px] sm:rounded-[40px] bg-white/95 border border-white/80 p-5 sm:p-10 lg:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
                            <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/25 text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase w-fit mb-2.5 sm:mb-4">
                                    <Wine className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    <span>SOCIAL & RECREATION</span>
                                </div>
                                <h2 className="font-cormorant text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1f2c] leading-[1.12]">
                                    Game on. Pedal on.
                                </h2>
                                <div className="w-12 sm:w-16 h-[2px] bg-[#c77950] my-3 sm:my-4" />
                                <p className="text-xs sm:text-base text-[#5a627a] font-normal leading-relaxed">
                                    Between the roof deck, clubroom and co-working space, sometimes staying home is the best time of all.
                                </p>

                                <div className="mt-5 sm:mt-7 pt-4 sm:pt-6 border-t border-[#e8e9f0] grid grid-cols-2 gap-2.5 sm:gap-3.5">
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Entertaining Kitchen</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Shuffleboard & TV</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Cocktail Bar</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-[#1a1f2c]">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#c77950] shrink-0" />
                                        <span>Secure Bike Room</span>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-7 order-1 lg:order-2 relative group">
                                <div className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] rounded-[22px] sm:rounded-[32px] overflow-hidden shadow-xl border-2 sm:border-4 border-white/90">
                                    <img
                                        src={`${APP_CONFIG.ORIGIN}/gallary/recreation room shuffleboard.webp`}
                                        alt="Resident rec lounge with custom shuffleboard and entertaining bar"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-50" />
                                    
                                    <div className="absolute top-3 sm:top-5 left-3 sm:left-5 px-3 sm:px-4 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-md">
                                        Resident Rec Lounge
                                    </div>
                                    <div className="absolute bottom-3 sm:bottom-5 right-3 sm:right-5 px-3 sm:px-4 py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-xs font-bold text-[#1a1f2c] shadow-lg flex items-center gap-1.5">
                                        <Wine className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#c77950]" />
                                        <span>Cocktails & Games</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Showcase 3: From work to working out */}
                    <div
                        ref={addToRefs}
                        className="relative rounded-[28px] sm:rounded-[40px] bg-white/95 border border-white/80 p-5 sm:p-10 lg:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden"
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
                            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                    <div
                                        onClick={() => setActiveSynergyTab("work")}
                                        className={`cursor-pointer rounded-2xl sm:rounded-[28px] p-2.5 sm:p-4 transition-all duration-300 border-2 ${
                                            activeSynergyTab === "work"
                                                ? "border-[#c77950] bg-white shadow-lg scale-[1.01]"
                                                : "border-transparent bg-white/70 hover:bg-white shadow-xs"
                                        }`}
                                    >
                                        <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden relative mb-2 sm:mb-3">
                                            <img
                                                src={`${APP_CONFIG.ORIGIN}/gallary/cowroking space.webp`}
                                                alt="Co-working Space"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/65 text-[9px] sm:text-[10px] font-bold text-white uppercase backdrop-blur-xs">
                                                Co-Working
                                            </span>
                                        </div>
                                        <h3 className="font-montserrat font-bold text-xs sm:text-sm md:text-base text-[#1a1f2c] flex items-center justify-between">
                                            <span>Productivity</span>
                                            <Laptop className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c77950]" />
                                        </h3>
                                        <p className="text-[10px] sm:text-xs text-[#5a627a] mt-0.5 line-clamp-1 sm:line-clamp-none">
                                            Zoom booths & pods
                                        </p>
                                    </div>

                                    <div
                                        onClick={() => setActiveSynergyTab("workout")}
                                        className={`cursor-pointer rounded-2xl sm:rounded-[28px] p-2.5 sm:p-4 transition-all duration-300 border-2 ${
                                            activeSynergyTab === "workout"
                                                ? "border-[#c77950] bg-white shadow-lg scale-[1.01]"
                                                : "border-transparent bg-white/70 hover:bg-white shadow-xs"
                                        }`}
                                    >
                                        <div className="aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden relative mb-2 sm:mb-3">
                                            <img
                                                src={`${APP_CONFIG.ORIGIN}/pic/GYM.webp`}
                                                alt="Fitness Center"
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/65 text-[9px] sm:text-[10px] font-bold text-white uppercase backdrop-blur-xs">
                                                Fitness Studio
                                            </span>
                                        </div>
                                        <h3 className="font-montserrat font-bold text-xs sm:text-sm md:text-base text-[#1a1f2c] flex items-center justify-between">
                                            <span>Wellness</span>
                                            <Dumbbell className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#c77950]" />
                                        </h3>
                                        <p className="text-[10px] sm:text-xs text-[#5a627a] mt-0.5 line-clamp-1 sm:line-clamp-none">
                                            Matrix cardio & turf
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-5 flex flex-col justify-center">
                                <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-[#c77950]/10 border border-[#c77950]/25 text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase w-fit mb-2.5 sm:mb-4">
                                    <Activity className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                                    <span>HYBRID LIVING</span>
                                </div>
                                <h2 className="font-cormorant text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1a1f2c] leading-[1.12]">
                                    From work <br className="hidden sm:block" />
                                    <span className="text-[#c77950]">to working out.</span>
                                </h2>
                                <div className="w-12 sm:w-16 h-[2px] bg-[#c77950] my-3 sm:my-4" />
                                <p className="text-xs sm:text-base text-[#5a627a] font-normal leading-relaxed">
                                    From your Zoom call in the co-working space to your HIIT session in the fitness center, The 900 gives you everything you need to stay on top of your work and work up a sweat.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 3. RESIDENT AMENITIES ================= */}
                <section id="resident-amenities" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-[1560px] mx-auto">
                    <div className="rounded-[28px] sm:rounded-[40px] bg-white/95 border border-white/80 p-5 sm:p-10 lg:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
                        <div className="text-center mb-8 sm:mb-12">
                            <span className="text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase bg-[#c77950]/10 px-4 py-1.5 rounded-full border border-[#c77950]/20">
                                RESIDENT REC ROOM & COMMUNITY SPACES
                            </span>
                            <h2 className="font-cormorant text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1f2c] mt-3">
                                Resident Amenities
                            </h2>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#c77950] mx-auto mt-3" />
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center">
                            {/* Carousel */}
                            <div
                                className="lg:col-span-6 xl:col-span-7 relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] rounded-[22px] sm:rounded-[32px] overflow-hidden shadow-xl bg-black group"
                                onMouseEnter={() => setIsAmenityPaused(true)}
                                onMouseLeave={() => setIsAmenityPaused(false)}
                            >
                                {residentAmenitiesSlides.map((slide, idx) => (
                                    <div
                                        key={idx}
                                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                            idx === amenitySlide ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105 pointer-events-none"
                                        }`}
                                    >
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                                        
                                        <div className="absolute top-3 sm:top-5 left-3 sm:left-5 z-20 px-3 sm:px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white">
                                            {slide.category}
                                        </div>

                                        <div className="absolute inset-x-0 bottom-0 z-20 p-4 sm:p-7">
                                            <span className="text-[10px] sm:text-xs font-bold text-[#ffd9c7] uppercase tracking-wider block mb-0.5">
                                                {slide.tag}
                                            </span>
                                            <h3 className="font-montserrat font-bold text-lg sm:text-2xl text-white leading-tight">
                                                {slide.title}
                                            </h3>
                                            <p className="text-xs sm:text-sm text-white/90 mt-1 font-light leading-snug line-clamp-2 sm:line-clamp-none max-w-xl">
                                                {slide.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <button
                                    type="button"
                                    onClick={() => setAmenitySlide((prev) => (prev - 1 + residentAmenitiesSlides.length) % residentAmenitiesSlides.length)}
                                    className="absolute left-2.5 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-[#c77950] text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAmenitySlide((prev) => (prev + 1) % residentAmenitiesSlides.length)}
                                    className="absolute right-2.5 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/50 hover:bg-[#c77950] text-white border border-white/30 flex items-center justify-center transition-all opacity-80 hover:opacity-100 shadow-md"
                                    aria-label="Next"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>

                                <div className="absolute bottom-3 sm:bottom-4 right-4 sm:right-6 z-30 flex items-center gap-1.5">
                                    {residentAmenitiesSlides.map((_, dotIdx) => (
                                        <button
                                            key={dotIdx}
                                            onClick={() => setAmenitySlide(dotIdx)}
                                            className={`h-2 rounded-full transition-all ${
                                                dotIdx === amenitySlide ? "w-6 bg-[#c77950]" : "w-2 bg-white/60 hover:bg-white"
                                            }`}
                                            aria-label={`Slide ${dotIdx + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Checklist */}
                            <div className="lg:col-span-6 xl:col-span-5 space-y-2.5 sm:space-y-3">
                                {residentAmenitiesList.map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <div
                                            key={idx}
                                            className="p-3 sm:p-4 rounded-2xl bg-white border border-[#e8e9f0] shadow-2xs hover:border-[#c77950]/50 transition-all flex items-start gap-3 group"
                                        >
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#c77950]/10 border border-[#c77950]/20 flex items-center justify-center text-[#c77950] shrink-0 group-hover:bg-[#c77950] group-hover:text-white transition-colors shadow-2xs">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-1.5">
                                                    <h4 className="text-xs sm:text-sm font-bold text-[#1a1f2c] group-hover:text-[#c77950] transition-colors leading-tight truncate">
                                                        {item.title}
                                                    </h4>
                                                    <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#c77950] bg-[#c77950]/10 px-2 py-0.5 rounded-full shrink-0">
                                                        {item.tag}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] sm:text-xs text-[#5a627a] mt-0.5 leading-snug">
                                                    {item.desc}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                {/* ================= 4. HOME KITCHEN & DESIGNER FINISHES (MOBILE-OPTIMIZED) ================= */}
                <section id="home-features" className="py-12 sm:py-20 lg:py-24 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-[1560px] mx-auto">
                    <div className="rounded-[28px] sm:rounded-[40px] bg-white/95 border border-white/80 p-5 sm:p-10 lg:p-14 shadow-[0_15px_45px_rgba(0,0,0,0.06)]">
                        {/* Header */}
                        <div className="text-center mb-6 sm:mb-10">
                            <span className="text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase bg-[#c77950]/10 px-4 py-1.5 rounded-full border border-[#c77950]/20">
                                RESIDENCE INTERIORS • DESIGNER APARTMENTS
                            </span>
                            <h2 className="font-cormorant text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold text-[#1a1f2c] mt-3">
                                Home Features & Finishes
                            </h2>
                            <div className="w-12 sm:w-16 h-[2px] bg-[#c77950] mx-auto mt-3" />
                            <p className="text-xs sm:text-base text-[#5a627a] max-w-2xl mx-auto mt-2.5 font-normal px-2">
                                Explore the designer craftsmanship, European cabinetry, terrazzo finishes, and smart amenities inside every home at The 900.
                            </p>
                        </div>

                        {/* Room Switcher Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-12">
                            {homeSpaces.map((space) => {
                                const Icon = space.icon;
                                const isActive = activeSpaceId === space.id;
                                return (
                                    <button
                                        key={space.id}
                                        type="button"
                                        onClick={() => setActiveSpaceId(space.id)}
                                        className={`flex items-center gap-1.5 sm:gap-2.5 px-3.5 sm:px-5 py-2 sm:py-3 rounded-full text-[11px] sm:text-xs md:text-sm font-bold tracking-wider uppercase transition-all duration-300 ${
                                            isActive
                                                ? "bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-[0_4px_18px_rgba(199,121,80,0.4)] scale-102"
                                                : "bg-white text-[#1a1f2c] hover:bg-[#e8e9f0] hover:text-[#c77950] border border-[#d6d8e5]"
                                        }`}
                                    >
                                        <Icon className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isActive ? "text-white" : "text-[#c77950]"}`} />
                                        <span>{space.label}</span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Active Room Visual Showcase */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-14 items-center bg-gradient-to-br from-[#f2f3f8] to-[#e8e9f0] p-4 sm:p-8 lg:p-10 rounded-[24px] sm:rounded-[36px] border border-[#d6d8e5]">
                            {/* Photo Showcase */}
                            <div className="lg:col-span-7 space-y-3 sm:space-y-4">
                                <div className="relative aspect-[4/3] xs:aspect-[16/11] sm:aspect-[16/10] rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-xl border-2 sm:border-4 border-white group">
                                    <img
                                        src={activeSpace.image}
                                        alt={activeSpace.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    
                                    <div className="absolute top-3 sm:top-5 left-3 sm:left-5 px-3 sm:px-4 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-white shadow-md">
                                        {activeSpace.badge}
                                    </div>

                                    {/* Interactive Pulsing Hotspots */}
                                    {activeSpace.hotspots?.map((spot, sIdx) => (
                                        <div
                                            key={sIdx}
                                            className="absolute group/spot cursor-pointer"
                                            style={{ left: spot.x, top: spot.y }}
                                        >
                                            <div className="relative flex items-center justify-center">
                                                <span className="animate-ping absolute inline-flex h-6 sm:h-8 w-6 sm:w-8 rounded-full bg-[#c77950] opacity-75" />
                                                <div className="relative w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#c77950] text-white border-2 border-white shadow-lg flex items-center justify-center text-[10px] sm:text-xs font-extrabold">
                                                    ✦
                                                </div>
                                                <div className={`absolute bottom-full mb-1.5 whitespace-nowrap bg-black/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-full border border-white/30 opacity-0 group-hover/spot:opacity-100 transition-opacity pointer-events-none shadow-lg z-30 ${parseInt(spot.x) < 20 ? "left-0" : parseInt(spot.x) > 80 ? "right-0" : "left-1/2 -translate-x-1/2"}`}>
                                                    {spot.label}
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* Bottom tags */}
                                    <div className="absolute inset-x-0 bottom-0 p-3 sm:p-5 flex flex-wrap gap-1.5 sm:gap-2">
                                        {activeSpace.features.slice(0, 3).map((feat, fIdx) => (
                                            <span
                                                key={fIdx}
                                                className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-white/95 backdrop-blur-md text-[10px] sm:text-[11px] font-bold text-[#1a1f2c] shadow-xs flex items-center gap-1"
                                            >
                                                <CheckCircle2 className="w-3 h-3 text-[#c77950]" />
                                                <span>{feat.name.split(',')[0]}</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Perspectives */}
                                <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                                    <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-sm relative group">
                                        <img
                                            src={activeSpace.image}
                                            alt={activeSpace.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 text-[9px] sm:text-[10px] font-bold text-white uppercase">
                                            Main Angle
                                        </span>
                                    </div>
                                    <div className="aspect-[16/9] rounded-xl sm:rounded-2xl overflow-hidden border-2 border-white shadow-sm relative group">
                                        <img
                                            src={activeSpace.altImage}
                                            alt={activeSpace.title}
                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded-full bg-black/60 text-[9px] sm:text-[10px] font-bold text-white uppercase">
                                            Detail Angle
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Details Panel */}
                            <div className="lg:col-span-5 bg-white/95 rounded-[22px] sm:rounded-[32px] p-5 sm:p-7 md:p-8 border border-white shadow-lg flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <span className="text-[10px] sm:text-xs font-bold text-[#c77950] tracking-widest uppercase">
                                            {activeSpace.korean}
                                        </span>
                                        <span className="w-2 h-2 rounded-full bg-[#c77950]" />
                                    </div>

                                    <h3 className="font-cormorant text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a1f2c] leading-tight">
                                        {activeSpace.title}
                                    </h3>
                                    
                                    <div className="w-10 h-[2px] bg-[#c77950] my-3 sm:my-4" />
                                    
                                    <p className="text-xs sm:text-sm text-[#5a627a] font-normal leading-relaxed">
                                        {activeSpace.description}
                                    </p>

                                    {/* Features Checklist */}
                                    <div className="mt-4 sm:mt-6 space-y-2.5 pt-3.5 border-t border-[#e8e9f0]">
                                        {activeSpace.features.map((item, pIdx) => (
                                            <div key={pIdx} className="flex items-start gap-2 sm:gap-2.5">
                                                <div className="w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full bg-[#c77950]/15 text-[#c77950] flex items-center justify-center shrink-0 mt-0.5">
                                                    <Check className="w-3 h-3 stroke-[2.5]" />
                                                </div>
                                                <div>
                                                    <h5 className="text-[11px] sm:text-xs md:text-sm font-bold text-[#1a1f2c] leading-tight">
                                                        {item.name}
                                                    </h5>
                                                    <p className="text-[10px] sm:text-[11px] text-[#5a627a] mt-0.5">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-[#e8e9f0]">
                                    <Link
                                        href="/availability"
                                        className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#1a1f2c] hover:bg-[#c77950] text-white text-xs sm:text-sm font-bold tracking-wider uppercase transition-colors shadow-md"
                                    >
                                        <span>VIEW AVAILABILITY & PLANS</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* 22-Feature Specification Index Grid */}
                        <div className="mt-10 sm:mt-14 pt-6 sm:pt-10 border-t border-[#e8e9f0]">
                            <h4 className="text-center font-montserrat font-bold text-base sm:text-lg text-[#1a1f2c] mb-5 sm:mb-7">
                                Complete In-Home Specification Index
                            </h4>
                            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
                                {[
                                    "Studio, 1 & 2 bedroom apartment homes",
                                    "Fully furnished options available",
                                    "Thoughtful open-concept plans",
                                    "Frigidaire range, dishwasher & microwave",
                                    "Samsung French door refrigerators with bottom freezer",
                                    "Stacked LG washer & dryer in every home",
                                    "Kohler luxury plumbing fixtures",
                                    "Custom push-to-open flat-panel cabinetry",
                                    "Terrazzo countertops throughout",
                                    "Full kitchen tile backsplash",
                                    "Wood-look flooring in living, kitchen & beds",
                                    "Custom tailored window treatments",
                                    "Tile flooring in all bathrooms",
                                    "Kitchen islands with decorative pendant lighting",
                                    "Backlit bath vanity LED mirrors",
                                    "Eco-conscious dual flush toilets",
                                    "En suite bathrooms in select units (#217-#617)",
                                    "Custom closet organization system",
                                    "Generous walk-in closets in select units",
                                    "Balconies with swing doors in select units",
                                    "Keyless smart electronic door entry",
                                    "Hollywood views from select units",
                                ].map((feat, fIdx) => (
                                    <div
                                        key={fIdx}
                                        className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white border border-[#e8e9f0] shadow-2xs flex items-center gap-2.5 hover:border-[#c77950]/50 transition-colors"
                                    >
                                        <div className="w-4.5 h-4.5 rounded-full bg-[#c77950]/10 text-[#c77950] flex items-center justify-center shrink-0">
                                            <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                                        </div>
                                        <span className="text-[11px] sm:text-xs font-medium text-[#1a1f2c] leading-tight">
                                            {feat}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal Disclaimer */}
                        <div className="mt-8 sm:mt-10 pt-4 sm:pt-6 border-t border-[#e8e9f0] text-center">
                            <p className="text-[10px] sm:text-xs text-[#5a627a] italic max-w-4xl mx-auto leading-relaxed">
                                Each amenity may not be available in every unit. Any amenities, fees or concessions not included in the lease agreement are subject to change without notice.
                            </p>
                        </div>
                    </div>
                </section>

                {/* ================= 5. BOTTOM CTA BANNER ================= */}
                <section className="pb-16 sm:pb-24 px-4 sm:px-8 lg:px-14 xl:px-20 max-w-[1560px] mx-auto">
                    <div className="rounded-[28px] sm:rounded-[40px] bg-gradient-to-r from-[#c77950] via-[#b3633b] to-[#9c4f29] p-6 sm:p-12 lg:p-14 text-white shadow-[0_20px_50px_rgba(199,121,80,0.35)] flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
                        <div className="text-center md:text-left">
                            <h3 className="font-cormorant text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold">
                                Experience The 900 in Person
                            </h3>
                            <p className="text-white/90 text-xs sm:text-base mt-2 sm:mt-3 max-w-2xl font-light">
                                Schedule a private tour today to view our rooftop lounge, coworking space, and available residences.
                            </p>
                        </div>
                        <Link
                            href="/availability"
                            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1a1f2c] font-bold text-xs sm:text-sm tracking-wider uppercase shadow-xl hover:bg-[#ffd9c7] transition-all shrink-0 hover:-translate-y-0.5"
                        >
                            <span>VIEW AVAILABILITY</span>
                            <ArrowRight className="w-4 h-4 text-[#c77950]" />
                        </Link>
                    </div>
                </section>
            </div>

            <Footer />
        </>
    );
}
