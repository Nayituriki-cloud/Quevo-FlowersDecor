import React from 'react';
import { MessageCircle, Sparkles, Check, Calendar, ArrowRight } from 'lucide-react';
import { createWhatsAppUrl, generateWeddingConsultationWhatsAppMessage } from '../utils/whatsapp';

export const WeddingEventsSection: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(generateWeddingConsultationWhatsAppMessage());

  return (
    <section id="wedding-services" className="py-16 lg:py-24 bg-gradient-to-b from-white via-rose-50/40 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="font-script text-2xl text-rose-800 block mb-1">
            Enchanting Celebrations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Luxury Weddings &amp; Corporate Decor
          </h2>
          <p className="text-sm text-slate-600 mt-3 leading-relaxed">
            From fairytale Rwandan bridal arches and bridal party bouquets to grand corporate summit centerpieces and gala galas in Kigali, our floral artists curate unforgettable atmosphere.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-rose-100 bg-white group">
              <img
                src="/src/assets/images/wedding_floral_arch_1794088353667.jpg"
                alt="Quevo Luxury Wedding Floral Centerpiece"
                className="w-full h-[360px] sm:h-[460px] object-cover group-hover:scale-102 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Tag overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-lg text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-800">
                  Kigali Wedding &amp; Event Portfolio
                </span>
                <h3 className="font-serif text-lg font-bold text-slate-900 mt-0.5">
                  Handcrafted Ceremony &amp; Reception Floral Styling
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Full service on-site setup, bridal entourage bouquets, and ballroom transformations.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Services & WhatsApp consultation */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    01
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Bespoke Bridal Packages
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">
                  Custom bridal bouquet, bridesmaid posies, groom boutonnieres, flower girl petals, and hair crowns styled to match your wedding palette.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    02
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Ceremony Arches &amp; Aisle Styling
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">
                  Breath-taking circular and rectangular floral arches, floral pillars, and romantic candlelit walkway installations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-rose-100 shadow-2xs hover:border-rose-200 transition-colors">
                <div className="flex items-center gap-3 mb-1.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs">
                    03
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900">
                    Corporate &amp; VIP Gala Scenography
                  </h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-11">
                  Weekly fresh vase subscriptions for luxury hotels, embassy dining tables, conference stage accents, and brand launch podiums.
                </p>
              </div>

            </div>

            {/* Direct Consultation Action */}
            <div className="pt-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-all active:scale-98"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Book a Wedding / Event Consultation (+250)</span>
              </a>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Complimentary 15-minute concept consultation with our lead floral architect
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
