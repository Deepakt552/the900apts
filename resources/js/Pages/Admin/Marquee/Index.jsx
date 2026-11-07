import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MarqueeBanner, { ICON_LIBRARY } from '@/Components/MarqueeBanner';
import { toast } from 'react-hot-toast';
import {
  Megaphone,
  Sparkles,
  Save,
  RotateCcw,
  ExternalLink,
  Eye,
  Type,
  Palette,
  Sliders,
  Link2,
  XCircle,
  Check,
  ShieldCheck,
  Feather,
  Ban,
} from 'lucide-react';

const COLOR_PRESETS = [
  { name: 'Signature Bronze', start: '#c77950', end: '#994e2e', text: '#ffffff' },
  { name: 'Dark Luxury', start: '#1a1f2c', end: '#0f172a', text: '#ffd9c7' },
  { name: 'Koreatown Skyline', start: '#1a73b5', end: '#0f4c81', text: '#ffffff' },
  { name: 'Royal Gold', start: '#994e2e', end: '#78350f', text: '#fffbeb' },
  { name: 'Deep Crimson', start: '#7a1c2a', end: '#4a0e17', text: '#ffffff' },
  { name: 'Forest Emerald', start: '#134e4a', end: '#042f2e', text: '#ffffff' },
];

const FONT_SIZES = [
  { label: 'Extra Small (11px)', value: '11px' },
  { label: 'Small (12px)', value: '12px' },
  { label: 'Standard (13px)', value: '13px' },
  { label: 'Medium (14px)', value: '14px' },
  { label: 'Large (15px)', value: '15px' },
  { label: 'Extra Large (16px)', value: '16px' },
];

const FONT_WEIGHTS = [
  { label: 'Medium (500)', value: '500' },
  { label: 'Semi-Bold (600)', value: '600' },
  { label: 'Bold (700)', value: '700' },
  { label: 'Extra Bold (800)', value: '800' },
];

const SPEED_PRESETS = [
  { label: 'Eye-Relaxed (60s)', value: 60, desc: 'Recommended · Easy to read without eye strain' },
  { label: 'Gentle Glide (75s)', value: 75, desc: 'Slow, graceful and ambient' },
  { label: 'Balanced (45s)', value: 45, desc: 'Smooth medium reading pace' },
  { label: 'Brisk (30s)', value: 30, desc: 'Faster flow for short notices' },
];

