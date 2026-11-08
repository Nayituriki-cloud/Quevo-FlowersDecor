export type CategoryId =
  | 'all'
  | 'fresh-bouquets'
  | 'romantic-roses'
  | 'wedding-flowers'
  | 'birthday-flowers'
  | 'anniversary-flowers'
  | 'flower-arrangements'
  | 'corporate-decor'
  | 'special-gifts';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
}

export type BouquetSize = 'Classic' | 'Deluxe' | 'Luxury Grand';

export type FlowerColor =
  | 'Crimson Red'
  | 'Blush Pink'
  | 'Pure Ivory White'
  | 'Sunset Peach'
  | 'Deep Burgundy';

export interface AddOn {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export interface Product {
  id: string;
  name: string;
  categoryId: CategoryId;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  description: string;
  flowerTypes: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  image: string;
  leadTime: string;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  size: BouquetSize;
  color: FlowerColor;
  cardOccasion: string;
  cardMessage: string;
  senderName: string;
  recipientName: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  deliveryAddress: string;
  specialInstructions?: string;
  selectedAddOns: string[];
  unitPrice: number;
  quantity: number;
}

export type OrderStatus =
  | 'placed'
  | 'crafting'
  | 'fragrance_check'
  | 'out_for_delivery'
  | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientPhone: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  specialInstructions?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'momo' | 'airtel' | 'card' | 'cod';
  status: OrderStatus;
  statusUpdatedAt: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  bouquetName: string;
  verified: boolean;
}
