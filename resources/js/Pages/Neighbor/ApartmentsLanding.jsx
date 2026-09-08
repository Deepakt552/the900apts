import React from 'react';
import { 
  Train, 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  Film, 
  TreePine, 
  GraduationCap, 
  Store, 
  Dumbbell,
  Clock,
  MapPin,
  Compass
} from 'lucide-react';

const ApartmentsLanding = () => {
  return (
    <div className="min-h-screen bg-[#04060b] text-[#f5f3f0] font-['Inter',sans-serif]">
      {/* ===== HERO ===== */}
      <section className="relative h-screen w-full flex items-end bg-fixed bg-cover bg-center" 
               style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541592106381-b31e967f6f8b?q=80&w=2070&auto=format&fit=crop")' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#04060b] via-[#04060b]/40 to-transparent"></div>
        <div className="container mx-auto px-6 md:px-12 pb-16 md:pb-24 relative z-10">
          <span className="text-[#d4af37] text-xs tracking-[0.3em] uppercase font-light">The 900 Apartments</span>
          <h1 className="font-['Playfair_Display',serif] text-5xl md:text-7xl lg:text-8xl font-medium leading-[1.1] mt-3 max-w-3xl">
            START HERE,<br />GO ANYWHERE
          </h1>
          <p className="text-base md:text-lg text-gray-300 max-w-xl mt-5 font-light leading-relaxed">
            Unbeatable connectivity in the heart of Koreatown. Wilshire/Vermont Station, global dining, and the energy of Los Angeles at your doorstep.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <a href="#" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-transparent border border-[#d4af37] text-[#f5f3f0] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#04060b]">
              Explore neighborhood →
            </a>
            <span className="flex items-center gap-2 text-sm text-gray-300">
              <Train className="w-5 h-5 text-[#d4af37]" strokeWidth={1.5} />
              Wilshire / Vermont Station <span className="text-[#d4af37] ml-1">5 MIN WALK</span>
            </span>
          </div>
        </div>
      </section>

      {/* ===== EDITORIAL GRID ===== */}
      <section className="container mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 bg-[#0b0f19] p-8 md:p-10 flex flex-col justify-center border border-[#d4af37]/20">
            <span className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">Delicious dining</span>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-medium leading-[1.1] mt-3">
              A DESTINATION<br />FOR DINING.
            </h2>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              From Michelin-inspired to hidden speakeasies, Koreatown offers an unmatched culinary scene.
            </p>
            <a href="#" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-transparent border border-[#d4af37] text-[#f5f3f0] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#04060b] mt-8 self-start">
              Explore dining →
            </a>
          </div>
          <div className="md:col-span-2 h-72 md:h-auto min-h-[280px] border border-[#d4af37]/10 hover:scale-[1.01] transition duration-500"
               style={{ background: '#141210 url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop") center / cover no-repeat' }} />
        </div>
      </section>

      {/* ===== LIFESTYLE SPLIT ===== */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[320px] md:h-[440px] border border-[#d4af37]/10 hover:scale-[1.01] transition duration-500"
               style={{ background: '#1c1a17 url("https://images.unsplash.com/photo-1558618666-fcd25c85f7aa?q=80&w=2070&auto=format&fit=crop") center / cover no-repeat' }} />
          <div className="bg-[#0b0f19] p-8 md:p-12 flex flex-col justify-center border border-[#d4af37]/20">
            <span className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">lifestyle</span>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-medium leading-[1.1] mt-3">
              ALWAYS MORE<br />TO EXPLORE.
            </h2>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              Morning coffee walks, boutique shopping, and hidden gems—every day brings a new discovery.
            </p>
            <a href="#" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-transparent border border-[#d4af37] text-[#f5f3f0] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#04060b] mt-8 self-start">
              See what's nearby →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FEATURE BAR ===== */}
      <div className="container mx-auto px-6 md:px-12 py-8 border-y border-[#d4af37]/20 flex flex-wrap items-center justify-around gap-6 text-center">
        <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-gray-300">
          <Compass className="w-6 h-6 text-[#d4af37]" strokeWidth={1.5} />
          Walkable
        </div>
        <div className="hidden md:block w-px h-8 bg-[#d4af37]/30"></div>
        <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-gray-300">
          <Train className="w-6 h-6 text-[#d4af37]" strokeWidth={1.5} />
          Connected
        </div>
        <div className="hidden md:block w-px h-8 bg-[#d4af37]/30"></div>
        <div className="flex items-center gap-3 text-sm uppercase tracking-widest text-gray-300">
          <MapPin className="w-6 h-6 text-[#d4af37]" strokeWidth={1.5} />
          Everything Within Reach
        </div>
      </div>

      {/* ===== SUNSET BANNER ===== */}
      <section className="container mx-auto px-6 md:px-12 py-16">
        <div className="relative h-[300px] md:h-[420px] border border-[#d4af37]/10 flex items-center justify-center"
             style={{ background: '#1b1713 url("https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop") center / cover no-repeat' }}>
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 text-center">
            <div className="text-[#d4af37] text-sm tracking-[0.3em] uppercase">The 900 Apartments</div>
            <div className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-light tracking-wide">KOREATOWN • LOS ANGELES</div>
          </div>
        </div>
      </section>

      {/* ===== LOCATION SPLIT ===== */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0b0f19] p-8 md:p-12 flex flex-col justify-center border border-[#d4af37]/20 order-2 md:order-1">
            <span className="text-[#d4af37] text-xs tracking-[0.2em] uppercase">location</span>
            <h2 className="font-['Playfair_Display',serif] text-4xl md:text-5xl font-medium leading-[1.1] mt-3">
              THE BEST OF L.A.<br />BEGINS HERE.
            </h2>
            <p className="text-gray-300 text-sm mt-4 leading-relaxed">
              Historic theaters, rooftop bars, and vibrant streets—all just moments from your door.
            </p>
            <a href="#" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-transparent border border-[#d4af37] text-[#f5f3f0] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#04060b] mt-8 self-start">
              Explore location →
            </a>
          </div>
          <div className="h-[320px] md:h-[440px] border border-[#d4af37]/10 hover:scale-[1.01] transition duration-500 order-1 md:order-2"
               style={{ background: '#1f1b17 url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=2070&auto=format&fit=crop") center / cover no-repeat' }} />
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="container mx-auto px-6 md:px-12 pb-20">
        <h2 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-medium mb-10 text-center md:text-left">
          Explore Nearby
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: <Utensils size={44} strokeWidth={1.5} />, title: 'Restaurants', desc: 'Fine dining & local gems', count: '12 nearby' },
            { icon: <Coffee size={44} strokeWidth={1.5} />, title: 'Coffee Shops', desc: 'Artisan roasters', count: '8 nearby' },
            { icon: <ShoppingBag size={44} strokeWidth={1.5} />, title: 'Shopping', desc: 'Boutiques & more', count: '15+' },
            { icon: <Film size={44} strokeWidth={1.5} />, title: 'Entertainment', desc: 'Theaters, nightlife', count: '20+' },
            { icon: <TreePine size={44} strokeWidth={1.5} />, title: 'Parks', desc: 'Green escapes', count: '6' },
            { icon: <GraduationCap size={44} strokeWidth={1.5} />, title: 'Schools', desc: 'Top-rated', count: '5+' },
            { icon: <Store size={44} strokeWidth={1.5} />, title: 'Grocery', desc: 'Markets & fresh', count: '7' },
            { icon: <Dumbbell size={44} strokeWidth={1.5} />, title: 'Fitness', desc: 'Gyms & studios', count: '10+' },
          ].map((item, idx) => (
            <div key={idx} className="bg-[#0b0f19] p-6 rounded-sm text-center border border-[#d4af37] transition-all duration-250 hover:-translate-y-2 hover:bg-[#111726] hover:shadow-[0_0_0_1px_#d4af37,0_15px_35px_-12px_rgba(214,179,106,0.25)]">
              <div className="w-11 h-11 mx-auto text-[#d4af37]">{item.icon}</div>
              <h3 className="font-['Playfair_Display',serif] text-lg mt-3">{item.title}</h3>
              <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              <span className="text-[#d4af37] text-xs block mt-3">{item.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <div className="container mx-auto px-6 md:px-12 py-10 border-t border-b border-[#d4af37]/20 flex flex-wrap justify-around items-center gap-6 text-center">
        {[
          { icon: <Clock size={36} strokeWidth={1.5} />, value: '5 MIN', label: 'to metro' },
          { icon: <MapPin size={36} strokeWidth={1.5} />, value: '10 MIN', label: 'to downtown LA' },
          { icon: <Utensils size={36} strokeWidth={1.5} />, value: '15+', label: 'restaurants' },
          { icon: <Film size={36} strokeWidth={1.5} />, value: '20+', label: 'entertainment' },
        ].map((stat, idx) => (
          <div key={idx}>
            <div className="w-9 h-9 mx-auto text-[#d4af37]">{stat.icon}</div>
            <span className="font-['Playfair_Display',serif] text-xl font-medium block mt-1">{stat.value}</span>
            <span className="block text-xs uppercase tracking-wider text-gray-400">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ===== CTA ===== */}
      <section className="container mx-auto px-6 md:px-12 py-20">
        <div className="relative h-[340px] md:h-[480px] flex items-center justify-center border border-[#d4af37]/10"
             style={{ background: '#12100e url("https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop") center / cover no-repeat' }}>
          <div className="absolute inset-0 bg-[#04060b]/40"></div>
          <div className="relative z-10 text-center px-4">
            <h2 className="font-['Playfair_Display',serif] text-3xl md:text-5xl font-medium leading-[1.2]">
              READY TO EXPERIENCE<br />LIFE AT THE 900?
            </h2>
            <a href="#" className="inline-block px-8 py-3.5 text-xs tracking-[0.2em] uppercase font-medium bg-transparent border border-[#d4af37] text-[#f5f3f0] transition-all duration-300 hover:bg-[#d4af37] hover:text-[#04060b] mt-8">
              Schedule a tour →
            </a>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="container mx-auto px-6 md:px-12 py-8 border-t border-[#d4af37]/10 text-center text-xs text-gray-500 tracking-widest uppercase">
        The 900 Apartments · Koreatown · Los Angeles
      </footer>
    </div>
  );
};

export default ApartmentsLanding;