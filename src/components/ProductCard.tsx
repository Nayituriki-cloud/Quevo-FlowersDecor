import React from 'react';
import { Heart, MessageCircle, Star, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onOpenCustomize: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenCustomize,
}) => {
  const directWhatsAppUrl = createWhatsAppUrl(
    `Hello Quevo Flowers! I would like to order the *${product.name}* ($${product.price}). Please let me know the available delivery time for Kigali.`
  );

  return (
    <div className="group flex flex-col bg-white rounded-2xl border border-rose-100 overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 rose-card-hover text-left">
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 overflow-hidden bg-rose-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Elegant CSS fallback if asset fails to load
            const target = e.target as HTMLImageElement;
            target.src = '/src/assets/images/hero_rose_bouquet_1794088352763.jpg';
          }}
        />

        {/* Quiet top corner badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          {product.isBestSeller && (
            <span className="bg-rose-950/80 backdrop-blur-xs text-rose-100 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
              Bestseller
            </span>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <span className="bg-amber-900/80 backdrop-blur-xs text-amber-100 text-[11px] font-medium px-2.5 py-0.5 rounded-md">
              Featured
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 hover:scale-110 active:scale-95 transition-all cursor-pointer"
          title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          aria-label="Wishlist toggle"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isWishlisted ? 'fill-rose-600 text-rose-600' : 'text-slate-600'
            }`}
          />
        </button>

        {/* Quick view / customize overlay on desktop */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
          <button
            onClick={() => onOpenCustomize(product)}
            className="w-full bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold py-2 px-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            Customize Bouquet &amp; Card
          </button>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating: Clean unboxed metadata with separators */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
            <span className="text-rose-800 font-medium tracking-wide">
              {product.categoryLabel}
            </span>
            <div className="flex items-center gap-1 text-slate-600">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-800">{product.rating.toFixed(1)}</span>
              <span>({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <h3
            onClick={() => onOpenCustomize(product)}
            className="font-serif text-lg font-bold text-slate-900 line-clamp-1 hover:text-rose-900 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-slate-600 line-clamp-2 mt-1.5 leading-relaxed">
            {product.description}
          </p>

          {/* Flower tags (quiet unboxed text with bullets) */}
          <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
            {product.flowerTypes.map((flower, idx) => (
              <React.Fragment key={flower}>
                <span>{flower}</span>
                {idx < product.flowerTypes.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Price & Action row */}
        <div className="pt-4 mt-4 border-t border-rose-50 flex items-center justify-between gap-2">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="font-sans font-bold text-xl text-rose-950 tabular-nums">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5">
            <a
              href={directWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              title="Order this directly via WhatsApp"
              aria-label="Order on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            <button
              onClick={() => onOpenCustomize(product)}
              className="bg-rose-900 hover:bg-rose-800 text-white text-xs font-semibold px-3.5 py-2 rounded-xl transition-all shadow-2xs hover:shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
