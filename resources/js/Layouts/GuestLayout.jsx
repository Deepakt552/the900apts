import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import APP_CONFIG from '../Pages/config';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#e8e9f0] p-4 sm:p-6 selection:bg-[#c77950]/30 selection:text-[#1a1f2c]">
            {/* Traditional Korean Changsal Lattice SVG Background */}
            <svg
                className="fixed inset-0 w-full h-full pointer-events-none opacity-[0.035] mix-blend-multiply z-0"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
            >
                <defs>
                    <pattern
                        id="guest-changsal-pattern"
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
                <rect width="100%" height="100%" fill="url(#guest-changsal-pattern)" />
            </svg>

            <div className="relative z-10 w-full max-w-md">
                {/* Signature Skewed Copper Logo Badge */}
                <div className="flex justify-center mb-6">
                    <div className="relative h-[68px] sm:h-[76px] drop-shadow-[0_10px_22px_rgba(0,0,0,0.25)]">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#c77950] to-[#b3633b] border-r border-[#c77950] border-b border-[#c77950] shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(199,121,80,0.35)] rounded-[10px]"
                            style={{
                                transform: 'skewX(-24deg)',
                            }}
                        />
                        <Link
                            href="/"
                            className="relative z-10 h-full flex items-center px-8 transition-transform duration-300 hover:scale-[1.02]"
                            title="THE 900 Home"
                        >
                            <img
                                src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
                                alt="THE 900 Logo"
                                className="h-[38px] sm:h-[44px] w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
                            />
                        </Link>
                    </div>
                </div>

                <div className="w-full overflow-hidden bg-white/95 backdrop-blur-xl px-6 py-8 sm:px-8 border border-[#d6d8e5] shadow-[0_15px_45px_rgba(30,35,60,0.08)] rounded-3xl">
                    {children}
                </div>
            </div>
        </div>
    );
}