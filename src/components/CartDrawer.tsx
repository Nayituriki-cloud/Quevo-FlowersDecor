import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, MessageCircle, ArrowRight, Tag, HeartHandshake, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';
import { createWhatsAppUrl, generateCartWhatsAppMessage } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: () => void;
  couponCode: string;
  onApplyCoupon: (code: string) => { success: boolean; message: string };
  discount: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  couponCode,
  onApplyCoupon,
  discount,
}) => {
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotal >= 80 || subtotal === 0 ? 0 : 5;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = onApplyCoupon(couponInput.trim().toUpperCase());
    if (res.success) {
      setCouponFeedback({ type: 'success', text: res.message });
    } else {
      setCouponFeedback({ type: 'error', text: res.message });
    }
  };

  const handleDirectWhatsAppCheckout = () => {
    const message = generateCartWhatsAppMessage({
      items,
      subtotal,
      discount,
      deliveryFee,
      total,
      customerName: 'Valued Customer',
      customerPhone: '',
      recipientName: items[0]?.recipientName || 'Gift Recipient',
      deliveryAddress: items[0]?.deliveryAddress || 'Kigali delivery address',
      deliveryDate: items[0]?.deliveryDate || 'Today / Same-day',
      deliveryTimeSlot: items[0]?.deliveryTimeSlot || 'Afternoon',
      paymentMethod: 'Mobile Money / Card / Cash',
    });
    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-rose-100">
          
          {/* Header */}
          <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/40">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-bold text-slate-900">Your Flower Bag</span>
              <span className="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-slate-500">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300 mb-4">
                  <HeartHandshake className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-lg font-bold text-slate-800 mb-1">
                  Your floral bag is empty
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mb-6">
                  Surprise someone you love today. Explore our fresh English roses, bridal blooms, and luxury gift boxes.
                </p>
                <button
                  onClick={onClose}
                  className="bg-rose-900 hover:bg-rose-800 text-white text-xs font-semibold px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                >
                  Browse Flowers
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl border border-rose-100 bg-[#FFFDFB] flex gap-3 text-left shadow-2xs relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 bg-rose-50"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap gap-x-2">
                        <span>{item.size}</span>
                        <span>·</span>
                        <span className="text-rose-800 font-medium">{item.color}</span>
                      </div>

                      {item.cardMessage && (
                        <p className="text-[10px] text-rose-900 italic line-clamp-1 mt-1 bg-rose-50/80 px-2 py-0.5 rounded border border-rose-100">
                          &ldquo;{item.cardMessage}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-rose-50">
                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        ${item.unitPrice * item.quantity}
                      </span>

                      <div className="flex items-center border border-slate-200 rounded-lg bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-slate-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 border-t border-rose-100 bg-[#FFFDFB] space-y-4 text-left">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Promo code (e.g. QUEVOLOVE10)"
                      className="w-full pl-8 pr-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-800 uppercase placeholder-slate-400 focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponFeedback && (
                  <p
                    className={`text-[11px] font-medium ${
                      couponFeedback.type === 'success' ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {couponFeedback.text}
                  </p>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-rose-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900 tabular-nums">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount Coupon</span>
                    <span className="tabular-nums">-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Kigali Delivery</span>
                  <span className="font-semibold text-slate-900 tabular-nums">
                    {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-rose-100">
                  <span>Total Amount</span>
                  <span className="font-serif text-lg text-rose-950 tabular-nums">${total}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-rose-900 to-pink-800 hover:from-rose-950 hover:to-pink-900 text-white text-xs font-bold py-3.5 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDirectWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold py-3 rounded-xl transition-all cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Checkout Entire Bag on WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Fast Rwandan Mobile Money (MTN MoMo/Airtel) &amp; Card Secure Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
