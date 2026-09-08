import React, { useEffect, useRef, useState, useMemo } from "react";
import { Head, Link } from "@inertiajs/react";
import gsap from "gsap";
import APP_CONFIG from "./config";
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";
import {
    Sparkles,
    Maximize2,
    X,
    ChevronLeft,
    ChevronRight,
    Building2,
    Dumbbell,
    Eye,
    ArrowRight,
    Home,
    Layers,
    ZoomIn,
    ZoomOut,
    RotateCcw,
} from "lucide-react";

const photos = [
    {
        id: "rooftop-sunset-ambient",
        title: "Golden Hour Sunset Rooftop Terrace & Bistro Lighting",
        category: "skyline",
        tag: "Rooftop Sky Deck",
        src: `${APP_CONFIG.ORIGIN}/gallary/roofptop%20enbient%20lioght.webp`,
        span: "md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[480px]",
    },
    {
        id: "clubroom-bar-lounge",
        title: "Resident Recreation Clubroom & Bar Island",
        category: "amenities",
        tag: "Clubroom Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/Recreation%20room.webp`,
        span: "min-h-[260px] md:min-h-[230px]",
    },
    {
        id: "chef-kitchen-island",
        title: "Gourmet Kitchen & Terrazzo Breakfast Island",
        category: "residences",
        tag: "Kitchen & Dining",
        src: `${APP_CONFIG.ORIGIN}/gallary/kitchen.webp`,
        span: "min-h-[260px] md:min-h-[230px]",
    },
    {
        id: "dtla-skyline-view",
        title: "Unobstructed DTLA Skyline & Sunset Views",
        category: "skyline",
        tag: "Skyline Panorama",
        src: `${APP_CONFIG.ORIGIN}/gallary/rooftop%20city%20view.webp`,
        span: "md:col-span-2 min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "coworking-focus-hub",
        title: "Executive Co-Working Lounge & Focus Suites",
        category: "amenities",
        tag: "Co-Working Hub",
        src: `${APP_CONFIG.ORIGIN}/gallary/cowroking%20space.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "sunlit-living-room",
        title: "Sunlit Designer Living Room & Media Console",
        category: "residences",
        tag: "Living Space",
        src: `${APP_CONFIG.ORIGIN}/gallary/living%20room.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "private-conference-suite",
        title: "Executive Conference Room & Presentation Display",
        category: "amenities",
        tag: "Conference Room",
        src: `${APP_CONFIG.ORIGIN}/gallary/conferrence%20room.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "shuffleboard-gaming-lounge",
        title: "Custom Plank & Hide Co. Shuffleboard Game Lounge",
        category: "amenities",
        tag: "Game Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/recreation%20room%20shuffleboard.webp`,
        span: "md:col-span-2 min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "spa-soaking-tub",
        title: "Spa-Inspired Bathroom with Soaking Tub & Backlit Vanity",
        category: "residences",
        tag: "Spa Bath",
        src: `${APP_CONFIG.ORIGIN}/gallary/bathrrom.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "rooftop-cornhole-deck",
        title: "Rooftop Cornhole Gaming Deck & Skyline Backdrop",
        category: "skyline",
        tag: "Rooftop Sky Deck",
        src: `${APP_CONFIG.ORIGIN}/gallary/cornhole.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "social-club-kitchen",
        title: "Resident Social Club & Demonstration Kitchen",
        category: "amenities",
        tag: "Clubroom Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/recatrtion%20room%202.webp`,
        span: "md:col-span-2 min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "serene-bedroom-suite",
        title: "Sun-Drenched Bedroom Suite with Picture Windows",
        category: "residences",
        tag: "Bedroom",
        src: `${APP_CONFIG.ORIGIN}/gallary/bedroom.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "rooftop-cabana-terrace",
        title: "Sky Deck Cabana Umbrellas & Outdoor Seating",
        category: "skyline",
        tag: "Rooftop Sky Deck",
        src: `${APP_CONFIG.ORIGIN}/gallary/rooftop.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "library-dining-room",
        title: "Resident Dining Room & Curated Library Display",
        category: "amenities",
        tag: "Clubroom Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/recraetion%20room.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "elevator-residential-lobby",
        title: "Designer Elevator Foyer & Residential Corridor",
        category: "amenities",
        tag: "Lobby & Corridors",
        src: `${APP_CONFIG.ORIGIN}/gallary/elevator%20lobby.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "open-concept-dining-living",
        title: "Open-Concept Dining & Living Room Suite",
        category: "residences",
        tag: "Living Space",
        src: `${APP_CONFIG.ORIGIN}/gallary/living%20room%202.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "rooftop-garden-dog-run",
        title: "Rooftop Garden Terrace & Elevated Turf Dog Run",
        category: "skyline",
        tag: "Rooftop Sky Deck",
        src: `${APP_CONFIG.ORIGIN}/gallary/rooftop%202.webp`,
        span: "md:col-span-2 min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "conversation-media-lounge",
        title: "Clubroom Media Lounge & Conversation Area",
        category: "amenities",
        tag: "Clubroom Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/recareation%20room%202.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "secure-mail-package-hub",
        title: "Secure Keycard Mailroom & Package Locker Hub",
        category: "amenities",
        tag: "Package Hub",
        src: `${APP_CONFIG.ORIGIN}/gallary/mailroom%20and%20package%20room.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "architectural-screen-lounge",
        title: "Clubroom Kitchen Island & Architectural Slatted Screen",
        category: "amenities",
        tag: "Clubroom Lounge",
        src: `${APP_CONFIG.ORIGIN}/gallary/recreation%20room%203.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
    {
        id: "in-unit-stacked-laundry",
        title: "In-Unit Full-Size Stacked Smart Washer & Dryer",
        category: "residences",
        tag: "Laundry & Storage",
        src: `${APP_CONFIG.ORIGIN}/gallary/washer%20dryer.webp`,
        span: "min-h-[260px] md:min-h-[280px]",
    },
];

const categories = [
    { id: "all", label: "All", icon: Sparkles },
    { id: "residences", label: "Residences", icon: Home },
    { id: "amenities", label: "Amenities", icon: Dumbbell },
    { id: "skyline", label: "Skyline & Rooftop", icon: Eye },
];

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState("all");
    const [lightboxIndex, setLightboxIndex] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [loaded, setLoaded] = useState({});
    const gridRef = useRef(null);
    const filmstripRef = useRef(null);

    const filtered = useMemo(() => {
        return activeCategory === "all"
            ? photos
            : photos.filter((p) => p.category === activeCategory);
    }, [activeCategory]);

    // Reset zoom whenever image changes
    useEffect(() => {
        setZoomLevel(1);
    }, [lightboxIndex]);

    const handleZoomIn = (e) => {
        e?.stopPropagation();
        setZoomLevel((prev) => Math.min(prev + 0.35, 2.5));
    };

    const handleZoomOut = (e) => {
        e?.stopPropagation();
        setZoomLevel((prev) => Math.max(prev - 0.35, 1));
    };

    const handleToggleZoom = (e) => {
        e?.stopPropagation();
        setZoomLevel((prev) => (prev > 1 ? 1 : 1.75));
    };

    // Animate grid on category change
    useEffect(() => {
        if (gridRef.current) {
            gsap.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.03, ease: "power2.out" }
            );
        }
    }, [activeCategory]);

    // Keyboard navigation in lightbox
    useEffect(() => {
        const onKeyDown = (e) => {
            if (lightboxIndex === null) return;
            if (e.key === "Escape") setLightboxIndex(null);
            if (e.key === "ArrowRight") {
                setLightboxIndex((prev) => (prev + 1) % filtered.length);
            }
            if (e.key === "ArrowLeft") {
                setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [lightboxIndex, filtered.length]);

    // Scroll active thumbnail into view
    useEffect(() => {
        if (lightboxIndex !== null && filmstripRef.current) {
            const btn = filmstripRef.current.children[lightboxIndex];
            if (btn) {
                btn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
            }
        }
    }, [lightboxIndex]);

    // Lock body scroll during lightbox
    useEffect(() => {
        document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxIndex]);

    return (
        <>
            <Head>
                <title>Gallery · The 900 Residences Koreatown LA</title>
                <meta
                    name="description"
                    content="Visual gallery of luxury residences, rooftop skyline lounge, and amenities at The 900 Residences in Koreatown, Los Angeles."
                />
            </Head>
            <Navbar />

            <main id="main-content" className="relative bg-[#e8e9f0] text-[#1a1f2c] min-h-screen selection:bg-[#c77950]/30 selection:text-[#1a1f2c]">
                {/* ================= CLEAN HERO BANNER ================= */}
                <section className="relative min-h-[380px] sm:min-h-[440px] flex items-center justify-center overflow-hidden pt-28 pb-16 sm:pb-20 rounded-b-[32px] sm:rounded-b-[48px] shadow-[0_16px_40px_rgba(0,0,0,0.12)]">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
                        style={{
                            backgroundImage: `url(${APP_CONFIG.ORIGIN}/gallary/roofptop%20enbient%20lioght.webp)`,
                        }}
                    >
                        <div className="absolute inset-0 bg-black/50" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/50" />
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 w-full text-center">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-[#c77950]/60 mb-3.5 shadow-sm">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#c77950] animate-pulse" />
                            <span className="text-[10.5px] font-bold tracking-[2px] uppercase text-[#ffd9c7]">
                                Visual Gallery
                            </span>
                        </div>

                        <h1 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight leading-[1.1] drop-shadow-md">
                            The 900 Gallery
                        </h1>

                        <p className="text-white/90 text-sm sm:text-base mt-2.5 font-light max-w-xl mx-auto drop-shadow-sm">
                            Explore residences, rooftop skyline vistas, and curated lifestyle amenities.
                        </p>

                        {/* Minimalist Filter Pills */}
                        <div className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                            {categories.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = activeCategory === cat.id;
                                const count =
                                    cat.id === "all"
                                        ? photos.length
                                        : photos.filter((p) => p.category === cat.id).length;

                                return (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => setActiveCategory(cat.id)}
                                        aria-pressed={isActive}
                                        aria-label={`Filter by ${cat.label} (${count} photos)`}
                                        className={`inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 backdrop-blur-md cursor-pointer ${
                                            isActive
                                                ? "bg-[#c77950] text-white shadow-[0_4px_18px_rgba(199,121,80,0.5)] border border-[#c77950] scale-105"
                                                : "bg-white/90 text-[#1a1f2c] hover:bg-white hover:text-[#c77950] border border-[#d6d8e5] backdrop-blur-md"
                                        }`}
                                    >
                                        <Icon size={13} className={isActive ? "text-white" : "text-[#c77950]"} />
                                        <span>{cat.label}</span>
                                        <span
                                            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                                isActive ? "bg-white/25 text-white" : "bg-[#1a1f2c]/5 text-[#5a627a]"
                                            }`}
                                        >
                                            {count}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ================= MODERN VISUAL GRID ================= */}
                <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
                    <div
                        ref={gridRef}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                    >
                        {filtered.map((photo, index) => {
                            const isLoaded = loaded[photo.id];
                            const spanClass = activeCategory === "all" ? photo.span : "min-h-[260px]";

                            return (
                                <article
                                    key={photo.id || index}
                                    role="button"
                                    tabIndex={0}
                                    aria-label={`View photo: ${photo.title} (${photo.tag})`}
                                    onClick={() => setLightboxIndex(index)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            e.preventDefault();
                                            setLightboxIndex(index);
                                        }
                                    }}
                                    className={`group relative rounded-2xl overflow-hidden bg-[#d5d8e3] border border-white/80 shadow-sm hover:shadow-[0_16px_40px_rgba(199,121,80,0.2)] hover:border-[#c77950]/50 transition-all duration-300 cursor-pointer flex flex-col justify-end ${spanClass}`}
                                >
                                    {/* Image with shimmer skeleton */}
                                    <div className="absolute inset-0 w-full h-full overflow-hidden">
                                        {!isLoaded && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-[#d5d8e3] via-[#e8e9f0] to-[#d5d8e3] animate-pulse" />
                                        )}
                                        <img
                                            src={photo.src}
                                            alt={photo.title}
                                            loading="lazy"
                                            decoding="async"
                                            onLoad={() => setLoaded((prev) => ({ ...prev, [photo.id]: true }))}
                                            className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106 ${
                                                isLoaded ? "opacity-100" : "opacity-0"
                                            }`}
                                        />
                                    </div>

                                    {/* Subtle Gradient Scrim */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none opacity-70 group-hover:opacity-90 transition-opacity" />

                                    {/* Top Tag Pill */}
                                    <div className="absolute top-3.5 left-3.5 z-10">
                                        <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-wider uppercase text-[#ffd9c7]">
                                            {photo.tag}
                                        </span>
                                    </div>

                                    {/* Hover Maximize Icon */}
                                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                        <div className="w-10 h-10 rounded-full bg-white/95 text-[#c77950] flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 shadow-md">
                                            <Maximize2 size={16} />
                                        </div>
                                    </div>

                                    {/* Minimalist Bottom Title */}
                                    <div className="relative z-10 p-4 sm:p-5 text-white">
                                        <h3 className="font-montserrat font-bold text-base sm:text-lg drop-shadow-sm">
                                            {photo.title}
                                        </h3>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                {/* ================= REDESIGNED LIGHTBOX MODAL ================= */}
                {lightboxIndex !== null && (
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Image Lightbox: ${filtered[lightboxIndex]?.title || "Gallery Image"}`}
                        className="fixed inset-0 z-[999999] flex flex-col justify-between bg-[#08090d]/95 backdrop-blur-2xl select-none"
                        onClick={() => setLightboxIndex(null)}
                    >
                        {/* High-Contrast Frosted Header Bar */}
                        <header
                            className="relative z-50 w-full flex items-center justify-between gap-4 px-4 sm:px-8 py-3.5 bg-[#12151e]/95 backdrop-blur-xl border-b border-white/15 shadow-xl shrink-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Left: Tag + Title */}
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="hidden xs:inline-flex px-2.5 py-1 rounded-full bg-[#c77950]/20 border border-[#c77950]/40 text-[10px] sm:text-xs font-bold tracking-wider uppercase text-[#ffd9c7] shrink-0">
                                    {filtered[lightboxIndex]?.tag || "The 900"}
                                </span>
                                <h2 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate drop-shadow-md">
                                    {filtered[lightboxIndex]?.title}
                                </h2>
                            </div>

                            {/* Right: Zoom Controls + Counter + Close Button */}
                            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                                {/* Zoom Controls */}
                                <div className="hidden sm:flex items-center bg-white/10 rounded-full p-1 border border-white/15">
                                    <button
                                        type="button"
                                        onClick={handleZoomOut}
                                        disabled={zoomLevel <= 1}
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                                        aria-label="Zoom out"
                                        title="Zoom out"
                                    >
                                        <ZoomOut size={15} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleToggleZoom}
                                        className="px-2 text-[11px] font-mono font-bold text-white/90 hover:text-[#ffd9c7] transition-colors cursor-pointer"
                                        title="Toggle Zoom"
                                    >
                                        {Math.round(zoomLevel * 100)}%
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleZoomIn}
                                        disabled={zoomLevel >= 2.5}
                                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/80 hover:text-white hover:bg-white/20 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                                        aria-label="Zoom in"
                                        title="Zoom in"
                                    >
                                        <ZoomIn size={15} />
                                    </button>
                                </div>

                                {/* Counter */}
                                <div className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-white/90">
                                    {String(lightboxIndex + 1).padStart(2, "0")} / {String(filtered.length).padStart(2, "0")}
                                </div>

                                {/* Prominent Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setLightboxIndex(null)}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-full bg-[#c77950] hover:bg-[#b3633b] text-white font-bold text-xs tracking-wider uppercase shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                                    aria-label="Close modal"
                                >
                                    <X size={16} />
                                    <span className="hidden sm:inline">Close</span>
                                </button>
                            </div>
                        </header>

                        {/* Central Viewport & Image Canvas */}
                        <div
                            className="relative z-40 flex-1 min-h-0 w-full flex items-center justify-center overflow-hidden p-2 sm:p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Previous Slide Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length)
                                }
                                className="absolute left-3 sm:left-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#c77950] text-white border border-white/25 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={24} />
                            </button>

                            {/* Main Zoomable Image */}
                            <div
                                className="relative max-h-full max-w-full flex items-center justify-center overflow-auto"
                                onDoubleClick={handleToggleZoom}
                            >
                                <img
                                    key={filtered[lightboxIndex]?.src}
                                    src={filtered[lightboxIndex]?.src}
                                    alt={filtered[lightboxIndex]?.title}
                                    style={{
                                        transform: `scale(${zoomLevel})`,
                                        transition: "transform 0.25s ease-out",
                                    }}
                                    className={`max-h-[64vh] sm:max-h-[72vh] w-auto max-w-full object-contain rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] border border-white/10 select-none ${
                                        zoomLevel > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
                                    }`}
                                />
                            </div>

                            {/* Next Slide Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setLightboxIndex((prev) => (prev + 1) % filtered.length)
                                }
                                className="absolute right-3 sm:right-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#c77950] text-white border border-white/25 flex items-center justify-center transition-all cursor-pointer backdrop-blur-md shadow-2xl hover:scale-110 active:scale-95"
                                aria-label="Next image"
                            >
                                <ChevronRight size={24} />
                            </button>
                        </div>

                        {/* High-Contrast Bottom Footer & Filmstrip */}
                        <footer
                            className="relative z-50 w-full flex flex-col items-center gap-2 px-4 py-3 bg-[#12151e]/95 backdrop-blur-xl border-t border-white/15 shrink-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Filmstrip Thumbnails */}
                            <div
                                ref={filmstripRef}
                                className="flex items-center gap-2 p-1 rounded-full bg-white/10 backdrop-blur-md overflow-x-auto max-w-full scrollbar-none"
                            >
                                {filtered.map((item, idx) => (
                                    <button
                                        key={item.id || idx}
                                        type="button"
                                        onClick={() => setLightboxIndex(idx)}
                                        className={`relative shrink-0 w-10 h-10 rounded-full overflow-hidden transition-all cursor-pointer ${
                                            lightboxIndex === idx
                                                ? "ring-2 ring-[#c77950] scale-110 opacity-100 shadow-md"
                                                : "opacity-40 hover:opacity-100"
                                        }`}
                                    >
                                        <img
                                            src={item.src}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            {/* Shortcut Hints */}
                            <div className="hidden md:flex items-center gap-4 text-[11px] text-white/60">
                                <span>Press <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-white/90 font-mono text-[10px]">ESC</kbd> to exit</span>
                                <span>•</span>
                                <span>Use <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-white/90 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white/15 text-white/90 font-mono text-[10px]">→</kbd> to navigate</span>
                                <span>•</span>
                                <span>Double-click to toggle zoom</span>
                            </div>
                        </footer>
                    </div>
                )}

                {/* ================= BOTTOM CTA ================= */}
                <section className="pb-16 px-4 sm:px-6 max-w-5xl mx-auto">
                    <div className="rounded-3xl bg-gradient-to-r from-[#c77950] via-[#b3633b] to-[#9c4f29] p-8 sm:p-10 text-white shadow-[0_16px_40px_rgba(199,121,80,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div>
                            <h3 className="font-cormorant text-3xl sm:text-4xl font-bold">
                                Experience The 900
                            </h3>
                            <p className="text-white/90 text-sm mt-1 font-light">
                                Schedule a tour or explore active floor plans.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 shrink-0">
                            <Link
                                href="/availability"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1a1f2c] font-bold text-xs tracking-wider uppercase shadow-md hover:bg-[#ffd9c7] transition-all"
                            >
                                <span>Floor Plans</span>
                                <ArrowRight size={14} className="text-[#c77950]" />
                            </Link>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#1a1f2c] border border-white/50 hover:border-transparent font-bold text-xs tracking-wider uppercase backdrop-blur-md transition-all"
                            >
                                <span>Schedule Tour</span>
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}
