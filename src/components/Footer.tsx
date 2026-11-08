import React from 'react';
import { Phone, MapPin, Clock, MessageCircle, Heart, Mail, Sparkles } from 'lucide-react';
import { DISPLAY_PHONE, SHOP_LOCATION } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/whatsapp';
import { PWAInstallButton } from './PWAInstallButton';

interface FooterProps {
  onSelectCategory: (id: string) => void;
  onOpenTracker: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTracker }) => {
  return (
    <footer className="bg-gradient-to-b from-[#2A0815] to-[#1A040C] text-rose-100/90 pt-16 pb-12 text-left relative overflow-hidden">
      {/* Decorative floral watermark blur */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-rose-900/50">
          
          {/* Brand & Vision (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-pink-600 p-0.5 flex items-center justify-center">
                <img
                  src="/icon.svg"
                  alt="Quevo Emblem"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                  Quevo Flowers &amp; Decor
                </span>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-400">
                  Flowers Speak What Words Can&apos;t...
                </span>
              </div>
            </div>

            <p className="text-xs text-rose-200/80 leading-relaxed max-w-md pt-2">
              &ldquo;Flowers are more than gifts. They are feelings, memories and beautiful expressions of love. Let Quevo Flowers &amp; Decor make your special moments unforgettable.&rdquo;
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={createWhatsAppUrl('Hello Quevo Flowers & Decor! I would like to place an order.')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Order on WhatsApp: {DISPLAY_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Quick Bouquet Collections (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Flower Collections
            </h4>
            <ul className="space-y-2 text-xs text-rose-200/70">
              <li>
                <button
                  onClick={() => onSelectCategory('romantic-roses')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Romantic Rose Bouquets (100 Roses)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('fresh-bouquets')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Fresh English Garden Blooms
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('wedding-flowers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Wedding Arches &amp; Bridal Posies
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('anniversary-flowers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Anniversary Luxury Gift Sets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('birthday-flowers')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Joyful Birthday Flower Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('corporate-decor')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Corporate Flower Decorations
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Kigali Studio Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              Boutique Studio &amp; Hours
            </h4>
            <div className="space-y-2.5 text-xs text-rose-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{SHOP_LOCATION}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{DISPLAY_PHONE} (Call / WhatsApp)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Open 7 Days: 7:00 AM – 9:00 PM</span>
              </div>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenTracker}
                className="text-xs text-rose-300 hover:text-white underline cursor-pointer"
              >
                Track an Existing Kigali Order →
              </button>
            </div>

            <div className="pt-2">
              <PWAInstallButton compact={true} />
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-rose-300/60 gap-4">
          <p>© {new Date().getFullYear()} Quevo Flowers &amp; Decor. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-rose-300">
            <span>QUEVO FLOWERS &amp; DECOR — Your Happiness, Our Priority</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
