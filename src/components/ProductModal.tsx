import React, { useState } from 'react';
import { X, Heart, MessageCircle, ShoppingBag, Sparkles, Calendar, Clock, MapPin, Check, Gift } from 'lucide-react';
import { Product, BouquetSize, FlowerColor, CartItem } from '../types';
import { ADD_ONS } from '../data/mockData';
import { createWhatsAppUrl, generateProductWhatsAppMessage } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

const SIZE_PRICE_MAP: Record<BouquetSize, { multiplier: number; label: string; desc: string }> = {
  Classic: { multiplier: 1.0, label: 'Classic Bouquet', desc: 'Standard artisanal arrangement (approx. 20-25 blooms)' },
  Deluxe: { multiplier: 1.35, label: 'Deluxe Bouquet (+35%)', desc: 'Fuller, more lush hand-tied arrangement (approx. 35-40 blooms)' },
  'Luxury Grand': { multiplier: 1.75, label: 'Luxury Grand (+75%)', desc: 'Showstopper arrangement in premium box or vase (50-70 blooms)' },
};

const COLOR_OPTIONS: { name: FlowerColor; hex: string; desc: string }[] = [
  { name: 'Crimson Red', hex: '#be123c', desc: 'Passionate velvet red' },
  { name: 'Blush Pink', hex: '#f472b6', desc: 'Sweet romantic garden pink' },
  { name: 'Pure Ivory White', hex: '#f8fafc', desc: 'Pristine angelic elegance' },
  { name: 'Sunset Peach', hex: '#fb923c', desc: 'Warm glowing celebration' },
  { name: 'Deep Burgundy', hex: '#4c0519', desc: 'Royal dramatic velvet' },
];