const MarqueeAdminIndex = ({ auth, marquee }) => {
  const { data, setData, put, processing, errors, reset } = useForm({
    is_active: Boolean(marquee?.is_active ?? true),
    text: marquee?.text || 'Up to 8 Weeks Free on Select Residences + $1,000 Look & Lease Special · In-Person & Self-Guided Tours Available Daily!',
    badge_text: marquee?.badge_text || 'SPECIAL OFFER',
    link_url: marquee?.link_url || '/availability',
    link_text: marquee?.link_text || 'Check Availability →',
    font_size: marquee?.font_size || '12px',
    font_weight: marquee?.font_weight || '700',
    text_color: marquee?.text_color || '#ffffff',
    bg_color: marquee?.bg_color || '#c77950',
    bg_gradient_end: marquee?.bg_gradient_end || '#994e2e',
    speed: Number(marquee?.speed || 60),
    pause_on_hover: Boolean(marquee?.pause_on_hover ?? true),
    smooth_mode: Boolean(marquee?.smooth_mode ?? true),
    animation_style: marquee?.animation_style || 'relaxed',
    direction: marquee?.direction || 'left',
    icon: marquee?.icon || 'bell',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('admin.marquee.update'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Marquee banner settings updated successfully!');
      },
      onError: () => {
        toast.error('Failed to update marquee settings. Please check the form.');
      },
    });
  };

  const handleApplyPreset = (preset) => {
    setData((prev) => ({
      ...prev,
      bg_color: preset.start,
      bg_gradient_end: preset.end,
      text_color: preset.text,
    }));
  };

  const handleSelectLibraryIcon = (iconKey) => {
    setData('icon', iconKey);
  };

  return (
    <AuthenticatedLayout
      user={auth?.user}
      header={
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#c77950] to-[#994e2e] flex items-center justify-center text-white shadow-md shadow-[#c77950]/20">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                Marquee Announcement Banner
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                    data.is_active
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-300 dark:border-gray-700'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      data.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'
                    }`}
                  />
                  {data.is_active ? 'Active & Visible' : 'Disabled'}
                </span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Configure the ultra-smooth, eye-relaxed scrolling announcement bar displayed directly above the header.
              </p>
            </div>
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:border-[#c77950] hover:text-[#c77950] transition-all shadow-sm"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      }
    >
      <Head title="Marquee Banner Settings" />

      <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* =========================================================================
            LIVE PREVIEW CONTAINER
        ========================================================================== */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-5 py-3.5 border-b border-gray-100 dark:border-gray-700/60 bg-gray-50/70 dark:bg-gray-800/80 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#c77950]" />
              <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                Live Banner Preview
              </span>
              <span className="text-[11px] text-gray-400 font-normal">
                (Dynamic live preview with smooth GPU hardware acceleration)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={data.is_active}
                  onChange={(e) => setData('is_active', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c77950]" />
                <span className="ml-2.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                  {data.is_active ? 'Banner Enabled' : 'Banner Disabled'}
                </span>
              </label>
            </div>
          </div>

          <div className="p-4 bg-gray-900/5 dark:bg-black/20 flex flex-col items-center justify-center min-h-[90px]">
            {data.is_active ? (
              <div className="w-full rounded-xl overflow-hidden shadow-md border border-black/10">
                <MarqueeBanner customSetting={data} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-gray-400 dark:text-gray-500">
                <XCircle className="w-7 h-7 mb-1 text-gray-400" />
                <p className="text-xs font-semibold">Banner is currently disabled.</p>
                <p className="text-[11px]">Toggle switch above to activate it on the site.</p>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            SETTINGS FORM
        ========================================================================== */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Main Controls */}
            <div className="lg:col-span-2 space-y-6">
              {/* Card 1: Icon Library & Announcement Text */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <Sparkles className="w-4 h-4 text-[#c77950]" />
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Start Announcement Library Icon
                  </h2>
                </div>

                {/* Library Icon Selector Grid */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Select Start Icon from Library
                    </label>
                    <span className="text-[11px] font-semibold text-[#c77950]">
                      Active: {ICON_LIBRARY[data.icon]?.label || 'No Icon'}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {/* Option: No Icon */}
                    <button
                      type="button"
                      onClick={() => handleSelectLibraryIcon('none')}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                        data.icon === 'none'
                          ? 'border-[#c77950] bg-[#c77950]/15 text-[#c77950] shadow-sm font-bold ring-2 ring-[#c77950]/30'
                          : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <Ban className="w-4 h-4 mb-1" />
                      <span className="text-[10px] leading-tight text-center">None</span>
                    </button>

                    {/* All Library Icons */}
                    {Object.entries(ICON_LIBRARY).map(([key, { label, icon: Icon }]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => handleSelectLibraryIcon(key)}
                        className={`group relative flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          data.icon === key
                            ? 'border-[#c77950] bg-[#c77950]/15 text-[#c77950] shadow-sm font-bold ring-2 ring-[#c77950]/30'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }`}
                      >
                        {data.icon === key && (
                          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#c77950]" />
                        )}
                        <Icon className="w-4 h-4 mb-1 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] leading-tight text-center truncate w-full">
                          {label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-[11px] text-gray-400">
                    The chosen library icon appears cleanly at the start of each announcement in place of emojis.
                  </p>
                </div>

                {/* Announcement text */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Announcement Text Content <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-gray-400">
                      {data.text.length} / 1000 characters
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={data.text}
                    onChange={(e) => setData('text', e.target.value)}
                    placeholder="Enter your announcement text here..."
                    className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-sm leading-relaxed p-3.5"
                    required
                  />
                  {errors.text && <p className="text-xs text-red-500">{errors.text}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* Badge Text */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Badge Pill (Optional)
                    </label>
                    <input
                      type="text"
                      value={data.badge_text}
                      onChange={(e) => setData('badge_text', e.target.value)}
                      placeholder="e.g. SPECIAL OFFER, NOW LEASING"
                      className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-xs p-2.5"
                    />
                    <p className="text-[11px] text-gray-400">Highlighted tag pill. Leave empty to hide.</p>
                  </div>

                  {/* Link / CTA */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Button / Link Label (Optional)
                    </label>
                    <input
                      type="text"
                      value={data.link_text}
                      onChange={(e) => setData('link_text', e.target.value)}
                      placeholder="e.g. Check Availability →"
                      className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-xs p-2.5"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                    Click Link URL (e.g. /availability or https://...)
                  </label>
                  <input
                    type="text"
                    value={data.link_url}
                    onChange={(e) => setData('link_url', e.target.value)}
                    placeholder="/availability"
                    className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-xs p-2.5"
                  />
                </div>
              </div>

              {/* Card 2: Typography & Colors */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <Palette className="w-4 h-4 text-[#c77950]" />
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Typography & Theme Colors
                  </h2>
                </div>

                {/* Font Size & Weight */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Font Size
                    </label>
                    <select
                      value={data.font_size}
                      onChange={(e) => setData('font_size', e.target.value)}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-xs p-2.5"
                    >
                      {FONT_SIZES.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Font Weight
                    </label>
                    <select
                      value={data.font_weight}
                      onChange={(e) => setData('font_weight', e.target.value)}
                      className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm focus:border-[#c77950] focus:ring focus:ring-[#c77950]/20 text-xs p-2.5"
                    >
                      {FONT_WEIGHTS.map((weight) => (
                        <option key={weight.value} value={weight.value}>
                          {weight.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Color presets */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Quick Color Theme Presets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {COLOR_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => handleApplyPreset(preset)}
                        className="group flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-[#c77950] transition-all text-left bg-gray-50/50 dark:bg-gray-900/50"
                      >
                        <div
                          className="w-6 h-6 rounded-lg shadow-sm shrink-0 border border-black/10"
                          style={{
                            background: `linear-gradient(135deg, ${preset.start}, ${preset.end})`,
                          }}
                        />
                        <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 group-hover:text-[#c77950] truncate">
                          {preset.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Color Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Text Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={data.text_color}
                        onChange={(e) => setData('text_color', e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={data.text_color}
                        onChange={(e) => setData('text_color', e.target.value)}
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm text-xs p-2.5 font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Background Start
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={data.bg_color}
                        onChange={(e) => setData('bg_color', e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={data.bg_color}
                        onChange={(e) => setData('bg_color', e.target.value)}
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm text-xs p-2.5 font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Gradient End (Optional)
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={data.bg_gradient_end || data.bg_color}
                        onChange={(e) => setData('bg_gradient_end', e.target.value)}
                        className="w-9 h-9 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 bg-transparent p-0.5"
                      />
                      <input
                        type="text"
                        value={data.bg_gradient_end || ''}
                        onChange={(e) => setData('bg_gradient_end', e.target.value)}
                        placeholder="#994e2e"
                        className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm text-xs p-2.5 font-mono uppercase"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 1 Col: Eye-Relaxed Smoothness & Speed Options */}
            <div className="space-y-6">
              {/* Card 3: Smoothness & Motion Controls */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-gray-100 dark:border-gray-700">
                  <Feather className="w-4 h-4 text-[#c77950]" />
                  <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                    Smooth Eye-Relaxed Motion
                  </h2>
                </div>

                {/* Eye-Relaxed Mode Toggle */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-[#c77950]/10 to-transparent border border-[#c77950]/20 space-y-2">
                  <label className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#c77950]" />
                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        Silky Smooth GPU Mode
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={data.smooth_mode}
                      onChange={(e) => setData('smooth_mode', e.target.checked)}
                      className="rounded border-gray-300 text-[#c77950] shadow-sm focus:ring-[#c77950] w-4 h-4"
                    />
                  </label>
                  <p className="text-[11px] text-gray-600 dark:text-gray-400 leading-relaxed">
                    Eliminates subpixel jitter with 3D hardware acceleration and adds soft edge dissolves for relaxed reading.
                  </p>
                </div>

                {/* Motion Style Selector */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Motion Feel
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      { id: 'relaxed', title: 'Eye-Relaxed Flow', sub: 'Optimal reading pace with gentle letter-spacing' },
                      { id: 'gentle', title: 'Ambient Breeze', sub: 'Very slow, serene background glide' },
                      { id: 'standard', title: 'Standard Flow', sub: 'Continuous linear scroll' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => setData('animation_style', style.id)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          data.animation_style === style.id
                            ? 'border-[#c77950] bg-[#c77950]/10 text-gray-900 dark:text-white ring-1 ring-[#c77950]'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold flex items-center justify-between">
                          <span>{style.title}</span>
                          {data.animation_style === style.id && (
                            <Check className="w-3.5 h-3.5 text-[#c77950]" />
                          )}
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5">{style.sub}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Speed Presets */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Speed Presets
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {SPEED_PRESETS.map((preset) => (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setData('speed', preset.value)}
                        className={`p-2 rounded-xl border text-left transition-all ${
                          data.speed === preset.value
                            ? 'border-[#c77950] bg-[#c77950]/10 text-[#c77950] font-bold'
                            : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
                        }`}
                      >
                        <span className="text-[11px] block">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fine-Tuning Range Slider */}
                <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Speed Fine-Tuning
                    </label>
                    <span className="text-xs font-extrabold text-[#c77950]">
                      {data.speed}s duration
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={120}
                    step={5}
                    value={data.speed}
                    onChange={(e) => setData('speed', Number(e.target.value))}
                    className="w-full accent-[#c77950] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-400">
                    <span>15s (Faster)</span>
                    <span>60s (Relaxed)</span>
                    <span>120s (Slow)</span>
                  </div>
                </div>

                {/* Pause on Hover */}
                <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <label className="flex items-center justify-between cursor-pointer">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Pause On Hover
                    </span>
                    <input
                      type="checkbox"
                      checked={data.pause_on_hover}
                      onChange={(e) => setData('pause_on_hover', e.target.checked)}
                      className="rounded border-gray-300 text-[#c77950] shadow-sm focus:ring-[#c77950] w-4 h-4"
                    />
                  </label>
                </div>
              </div>

              {/* Action Buttons Box */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-3">
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#c77950] to-[#b3633b] hover:from-[#b3633b] hover:to-[#994e2e] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#c77950]/30 hover:shadow-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{processing ? 'Saving Settings...' : 'Save & Publish Banner'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => reset()}
                  disabled={processing}
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 font-semibold text-xs tracking-wider transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Form</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default MarqueeAdminIndex;
