import React, { useState, useEffect, useRef, useCallback } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    Utensils,
    Coffee,
    ShoppingBag,
    Train,
    Sparkles,
    MapPin,
    Phone,
    Navigation,
    Compass,
    Search,
    ExternalLink,
} from "lucide-react";

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
    iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
    shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Target Property Anchor: 2880 JAMES M WOOD BLVD, LOS ANGELES, CA 90006
const property = {
    name: "The 900 Residences",
    addr: "2880 James M Wood Blvd, Los Angeles, CA 90006",
    phone: "213-900-0900",
    email: "leasing@the900apts.com",
    tagline: "Premier Residences in the Heart of Koreatown",
    lat: 34.0558385,
    lng: -118.2911017,
};

// Verified Nearby Spots Curated by Category
const locationData = {
    dining: [
        {
            name: "Park’s BBQ",
            addr: "955 S Vermont Ave, Los Angeles, CA 90006",
            phone: "(213) 380-1717",
            desc: "Michelin-recognized Korean BBQ known for prime-grade beef and legendary short ribs.",
            distance: "2 Min Walk",
            miles: "0.1 mi",
            lat: 34.0540278,
            lng: -118.2920151,
            color: "#c77950",
            categoryName: "Korean BBQ & Dining",
        },
        {
            name: "J BBQ",
            addr: "901 S Vermont Ave, Los Angeles, CA 90006",
            phone: "(213) 381-9292",
            desc: "Vibrant and modern all-you-can-eat Korean BBQ directly adjacent to The 900.",
            distance: "1 Min Walk",
            miles: "0.05 mi",
            lat: 34.0559295,
            lng: -118.2921605,
            color: "#c77950",
            categoryName: "Korean BBQ",
        },
        {
            name: "Ong Ga Nae Korean BBQ",
            addr: "936 S Vermont Ave, Los Angeles, CA 90006",
            phone: "(213) 386-9292",
            desc: "Authentic Korean barbecue dishes, Galbi tang, and traditional comforting stews.",
            distance: "2 Min Walk",
            miles: "0.1 mi",
            lat: 34.0547444,
            lng: -118.2912436,
            color: "#c77950",
            categoryName: "Traditional Korean",
        },
        {
            name: "Charbroiled Chicken – El Jalapeño",
            addr: "854 S Vermont Ave, Los Angeles, CA 90005",
            phone: "(213) 365-0048",
            desc: "Neighborhood staple for flame-grilled rotisserie chicken, rice, beans, and fresh salsas.",
            distance: "2 Min Walk",
            miles: "0.1 mi",
            lat: 34.0566724,
            lng: -118.2914335,
            color: "#c77950",
            categoryName: "Latin Grill",
        },
        {
            name: "Ocha Classic 1",
            addr: "837 S Vermont Ave, Los Angeles, CA 90005",
            phone: "(213) 427-9823",
            desc: "Celebrated Thai restaurant famous for Tom Yum soups, Pad Thai, and savory curries.",
            distance: "3 Min Walk",
            miles: "0.15 mi",
            lat: 34.0567705,
            lng: -118.2919193,
            color: "#c77950",
            categoryName: "Thai Cuisine",
        },
        {
            name: "Moodaepo II",
            addr: "3014 W 7th St, Los Angeles, CA 90005",
            phone: "(213) 381-9990",
            desc: "High-energy Korean BBQ hall with expansive menu choices and craft soju cocktails.",
            distance: "6 Min Walk",
            miles: "0.3 mi",
            lat: 34.0597588,
            lng: -118.2897498,
            color: "#c77950",
            categoryName: "K-BBQ Lounge",
        },
        {
            name: "Quarters Korean BBQ",
            addr: "3465 W 6th St, Los Angeles, CA 90020",
            phone: "(213) 365-8111",
            desc: "Chic tapas-style Korean BBQ at Chapman Plaza with outdoor patio and cheese dip skewers.",
            distance: "4 Min Drive",
            miles: "0.7 mi",
            lat: 34.0628,
            lng: -118.2985,
            color: "#c77950",
            categoryName: "Modern K-BBQ",
        },
        {
            name: "Sun Nong Dan",
            addr: "3470 W 6th St, Los Angeles, CA 90020",
            phone: "(213) 365-0303",
            desc: "24-hour hotspot renowned for braised beef short rib Galbi Jjim with blowtorch-melted cheese.",
            distance: "4 Min Drive",
            miles: "0.7 mi",
            lat: 34.0631,
            lng: -118.2989,
            color: "#c77950",
            categoryName: "24/7 Dining",
        },
    ],
    cafes: [
        {
            name: "Paris Baguette",
            addr: "888 S Vermont Ave, Los Angeles, CA 90005",
            phone: "(213) 322-2109",
            desc: "Artisan pastries, gourmet sandwiches, fresh cakes, and signature iced espresso drinks.",
            distance: "1 Min Walk",
            miles: "0.05 mi",
            lat: 34.0562932,
            lng: -118.2915404,
            color: "#c77950",
            categoryName: "Bakery & Cafe",
        },
        {
            name: "Mochinut K-Town",
            addr: "3064 W 8th St, Los Angeles, CA 90005",
            phone: "(213) 263-9911",
            desc: "Crispy Korean rice flour hot dogs, glazed mochi donuts, and boba milk teas.",
            distance: "2 Min Walk",
            miles: "0.1 mi",
            lat: 34.0568239,
            lng: -118.29193,
            color: "#c77950",
            categoryName: "Dessert & Boba",
        },
        {
            name: "Coffee MCO",
            addr: "2580 W Olympic Blvd #2, Los Angeles, CA 90006",
            phone: "(213) 674-7381",
            desc: "Architectural two-story specialty roastery featuring pour-overs and serene outdoor patio.",
            distance: "5 Min Walk",
            miles: "0.25 mi",
            lat: 34.0523467,
            lng: -118.2874283,
            color: "#c77950",
            categoryName: "Specialty Roaster",
        },
        {
            name: "H Cafe",
            addr: "3200 W 8th St, Los Angeles, CA 90005",
            phone: "(213) 389-6140",
            desc: "Chic neighborhood daytime cafe with avocado toast, matcha lattes, and artisan brunch.",
            distance: "5 Min Walk",
            miles: "0.3 mi",
            lat: 34.0577775,
            lng: -118.297762,
            color: "#c77950",
            categoryName: "Brunch & Coffee",
        },
        {
            name: "Starbucks Reserve Wilshire",
            addr: "3150 Wilshire Blvd, Los Angeles, CA 90010",
            phone: "(213) 384-3578",
            desc: "Expansive cafe with outdoor lounge seating and Reserve craft brew selections.",
            distance: "7 Min Walk",
            miles: "0.4 mi",
            lat: 34.0616343,
            lng: -118.2912492,
            color: "#c77950",
            categoryName: "Espresso Bar",
        },
        {
            name: "Document Coffee Bar",
            addr: "3850 Wilshire Blvd, Los Angeles, CA 90010",
            phone: "(213) 388-6611",
            desc: "Minimalist third-wave coffee studio known for handcrafted cold brews and pastries.",
            distance: "5 Min Drive",
            miles: "0.9 mi",
            lat: 34.0619,
            lng: -118.309,
            color: "#c77950",
            categoryName: "Artisan Coffee",
        },
    ],
    shopping: [
        {
            name: "El Super (Vermont Ave)",
            addr: "888 S Vermont Ave, Los Angeles, CA 90005",
            phone: "(213) 351-9900",
            desc: "Spacious full-service supermarket offering fresh meats, expansive produce, bakery, and daily grocery essentials.",
            distance: "1 Min Walk",
            miles: "0.05 mi",
            lat: 34.056311,
            lng: -118.2914224,
            color: "#c77950",
            categoryName: "Supermarket & Grocery",
        },
        {
            name: "Northgate Market",
            addr: "2323 W Olympic Blvd, Los Angeles, CA 90006",
            phone: "(213) 249-9173",
            desc: "Extensive grocery store featuring artisan bakery, fresh meat market, and organic produce.",
            distance: "7 Min Walk",
            miles: "0.4 mi",
            lat: 34.0529419,
            lng: -118.2826865,
            color: "#c77950",
            categoryName: "Supermarket & Deli",
        },
        {
            name: "H Mart City Center",
            addr: "3500 W 6th St, Los Angeles, CA 90020",
            phone: "(213) 235-9560",
            desc: "Iconic Korean gourmet megastore in City Center with multi-level shopping and food court.",
            distance: "4 Min Drive",
            miles: "0.8 mi",
            lat: 34.0628,
            lng: -118.3005,
            color: "#c77950",
            categoryName: "Shopping Center",
        },
        {
            name: "Ralphs Fresh Fare (24-Hour)",
            addr: "3410 W 3rd St, Los Angeles, CA 90020",
            phone: "(213) 480-1421",
            desc: "24-hour supermarket with organic grocery aisles, full pharmacy, and floral boutique.",
            distance: "5 Min Drive",
            miles: "1.1 mi",
            lat: 34.0683855,
            lng: -118.2905981,
            color: "#c77950",
            categoryName: "24/7 Grocery",
        },
        {
            name: "Koreatown Galleria",
            addr: "3250 W Olympic Blvd, Los Angeles, CA 90006",
            phone: "(323) 733-6000",
            desc: "Premier multi-level Asian shopping mall with fashion boutiques, cosmetics, and specialty goods.",
            distance: "3 Min Drive",
            miles: "0.8 mi",
            lat: 34.0527,
            lng: -118.3088,
            color: "#c77950",
            categoryName: "Retail Mall",
        },
    ],
    transit: [
        {
            name: "Wilshire / Vermont Metro (B & D Lines)",
            addr: "Wilshire Blvd & S Vermont Ave, Los Angeles, CA 90005",
            phone: "323-GO-METRO",
            desc: "Major dual-line subway hub connecting directly to Downtown LA (10 mins) and Hollywood (12 mins).",
            distance: "5 Min Walk",
            miles: "0.3 mi",
            lat: 34.062287,
            lng: -118.2908591,
            color: "#c77950",
            categoryName: "Metro Subway Station",
        },
        {
            name: "Wilshire / Western Metro Station (D Line)",
            addr: "3775 Wilshire Blvd, Los Angeles, CA 90010",
            phone: "323-GO-METRO",
            desc: "Direct purple line connection to Miracle Mile, Beverly Hills, and Westwood transit routes.",
            distance: "4 Min Drive",
            miles: "0.8 mi",
            lat: 34.0622241,
            lng: -118.3088409,
            color: "#c77950",
            categoryName: "Metro D Line",
        },
        {
            name: "Metro Rapid Bus 720 (Wilshire Corridor)",
            addr: "Wilshire Blvd & Vermont Ave, Los Angeles, CA",
            phone: "323-GO-METRO",
            desc: "Express bus corridor with direct service to Beverly Hills, Westwood, and Santa Monica beach.",
            distance: "5 Min Walk",
            miles: "0.3 mi",
            lat: 34.0619,
            lng: -118.2915,
            color: "#c77950",
            categoryName: "Rapid Bus Route",
        },
        {
            name: "Vermont Transit Corridor (Lines 204 / 754)",
            addr: "S Vermont Ave & James M Wood Blvd, LA",
            phone: "323-GO-METRO",
            desc: "Instant north/south express connections directly to USC, Los Feliz, and Sunset Blvd.",
            distance: "1 Min Walk",
            miles: "0.02 mi",
            lat: 34.0559,
            lng: -118.2915,
            color: "#c77950",
            categoryName: "Transit Corridor",
        },
    ],
    culture: [
        {
            name: "The Wiltern Historic Theater",
            addr: "3790 Wilshire Blvd, Los Angeles, CA 90010",
            phone: "(213) 388-1400",
            desc: "Iconic Art Deco live entertainment landmark hosting world-renowned concerts and touring acts.",
            distance: "4 Min Drive",
            miles: "0.8 mi",
            lat: 34.0615,
            lng: -118.3089,
            color: "#c77950",
            categoryName: "Concert Landmark",
        },
        {
            name: "Lafayette Recreation Center & Park",
            addr: "625 S Lafayette Park Pl, Los Angeles, CA 90057",
            phone: "(213) 384-0562",
            desc: "Lush city park with tennis courts, skate plaza, recreation center, and open lawn spaces.",
            distance: "6 Min Walk",
            miles: "0.35 mi",
            lat: 34.0619755,
            lng: -118.2836088,
            color: "#c77950",
            categoryName: "Public Park & Courts",
        },
        {
            name: "MacArthur Park & Lake",
            addr: "2230 W 6th St, Los Angeles, CA 90057",
            phone: "(213) 485-5555",
            desc: "Historic lakeside greenspace with panoramic views of the Los Angeles skyline.",
            distance: "8 Min Walk",
            miles: "0.5 mi",
            lat: 34.0583928,
            lng: -118.2799544,
            color: "#c77950",
            categoryName: "Historic Park",
        },
        {
            name: "R Bar Speakeasy",
            addr: "3331 W 8th St, Los Angeles, CA 90005",
            phone: "(213) 387-7227",
            desc: "Exclusive password-entry speakeasy with vintage maritime decor, craft cocktails, and live jazz.",
            distance: "6 Min Walk",
            miles: "0.35 mi",
            lat: 34.05799,
            lng: -118.3013422,
            color: "#c77950",
            categoryName: "Cocktail Speakeasy",
        },
        {
            name: "Chapman Plaza Courtyard",
            addr: "3465 W 6th St, Los Angeles, CA 90020",
            phone: "(213) 380-1717",
            desc: "Famous 1929 Spanish Baroque courtyard filled with bustling open-air bars, dining, and lounges.",
            distance: "4 Min Drive",
            miles: "0.7 mi",
            lat: 34.0628,
            lng: -118.2985,
            color: "#c77950",
            categoryName: "Nightlife & Dining",
        },
    ],
};

