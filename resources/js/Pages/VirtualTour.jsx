import React from 'react';
import { Head } from '@inertiajs/react';
import { Maximize2, Compass } from 'lucide-react';
import Footer from "../Layouts/Footer";
import Navbar from "../Layouts/Navbar";

const VirtualTour = () => {
    return (
        <>
            <Head title="Virtual Tour | The 900" />

            <div className="min-h-screen bg-dark-600 text-white">
                <Navbar />

                <main className="pt-[76px]">
                    <section className="relative min-h-[calc(100vh-76px)] flex items-center justify-center px-4 py-10 md:px-8 md:py-14 overflow-hidden">

                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-[-280px] left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-gold-500/10 blur-[140px]" />
                            <div className="absolute bottom-[-300px] right-[-200px] w-[550px] h-[550px] rounded-full bg-gold-500/5 blur-[130px]" />
                        </div>

                        <div className="relative w-full max-w-[1120px] mx-auto">

                            <div className="text-center mb-8 md:mb-10">
                                <div className="flex items-center justify-center gap-3 mb-3">
                                    <span className="h-px w-7 bg-gold-500/70" />
                                    <span className="text-gold-500 text-[9px] md:text-[10px] uppercase tracking-[4px] font-medium">
                                        Discover The 900
                                    </span>
                                    <span className="h-px w-7 bg-gold-500/70" />
                                </div>

                                <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium tracking-wide text-white leading-none">
                                    Virtual Tour
                                </h1>

                                <div className="flex items-center justify-center gap-2.5 mt-4">
                                    <span className="w-1.5 h-1.5 rotate-45 bg-gold-500" />
                                    <span className="w-10 md:w-14 h-px bg-gold-500/60" />
                                    <span className="w-1.5 h-1.5 rotate-45 bg-gold-500" />
                                </div>

                                <p className="max-w-lg mx-auto mt-4 text-xs md:text-sm text-white/45 leading-relaxed">
                                    Step inside and explore your future home through
                                    our immersive virtual experience.
                                </p>
                            </div>

                            <div className="relative max-w-5xl mx-auto group">

                                <div className="absolute -inset-[1px] rounded-[18px] bg-gradient-to-r from-gold-500/30 via-gold-500/10 to-gold-500/30 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative   overflow-hidden rounded-[18px] border border-white/10 bg-dark-700 shadow-[0_30px_90px_rgba(0,0,0,0.5)]">

                                    <div className="h-12 md:h-14 px-4 md:px-6 flex items-center justify-between border-b border-white/10 bg-dark-600/90">

                                        <div className="flex items-center gap-2.5 md:gap-3">
                                            <div className="flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full border border-gold-500/30 bg-gold-500/10">
                                                <Compass
                                                    size={14}
                                                    className="text-gold-500"
                                                    strokeWidth={1.5}
                                                />
                                            </div>

                                            <div>
                                                <span className="block text-[9px] md:text-[10px] uppercase tracking-[2px] text-white/75 font-medium">
                                                    360° Virtual Experience
                                                </span>

                                                <span className="hidden sm:block text-[8px] text-white/30 mt-0.5">
                                                    Explore your future home
                                                </span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="relative aspect-video bg-black">
                                        <iframe
                                            src="https://my.matterport.com/show/?m=Hkw3nAeLfSn"
                                            title="The 900 Virtual Tour - Matterport 3D Experience"
                                            className="absolute inset-0 w-full h-full border-0"
                                            allowFullScreen
                                            allow="autoplay; fullscreen; web-share; xr-spatial-tracking;"
                                        />
                                    </div>

                                    <div className="min-h-[48px] px-4 md:px-6 py-3 border-t border-white/10 bg-dark-600/90 flex items-center justify-between gap-3">

                                        <div className="flex items-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(145,85,46,0.7)]" />

                                            <p className="text-[8px] md:text-[9px] uppercase tracking-[1.5px] text-white/35">
                                                Move around • Zoom • Explore
                                            </p>
                                        </div>

                                        <p className="text-[9px] text-gold-500/80 uppercase tracking-[2px] font-medium">
                                            THE 900
                                        </p>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </section>
                </main>

                <Footer />
            </div>
        </>
    );
};

export default VirtualTour;