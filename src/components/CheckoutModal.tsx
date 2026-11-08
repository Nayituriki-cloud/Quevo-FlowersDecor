import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Smartphone, Banknote, ArrowRight, Truck, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, Order } from '../types';
import { createWhatsAppUrl, generateCartWhatsAppMessage } from '../utils/whatsapp';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  onOrderCreated: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  deliveryFee,
  total,
  onOrderCreated,
}) => {
  // Form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientName, setRecipientName] = useState(items[0]?.recipientName || '');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState(items[0]?.deliveryAddress || '');
  const [deliveryDate, setDeliveryDate] = useState(
    items[0]?.deliveryDate || new Date().toISOString().split('T')[0]
  );
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState(
    items[0]?.deliveryTimeSlot || 'Afternoon (1:00 PM - 5:00 PM)'
  );
  const [specialInstructions, setSpecialInstructions] = useState(
    items[0]?.specialInstructions || ''
  );
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | 'card' | 'cod'>('momo');

  // Completed order state
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !deliveryAddress) {
      alert('Please fill in your name, contact phone, and delivery location.');
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderNumber = `QV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newOrder: Order = {
        id: `ord-${Date.now()}`,
        orderNumber,
        createdAt: 'Just now',
        customerName,
        customerPhone,
        recipientName: recipientName || customerName,
        recipientPhone: recipientPhone || customerPhone,
        deliveryAddress,
        deliveryDate,
        deliveryTimeSlot,
        specialInstructions,
        items,
        subtotal,
        discount,
        deliveryFee,
        total,
        paymentMethod,
        status: 'placed',
        statusUpdatedAt: 'Order received by Quevo Floral Studio',
      };

      onOrderCreated(newOrder);
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);

      // Trigger celebratory romantic confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#be123c', '#f43f5e', '#fb7185', '#fda4af', '#fef08a'],
        });
      } catch {
        // Safe fallback
      }
    }, 600);
  };

  const handleWhatsAppNotify = () => {
    if (!confirmedOrder) return;
    const msg = generateCartWhatsAppMessage({
      items: confirmedOrder.items,
      subtotal: confirmedOrder.subtotal,
      discount: confirmedOrder.discount,
      deliveryFee: confirmedOrder.deliveryFee,
      total: confirmedOrder.total,
      customerName: confirmedOrder.customerName,
      customerPhone: confirmedOrder.customerPhone,
      recipientName: confirmedOrder.recipientName,
      deliveryAddress: confirmedOrder.deliveryAddress,
      deliveryDate: confirmedOrder.deliveryDate,
      deliveryTimeSlot: confirmedOrder.deliveryTimeSlot,
      paymentMethod: confirmedOrder.paymentMethod,
      specialInstructions: confirmedOrder.specialInstructions,
    });
    window.open(createWhatsAppUrl(`🎉 *CONFIRMED ORDER #${confirmedOrder.orderNumber}*\n\n${msg}`), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 my-auto text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              {confirmedOrder ? 'Order Confirmed!' : 'Complete Your Order'}
            </h3>
            <p className="text-xs text-rose-800">
              {confirmedOrder
                ? 'Your flowers are being prepared with love and care.'
                : 'Direct hand delivery anywhere across Kigali & environs.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[80vh] overflow-y-auto">
          {confirmedOrder ? (
            /* Order Confirmation View */
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-semibold text-rose-800 tracking-wider uppercase">
                  Order Successfully Placed
                </span>
                <h4 className="font-serif text-2xl font-bold text-slate-900 mt-1">
                  Order #{confirmedOrder.orderNumber}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you, {confirmedOrder.customerName}! Our master florists are arranging your fresh stems now.
                </p>
              </div>

              {/* Order summary card */}
              <div className="bg-rose-50/50 rounded-2xl p-4 text-left border border-rose-100 space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-rose-100">
                  <span className="text-slate-500">Scheduled Delivery:</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedOrder.deliveryDate} · {confirmedOrder.deliveryTimeSlot}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-rose-100">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-900 line-clamp-1">
                    {confirmedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-rose-100">
                  <span className="text-slate-500">Recipient:</span>
                  <span className="font-semibold text-slate-900">
                    {confirmedOrder.recipientName} ({confirmedOrder.recipientPhone || 'Same as sender'})
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 text-sm pt-1">
                  <span>Total Paid / Due:</span>
                  <span className="font-serif text-rose-950 tabular-nums">
                    ${confirmedOrder.total} ({confirmedOrder.paymentMethod.toUpperCase()})
                  </span>
                </div>
              </div>

              {/* WhatsApp notification action */}
              <div className="space-y-2">
                <button
                  onClick={handleWhatsAppNotify}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Notify Florist on WhatsApp (+250 787 797 605)</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Back to Boutique
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              
              {/* Customer Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <span>1. Your Contact Information (Sender)</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Jean Mugabo"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Your Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="+250 78... or International"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient & Delivery Info */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
                  <span>2. Recipient &amp; Delivery Destination</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Angelique K."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Recipient Phone (For Delivery Driver)
                    </label>
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      placeholder="+250 78... (Optional for surprise)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Kigali Delivery Address / Street / Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="e.g. KG 9 Ave, Nyarutarama (Opposite MTN Center)"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Delivery Time Slot
                      </label>
                      <select
                        value={deliveryTimeSlot}
                        onChange={(e) => setDeliveryTimeSlot(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500 bg-white"
                      >
                        <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (1:00 PM - 5:00 PM)">Afternoon (1:00 PM - 5:00 PM)</option>
                        <option value="Evening Surprise (6:00 PM - 8:30 PM)">Evening Surprise (6:00 PM - 8:30 PM)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Special Delivery Instructions (Surprise, gate instructions, etc.)
                    </label>
                    <input
                      type="text"
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Surprise delivery! Please call sender when at gate."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  3. Select Preferred Payment Method
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('momo')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'momo'
                        ? 'border-rose-800 bg-rose-50/60 ring-2 ring-rose-800/10'
                        : 'border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900">MTN MoMo</span>
                    <span className="text-[10px] text-slate-500">*182# Prompt</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('airtel')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'airtel'
                        ? 'border-rose-800 bg-rose-50/60 ring-2 ring-rose-800/10'
                        : 'border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-red-600" />
                    <span className="text-xs font-bold text-slate-900">Airtel Money</span>
                    <span className="text-[10px] text-slate-500">Rwanda Pay</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'border-rose-800 bg-rose-50/60 ring-2 ring-rose-800/10'
                        : 'border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900">Credit / Debit</span>
                    <span className="text-[10px] text-slate-500">Visa / Mastercard</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                      paymentMethod === 'cod'
                        ? 'border-rose-800 bg-rose-50/60 ring-2 ring-rose-800/10'
                        : 'border-slate-200 hover:border-rose-200'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Pay on Delivery</span>
                    <span className="text-[10px] text-slate-500">Cash / Mobile POS</span>
                  </button>
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-500">Total Due:</span>
                  <div className="font-serif text-2xl font-bold text-rose-950 tabular-nums">
                    ${total}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-gradient-to-r from-rose-900 to-pink-800 hover:from-rose-950 hover:to-pink-900 text-white font-bold py-3.5 px-8 rounded-xl shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming with Studio...' : 'Confirm & Place Flower Order'}
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