// Custom Property Anchor Marker: Animated Luxury Pin with Concentric Pulse Radar
function createPropertyIcon() {
    const html = `
        <div class="the900-property-marker">
            <!-- Pulsing Beacon Radiations -->
            <div class="the900-radar-ring r1"></div>
            <div class="the900-radar-ring r2"></div>
            <div class="the900-radar-ring r3"></div>
            
            <!-- Floating Main Badge Card -->
            <div class="the900-floating-badge">
                <div class="the900-badge-inner">
                    <div class="the900-crown-tag">✦ RESIDENCES ✦</div>
                    <div class="the900-brand-title">THE 900</div>
                    <div class="the900-street-sub">KOREATOWN LA</div>
                </div>
                <div class="the900-badge-pointer"></div>
            </div>
            
            <!-- Ground Contact Point -->
            <div class="the900-ground-beacon"></div>
        </div>
    `;
    return L.divIcon({
        html: html,
        className: "the900-custom-marker-root",
        iconSize: [120, 80],
        iconAnchor: [60, 78],
        popupAnchor: [0, -78],
    });
}

// Category Marker with Distinct Copper/Navy Badge
function createMarkerIcon(color = "#c77950", isSelected = false) {
    const size = isSelected ? 40 : 32;
    const svg = `
        <svg width="${size}" height="${size}" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="mShadowLight" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.25"/>
                </filter>
            </defs>
            <circle cx="22" cy="22" r="18" fill="${isSelected ? "#c77950" : "#ffffff"}" stroke="#c77950" stroke-width="${isSelected ? 3 : 2.5}" filter="url(#mShadowLight)"/>
            <circle cx="22" cy="22" r="7" fill="${isSelected ? "#ffffff" : "#c77950"}"/>
        </svg>
    `;
    return L.divIcon({
        html: svg,
        className: "custom-marker",
        iconSize: [size, size],
        iconAnchor: [size / 2, size],
        popupAnchor: [0, -size + 4],
    });
}

