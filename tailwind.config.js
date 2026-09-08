import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    50: '#fcf7f4',
                    100: '#f7ebe4',
                    200: '#efd6c9',
                    300: '#e3b8a3',
                    400: '#d59473',
                    500: '#c77950',
                    600: '#b8643c',
                    700: '#994e2e',
                    800: '#7d4029',
                    900: '#663725',
                    950: '#371a10',
                    DEFAULT: '#c77950',
                },
                secondary: {
                    50: '#fcfcfd',
                    100: '#f6f7fa',
                    200: '#e8e9f0',
                    300: '#d5d8e3',
                    400: '#bcc1d2',
                    500: '#9ea5bd',
                    600: '#818aa6',
                    700: '#68718e',
                    800: '#545c75',
                    900: '#464c60',
                    950: '#2b2e3c',
                    DEFAULT: '#e8e9f0',
                },
                gold: {
                    50: '#fcf7f4',
                    100: '#f7ebe4',
                    200: '#efd6c9',
                    300: '#e3b8a3',
                    400: '#d59473',
                    500: '#c77950',
                    600: '#b8643c',
                    700: '#994e2e',
                    800: '#7d4029',
                    900: '#663725',
                    DEFAULT: '#c77950',
                },
                dark: {
                    50: '#1c2840',
                    100: '#2a3b5a',
                    200: '#485c7b',
                    300: '#0b0f19',
                    400: '#090c14',
                    500: '#111726',
                    600: '#04060b',
                    700: '#0f1726',
                }
            },
            fontFamily: {
                'cormorant': ['Cormorant Garamond', 'serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
                'playfair': ['Playfair Display', 'serif'],
            },
            animation: {
                'pulse-glow': 'pulseGlow 8s ease-in-out infinite alternate',
                'float-clouds': 'floatClouds 50s linear infinite',
                'float-clouds-slow': 'floatClouds 90s linear infinite reverse',
                'fly-across': 'flyAcross 28s linear infinite',
                'fly-across-secondary': 'flyAcross 38s linear infinite 14s',
                'wing-flap': 'wingFlap 0.36s steps(1) infinite',
                'lamp-flicker': 'lampFlicker 4s ease-in-out infinite alternate',
                'building-entrance': 'subtleBuildingEntrance 1.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'window-shimmer': 'windowShimmer 5s ease-in-out infinite alternate',
                'fade-in-up': 'fadeInUp 0.4s ease-out both',
                'modal-pop': 'modalPop 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'rotate-ring': 'rotateRing 20s linear infinite',
                'menu-item-in': 'menuItemIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                modalPop: {
                    '0%': { opacity: '0', transform: 'scale(0.93) translateY(12px)' },
                    '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
                },
                pulseGlow: {
                    '0%': { opacity: '0.6', transform: 'scale(1)' },
                    '100%': { opacity: '0.9', transform: 'scale(1.08)' },
                },
                floatClouds: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-1920px)' },
                },
                wingFlap: {
                    '0%, 100%': { backgroundImage: "url('/img/bird1.webp')" },
                    '50%': { backgroundImage: "url('/img/bird2.webp')" },
                },
                flyAcross: {
                    '0%': { transform: 'translate(0, 0) scale(0.9)' },
                    '25%': { transform: 'translate(600px, -40px) scale(0.95)' },
                    '50%': { transform: 'translate(1200px, 10px) scale(1)' },
                    '75%': { transform: 'translate(1700px, -30px) scale(1.05)' },
                    '100%': { transform: 'translate(2300px, 20px) scale(1.1)' },
                },
                lampFlicker: {
                    '0%': { opacity: '0.7' },
                    '100%': { opacity: '0.95' },
                },
                subtleBuildingEntrance: {
                    '0%': { opacity: '0', transform: 'translateY(30px) scale(0.98)' },
                    '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
                },
                windowShimmer: {
                    '0%': { opacity: '0.5', transform: 'scale(0.95)' },
                    '100%': { opacity: '0.85', transform: 'scale(1.05)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                rotateRing: {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                },
                menuItemIn: {
                    '0%': { opacity: '0', transform: 'translateY(30px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backdropBlur: {
                xs: '2px',
            },
        },
    },

    plugins: [forms],
};
