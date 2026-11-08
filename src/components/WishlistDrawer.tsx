import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight, MessageCircle } from 'lucide-react';
import { Product } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProductIds: string[];
  allProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onOpenProduct: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProductIds,
  allProducts,
  onRemoveFromWishlist,
  onOpenProduct,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = allProducts.filter((p) => wishlistProductIds.includes(p.id));

  const handleShareWishlistOnWhatsApp = () => {
    if (wishlistedProducts.length === 0) return;
    let text = `🌹 *MY FAVORITE QUEVO FLOWERS WISHLIST*\n\nHere are the flower arrangements I love:\n`;
    wishlistedProducts.forEach((p, idx) => {
      text += `${idx + 1}. ${p.name} ($${p.price})\n`;
    });
    text += `\nFrom Quevo Flowers & Decor Kigali ♡`;
    window.open(createWhatsAppUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-rose-100 text-left">
          
          {/* Header */}
          <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-600 text-rose-600" />
              <span className="font-serif text-xl font-bold text-slate-900">Your Loved Stems</span>
              <span className="text-xs bg-rose-100 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                {wishlistedProducts.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-500">
                <Heart className="w-12 h-12 text-rose-200 stroke-1 mb-3" />
                <h4 className="font-serif text-base font-bold text-slate-800">
                  No saved favorites yet
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mt-1 mb-4">
                  Tap the heart icon on any bouquet to keep track of flowers you love or want to receive!
                </p>
                <button
                  onClick={onClose}
                  className="bg-rose-900 text-white text-xs font-semibold px-4 py-2 rounded-xl"
                >
                  Explore Flowers
                </button>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 rounded-2xl border border-rose-100 bg-[#FFFDFB] flex gap-3 shadow-2xs group relative"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-rose-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] uppercase font-semibold text-rose-800 tracking-wider">
                          {product.categoryLabel}
                        </span>
                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 transition-colors cursor-pointer"
                          title="Remove"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-serif text-xs font-bold text-slate-900 line-clamp-1 mt-0.5">
                        {product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-bold text-rose-950 tabular-nums">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenProduct(product);
                        }}
                        className="bg-rose-900 hover:bg-rose-800 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Customize
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Actions */}
          {wishlistedProducts.length > 0 && (
            <div className="p-6 border-t border-rose-100 bg-rose-50/30 space-y-2">
              <button
                onClick={handleShareWishlistOnWhatsApp}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share Wishlist via WhatsApp</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