// Map Controller for smooth flyTo
function MapController({ center, zoom, onMapReady }) {
    const map = useMap();
    useEffect(() => {
        onMapReady(map);
    }, [map, onMapReady]);

    useEffect(() => {
        if (center) {
            map.flyTo(center, zoom || 15, { duration: 1.1 });
        }
    }, [center, zoom, map]);

    return null;
}

export default function LuxuryNeighborhoodMap() {
    const [currentCategory, setCurrentCategory] = useState("dining");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [mapCenter, setMapCenter] = useState([34.0558385, -118.2911017]);
    const [mapZoom, setMapZoom] = useState(15);
    const [mapInstance, setMapInstance] = useState(null);
    const [mobileTab, setMobileTab] = useState("both"); // "map" | "list" | "both"
    const popupRefs = useRef({});
    const mapSectionRef = useRef(null);

    // Invalidate map size on window resize/orientation change
    useEffect(() => {
        const handleResize = () => {
            if (mapInstance) {
                mapInstance.invalidateSize();
            }
        };
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
        };
    }, [mapInstance]);

    // Invalidate map size when mobile tab changes
    useEffect(() => {
        if (mapInstance) {
            setTimeout(() => {
                mapInstance.invalidateSize();
            }, 200);
        }
    }, [mobileTab, mapInstance]);

    const categories = [
        { id: "dining", label: "Dining & BBQ", icon: Utensils, count: locationData.dining.length },
        { id: "cafes", label: "Cafes & Bakeries", icon: Coffee, count: locationData.cafes.length },
        { id: "shopping", label: "Markets & Retail", icon: ShoppingBag, count: locationData.shopping.length },
        { id: "transit", label: "Metro & Transit", icon: Train, count: locationData.transit.length },
        { id: "culture", label: "Parks & Nightlife", icon: Sparkles, count: locationData.culture.length },
    ];

    const currentPlaces = locationData[currentCategory] || [];
    const filteredPlaces = currentPlaces.filter((p) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            p.name.toLowerCase().includes(q) ||
            p.desc.toLowerCase().includes(q) ||
            p.addr.toLowerCase().includes(q) ||
            p.categoryName.toLowerCase().includes(q)
        );
    });

    const handleCategoryChange = (catId) => {
        setCurrentCategory(catId);
        setSearchQuery("");
        setSelectedPlace(null);
        setMapCenter([property.lat, property.lng]);
        setMapZoom(15);
    };

    const handlePlaceClick = (place) => {
        setSelectedPlace(place.name);
        setMapCenter([place.lat, place.lng]);
        setMapZoom(17);

        // Smooth scroll to map on mobile if in stacked view
        if (window.innerWidth < 1024 && mapSectionRef.current) {
            mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        setTimeout(() => {
            const key = `${place.lat}-${place.lng}`;
            if (popupRefs.current[key]) {
                popupRefs.current[key].openPopup();
            }
        }, 500);
    };

    const handleResetToProperty = () => {
        setSelectedPlace(null);
        setMapCenter([property.lat, property.lng]);
        setMapZoom(16);

        if (window.innerWidth < 1024 && mapSectionRef.current) {
            mapSectionRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        setTimeout(() => {
            if (popupRefs.current["the900-property"]) {
                popupRefs.current["the900-property"].openPopup();
            }
        }, 400);
    };

    const handleMapReady = useCallback((map) => {
        setMapInstance(map);
        setTimeout(() => {
            map.invalidateSize();
        }, 300);
    }, []);

    return (
        <div className="relative w-full rounded-[20px] sm:rounded-[32px] overflow-hidden bg-white/95 border border-[#d6d8e5] shadow-[0_15px_45px_rgba(30,35,60,0.08)] flex flex-col lg:flex-row min-h-[620px] lg:min-h-[680px]">
            {/* =========================================================================
                SVG KOREAN TRADITIONAL CHANGSAL LATTICE BACKGROUND PATTERN (LIGHT THEME)
            ========================================================================== */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="lux-map-light-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#lux-map-light-changsal-pattern)" />
            </svg>

            {/* Corner Hanok Fretwork */}
            <div className="absolute top-3 left-3 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-l-2 border-[#c77950]/40 rounded-tl-xs z-30 pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 sm:w-5 h-4 sm:h-5 border-t-2 border-r-2 border-[#c77950]/40 rounded-tr-xs z-30 pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-l-2 border-[#c77950]/40 rounded-bl-xs z-30 pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 sm:w-5 h-4 sm:h-5 border-b-2 border-r-2 border-[#c77950]/40 rounded-br-xs z-30 pointer-events-none" />

            {/* =========================================================================
                LEFT / TOP PANEL: CATEGORY NAVIGATION & CURATED PLACES LIST
            ========================================================================== */}
            <div
                className={`w-full lg:w-[390px] xl:w-[440px] bg-gradient-to-b from-[#ffffff] via-[#fbfcff] to-[#f4f5fa] p-3.5 sm:p-5 lg:p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#d6d8e5] z-10 shrink-0 ${
                    mobileTab === "map" ? "hidden lg:flex" : "flex"
                }`}
            >
                <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#e8e9f0]">
                        <div>
                            <span className="text-[9.5px] sm:text-[10.5px] font-bold uppercase tracking-[2px] text-[#c77950] flex items-center gap-1.5">
                                <Compass className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#c77950]" />
                                <span>KOREATOWN NEIGHBORHOOD</span>
                            </span>
                            <h3 className="font-cormorant text-lg sm:text-2xl lg:text-3xl font-bold text-[#1a1f2c] mt-0.5">
                                Explore The Vicinity
                            </h3>
                        </div>

                        <button
                            type="button"
                            onClick={handleResetToProperty}
                            className="px-2.5 sm:px-3.5 py-1.5 rounded-full bg-[#c77950]/10 hover:bg-[#c77950] text-[#c77950] hover:text-white border border-[#c77950]/30 text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 shadow-2xs shrink-0"
                            title="Recenter map on The 900 Residences"
                        >
                            <MapPin className="w-3 h-3" />
                            <span>The 900</span>
                        </button>
                    </div>

                    {/* Mobile View Toggle Bar (Only on Mobile/Tablet < lg) */}
                    <div className="flex lg:hidden items-center justify-between mt-2.5 p-1 bg-[#edeef5] rounded-xl border border-[#d6d8e5]">
                        <button
                            type="button"
                            onClick={() => setMobileTab("both")}
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                                mobileTab === "both"
                                    ? "bg-white text-[#c77950] shadow-xs"
                                    : "text-[#5a627a] hover:text-[#1a1f2c]"
                            }`}
                        >
                            📱 Stacked
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab("list")}
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                                mobileTab === "list"
                                    ? "bg-white text-[#c77950] shadow-xs"
                                    : "text-[#5a627a] hover:text-[#1a1f2c]"
                            }`}
                        >
                            📋 List ({filteredPlaces.length})
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileTab("map")}
                            className={`flex-1 py-1.5 text-[11px] font-bold rounded-lg transition-all ${
                                mobileTab === "map"
                                    ? "bg-white text-[#c77950] shadow-xs"
                                    : "text-[#5a627a] hover:text-[#1a1f2c]"
                            }`}
                        >
                            🗺️ Map View
                        </button>
                    </div>

                    {/* Category Filter Tabs - Smooth horizontal touch scroll on mobile */}
                    <div className="mt-2.5 sm:mt-3.5 flex flex-nowrap sm:flex-wrap overflow-x-auto pb-1 sm:pb-0 gap-1.5 sm:gap-2 no-scrollbar touch-pan-x">
                        {categories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = currentCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    type="button"
                                    onClick={() => handleCategoryChange(cat.id)}
                                    className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-wider transition-all duration-300 shrink-0 whitespace-nowrap ${
                                        isActive
                                            ? "bg-gradient-to-r from-[#c77950] to-[#b3633b] text-white shadow-[0_4px_16px_rgba(199,121,80,0.35)] scale-102"
                                            : "bg-white text-[#1a1f2c] hover:bg-[#f2f4f9] hover:text-[#c77950] border border-[#d6d8e5] shadow-2xs"
                                    }`}
                                >
                                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-[#c77950]"}`} />
                                    <span>{cat.label}</span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? "bg-black/20 text-white" : "bg-[#f0f2f7] text-[#5a627a]"}`}>
                                        {cat.count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Input Bar */}
                    <div className="mt-2.5 sm:mt-3.5 relative">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5a627a]" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={`Search ${categories.find((c) => c.id === currentCategory)?.label}...`}
                            className="w-full bg-white border border-[#d6d8e5] focus:border-[#c77950] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1a1f2c] placeholder-[#8c94a8] focus:outline-none transition-all shadow-2xs"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a627a] hover:text-[#1a1f2c] text-xs font-bold"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Filtered Places List Container */}
                    <div className="mt-2.5 space-y-2 overflow-y-auto max-h-[220px] sm:max-h-[260px] lg:max-h-[340px] pr-1 custom-scrollbar">
                        {filteredPlaces.length === 0 ? (
                            <div className="py-6 text-center text-[#5a627a] text-xs">
                                No locations found matching "{searchQuery}".
                            </div>
                        ) : (
                            filteredPlaces.map((place, idx) => {
                                const isSelected = selectedPlace === place.name;
                                return (
                                    <div
                                        key={idx}
                                        onClick={() => handlePlaceClick(place)}
                                        className={`group relative p-2.5 sm:p-3 rounded-2xl border transition-all duration-300 cursor-pointer ${
                                            isSelected
                                                ? "bg-[#fff6f2] border-[#c77950] shadow-[0_4px_16px_rgba(199,121,80,0.18)]"
                                                : "bg-white hover:bg-[#fafbfe] border-[#e2e4ee] hover:border-[#c77950]/50 shadow-2xs"
                                        }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-start gap-2 sm:gap-2.5 min-w-0">
                                                <span
                                                    className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full mt-1.5 shrink-0 bg-[#c77950]"
                                                />
                                                <div className="min-w-0">
                                                    <h4 className="font-montserrat font-bold text-xs sm:text-sm text-[#1a1f2c] group-hover:text-[#c77950] transition-colors truncate">
                                                        {place.name}
                                                    </h4>
                                                    <p className="text-[10px] sm:text-[11px] text-[#5a627a] truncate mt-0.5 font-normal">
                                                        {place.addr}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <span className="inline-block text-[9.5px] sm:text-[10px] font-bold text-[#c77950] bg-[#c77950]/10 border border-[#c77950]/20 px-2 py-0.5 rounded-full whitespace-nowrap">
                                                    {place.distance}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mt-1.5 pt-1.5 border-t border-[#f0f1f7] flex items-center justify-between text-[10px] sm:text-[11px] text-[#6c748c]">
                                            <span className="text-[9.5px] sm:text-[10px] text-[#c77950] uppercase font-semibold truncate">
                                                {place.categoryName}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-[#c77950] font-medium group-hover:underline shrink-0">
                                                <span>View on Map</span>
                                                <Navigation className="w-2.5 h-2.5" />
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Map Type Switcher & Footer Count */}
                <div className="pt-2 border-t border-[#e8e9f0] mt-2 flex items-center justify-between text-xs">
                    <span className="text-[10.5px] font-bold text-[#5a627a]">
                        Found: <strong className="text-[#c77950]">{filteredPlaces.length}</strong> spots
                    </span>
                    <button
                        type="button"
                        onClick={handleResetToProperty}
                        className="text-[10.5px] text-[#c77950] hover:underline font-bold"
                    >
                        Center on 2880 James M Wood
                    </button>
                </div>
            </div>

            {/* =========================================================================
                RIGHT PANEL: LEAFLET INTERACTIVE MAP WITH LIGHT LUXURY POPUPS
            ========================================================================== */}
            <div
                ref={mapSectionRef}
                className={`flex-1 relative w-full h-[380px] sm:h-[460px] lg:h-auto min-h-[360px] sm:min-h-[440px] lg:min-h-[640px] ${
                    mobileTab === "list" ? "hidden lg:block" : "block"
                }`}
            >
                <style>{`
                    /* =========================================================
                       THE 900 ANIMATED MAP PIN & BEACON STYLES
                    ========================================================= */
                    .the900-custom-marker-root {
                        background: transparent !important;
                        border: none !important;
                    }

                    .the900-property-marker {
                        position: relative;
                        width: 120px;
                        height: 80px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: flex-end;
                        pointer-events: auto;
                        cursor: pointer;
                    }

                    /* Expanding Radar Ripple Waves */
                    .the900-radar-ring {
                        position: absolute;
                        bottom: 0px;
                        left: 50%;
                        transform: translate(-50%, 50%);
                        width: 14px;
                        height: 14px;
                        border-radius: 50%;
                        background: radial-gradient(circle, rgba(199,121,80,0.5) 0%, rgba(199,121,80,0) 75%);
                        border: 1.5px solid rgba(199,121,80,0.8);
                        pointer-events: none;
                        animation: the900RadarPulse 2.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
                    }

                    .the900-radar-ring.r2 {
                        animation-delay: 0.8s;
                    }

                    .the900-radar-ring.r3 {
                        animation-delay: 1.6s;
                    }

                    @keyframes the900RadarPulse {
                        0% {
                            width: 8px;
                            height: 8px;
                            opacity: 1;
                        }
                        100% {
                            width: 90px;
                            height: 90px;
                            opacity: 0;
                            border-color: rgba(199,121,80,0);
                        }
                    }

                    /* Floating Pin Badge */
                    .the900-floating-badge {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        animation: the900Float 3s ease-in-out infinite;
                        z-index: 10;
                    }

                    @keyframes the900Float {
                        0%, 100% {
                            transform: translateY(0px);
                        }
                        50% {
                            transform: translateY(-7px);
                        }
                    }

                    .the900-badge-inner {
                        background: linear-gradient(135deg, #ffffff 0%, #fff7f2 100%);
                        border: 2px solid #c77950;
                        box-shadow: 0 8px 24px rgba(199, 121, 80, 0.35), 0 2px 8px rgba(0,0,0,0.1);
                        border-radius: 12px;
                        padding: 4px 10px 5px;
                        text-align: center;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        min-width: 96px;
                    }

                    .the900-crown-tag {
                        font-size: 7px;
                        font-weight: 800;
                        letter-spacing: 1.2px;
                        color: #c77950;
                        line-height: 1;
                        text-transform: uppercase;
                        margin-bottom: 2px;
                    }

                    .the900-brand-title {
                        font-family: 'Montserrat', sans-serif;
                        font-size: 11px;
                        font-weight: 900;
                        color: #1a1f2c;
                        letter-spacing: 1px;
                        line-height: 1.1;
                    }

                    .the900-street-sub {
                        font-size: 7.5px;
                        font-weight: 700;
                        letter-spacing: 0.8px;
                        color: #c77950;
                        text-transform: uppercase;
                        margin-top: 1px;
                    }

                    /* Pointer arrow below card */
                    .the900-badge-pointer {
                        width: 0;
                        height: 0;
                        border-left: 6px solid transparent;
                        border-right: 6px solid transparent;
                        border-top: 7px solid #c77950;
                        margin-top: -1px;
                    }

                    /* Ground pinpoint beacon */
                    .the900-ground-beacon {
                        width: 8px;
                        height: 8px;
                        background: #c77950;
                        border: 2px solid #ffffff;
                        border-radius: 50%;
                        box-shadow: 0 0 8px #c77950;
                        z-index: 5;
                        margin-top: 1px;
                    }

                    /* Popup overrides */
                    .luxury-popup .leaflet-popup-content-wrapper {
                        background: #ffffff !important;
                        color: #1a1f2c !important;
                        border: 1.5px solid #c77950 !important;
                        border-radius: 18px !important;
                        box-shadow: 0 15px 40px rgba(30, 35, 60, 0.15) !important;
                        padding: 2px !important;
                        max-width: calc(100vw - 32px) !important;
                    }
                    .luxury-popup .leaflet-popup-content {
                        margin: 10px 12px !important;
                        color: #1a1f2c !important;
                    }
                    .luxury-popup .leaflet-popup-tip {
                        background: #ffffff !important;
                        border: 1.5px solid #c77950 !important;
                    }
                    .luxury-popup .leaflet-popup-close-button {
                        color: #c77950 !important;
                        padding: 6px !important;
                    }
                    .luxury-popup .leaflet-popup-close-button:hover {
                        color: #1a1f2c !important;
                    }
                `}</style>

                {/* Mobile Floating View Switcher Button */}
                <div className="absolute top-3 left-3 z-[500] flex lg:hidden items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#d6d8e5] shadow-md">
                    <button
                        type="button"
                        onClick={() => setMobileTab("list")}
                        className="text-[10px] font-bold text-[#c77950] flex items-center gap-1 uppercase"
                    >
                        <span>📋 View List ({filteredPlaces.length})</span>
                    </button>
                </div>

                {/* Floating Map Controls (Zoom + Recenter) */}
                <div className="absolute top-3 right-3 z-[500] flex items-center gap-1.5 shadow-md">
                    <button
                        type="button"
                        onClick={handleResetToProperty}
                        className="h-8 sm:h-9 px-2.5 sm:px-3 rounded-xl bg-white/95 hover:bg-[#c77950] text-[#1a1f2c] hover:text-white border border-[#d6d8e5] hover:border-[#c77950] flex items-center gap-1 font-bold text-[10.5px] sm:text-xs uppercase transition-all backdrop-blur-md"
                        title="Recenter map"
                    >
                        <MapPin className="w-3 h-3 text-[#c77950]" />
                        <span className="hidden sm:inline">The 900</span>
                    </button>
                </div>

                <MapContainer
                    center={[property.lat, property.lng]}
                    zoom={15}
                    zoomControl={false}
                    scrollWheelZoom={false}
                    touchZoom={true}
                    tap={false}
                    className="w-full h-full z-0 min-h-[360px]"
                    style={{ background: "#f4f5fa" }}
                >
                    <MapController
                        center={mapCenter}
                        zoom={mapZoom}
                        onMapReady={handleMapReady}
                    />

                    {/* 100% Free OpenStreetMap Standard Layer (Requires NO API Key) */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        maxZoom={19}
                        minZoom={12}
                    />

                    {/* Property Anchor Marker */}
                    <Marker
                        position={[property.lat, property.lng]}
                        icon={createPropertyIcon()}
                        ref={(ref) => {
                            if (ref) popupRefs.current["the900-property"] = ref;
                        }}
                    >
                        <Popup
                            className="luxury-popup"
                            maxWidth={280}
                            autoPan={true}
                            autoPanPadding={[15, 15]}
                        >
                            <div className="p-1">
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#c77950]/10 text-[#c77950] text-[9px] font-bold uppercase tracking-wider mb-1 border border-[#c77950]/20">
                                    <span>📍 THE 900 RESIDENCES</span>
                                </div>
                                <h4 className="font-montserrat font-bold text-sm sm:text-base text-[#1a1f2c]">
                                    {property.name}
                                </h4>
                                <p className="text-[11px] text-[#5a627a] mt-0.5">
                                    {property.addr}
                                </p>
                                <p className="text-[10.5px] text-[#6c748c] mt-1 leading-snug">
                                    {property.tagline}
                                </p>
                                <div className="mt-2.5 pt-2 border-t border-[#e8e9f0] flex items-center justify-between text-xs">
                                    <a
                                        href={`tel:${property.phone}`}
                                        className="text-[#c77950] hover:text-[#9c4f29] font-bold flex items-center gap-1 text-[11px]"
                                    >
                                        <Phone className="w-3 h-3 text-[#c77950]" />
                                        <span>{property.phone}</span>
                                    </a>
                                    <a
                                        href={`https://maps.google.com/?q=${encodeURIComponent(property.addr)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#c77950] hover:text-[#9c4f29] font-bold flex items-center gap-1 uppercase text-[10px]"
                                    >
                                        <span>Directions</span>
                                        <ExternalLink className="w-2.5 h-2.5" />
                                    </a>
                                </div>
                            </div>
                        </Popup>
                    </Marker>

                    {/* Category POI Markers */}
                    {filteredPlaces.map((place, idx) => {
                        const key = `${place.lat}-${place.lng}`;
                        const isSelected = selectedPlace === place.name;
                        const icon = createMarkerIcon(place.color, isSelected);

                        return (
                            <Marker
                                key={idx}
                                position={[place.lat, place.lng]}
                                icon={icon}
                                ref={(ref) => {
                                    if (ref) popupRefs.current[key] = ref;
                                }}
                            >
                                <Popup
                                    className="luxury-popup"
                                    maxWidth={280}
                                    autoPan={true}
                                    autoPanPadding={[15, 15]}
                                >
                                    <div className="p-1">
                                        <div className="flex items-center justify-between gap-1.5 mb-1">
                                            <span
                                                className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white bg-[#c77950]"
                                            >
                                                {place.categoryName}
                                            </span>
                                            <span className="text-[9.5px] font-bold text-[#c77950] bg-[#c77950]/10 border border-[#c77950]/20 px-2 py-0.5 rounded-full">
                                                {place.distance}
                                            </span>
                                        </div>

                                        <h4 className="font-montserrat font-bold text-sm sm:text-base text-[#1a1f2c]">
                                            {place.name}
                                        </h4>
                                        <p className="text-[11px] text-[#5a627a] mt-0.5">
                                            {place.addr}
                                        </p>

                                        {place.desc && (
                                            <p className="text-[10.5px] text-[#6c748c] mt-1 leading-snug">
                                                {place.desc}
                                            </p>
                                        )}

                                        <div className="mt-2.5 pt-2 border-t border-[#e8e9f0] flex items-center justify-between text-xs">
                                            {place.phone ? (
                                                <a
                                                    href={`tel:${place.phone}`}
                                                    className="text-[#333a4d] hover:text-[#c77950] font-medium flex items-center gap-1 text-[10.5px]"
                                                >
                                                    <Phone className="w-3 h-3 text-[#c77950]" />
                                                    <span>{place.phone}</span>
                                                </a>
                                            ) : (
                                                <span className="text-[9.5px] text-[#8c94a8]">Walk: {place.miles}</span>
                                            )}

                                            <a
                                                href={`https://maps.google.com/?q=${encodeURIComponent(place.name + " " + place.addr)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-[#c77950] hover:text-[#9c4f29] font-bold flex items-center gap-1 uppercase text-[10px]"
                                            >
                                                <span>Directions</span>
                                                <ExternalLink className="w-2.5 h-2.5" />
                                            </a>
                                        </div>
                                    </div>
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>

                {/* Floating Map Zoom Controls (Touch Friendly) */}
                <div className="absolute bottom-4 right-4 z-[500] flex flex-col gap-1.5 shadow-lg">
                    <button
                        type="button"
                        onClick={() => mapInstance?.zoomIn()}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white/95 hover:bg-[#c77950] text-[#1a1f2c] hover:text-white border border-[#d6d8e5] hover:border-[#c77950] flex items-center justify-center font-bold text-base sm:text-lg transition-all backdrop-blur-md shadow-md"
                        aria-label="Zoom in"
                    >
                        +
                    </button>
                    <button
                        type="button"
                        onClick={() => mapInstance?.zoomOut()}
                        className="w-9 sm:w-10 h-9 sm:h-10 rounded-xl bg-white/95 hover:bg-[#c77950] text-[#1a1f2c] hover:text-white border border-[#d6d8e5] hover:border-[#c77950] flex items-center justify-center font-bold text-base sm:text-lg transition-all backdrop-blur-md shadow-md"
                        aria-label="Zoom out"
                    >
                        −
                    </button>
                </div>
            </div>
        </div>
    );
}
