import React, { useRef, useEffect, useState } from 'react';
import ContactForm from '../ContactForm';
import { X } from 'lucide-react';

const RotatingBadge = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [preloaderState, setPreloaderState] = useState('center'); // 'center' | 'shifting' | 'docked'
    const containerRef = useRef(null);

    // Fast, ultra-snappy preloader transition on page load
    useEffect(() => {
        const shiftTimer = setTimeout(() => {
            setPreloaderState('shifting');
        }, 120);

        const dockedTimer = setTimeout(() => {
            setPreloaderState('docked');
        }, 420);

        return () => {
            clearTimeout(shiftTimer);
            clearTimeout(dockedTimer);
        };
    }, []);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (preloaderState === 'docked' && containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                setMousePosition({
                    x: (e.clientX - centerX) * 0.01,
                    y: (e.clientY - centerY) * 0.01,
                });
            }
        };

        const handleMouseLeave = () => {
            setMousePosition({ x: 0, y: 0 });
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [preloaderState]);

    // ESC to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, []);

    // Disable body scroll when modal is open
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isModalOpen]);

    const isCenter = preloaderState === 'center';
    const isShifting = preloaderState === 'shifting';
    const isDocked = preloaderState === 'docked';

    return (
        <>
            {/* ================= PRELOADER FROSTED BACKDROP ================= */}
            <div
                className={`fixed inset-0 z-[99998] pointer-events-none transition-all duration-300 ease-out ${
                    isCenter ? 'bg-[#e8e9f0]/80 backdrop-blur-sm opacity-100' : 'bg-[#e8e9f0]/0 backdrop-blur-none opacity-0'
                }`}
            />

            {/* ================= ROTATING BADGE (FAST PRELOADER -> DOCKED) ================= */}
            <button
                type="button"
                ref={containerRef}
                onClick={() => {
                    if (isDocked) setIsModalOpen(true);
                }}
                aria-label="Schedule a Tour or Inquire at The 900"
                title="Click to Schedule Tour or Inquire"
                className={`fixed rounded-full z-[99999] pointer-events-auto cursor-pointer p-0 text-left
                           bg-white/95 backdrop-blur-[20px] border-2 border-[#c77950]
                           shadow-[0_10px_30px_rgba(199,121,80,0.35),0_3px_10px_rgba(0,0,0,0.1)]
                           transition-all duration-[320ms] cubic-bezier(0.2,0.9,0.2,1) group
                           ${
                               isCenter
                                   ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[135px] md:h-[135px] scale-110 shadow-[0_15px_40px_rgba(199,121,80,0.45)]'
                                   : isShifting
                                   ? 'top-[calc(100vh-80px)] left-[calc(100vw-80px)] sm:top-[calc(100vh-105px)] sm:left-[calc(100vw-105px)] md:top-[calc(100vh-125px)] md:left-[calc(100vw-125px)] -translate-x-1/2 -translate-y-1/2 w-[64px] h-[64px] sm:w-[82px] sm:h-[82px] md:w-[98px] md:h-[98px] scale-100'
                                   : 'right-3 bottom-3 sm:right-5 sm:bottom-5 md:right-7 md:bottom-7 w-[64px] h-[64px] sm:w-[82px] sm:h-[82px] md:w-[98px] md:h-[98px] hover:scale-110 hover:shadow-[0_14px_35px_rgba(199,121,80,0.55)]'
                           }`}
                style={
                    isDocked
                        ? { transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }
                        : undefined
                }
            >
                <svg
                    className="w-full h-full overflow-visible"
                    viewBox="0 0 200 200"
                >
                    <defs>
                        <path
                            id="pathTop"
                            d="M 26,100 A 74,74 0 1,1 174,100"
                            fill="none"
                        />

                        <path
                            id="pathBottom"
                            d="M 174,100 A 74,74 0 1,1 26,100"
                            fill="none"
                        />
                    </defs>

                    {/* Disc Base */}
                    <circle
                        cx="100"
                        cy="100"
                        r="95"
                        fill="#ffffff"
                        stroke="#c77950"
                        strokeWidth="2"
                    />

                    {/* Fast Rotating Ring with Text */}
                    <g
                        className="animate-rotate-ring"
                        style={{
                            transformOrigin: '100px 100px',
                            animationDuration: isCenter ? '2.5s' : '7.5s',
                        }}
                    >
                        {/* Concentric Guide Circles */}
                        <circle
                            cx="100"
                            cy="100"
                            r="90"
                            fill="none"
                            stroke="#c77950"
                            strokeOpacity="0.45"
                            strokeWidth="1"
                        />

                        <circle
                            cx="100"
                            cy="100"
                            r="58"
                            fill="none"
                            stroke="#c77950"
                            strokeOpacity="0.45"
                            strokeWidth="1"
                        />

                        {/* Top Curved Text */}
                        <text
                            fontFamily="'Montserrat', sans-serif"
                            fontSize="13.5"
                            fontWeight="900"
                            letterSpacing="2.8"
                            fill="#0f172a"
                        >
                            <textPath
                                href="#pathTop"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                MODERN LIVING
                            </textPath>
                        </text>

                        {/* Bottom Curved Text */}
                        <text
                            fontFamily="'Montserrat', sans-serif"
                            fontSize="13.5"
                            fontWeight="900"
                            letterSpacing="2.8"
                            fill="#0f172a"
                        >
                            <textPath
                                href="#pathBottom"
                                startOffset="50%"
                                textAnchor="middle"
                            >
                                TIMELESS DESIGN
                            </textPath>
                        </text>

                        {/* Separator Dots */}
                        <circle cx="26" cy="100" r="3.2" fill="#c77950" />
                        <circle cx="174" cy="100" r="3.2" fill="#c77950" />
                    </g>

                    {/* Central Medallion - Solid Primary Color */}
                    <circle
                        cx="100"
                        cy="100"
                        r="52"
                        fill="#c77950"
                        stroke="#ffffff"
                        strokeWidth="2.5"
                    />

                    <circle
                        cx="100"
                        cy="100"
                        r="45"
                        fill="none"
                        stroke="#ffffff"
                        strokeWidth="1"
                        strokeDasharray="3 3"
                        strokeOpacity="0.8"
                    />

                    {/* The 900 Brand Core */}
                    <g className="select-none pointer-events-none">
                        <text
                            x="100"
                            y="86"
                            fontFamily="'Montserrat', sans-serif"
                            fontSize="10"
                            fontWeight="900"
                            letterSpacing="3.5"
                            fill="#ffd9c7"
                            textAnchor="middle"
                            className="uppercase"
                        >
                            THE
                        </text>

                        <text
                            x="100"
                            y="122"
                            fontFamily="'Cormorant Garamond', serif"
                            fontSize="38"
                            fontWeight="900"
                            fill="#ffffff"
                            textAnchor="middle"
                            style={{ letterSpacing: "-0.5px" }}
                        >
                            900
                        </text>
                    </g>
                </svg>

                {/* Subtle Pulse Ring When Docked */}
                {isDocked && (
                    <span className="absolute -inset-1 rounded-full border border-[#c77950]/40 animate-ping pointer-events-none" />
                )}
            </button>

            {/* ================= FAST MODAL POPUP ================= */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/65 backdrop-blur-sm p-3 sm:p-4 transition-opacity duration-150"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Direct Inquiry and Schedule Tour Form"
                        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-[#d6d8e5] bg-[#e8e9f0] shadow-[0_25px_80px_rgba(0,0,0,0.35)] animate-modal-pop"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* CLOSE BUTTON */}
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full flex items-center justify-center bg-white text-[#1a1f2c] border border-[#d6d8e5] hover:bg-[#c77950] hover:text-white hover:border-[#c77950] shadow-md transition-all duration-150"
                            aria-label="Close modal"
                        >
                            <X className="w-4 h-4" />
                        </button>
                        <ContactForm />
                    </div>
                </div>
            )}
        </>
    );
};

export default RotatingBadge;