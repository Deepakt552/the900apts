import React from "react";
import APP_CONFIG from "../config";

const HeroBackground = ({ mousePosition }) => {
  const layers = [
    {
      depth: 0.02,
      className:
        "z-1 bg-gradient-to-b from-[#1a73b5] via-[#2f8ad0] via-25% via-[#51a4e2] via-50% via-[#82c2ee] via-75% to-[#bee0f7]",
      children: (
        <div className="absolute top-[10%] right-[15%] w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,245,220,0.45)_0%,rgba(255,220,130,0.2)_35%,transparent_70%)] blur-[50px] animate-pulse-glow" />
      ),
    },
    {
      depth: 0.05,
      className: "z-2 mix-blend-screen opacity-90",
      children: (
        <>
          <div
            className="absolute w-full h-[340px] md:h-full top-[180px] sm:top-[150px] md:top-[120px] opacity-85 bg-repeat-x bg-[length:900px_auto] md:bg-[length:1400px_auto] bg-top animate-cloud-drift-1 pointer-events-none"
            style={{
              backgroundImage: `url(${APP_CONFIG.HOME_URL}Home/Clouds.webp)`,
            }}
          />

          <div
            className="absolute w-full h-[340px] md:h-full top-[220px] sm:top-[185px] md:top-[155px] opacity-65 bg-repeat-x bg-[length:750px_auto] md:bg-[length:1200px_auto] bg-top animate-cloud-drift-2 blur-[0.5px] pointer-events-none"
            style={{
              backgroundImage: `url(${APP_CONFIG.HOME_URL}Home/Clouds.webp)`,
            }}
          />
        </>
      ),
    },
    {
      depth: 0.08,
      className: "z-3 mix-blend-multiply pointer-events-none overflow-hidden",
      children: (
        <>
          {/* Bird 1: Lead flight */}
          <div className="absolute w-[90px] h-[60px] sm:w-[130px] sm:h-[85px] md:w-[160px] md:h-[105px] top-[42%] sm:top-[36%] md:top-[30%] left-0 animate-bird-flight-1 pointer-events-none">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat animate-bird-wings" />
          </div>

          {/* Bird 2: Higher companion flight */}
          <div className="absolute w-[70px] h-[48px] sm:w-[100px] sm:h-[68px] md:w-[125px] md:h-[80px] top-[35%] sm:top-[29%] md:top-[24%] left-0 animate-bird-flight-2 opacity-85 pointer-events-none">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat animate-bird-wings" />
          </div>

          {/* Bird 3: Background distant flight */}
          <div className="absolute w-[50px] h-[35px] sm:w-[75px] sm:h-[50px] md:w-[90px] md:h-[60px] top-[48%] sm:top-[42%] md:top-[36%] left-0 animate-bird-flight-3 opacity-70 pointer-events-none">
            <div className="w-full h-full bg-contain bg-center bg-no-repeat animate-bird-wings" />
          </div>
        </>
      ),
    },
    {
      depth: 0.03,
      className: "z-4 w-full h-full pointer-events-none",
      children: (
        <>
          {/* Mobile Background (Street only) */}
          <div
            className="md:hidden absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-[position:center_top] opacity-95 sm:opacity-100"
            style={{
              backgroundImage: `url(${APP_CONFIG.HOME_URL}Home/bg.webp)`,
            }}
          >
            <div className="absolute bottom-[160px] left-[100px] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(255,200,120,0.4)_0%,transparent_65%)] mix-blend-color-dodge animate-lamp-flicker" />
          </div>

          {/* Desktop & Tablet Background (Full composite shifted slightly lower for extra headroom) */}
          <div
            className="hidden md:block absolute inset-x-0 top-6 lg:top-8 -bottom-6 lg:-bottom-8 w-full bg-no-repeat bg-contain bg-bottom select-none pointer-events-none"
            style={{
              backgroundImage: `url(${APP_CONFIG.HOME_URL}Home/new%20hero%20bg.webp)`,
            }}
          />
        </>
      ),
    },
    {
      depth: 0.03,
      className: "z-5 flex justify-end items-end pointer-events-none md:hidden",
      children: (
        <>
          <img
            src={`${APP_CONFIG.HOME_URL}Home/building.webp`}
            alt="The 900 Luxury Residence Building"
            className="absolute right-[-35px] xs:right-[-15px] sm:right-[30px] bottom-[7%] xs:bottom-[6.5%] sm:bottom-[7.5%] h-[92%] xs:h-[96%] sm:h-[98%] w-[122%] xs:w-[116%] sm:w-[106%] max-w-none object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.65)] animate-building-entrance select-none"
          />

          <div className="absolute right-[20px] sm:right-[80px] bottom-[18.5%] sm:bottom-[19%] w-[350px] h-[350px] bg-[radial-gradient(circle,rgba(255,185,90,0.25)_0%,transparent_70%)] mix-blend-screen pointer-events-none animate-window-shimmer" />
        </>
      ),
    },
  ];

  return (
    <>
      {layers.map((layer, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-transform duration-100 ease-out ${layer.className}`}
          style={{
            transform: `translate(${mousePosition.x * layer.depth}px, ${mousePosition.y * layer.depth
              }px)`,
            ...(layer.style || {}),
          }}
        >
          {layer.children}
        </div>
      ))}
    </>
  );
};

export default HeroBackground;