const OCCASIONS = [
  'Romantic Love & Passion',
  'Happy Birthday Celebration',
  'Happy Anniversary',
  'Thinking of You & Appreciation',
  'Congratulations & Best Wishes',
  'Apology & Reconciliation',
  'Just Because ♡',
];

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [selectedSize, setSelectedSize] = useState<BouquetSize>('Classic');
  const [selectedColor, setSelectedColor] = useState<FlowerColor>('Crimson Red');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  
  // Custom Card message state
  const [cardOccasion, setCardOccasion] = useState(OCCASIONS[0]);
  const [cardMessage, setCardMessage] = useState(
    'You make every ordinary day extraordinary. With all my love, always.'
  );
  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  
  // Delivery details
  const [deliveryDate, setDeliveryDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('Afternoon (1:00 PM - 5:00 PM)');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Active customizer tab
  const [activeTab, setActiveTab] = useState<'options' | 'card' | 'delivery'>('options');
  const [addedNotice, setAddedNotice] = useState(false);

  // Compute live price
  const basePrice = Math.round(product.price * SIZE_PRICE_MAP[selectedSize].multiplier);
  const addOnsTotal = selectedAddOns.reduce((sum, addOnId) => {
    const found = ADD_ONS.find((a) => a.id === addOnId);
    return sum + (found ? found.price : 0);
  }, 0);
  const unitPrice = basePrice + addOnsTotal;

  const toggleAddOn = (id: string) => {
    if (selectedAddOns.includes(id)) {
      setSelectedAddOns(selectedAddOns.filter((x) => x !== id));
    } else {
      setSelectedAddOns([...selectedAddOns, id]);
    }
  };

  const handleAddToCart = () => {
    onAddToCart({
      productId: product.id,
      product,
      size: selectedSize,
      color: selectedColor,
      cardOccasion,
      cardMessage,
      senderName: senderName || 'A Secret Admirer',
      recipientName: recipientName || 'Special Someone',
      deliveryDate,
      deliveryTimeSlot,
      deliveryAddress: deliveryAddress || 'To be specified with Kigali courier',
      specialInstructions,
      selectedAddOns,
      unitPrice,
      quantity: 1,
    });
    setAddedNotice(true);
    setTimeout(() => {
      onClose();
    }, 900);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductWhatsAppMessage(product, {
      size: selectedSize,
      color: selectedColor,
      cardMessage,
      recipientName,
      senderName,
      deliveryDate,
      deliveryAddress,
    });
    window.open(createWhatsAppUrl(message), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md shadow-md text-slate-600 hover:text-slate-900 flex items-center justify-center hover:bg-white transition-all cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Product Showcase Photo & Highlights */}
        <div className="w-full md:w-5/12 bg-rose-50/50 flex flex-col justify-between p-6 border-b md:border-b-0 md:border-r border-rose-100 relative">
          <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl overflow-hidden shadow-md">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <button
              onClick={() => onToggleWishlist(product.id)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 shadow-md flex items-center justify-center text-slate-700 hover:text-rose-600 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`}
              />
            </button>
          </div>

          <div className="mt-4 space-y-2 text-left">
            <div className="flex items-center gap-2 text-xs text-rose-800 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quevo Signature Florist Craftsmanship</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
              {product.name}
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              {product.description}
            </p>

            <div className="pt-2 border-t border-rose-100 flex items-center justify-between text-xs text-slate-500">
              <span>{product.leadTime}</span>
              <span>·</span>
              <span className="text-emerald-700 font-medium">Free Kigali Greeting Card</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customization Wizard & Actions */}
        <div className="w-full md:w-7/12 flex flex-col justify-between p-6 overflow-y-auto max-h-[85vh] text-left">
          
          {/* Step / Customizer Tabs */}
          <div className="space-y-6">
            <div className="flex items-center gap-1 p-1 bg-rose-50/80 rounded-xl border border-rose-100">
              <button
                onClick={() => setActiveTab('options')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'options'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Size &amp; Colors
              </button>
              <button
                onClick={() => setActiveTab('card')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'card'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Love Card Note
              </button>
              <button
                onClick={() => setActiveTab('delivery')}
                className={`flex-1 py-1.5 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  activeTab === 'delivery'
                    ? 'bg-white text-rose-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Delivery Date
              </button>
            </div>

            {/* TAB 1: Size & Flower Colors & Addons */}
            {activeTab === 'options' && (
              <div className="space-y-6 animate-in fade-in duration-150">
                
                {/* Size Selection */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Select Bouquet Size:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {(Object.keys(SIZE_PRICE_MAP) as BouquetSize[]).map((size) => {
                      const isSelected = selectedSize === size;
                      const sizeInfo = SIZE_PRICE_MAP[size];
                      const priceForSize = Math.round(product.price * sizeInfo.multiplier);
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-rose-900 bg-rose-50/60 ring-2 ring-rose-900/10'
                              : 'border-slate-200 hover:border-rose-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-xs text-slate-900">{size}</span>
                              <span className="text-xs font-bold text-rose-900 tabular-nums">
                                ${priceForSize}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                              {sizeInfo.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Flower Color Choice */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Flower &amp; Rose Palette:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {COLOR_OPTIONS.map((col) => {
                      const isSelected = selectedColor === col.name;
                      return (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`p-2.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'border-rose-800 bg-rose-50/50 ring-1 ring-rose-800'
                              : 'border-slate-200 hover:border-rose-200'
                          }`}
                        >
                          <span
                            className="w-5 h-5 rounded-full shrink-0 border border-slate-300 shadow-2xs"
                            style={{ backgroundColor: col.hex }}
                          />
                          <div>
                            <p className="text-xs font-semibold text-slate-900">{col.name}</p>
                            <p className="text-[10px] text-slate-500">{col.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Luxury Add-Ons */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Add Sweet Touches:
                    </label>
                    <span className="text-[11px] text-rose-700 font-medium">Optional treats</span>
                  </div>
                  <div className="space-y-2">
                    {ADD_ONS.map((addOn) => {
                      const isChecked = selectedAddOns.includes(addOn.id);
                      return (
                        <button
                          key={addOn.id}
                          onClick={() => toggleAddOn(addOn.id)}
                          className={`w-full p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer text-left ${
                            isChecked
                              ? 'border-rose-700 bg-rose-50/60'
                              : 'border-slate-200 hover:border-rose-200'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked
                                  ? 'bg-rose-800 border-rose-800 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-3" />}
                            </div>
                            <div>
                              <p className="text-xs font-medium text-slate-900">{addOn.name}</p>
                              <p className="text-[10px] text-slate-500">{addOn.description}</p>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-rose-900 tabular-nums">
                            +${addOn.price}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Love Card & Personalized Message */}
            {activeTab === 'card' && (
              <div className="space-y-5 animate-in fade-in duration-150">
                <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100">
                  <h4 className="font-serif text-sm font-bold text-rose-950 mb-1">
                    Free Complimentary Handwritten Card
                  </h4>
                  <p className="text-xs text-slate-600">
                    Our calligrapher will hand-write your message onto embossed cotton stationery and seal it with gold wax.
                  </p>
                </div>

                {/* Occasion Preset */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5">
                    Select Occasion:
                  </label>
                  <select
                    value={cardOccasion}
                    onChange={(e) => setCardOccasion(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white p-2.5 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-rose-500"
                  >
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Card Message */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Your Heartfelt Message:
                    </label>
                    <span className="text-[10px] text-slate-400">{cardMessage.length}/250 chars</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={250}
                    value={cardMessage}
                    onChange={(e) => setCardMessage(e.target.value)}
                    placeholder="Write what words can't say..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-rose-500 focus:ring-1 focus:ring-rose-200 resize-none font-sans"
                  />
                </div>

                {/* Sender & Recipient names */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Recipient Name:
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Vanessa M."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Name (Sender):
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. David / Secret Admirer"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: Delivery Details */}
            {activeTab === 'delivery' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Delivery Date:
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                      Preferred Time Slot:
                    </label>
                    <select
                      value={deliveryTimeSlot}
                      onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500 bg-white"
                    >
                      <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="Evening Surprise (6:00 PM - 8:30 PM)">Evening Surprise (6:00 PM - 8:30 PM)</option>
                      <option value="Specific Hour (Coordinate on WhatsApp)">Specific Hour (Coordinate on WhatsApp)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Delivery Address / Kigali Landmark:
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="e.g. KG 9 Ave, Nyarutarama / Near Kigali Heights"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1">
                    Special Instructions (Optional):
                  </label>
                  <input
                    type="text"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g. Keep as a surprise! Call when outside gate."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Fixed Action Bar */}
          <div className="pt-6 mt-6 border-t border-rose-100 space-y-3">
            {/* Live price summary */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500">Configured Total:</span>
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-rose-950 tabular-nums">
                    ${unitPrice}
                  </span>
                  <span className="text-xs text-rose-700">
                    ({selectedSize} · {selectedColor})
                  </span>
                </div>
              </div>

              {addedNotice && (
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <Check className="w-4 h-4" />
                  <span>Added to your bag!</span>
                </div>
              )}
            </div>

            {/* Buttons: Add to Cart and Direct WhatsApp Order */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-rose-900 to-pink-800 hover:from-rose-950 hover:to-pink-900 text-white text-xs font-semibold py-3 px-4 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Shopping Bag</span>
              </button>

              <button
                onClick={handleWhatsAppOrder}
                className="flex items-center justify-center gap-2 border border-emerald-600/30 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-semibold py-3 px-4 rounded-xl shadow-xs transition-all active:scale-98 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Order via WhatsApp (+250)</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
