import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, CheckCircle2, MessageCircle, DollarSign, Package, TrendingUp, Sparkles } from 'lucide-react';
import { Product, Order, OrderStatus, CategoryId } from '../types';
import { CATEGORIES } from '../data/mockData';
import { createWhatsAppUrl } from '../utils/whatsapp';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  onUpdateProducts: (products: Product[]) => void;
  onUpdateOrders: (orders: Order[]) => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  onUpdateProducts,
  onUpdateOrders,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'stats'>('orders');
  
  // New product form state
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<CategoryId>('romantic-roses');
  const [newProductPrice, setNewProductPrice] = useState(70);
  const [newProductDesc, setNewProductDesc] = useState('');
  const [newProductFlowers, setNewProductFlowers] = useState('Pink Garden Roses, Baby Breath');
  const [newProductImage, setNewProductImage] = useState('/src/assets/images/hero_rose_bouquet_1794088352763.jpg');

  if (!isOpen) return null;

  // Stats calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updated = orders.map((o) => {
      if (o.id === orderId) {
        return {
          ...o,
          status: newStatus,
          statusUpdatedAt: `Updated to ${newStatus.replace('_', ' ')} just now`,
        };
      }
      return o;
    });
    onUpdateOrders(updated);
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName.trim()) return;

    const catObj = CATEGORIES.find((c) => c.id === newProductCategory);
    const newProd: Product = {
      id: `qv-${Date.now()}`,
      name: newProductName.trim(),
      categoryId: newProductCategory,
      categoryLabel: catObj ? catObj.name : 'Flower Bouquets',
      price: Number(newProductPrice),
      originalPrice: Number(newProductPrice) + 15,
      rating: 5.0,
      reviewsCount: 1,
      description: newProductDesc.trim() || 'Exquisite hand-tied seasonal floral arrangement by Quevo.',
      flowerTypes: newProductFlowers.split(',').map((s) => s.trim()).filter(Boolean),
      inStock: true,
      image: newProductImage,
      leadTime: 'Same-day available',
    };

    onUpdateProducts([newProd, ...products]);
    setShowAddProduct(false);
    setNewProductName('');
    setNewProductDesc('');
  };

  const handleDeleteProduct = (productId: string) => {
    if (confirm('Are you sure you want to remove this flower arrangement from the boutique?')) {
      onUpdateProducts(products.filter((p) => p.id !== productId));
    }
  };

  const handleToggleProductStock = (productId: string) => {
    onUpdateProducts(
      products.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 my-auto text-left flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-rose-100 flex items-center justify-between bg-rose-950 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-rose-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                Studio Management
              </span>
              <h3 className="font-serif text-xl font-bold">Quevo Admin Console</h3>
            </div>
            <p className="text-xs text-rose-200 mt-0.5">
              Manage incoming customer flower orders, catalog pricing, and boutique inventory.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-rose-300 hover:text-white rounded-full hover:bg-rose-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-6 py-2 gap-4">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Manage Products ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`py-2 px-3 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'stats'
                ? 'bg-white text-rose-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Store Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Recent Customer Orders</h4>
                <span className="text-xs text-slate-500">Live order queue</span>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs">
                  No orders recorded yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl border border-rose-100 bg-[#FFFDFB] shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-100">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-sm text-rose-950">
                            #{order.orderNumber}
                          </span>
                          <span className="text-xs text-slate-400">· {order.createdAt}</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 mt-0.5">
                          Sender: {order.customerName} ({order.customerPhone})
                        </p>
                      </div>

                      {/* Status select dropdown */}
                      <div className="flex items-center gap-2">
                        <label className="text-xs font-semibold text-slate-500">Status:</label>
                        <select
                          value={order.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(order.id, e.target.value as OrderStatus)
                          }
                          className="text-xs font-semibold rounded-lg border border-rose-200 bg-white px-2.5 py-1.5 text-rose-900 focus:outline-hidden"
                        >
                          <option value="placed">Placed</option>
                          <option value="crafting">Florist Crafting</option>
                          <option value="fragrance_check">Fragrance Check</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </div>
                    </div>

                    {/* Recipient & items summary */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="bg-rose-50/40 p-3 rounded-xl border border-rose-100">
                        <span className="font-bold text-slate-800 block mb-1">
                          Delivery Instructions:
                        </span>
                        <p className="text-slate-600">
                          <strong>Recipient:</strong> {order.recipientName} ({order.recipientPhone})
                        </p>
                        <p className="text-slate-600 mt-0.5">
                          <strong>Location:</strong> {order.deliveryAddress}
                        </p>
                        <p className="text-slate-600 mt-0.5">
                          <strong>Date:</strong> {order.deliveryDate} ({order.deliveryTimeSlot})
                        </p>
                        {order.specialInstructions && (
                          <p className="text-rose-900 font-medium mt-1">
                            Note: &ldquo;{order.specialInstructions}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                        <span className="font-bold text-slate-800 block mb-1">Ordered Bouquets:</span>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="mb-1 text-slate-600">
                            • {item.product.name} ({item.size}, {item.color}) x {item.quantity}
                            {item.cardMessage && (
                              <span className="block text-[11px] italic text-rose-900 pl-2">
                                Card: &ldquo;{item.cardMessage}&rdquo;
                              </span>
                            )}
                          </div>
                        ))}
                        <div className="pt-2 mt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900">
                          <span>Total: ${order.total}</span>
                          <span className="uppercase text-rose-900">{order.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp action */}
                    <div className="flex justify-end gap-2 pt-1">
                      <a
                        href={createWhatsAppUrl(
                          `Hello ${order.customerName}! Quevo Flowers here regarding your order #${order.orderNumber}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 transition-colors"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        <span>WhatsApp Customer</span>
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-800">Boutique Inventory</h4>
                <button
                  onClick={() => setShowAddProduct(!showAddProduct)}
                  className="flex items-center gap-1.5 bg-rose-900 hover:bg-rose-800 text-white text-xs font-bold py-2 px-3.5 rounded-xl transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New Bouquet</span>
                </button>
              </div>

              {/* Add Product Form */}
              {showAddProduct && (
                <form
                  onSubmit={handleAddProduct}
                  className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-4"
                >
                  <h5 className="font-serif font-bold text-slate-900 text-sm">
                    Create New Floral Product
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Bouquet Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                        placeholder="e.g. Kigali Sunset Gardenia Bouquet"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Category
                      </label>
                      <select
                        value={newProductCategory}
                        onChange={(e) => setNewProductCategory(e.target.value as CategoryId)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      >
                        {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Price (USD $)
                      </label>
                      <input
                        type="number"
                        min={10}
                        value={newProductPrice}
                        onChange={(e) => setNewProductPrice(Number(e.target.value))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Stems &amp; Flower Types
                      </label>
                      <input
                        type="text"
                        value={newProductFlowers}
                        onChange={(e) => setNewProductFlowers(e.target.value)}
                        placeholder="e.g. Garden Roses, Eucalyptus"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Image Preset
                      </label>
                      <select
                        value={newProductImage}
                        onChange={(e) => setNewProductImage(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      >
                        <option value="/src/assets/images/hero_rose_bouquet_1794088352763.jpg">
                          Rose Bouquet (Hand-tied)
                        </option>
                        <option value="/src/assets/images/romantic_roses_grand_1794088353119.jpg">
                          100 Roses Luxury Box
                        </option>
                        <option value="/src/assets/images/wedding_floral_arch_1794088353667.jpg">
                          Wedding Centerpiece
                        </option>
                        <option value="/src/assets/images/fresh_spring_arrangement_1794088354105.jpg">
                          Pastel Ceramic Vase
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={newProductDesc}
                      onChange={(e) => setNewProductDesc(e.target.value)}
                      placeholder="Poetic romantic description..."
                      className="w-full p-2.5 rounded-xl border border-slate-200 text-xs bg-white resize-none"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowAddProduct(false)}
                      className="px-4 py-2 text-xs text-slate-600 hover:text-slate-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-rose-900 hover:bg-rose-800 text-white font-bold text-xs px-5 py-2 rounded-xl transition-colors cursor-pointer"
                    >
                      Save Product
                    </button>
                  </div>
                </form>
              )}

              {/* Product rows */}
              <div className="space-y-2">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between gap-3 text-xs shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 rounded-lg object-cover bg-rose-50 shrink-0"
                      />
                      <div>
                        <h5 className="font-bold text-slate-900">{prod.name}</h5>
                        <p className="text-[11px] text-slate-400">
                          {prod.categoryLabel} · <span className="font-bold text-rose-900">${prod.price}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleProductStock(prod.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-bold cursor-pointer transition-colors ${
                          prod.inStock
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>

                      <button
                        onClick={() => handleDeleteProduct(prod.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                        title="Delete product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ANALYTICS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-100">
                  <div className="flex items-center justify-between text-rose-800 mb-2">
                    <span className="text-xs font-bold uppercase">Total Studio Revenue</span>
                    <DollarSign className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-rose-950 tabular-nums">
                    ${totalRevenue}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">From confirmed orders</span>
                </div>

                <div className="p-5 rounded-2xl bg-pink-50/60 border border-pink-100">
                  <div className="flex items-center justify-between text-pink-800 mb-2">
                    <span className="text-xs font-bold uppercase">Total Orders</span>
                    <Package className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-3xl font-bold text-slate-900 tabular-nums">
                    {totalOrders}
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Kigali delivery &amp; pickup</span>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                  <div className="flex items-center justify-between text-emerald-800 mb-2">
                    <span className="text-xs font-bold uppercase">Top Selling Variety</span>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="font-serif text-lg font-bold text-emerald-950">
                    Royal Passion 100 Roses
                  </div>
                  <span className="text-[11px] text-slate-500 mt-1 block">Best-performing romance box</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                <h5 className="font-bold text-slate-800 mb-1">WhatsApp Fast Response Target</h5>
                <p>
                  All WhatsApp inquiries are linked directly to <strong className="text-rose-900">+250 787 797 605</strong>.
                  Average response time is maintained under 5 minutes for immediate customer reassurance.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
