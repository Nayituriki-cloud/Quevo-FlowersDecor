/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { MessageCircle, Sparkles, Filter, Heart, ArrowUp } from 'lucide-react';

import {
  INITIAL_PRODUCTS,
  INITIAL_REVIEWS,
  INITIAL_ORDERS,
  DISPLAY_PHONE,
} from './data/mockData';
import {
  Product,
  CartItem,
  Order,
  CustomerReview,
  CategoryId,
} from './types';
import { createWhatsAppUrl } from './utils/whatsapp';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { WeddingEventsSection } from './components/WeddingEventsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AdminModal } from './components/AdminModal';
import { Footer } from './components/Footer';

export default function App() {
  // Persistence states
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('quevo_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('quevo_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [reviews, setReviews] = useState<CustomerReview[]>(() => {
    try {
      const saved = localStorage.getItem('quevo_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('quevo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('quevo_wishlist');
      return saved ? JSON.parse(saved) : ['qv-101'];
    } catch {
      return ['qv-101'];
    }
  });

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');

  // Modals & Drawers
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Coupon state
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  // Scroll to top button
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('quevo_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('quevo_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('quevo_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('quevo_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('quevo_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Window scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.categoryId === activeCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q) ||
          p.flowerTypes.some((f) => f.toLowerCase().includes(q))
      );
    }

    // Sort order
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  // Handlers
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleAddToCart = (newItem: Omit<CartItem, 'id'>) => {
    const itemWithId: CartItem = {
      ...newItem,
      id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    };
    setCart((prev) => [itemWithId, ...prev]);
  };

  const handleUpdateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleApplyCoupon = (code: string) => {
    const subtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
    if (code === 'QUEVOLOVE10') {
      const val = Math.round(subtotal * 0.1);
      setCouponCode(code);
      setDiscount(val);
      return { success: true, message: `Promo code applied! 10% ($${val}) deducted.` };
    }
    if (code === 'FIRSTBOUQUET') {
      const val = Math.min(15, subtotal);
      setCouponCode(code);
      setDiscount(val);
      return { success: true, message: `Welcome gift applied! $${val} deducted.` };
    }
    return { success: false, message: 'Invalid promo code. Try "QUEVOLOVE10".' };
  };

  const handleOrderCreated = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Clear cart
    setCart([]);
    setDiscount(0);
    setCouponCode('');
  };

  const handleAddReview = (newRev: Omit<CustomerReview, 'id' | 'date' | 'verified'>) => {
    const created: CustomerReview = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      verified: true,
    };
    setReviews((prev) => [created, ...prev]);
  };

  const cartSubtotal = cart.reduce((s, i) => s + i.unitPrice * i.quantity, 0);
  const deliveryFee = cartSubtotal >= 80 || cartSubtotal === 0 ? 0 : 5;
  const cartTotal = Math.max(0, cartSubtotal - discount + deliveryFee);

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDFB] text-slate-800 selection:bg-rose-200 selection:text-rose-900">
      
      {/* Top Header Navigation */}
      <Navbar
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenTracker={() => setIsTrackerOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onSelectCategory={(id) => setActiveCategory(id as CategoryId)}
        activeCategory={activeCategory}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onShopClick={() => {
            const el = document.getElementById('shop-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onSelectCategory={(id) => {
            setActiveCategory(id as CategoryId);
            const el = document.getElementById('shop-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Boutique Catalog Section */}
        <section id="shop-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="font-script text-2xl text-rose-800 block mb-1">
              Curated with Love
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Boutique Flower Collections
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Freshly sourced morning blooms, velvet Ecuadorian roses, and bespoke arrangements handcrafted for every occasion.
            </p>
          </div>

          {/* Category Filter & Search Bar */}
          <CategoryNav
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          {/* Product Grid */}
          <div className="mt-8">
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center text-slate-500 bg-white rounded-3xl border border-rose-100 p-8 shadow-xs">
                <Sparkles className="w-10 h-10 text-rose-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-slate-900">
                  No flower arrangements matched &ldquo;{searchQuery}&rdquo;
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Try searching for roses, peonies, or clear the search filter.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="bg-rose-900 text-white text-xs font-semibold px-5 py-2 rounded-xl"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    onOpenCustomize={(p) => setSelectedProductForModal(p)}
                  />
                ))}
              </div>
            )}
          </div>

        </section>

        {/* Wedding & Corporate Decor Services */}
        <WeddingEventsSection />

        {/* Customer Reviews & Testimonials */}
        <ReviewsSection reviews={reviews} onAddReview={handleAddReview} />

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(id) => {
          setActiveCategory(id as CategoryId);
          const el = document.getElementById('shop-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenTracker={() => setIsTrackerOpen(true)}
      />

      {/* Floating Instant WhatsApp Order Bubble */}
      <aside aria-label="WhatsApp quick order" className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
        <span className="hidden sm:inline-block bg-slate-900 text-white text-xs font-medium py-1.5 px-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Order on WhatsApp (+250)
        </span>
        <a
          href={createWhatsAppUrl(
            `Hello Quevo Flowers & Decor! I would like to order fresh flowers in Kigali.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-emerald-100"
          title={`WhatsApp: ${DISPLAY_PHONE}`}
          aria-label="Direct WhatsApp Ordering"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </aside>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs border border-rose-200 text-rose-900 shadow-md flex items-center justify-center hover:bg-rose-50 transition-all cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Modals & Slide-over Drawers */}
      {selectedProductForModal && (
        <ProductModal
          product={selectedProductForModal}
          onClose={() => setSelectedProductForModal(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.includes(selectedProductForModal.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        discount={discount}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={cartSubtotal}
        discount={discount}
        deliveryFee={deliveryFee}
        total={cartTotal}
        onOrderCreated={handleOrderCreated}
      />

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orders={orders}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProductIds={wishlist}
        allProducts={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onOpenProduct={(p) => setSelectedProductForModal(p)}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        onUpdateProducts={setProducts}
        onUpdateOrders={setOrders}
      />

    </div>
  );
}
