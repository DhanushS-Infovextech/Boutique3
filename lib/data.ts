import { Category, Product, User, Order } from './types';

export const WA = '919876543210';

export const CATS: Category[] = [
  { id: 'ethnic-wear', name: 'Ethnic Wear', n: 48, img: '/images/shades-by-43-Rm9DL9DmGi4-unsplash.jpg' },
  { id: 'western-wear', name: 'Western Wear', n: 65, img: '/images/skg-photography-7hvolYZbsZQ-unsplash.jpg' },
  { id: 'party-wear', name: 'Party Wear', n: 34, img: '/images/yasu-shots-_y6hMz1pJC0-unsplash.jpg' },
  { id: 'bridal', name: 'Bridal Collection', n: 22, img: '/images/bulbul-ahmed-arn2mcDxcEk-unsplash.jpg' },
  { id: 'seasonal', name: 'Seasonal Collection', n: 28, img: '/images/bulbul-ahmed-blEZQCHeLh4-unsplash.jpg' },
  { id: 'accessories', name: 'Accessories', n: 56, img: '/images/bulbul-ahmed-q4Z_Z7Z2hHU-unsplash.jpg' },
];

export const DEFAULT_PRODS: Product[] = [
  { id: 'p1', name: 'Rose Embroidered Anarkali Suit', cat: 'Anarkali', cid: 'ethnic-wear', price: 4999, orig: 7999, imgs: ['/images/bulbul-ahmed-UybW3XFh1mQ-unsplash.jpg', '/images/bulbul-ahmed-xTrp1WOq2Do-unsplash.jpg', '/images/kai-s-photography-2s3GhhJz2uY-unsplash.jpg'], rating: 4.8, reviews: 124, tags: ['trending'], stock: 15, colors: ['#e8b4c0', '#b8a0c8'], colNames: ['Rose Pink', 'Dusty Mauve'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Exquisite rose-pink anarkali suit with delicate thread embroidery and mirror work. Features a flowing silhouette with a fitted bodice and flared skirt. Perfect for festive occasions.', care: 'Dry clean recommended. Store in a cool dry place. Iron on low heat.' },
  { id: 'p2', name: 'Midnight Velvet Cocktail Dress', cat: 'Cocktail Dress', cid: 'party-wear', price: 3499, orig: 5499, imgs: ['/images/nikhil-uttam-QrOdhsMAQw8-unsplash.jpg'], rating: 4.6, reviews: 89, tags: ['new'], stock: 8, colors: ['#1a1a2e', '#2d1b4e'], colNames: ['Midnight Blue', 'Deep Violet'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Luxurious midnight blue velvet cocktail dress with a flattering A-line cut. Perfect for evening events.', care: 'Hand wash cold. Lay flat to dry. Do not iron.' },
  { id: 'p3', name: 'Ivory Banarasi Silk Saree', cat: 'Saree', cid: 'ethnic-wear', price: 12999, orig: 18999, imgs: ['/images/nikhil-uttam-TUxTiExlo2g-unsplash.jpg', '/images/shades-by-43-Rm9DL9DmGi4-unsplash.jpg'], rating: 4.9, reviews: 256, tags: ['trending'], stock: 12, colors: ['#f5f0e8', '#c9a84c'], colNames: ['Ivory', 'Gold'], sizes: ['Free Size'], desc: 'Handwoven ivory Banarasi silk saree with intricate gold zari work. A timeless classic for weddings.', care: 'Dry clean only. Store with neem leaves. Wrap in muslin cloth.' },
  { id: 'p4', name: 'Boho Chic Maxi Dress', cat: 'Maxi Dress', cid: 'western-wear', price: 2299, orig: 3499, imgs: ['/images/skg-photography-7hvolYZbsZQ-unsplash.jpg'], rating: 4.5, reviews: 167, tags: ['trending'], stock: 20, colors: ['#d4a574', '#8b6914'], colNames: ['Camel', 'Brown'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Free-spirited boho maxi dress with floral print and tiered skirt. Lightweight fabric perfect for summer.', care: 'Machine wash gentle. Tumble dry low. Iron on low heat.' },
  { id: 'p5', name: 'Pearl Embellished Lehenga Set', cat: 'Lehenga', cid: 'bridal', price: 18999, orig: 28999, imgs: ['/images/yasu-shots-_y6hMz1pJC0-unsplash.jpg'], rating: 4.9, reviews: 198, tags: ['trending', 'new'], stock: 6, colors: ['#f0e6ff', '#d4b8f0'], colNames: ['Lavender', 'Lilac'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], desc: 'Breathtaking pearl-embellished lehenga set with hand-sewn pearls. Includes lehenga, choli, and dupatta.', care: 'Dry clean only. Store in garment bag.' },
  { id: 'p6', name: 'Classic Black Blazer Dress', cat: 'Blazer Dress', cid: 'western-wear', price: 3999, orig: 5999, imgs: ['/images/bulbul-ahmed-arn2mcDxcEk-unsplash.jpg'], rating: 4.7, reviews: 143, tags: ['trending'], stock: 10, colors: ['#1a1a1a', '#333'], colNames: ['Jet Black', 'Charcoal'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Power dressing meets elegance in this structured blazer dress. Perfect for work and evening events.', care: 'Dry clean recommended. Steam iron only.' },
  { id: 'p7', name: 'Sequin Glamour Evening Gown', cat: 'Evening Gown', cid: 'party-wear', price: 8999, orig: 14999, imgs: ['/images/bulbul-ahmed-blEZQCHeLh4-unsplash.jpg'], rating: 4.8, reviews: 76, tags: ['new'], stock: 5, colors: ['#c0c0c0', '#ffd700'], colNames: ['Silver', 'Gold'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Show-stopping all-over sequin evening gown with a dramatic floor-length silhouette.', care: 'Spot clean only. Store flat.' },
  { id: 'p8', name: 'Pastel Floral Kurta Set', cat: 'Kurta Set', cid: 'ethnic-wear', price: 2799, orig: 3999, imgs: ['/images/bulbul-ahmed-q4Z_Z7Z2hHU-unsplash.jpg'], rating: 4.6, reviews: 201, tags: [], stock: 25, colors: ['#ffb3c6', '#a8d8ea'], colNames: ['Blush Pink', 'Sky Blue'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Lightweight pastel kurta set with delicate floral prints. Comfortable for daily wear.', care: 'Machine wash cold. Hang dry.' },
  { id: 'p9', name: 'Satin Slip Dress', cat: 'Slip Dress', cid: 'western-wear', price: 2499, orig: 3999, imgs: ['/images/bulbul-ahmed-UybW3XFh1mQ-unsplash.jpg'], rating: 4.5, reviews: 112, tags: ['trending', 'new'], stock: 18, colors: ['#f5e6d3', '#e8c4a0'], colNames: ['Champagne', 'Nude'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Luxuriously smooth satin slip dress with adjustable straps. A wardrobe essential.', care: 'Hand wash cold. Lay flat to dry.' },
  { id: 'p10', name: 'Royal Blue Sharara Set', cat: 'Sharara', cid: 'ethnic-wear', price: 6999, orig: 9999, imgs: ['/images/bulbul-ahmed-xTrp1WOq2Do-unsplash.jpg'], rating: 4.7, reviews: 88, tags: [], stock: 14, colors: ['#4169e1', '#1e40af'], colNames: ['Royal Blue', 'Navy'], sizes: ['XS', 'S', 'M', 'L', 'XL'], desc: 'Regal royal blue sharara set with silver thread embroidery. Perfect for festive gatherings.', care: 'Dry clean recommended.' },
  { id: 'p11', name: 'Off-Shoulder Summer Dress', cat: 'Summer Dress', cid: 'western-wear', price: 1899, orig: 2799, imgs: ['/images/kai-s-photography-2s3GhhJz2uY-unsplash.jpg'], rating: 4.4, reviews: 93, tags: ['new'], stock: 22, colors: ['#ffd1dc', '#ffe4b5'], colNames: ['Baby Pink', 'Peach'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Breezy off-shoulder dress perfect for summer days. Flowy fabric with ruffle hem.', care: 'Machine wash gentle. Air dry.' },
  { id: 'p12', name: 'Emerald Party Jumpsuit', cat: 'Jumpsuit', cid: 'party-wear', price: 3299, orig: 4999, imgs: ['/images/nikhil-uttam-QrOdhsMAQw8-unsplash.jpg'], rating: 4.6, reviews: 67, tags: ['trending'], stock: 9, colors: ['#046307', '#064e3b'], colNames: ['Emerald', 'Forest'], sizes: ['XS', 'S', 'M', 'L'], desc: 'Bold statement emerald green wide-leg jumpsuit with flattering wrap front.', care: 'Dry clean recommended.' },
  { id: 'p13', name: 'Bridal Red Lehenga Choli', cat: 'Bridal Lehenga', cid: 'bridal', price: 45999, orig: 65999, imgs: ['/images/nikhil-uttam-TUxTiExlo2g-unsplash.jpg', '/images/shades-by-43-Rm9DL9DmGi4-unsplash.jpg'], rating: 5.0, reviews: 312, tags: ['trending'], stock: 4, colors: ['#8b0000', '#c41e3a'], colNames: ['Bridal Red', 'Deep Crimson'], sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], desc: 'The quintessential bridal red lehenga with intricate gold zardozi embroidery. Includes choli and dupatta.', care: 'Dry clean only. Store in garment bag with silica gel.' },
];

export const DEFAULT_USERS: User[] = [
  { id: 'a1', name: 'Admin User', email: 'admin@jamboos.in', pw: 'admin123', role: 'admin', phone: '9876543210', joined: '2024-01-01' },
  { id: 'u1', name: 'Priya Sharma', email: 'user@jamboos.in', pw: 'user123', role: 'user', phone: '9876543211', joined: '2024-02-15' },
];

export const DEFAULT_ORDERS: Order[] = [
  { id: 'ORD-001', uid: 'u1', gName: 'Priya Sharma', gPhone: '9876543211', items: [{ pid: 'p3', name: 'Ivory Banarasi Silk Saree', price: 12999, qty: 1, size: 'Free Size', img: '/images/skg-photography-7hvolYZbsZQ-unsplash.jpg' }], sub: 12999, ship: 0, total: 12999, status: 'DELIVERED', addr: '123 MG Road, Mumbai 400001', createdAt: '2024-03-10T10:00:00Z' },
  { id: 'ORD-002', uid: 'u1', gName: 'Priya Sharma', gPhone: '9876543211', items: [{ pid: 'p1', name: 'Rose Embroidered Anarkali Suit', price: 4999, qty: 1, size: 'M', img: '/images/yasu-shots-_y6hMz1pJC0-unsplash.jpg' }, { pid: 'p9', name: 'Satin Slip Dress', price: 2499, qty: 1, size: 'S', img: '/images/bulbul-ahmed-arn2mcDxcEk-unsplash.jpg' }], sub: 7498, ship: 0, total: 7498, status: 'SHIPPED', addr: '123 MG Road, Mumbai 400001', createdAt: '2024-03-18T14:30:00Z' },
];

export const TESTIMONIALS = [
  { t: "Absolutely stunning lehenga! The embroidery work is even more beautiful in person. Got so many compliments at my sister's wedding.", n: 'Priya Sharma', l: 'Mumbai', img: '/images/bulbul-ahmed-blEZQCHeLh4-unsplash.jpg' },
  { t: 'The Banarasi saree exceeded all expectations. The silk quality is superb and the zari work is breathtaking. Jamboos is now my go-to!', n: 'Kavitha Reddy', l: 'Hyderabad', img: '/images/bulbul-ahmed-q4Z_Z7Z2hHU-unsplash.jpg' },
  { t: 'Ordered the cocktail dress for a party and got so many compliments. The fit is perfect and fabric feels luxurious.', n: 'Ananya Singh', l: 'Delhi', img: '/images/bulbul-ahmed-UybW3XFh1mQ-unsplash.jpg' },
];

export const ADMIN_NAV = [
  { id: 'dashboard', lbl: 'Dashboard', ic: '📊' },
  { id: 'products', lbl: 'Products', ic: '👗' },
  { id: 'orders', lbl: 'Orders', ic: '📦' },
  { id: 'customers', lbl: 'Customers', ic: '👥' },
  { id: 'categories', lbl: 'Categories', ic: '🏷' },
  { id: 'offers', lbl: 'Offers', ic: '🎁' },
  { id: 'analytics', lbl: 'Analytics', ic: '📈' },
];

export const ACCOUNT_TABS = [
  { id: 'profile', lbl: 'My Profile', ic: '👤' },
  { id: 'orders', lbl: 'My Orders', ic: '📦' },
  { id: 'wishlist', lbl: 'Wishlist', ic: '♥' },
  { id: 'settings', lbl: 'Settings', ic: '⚙' },
];
