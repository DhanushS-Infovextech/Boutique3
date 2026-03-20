export interface Category {
  id: string;
  name: string;
  n: number;
  img: string;
}

export interface Product {
  id: string;
  name: string;
  cat: string;
  cid: string;
  price: number;
  orig: number;
  imgs: string[];
  rating: number;
  reviews: number;
  tags: string[];
  stock: number;
  colors: string[];
  colNames: string[];
  sizes: string[];
  desc: string;
  care: string;
}

export interface CartItem {
  pid: string;
  name: string;
  cat: string;
  price: number;
  img: string;
  size: string;
  color: string;
  colName: string;
  qty: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  pw: string;
  role: 'admin' | 'user';
  phone: string;
  joined: string;
}

export interface OrderItem {
  pid: string;
  name: string;
  price: number;
  qty: number;
  size: string;
  img: string;
}

export interface Order {
  id: string;
  uid: string | null;
  gName: string;
  gPhone: string;
  items: OrderItem[];
  sub: number;
  ship: number;
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  addr: string;
  createdAt: string;
}
