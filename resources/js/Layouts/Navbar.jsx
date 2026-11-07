
import React, { useState, useRef, useEffect } from 'react';
import NavActions from './Navbar/NavActions';
import MenuOverlay from './Navbar/MenuOverlay';
import APP_CONFIG from './../Pages/config';
import { Link } from "@inertiajs/react";
import { Phone, Mail } from "lucide-react";

import RotatingBadge from '../Pages/Home/RotatingBadge';
import MarqueeBanner from '../Components/MarqueeBanner';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navbarRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (navbarRef.current) {
        const rect = navbarRef.current.getBoundingClientRect();

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

    const navbar = navbarRef.current;

    if (navbar) {
      navbar.addEventListener('mousemove', handleMouseMove);
      navbar.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (navbar) {
        navbar.removeEventListener('mousemove', handleMouseMove);
        navbar.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMenuOpen]);

  return (
    <>
      <style>{`
        .parallax {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
        }

        @media (max-width: 768px) {
          .parallax {
            background-attachment: scroll;
          }
        }

        ::-webkit-scrollbar {
          width: 6px;
          background: #0b0f19;
        }

        ::-webkit-scrollbar-thumb {
          background: #c77950;
          border-radius: 12px;
        }
      `}</style>

      {/* ACCESSIBLE SKIP TO MAIN CONTENT LINK (WCAG 2.1) */}
      <a href="#main-content" className="skip-to-content-link">
        Skip to main content
      </a>

      <div className="fixed top-0 left-0 w-full z-[100] flex flex-col pointer-events-auto">
        {/* Modern Looping Marquee Banner (Controlled via Admin Dashboard) */}
        <MarqueeBanner />

        <header
          ref={navbarRef}
          role="banner"
          aria-label="Site Header"
          className="
            relative w-full h-[48px] md:h-[62px]
            flex items-center
            px-0 pr-2 sm:pr-[18px] md:pr-[45px]
            border-b border-[#c77950]
            transition-all duration-300
            bg-white/95 backdrop-blur-[20px] shadow-[0_4px_25px_rgba(30,35,60,0.08)]
          "
        >

        {/* =========================
            LOGO
        ========================== */}
        <div
          className="
            relative h-[64px] sm:h-[72px] md:h-[80px] mt-0
            z-[110]
            flex-shrink-0
            drop-shadow-[0_10px_22px_rgba(0,0,0,0.3)]
          "
        >
          <div
            className="
              absolute top-0 left-[-35px]
              w-[calc(100%+35px)] sm:w-[calc(100%+45px)]
              h-full
              bg-gradient-to-r from-[#c77950] to-[#b3633b]
              border-r border-[#c77950]
              border-b border-[#c77950]
              shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_4px_15px_rgba(199,121,80,0.35)]
              rounded-br-[10px]
            "
            style={{
              transform: 'skewX(-28deg)',
              transformOrigin: 'top left',
            }}
          />

          <Link
            href="/"
            className="
              relative z-[2]
              h-full
              flex items-center
              px-[22px] sm:px-[32px] md:px-[45px]
              pr-[50px] sm:pr-[68px] md:pr-[80px]
              transition-transform duration-300
              hover:scale-[1.02]
            "
            title="THE 900 Home"
          >
            <img
              src={`${APP_CONFIG.HOME_URL}img/the900_logo-black.svg`}
              alt="THE 900 Logo"
              className="
                h-[34px] sm:h-[42px] md:h-[54px]
                w-auto
                object-contain
                brightness-0 invert mt-[-2px] md:mt-0
                drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
              "
            />
          </Link>
        </div>


        {/* =========================
            CONTACT + REMAINING SPACE + MENU
        ========================== */}
        <div className="flex items-center flex-1 min-w-0">

          {/* =========================
              CONTACT INFORMATION
          ========================== */}
          <div
            className="
              hidden lg:flex
              items-center
              gap-5
              ml-2
              xl:ml-4
              flex-shrink-0
            "
          >

            {/* PHONE */}
            <a
              href={`tel:${APP_CONFIG.Phone}`}
              className="
                group
                flex items-center
                gap-2
                whitespace-nowrap
              "
              aria-label={`Call ${APP_CONFIG.Phone}`}
            >
              <span
                className="
                  flex items-center justify-center
                  w-7 h-7
                  rounded-full
                  transition-all duration-300
                  border border-[#d6d8e5] bg-white text-[#c77950] shadow-sm group-hover:bg-[#c77950] group-hover:text-white
                "
              >
                <Phone size={13} strokeWidth={1.8} />
              </span>

              <span
                className="
                  text-[13.5px] sm:text-sm
                  font-extrabold
                  tracking-wide
                  transition-colors duration-300
                  text-[#1a1f2c] group-hover:text-[#c77950]
                "
              >
                {APP_CONFIG.Phone}
              </span>
            </a>


            {/* DIVIDER */}
            <div className="h-5 w-px transition-colors duration-300 bg-[#d6d8e5]" />


            {/* EMAIL */}
            <a
              href={`mailto:${APP_CONFIG.email}`}
              className="
                group
                flex items-center
                gap-2
                whitespace-nowrap
              "
              aria-label={`Email ${APP_CONFIG.email}`}
            >
              <span
                className="
                  flex items-center justify-center
                  w-7 h-7
                  rounded-full
                  transition-all duration-300
                  border border-[#d6d8e5] bg-white text-[#c77950] shadow-sm group-hover:bg-[#c77950] group-hover:text-white
                "
              >
                <Mail size={13} strokeWidth={1.8} />
              </span>

              <span
                className="
                  text-[13.5px] sm:text-sm
                  font-bold
                  tracking-wide
                  transition-colors duration-300
                  text-[#1a1f2c] group-hover:text-[#c77950]
                "
              >
                {APP_CONFIG.email}
              </span>
            </a>

          </div>


          {/* =========================
              REMAINING SPACE
          ========================== */}
          <div className="flex-1 min-w-0" />


          {/* =========================
              RIGHT SIDE MENU
          ========================== */}
          <div className="flex-shrink-0">
            <NavActions
              onMenuToggle={toggleMenu}
              isMenuOpen={isMenuOpen}
              isScrolled={true}
            />
          </div>

        </div>

      </header>
      </div>


      {/* MENU OVERLAY */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={closeMenu}
      />
      <RotatingBadge></RotatingBadge>
    </>
  );
};

export default Navbar;