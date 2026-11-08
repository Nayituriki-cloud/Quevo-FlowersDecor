import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, Phone, Menu, X, Shield, Clock } from 'lucide-react';
import { PWAInstallButton } from './PWAInstallButton';
import { DISPLAY_PHONE } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTracker: () => void;
  onOpenAdmin: () => void;
  onSelectCategory: (id: string) => void;
  activeCategory: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenTracker,
  onOpenAdmin,
  onSelectCategory,
  activeCategory,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Bouquets', id: 'fresh-bouquets' },
    { label: 'Romantic Roses', id: 'romantic-roses' },
    { label: 'Wedding & Decor', id: 'wedding-flowers' },
    { label: 'Anniversary', id: 'anniversary-flowers' },
    { label: 'Special Gifts', id: 'special-gifts' },
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-rose-950 via-rose-900 to-pink-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-script text-base text-rose-200">Flowers Speak What Words Can&apos;t...</span>
            <span className="hidden md:inline text-rose-300">·</span>
            <span className="hidden md:inline text-rose-100">Same-Day Express Delivery in Kigali</span>
          </div>

          <div className="flex items-center gap-4 text-rose-200">
            <button
              onClick={onOpenTracker}
              className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Clock className="w-3.5 h-3.5 text-rose-300" />
              <span>Track Order</span>
            </button>
            <span className="text-rose-700">|</span>
            <a
              href={createWhatsAppUrl('Hello Quevo Flowers & Decor! I would like to make an inquiry.')}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>WhatsApp: {DISPLAY_PHONE}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header (Strict 3-zone layout) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-rose-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          
          {/* Zone 1: Single Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                onSelectCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-3 text-left cursor-pointer group"
            >
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-rose-900 to-pink-700 p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center">
                <img
                  src="/icon.svg"
                  alt="Quevo Logo"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    // Fallback to text if SVG fails
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 whitespace-nowrap leading-none group-hover:text-rose-900 transition-colors">
                  Quevo Flowers
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-rose-800 font-sans mt-0.5">
                  &amp; Decor · Kigali
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: 4-5 Clean Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
            <button
              onClick={() => {
                onSelectCategory('all');
                const el = document.getElementById('shop-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className={`hover:text-rose-900 transition-colors whitespace-nowrap cursor-pointer ${
                activeCategory === 'all' ? 'text-rose-900 font-semibold' : ''
              }`}
            >
              All Flowers
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onSelectCategory(link.id);
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`hover:text-rose-900 transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategory === link.id ? 'text-rose-900 font-semibold' : ''
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="#wedding-services"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Weddings &amp; Events
            </a>
            <a
              href="#reviews-section"
              className="hover:text-rose-900 transition-colors whitespace-nowrap"
            >
              Reviews
            </a>
          </nav>

          {/* Zone 3: Primary Action & Interactive Icons */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0">
            <div className="hidden sm:block">
              <PWAInstallButton />
            </div>

            {/* Wishlist toggle */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-slate-700 hover:text-rose-700 rounded-full hover:bg-rose-50 transition-colors cursor-pointer"
              aria-label="View Wishlist"
              title="Favorite Bouquets"
            >
              <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-600 text-rose-600' : ''}`} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-600 text-[10px] font-bold text-white shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-gradient-to-r from-rose-800 to-pink-700 text-white px-4 py-2 rounded-full font-medium text-xs sm:text-sm hover:from-rose-900 hover:to-pink-800 transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">My Bag</span>
              <span className="bg-white text-rose-900 text-xs font-bold rounded-full h-5 min-w-5 px-1.5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>

            {/* Admin Portal Toggle */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              title="Admin Portal (Manage Orders & Products)"
              aria-label="Admin Dashboard"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile menu burger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 rounded-lg hover:bg-rose-50 cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile slide-down menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-rose-100 bg-white px-4 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onSelectCategory('all');
                  setMobileMenuOpen(false);
                  const el = document.getElementById('shop-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                  activeCategory === 'all' ? 'bg-rose-100 text-rose-900' : 'text-slate-700 hover:bg-rose-50'
                }`}
              >
                All Flowers
              </button>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectCategory(link.id);
                    setMobileMenuOpen(false);
                    const el = document.getElementById('shop-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`text-left px-3 py-2 rounded-lg text-sm font-medium ${
                    activeCategory === link.id ? 'bg-rose-100 text-rose-900' : 'text-slate-700 hover:bg-rose-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-rose-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenTracker();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm text-slate-700 py-2 px-1 hover:text-rose-800"
              >
                <Clock className="w-4 h-4 text-rose-700" />
                <span>Track Your Flower Order</span>
              </button>

              <div className="pt-2">
                <PWAInstallButton />
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
