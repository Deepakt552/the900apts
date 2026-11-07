import React from 'react';
import { usePage, Link } from '@inertiajs/react';
import {
  Sparkles,
  Bell,
  BellRing,
  Megaphone,
  Flame,
  Tag,
  Star,
  Gift,
  BadgePercent,
  Zap,
  Info,
  Calendar,
  Building2,
  Crown,
  Award,
  Heart,
  ArrowRight,
} from 'lucide-react';

export const ICON_LIBRARY = {
  bell: { label: 'Bell', icon: Bell },
  sparkles: { label: 'Sparkles', icon: Sparkles },
  notification: { label: 'Notification', icon: BellRing },
  megaphone: { label: 'Megaphone', icon: Megaphone },
  flame: { label: 'Hot Deal', icon: Flame },
  tag: { label: 'Special Offer', icon: Tag },
  percent: { label: 'Lease Special', icon: BadgePercent },
  star: { label: 'Featured', icon: Star },
  gift: { label: 'Gift / Bonus', icon: Gift },
  zap: { label: 'Flash Offer', icon: Zap },
  info: { label: 'Announcement', icon: Info },
  calendar: { label: 'Open House', icon: Calendar },
  building: { label: 'Residences', icon: Building2 },
  crown: { label: 'VIP / Luxury', icon: Crown },
  award: { label: 'Award', icon: Award },
  heart: { label: 'Welcome', icon: Heart },
};

// Strips leading emoji so library icon replaces it cleanly
const cleanLeadingEmojis = (str) => {
  if (!str) return '';
  return str.replace(/^[\s\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1FA00}-\u{1FAFF}]+/u, '').trim();
};

const MarqueeBanner = ({ customSetting = null }) => {
  const pageProps = usePage()?.props || {};
  const setting = customSetting || pageProps.marquee;

  if (!setting || !setting.is_active || !setting.text) {
    return null;
  }

  const {
    text,
    badge_text,
    link_url,
    link_text,
    font_size = '13px',
    font_weight = '600',
    text_color = '#ffffff',
    bg_color = '#c77950',
    bg_gradient_end = '#994e2e',
    speed = 45,
    pause_on_hover = true,
    smooth_mode = true,
    animation_style = 'relaxed',
    direction = 'left',
    icon = 'sparkles',
  } = setting;

  const iconConfig = ICON_LIBRARY[icon];
  const IconComponent = iconConfig ? iconConfig.icon : (icon === 'none' ? null : Sparkles);

  // Clean text of leading emoji if library icon is selected
  const displayText = IconComponent ? cleanLeadingEmojis(text) : text;

  // Background style
  const backgroundStyle = bg_gradient_end
    ? `linear-gradient(90deg, ${bg_color} 0%, ${bg_gradient_end} 100%)`
    : bg_color;

  const animationDirection = direction === 'right' ? 'reverse' : 'normal';

  // Single marquee item block
  const renderItem = (index) => {
    const content = (
      <div className="inline-flex items-center gap-3 px-6 whitespace-nowrap">
        {/* Start Announcement Library Icon */}
        {IconComponent && (
          <span
            className="inline-flex items-center justify-center w-6 h-6 rounded-full shrink-0 shadow-sm border border-white/35 transition-transform group-hover:scale-110"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.22)',
              color: text_color,
            }}
          >
            <IconComponent className="w-3.5 h-3.5 animate-pulse" />
          </span>
        )}

        {/* Optional Pill Badge */}
        {badge_text && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-extrabold tracking-widest shadow-sm border border-white/30"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: text_color,
            }}
          >
            <span>{badge_text}</span>
          </span>
        )}

        {/* Main Announcement Text */}
        <span
          className="tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] select-text"
          style={{
            fontSize: font_size,
            fontWeight: font_weight,
            color: text_color,
            letterSpacing: animation_style === 'relaxed' ? '0.02em' : 'normal',
          }}
        >
          {displayText}
        </span>

        {/* Optional Link Button / Pill */}
        {link_text && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase transition-all duration-200 border border-white/40 shadow-sm group-hover:brightness-105"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: bg_color || '#c77950',
            }}
          >
            <span>{link_text}</span>
            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
          </span>
        )}

        {/* Luxury Diamond Separator between repeats */}
        <span
          className="mx-4 text-[10px] opacity-60 select-none"
          style={{ color: text_color }}
          aria-hidden="true"
        >
          ◆
        </span>
      </div>
    );

    if (link_url) {
      const isInternal = link_url.startsWith('/') && !link_url.startsWith('//');
      return isInternal ? (
        <Link
          key={index}
          href={link_url}
          className="inline-flex items-center hover:opacity-95 transition-opacity focus:outline-none group cursor-pointer"
        >
          {content}
        </Link>
      ) : (
        <a
          key={index}
          href={link_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center hover:opacity-95 transition-opacity focus:outline-none group cursor-pointer"
        >
          {content}
        </a>
      );
    }

    return (
      <span key={index} className="inline-flex items-center">
        {content}
      </span>
    );
  };

  const items = [0, 1, 2, 3];

  return (
    <aside
      aria-label="Announcement Banner"
      className="relative w-full z-[101] overflow-hidden select-none border-b border-black/10 shadow-sm"
      style={{
        background: backgroundStyle,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      }}
    >
      <style>{`
        @keyframes smoothMarqueeLoop {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .animate-smooth-marquee {
          display: flex;
          width: max-content;
          will-change: transform;
          animation: smoothMarqueeLoop ${speed}s linear infinite ${animationDirection};
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          perspective: 1000px;
          -webkit-perspective: 1000px;
          transform-style: preserve-3d;
          contain: layout style paint;
        }

        ${pause_on_hover ? `
          .animate-smooth-marquee:hover {
            animation-play-state: paused;
          }
        ` : ''}

        ${smooth_mode ? `
          .marquee-edge-mask {
            -webkit-mask-image: linear-gradient(to right, transparent, black 36px, black calc(100% - 36px), transparent);
            mask-image: linear-gradient(to right, transparent, black 36px, black calc(100% - 36px), transparent);
          }
        ` : ''}

        @media (prefers-reduced-motion: reduce) {
          .animate-smooth-marquee {
            animation: none !important;
            transform: none !important;
            overflow-x: auto;
          }
        }
      `}</style>

      <div className={`w-full flex items-center py-2 sm:py-2.5 ${smooth_mode ? 'marquee-edge-mask' : ''}`}>
        <div className="animate-smooth-marquee">
          {/* Track 1 */}
          <div className="flex items-center shrink-0">
            {items.map((i) => renderItem(`track1-${i}`))}
          </div>
          {/* Track 2 (Clone for seamless infinite loop) */}
          <div className="flex items-center shrink-0" aria-hidden="true">
            {items.map((i) => renderItem(`track2-${i}`))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default MarqueeBanner;
