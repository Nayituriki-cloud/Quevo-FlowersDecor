import React from 'react';
import { ArrowRight, MessageCircle, Heart, Truck, Sparkles, ShieldCheck } from 'lucide-react';
import { DISPLAY_PHONE } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface HeroProps {
  onShopClick: () => void;
  onSelectCategory: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopClick, onSelectCategory }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF5F7] via-[#FFFDFB] to-[#FFFDFB] pt-8 pb-16 lg:py-20">
      {/* Soft romantic background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-pink-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Story & Headline */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Tagline kicker */}
            <div className="flex items-center gap-2 mb-4">
              <span className="font-script text-2xl sm:text-3xl text-rose-800">
                Flowers Speak What Words Can&apos;t...
              </span>
            </div>

            {/* Main Welcome Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.12] text-balance mb-6">
              Make Your Moments{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-800 via-rose-700 to-pink-700">
                Unforgettable.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
              Flowers are more than gifts. They are feelings, cherished memories, and pure expressions of love.
              Quevo Flowers &amp; Decor crafts hand-tied rose bouquets, luxury boxes, and romantic event decor with same-day delivery in Kigali.
            </p>

            {/* CTA action buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onShopClick}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-800 to-pink-700 hover:from-rose-900 hover:to-pink-800 text-white font-medium px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Shop Fresh Bouquets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={createWhatsAppUrl('Hello Quevo Flowers & Decor! I would like to order a fresh bouquet.')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-emerald-600/30 bg-emerald-50/80 hover:bg-emerald-100/90 text-emerald-900 font-semibold px-6 py-4 rounded-xl shadow-xs transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600" />
                <span>Order via WhatsApp</span>
              </a>
            </div>

            {/* Trust & Delivery Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-rose-100 text-slate-700">
              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Same-Day Kigali</h4>
                  <p className="text-[11px] text-slate-500">Order by 4 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Hand-Picked Fresh</h4>
                  <p className="text-[11px] text-slate-500">7+ day vase life</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Heart className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Love Note Included</h4>
                  <p className="text-[11px] text-slate-500">Wax-sealed card</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Artwork */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Outer decorative glow frame */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/90 bg-rose-50">
                <img
                  src="/src/assets/images/hero_rose_bouquet_1794088352763.jpg"
                  alt="Quevo Handcrafted Rose Bouquet"
                  className="w-full h-[400px] sm:h-[480px] lg:h-[540px] object-cover hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />

                {/* Romantic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Card Annotation */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/60 shadow-lg text-left flex items-center justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-800">
                      Bestseller of the Week
                    </span>
                    <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900">
                      Enchanted English Rose Bouquet
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 mt-0.5">
                      <span className="font-semibold text-rose-900">$65</span>
                      <span>·</span>
                      <span>Same-day hand delivery</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectCategory('fresh-bouquets')}
                    className="shrink-0 bg-rose-900 hover:bg-rose-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    View
                  </button>
                </div>
              </div>

              {/* Floating Customer Delight Tag */}
              <div className="hidden sm:flex absolute -top-4 -left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-rose-100 items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-700">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                  <p className="text-xs font-bold text-slate-900">1,200+ Happy Hearts</p>
                  <p className="text-[10px] text-slate-500">Kigali &amp; Diaspora Clients</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
