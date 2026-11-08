import React, { useState } from 'react';
import { X, Search, CheckCircle2, Circle, Clock, Truck, Sparkles, Heart, MessageCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const STATUS_STEPS: { key: OrderStatus; label: string; desc: string; icon: React.ElementType }[] = [
  {
    key: 'placed',
    label: 'Order Placed',
    desc: 'Order received & bloom inventory reserved',
    icon: Clock,
  },
  {
    key: 'crafting',
    label: 'Floral Hand-Tying',
    desc: 'Master florist custom trims & arranges stems',
    icon: Sparkles,
  },
  {
    key: 'fragrance_check',
    label: 'Quality & Fragrance Check',
    desc: 'Hydration wrap & handwritten wax-sealed love card added',
    icon: Heart,
  },
  {
    key: 'out_for_delivery',
    label: 'Out for Express Delivery',
    desc: 'Driver en route with temperature-controlled flowers',
    icon: Truck,
  },
  {
    key: 'delivered',
    label: 'Delivered with Love',
    desc: 'Handed directly to recipient with photo confirmation',
    icon: CheckCircle2,
  },
];

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
  orders,
}) => {
  const [searchNumber, setSearchNumber] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(orders[0] || null);
  const [lookupError, setLookupError] = useState(false);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchNumber.trim().toUpperCase();
    const found = orders.find(
      (o) => o.orderNumber.toUpperCase() === query || o.orderNumber.includes(query)
    );
    if (found) {
      setSelectedOrder(found);
      setLookupError(false);
    } else {
      setLookupError(true);
    }
  };

  const currentStepIndex = selectedOrder
    ? STATUS_STEPS.findIndex((s) => s.key === selectedOrder.status)
    : -1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 my-auto text-left">
        
        {/* Header */}
        <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-50/50">
          <div>
            <h3 className="font-serif text-xl font-bold text-slate-900">
              Live Order Tracker
            </h3>
            <p className="text-xs text-rose-800">
              Real-time floral crafting &amp; Kigali dispatch monitoring.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
          
          {/* Lookup Input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchNumber}
                onChange={(e) => setSearchNumber(e.target.value)}
                placeholder="Enter Order # (e.g. QV-2026-891)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-hidden focus:border-rose-500 uppercase placeholder-slate-400"
              />
            </div>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-5 py-2.5 rounded-xl cursor-pointer transition-colors"
            >
              Track
            </button>
          </form>

          {lookupError && (
            <p className="text-xs text-rose-600 font-medium bg-rose-50 p-3 rounded-xl border border-rose-100">
              Order not found. Please try order number <strong className="font-mono">QV-2026-891</strong> or contact our studio on WhatsApp.
            </p>
          )}

          {/* Active Order Details */}
          {selectedOrder ? (
            <div className="space-y-6">
              
              {/* Status Header Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-900 to-pink-800 text-white shadow-md flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-widest uppercase font-semibold text-rose-200">
                    Order Status
                  </span>
                  <h4 className="font-serif text-lg font-bold">
                    #{selectedOrder.orderNumber}
                  </h4>
                  <p className="text-xs text-rose-100 mt-0.5">
                    {selectedOrder.statusUpdatedAt || 'In progress'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-rose-200 block">Recipient</span>
                  <span className="text-xs font-semibold">{selectedOrder.recipientName}</span>
                </div>
              </div>

              {/* Visual 5-Stage Stepper */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-100">
                {STATUS_STEPS.map((step, idx) => {
                  const isCompleted = idx <= currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const Icon = step.icon;

                  return (
                    <div key={step.key} className="relative flex items-start gap-4 text-left">
                      <div
                        className={`absolute -left-6 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-all ${
                          isCompleted
                            ? 'border-rose-800 bg-rose-800 text-white shadow-xs'
                            : 'border-slate-300 bg-white text-slate-300'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-4 h-4" />
                        ) : (
                          <Circle className="w-3.5 h-3.5" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h5
                            className={`text-xs font-bold ${
                              isCompleted ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            {step.label}
                          </h5>
                          {isCurrent && (
                            <span className="bg-rose-100 text-rose-900 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                              Active Stage
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Item preview */}
              <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
                <h5 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Arrangement Details:
                </h5>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 rounded-lg object-cover bg-white shrink-0 border border-rose-100"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-900">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {item.size} · {item.color} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold text-slate-800 tabular-nums">
                      ${item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-rose-200/60 flex justify-between text-xs">
                  <span className="text-slate-600">Destination:</span>
                  <span className="font-semibold text-slate-900">{selectedOrder.deliveryAddress}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <a
                  href={createWhatsAppUrl(
                    `Hello Quevo Flowers! I am inquiring about order #${selectedOrder.orderNumber}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-3 px-4 rounded-xl transition-colors shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat with Courier / Florist</span>
                </a>
              </div>

            </div>
          ) : (
            <div className="text-center py-8 text-slate-400 text-xs">
              No orders to display. Please search with an order number.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
