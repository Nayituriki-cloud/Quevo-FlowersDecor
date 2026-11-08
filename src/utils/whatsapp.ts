import { PHONE_NUMBER } from '../data/mockData';
import { CartItem, Product } from '../types';

export function createWhatsAppUrl(message: string): string {
  const cleanPhone = PHONE_NUMBER.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message.trim())}`;
}

export function generateProductWhatsAppMessage(
  product: Product,
  customization: {
    size: string;
    color: string;
    cardMessage?: string;
    recipientName?: string;
    senderName?: string;
    deliveryDate?: string;
    deliveryAddress?: string;
  }
): string {
  let msg = `🌹 *QUEVO FLOWERS & DECOR ORDER INQUIRY*\n`;
  msg += `Hello Quevo team! I would like to order this bouquet:\n\n`;
  msg += `💐 *Product:* ${product.name}\n`;
  msg += `📏 *Size:* ${customization.size}\n`;
  msg += `🎨 *Rose/Flower Color:* ${customization.color}\n`;
  msg += `💵 *Price:* $${product.price}\n\n`;

  if (customization.recipientName) {
    msg += `👤 *Recipient:* ${customization.recipientName}\n`;
  }
  if (customization.deliveryDate) {
    msg += `📅 *Preferred Delivery Date:* ${customization.deliveryDate}\n`;
  }
  if (customization.deliveryAddress) {
    msg += `📍 *Delivery Location:* ${customization.deliveryAddress}\n`;
  }
  if (customization.cardMessage) {
    msg += `💌 *Personal Card Note:*\n"${customization.cardMessage}"\n`;
  }
  if (customization.senderName) {
    msg += `✍️ *From:* ${customization.senderName}\n`;
  }

  msg += `\nPlease confirm availability and delivery slot for Kigali. Thank you! ♡`;
  return msg;
}

export function generateCartWhatsAppMessage(params: {
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  customerName: string;
  customerPhone: string;
  recipientName: string;
  deliveryAddress: string;
  deliveryDate: string;
  deliveryTimeSlot: string;
  paymentMethod: string;
  specialInstructions?: string;
}): string {
  let msg = `🌹 *NEW FLOWER ORDER - QUEVO FLOWERS & DECOR*\n\n`;
  msg += `Hello! I would like to confirm my flower order:\n\n`;
  msg += `📋 *ORDER ITEMS:*\n`;

  params.items.forEach((item, index) => {
    msg += `${index + 1}. *${item.product.name}* (Qty: ${item.quantity})\n`;
    msg += `   • Size: ${item.size} | Color: ${item.color}\n`;
    msg += `   • Unit: $${item.unitPrice}\n`;
    if (item.cardMessage) {
      msg += `   • Card Note: "${item.cardMessage}"\n`;
    }
  });

  msg += `\n💵 *FINANCIAL SUMMARY:*\n`;
  msg += `• Subtotal: $${params.subtotal}\n`;
  if (params.discount > 0) {
    msg += `• Promo Discount: -$${params.discount}\n`;
  }
  msg += `• Delivery: ${params.deliveryFee === 0 ? 'FREE Kigali Delivery' : `$${params.deliveryFee}`}\n`;
  msg += `• *Total: $${params.total}*\n`;
  msg += `• Payment Mode: ${params.paymentMethod.toUpperCase()}\n\n`;

  msg += `📍 *DELIVERY DETAILS:*\n`;
  msg += `• Customer: ${params.customerName} (${params.customerPhone})\n`;
  msg += `• Recipient: ${params.recipientName}\n`;
  msg += `• Date & Time: ${params.deliveryDate} (${params.deliveryTimeSlot})\n`;
  msg += `• Address: ${params.deliveryAddress}\n`;

  if (params.specialInstructions) {
    msg += `• Notes: ${params.specialInstructions}\n`;
  }

  msg += `\nPlease send me the confirmation and payment prompt. Thank you! 🌷`;
  return msg;
}

export function generateWeddingConsultationWhatsAppMessage(): string {
  return `💐 *WEDDING & EVENT FLORAL CONSULTATION - QUEVO*\n\nHello Quevo Flowers & Decor team!\nI am planning a wedding / special event and would love to consult with your floral designers for wedding arches, bridal bouquets, and luxury venue styling.\n\nPlease share your event consultation availability and bridal catalog. Thank you! 💍🌹`;
}
