'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from '@/lib/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, colName: string, qty?: number) => void;
  quickAdd: (product: Product) => void;
  removeFromCart: (key: string) => void;
  updateQty: (key: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType>({} as CartContextType);

const getKey = (pid: string, size: string, color: string) => `${pid}|${size}|${color}`;

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jb_cart');
      if (saved) setCart(JSON.parse(saved));
    } catch {}
  }, []);

  const save = useCallback((c: CartItem[]) => {
    localStorage.setItem('jb_cart', JSON.stringify(c));
  }, []);

  const addToCart = (p: Product, size: string, color: string, colName: string, qty = 1) => {
    setCart(prev => {
      const key = getKey(p.id, size, color);
      const ex = prev.find(i => getKey(i.pid, i.size, i.color) === key);
      let next: CartItem[];
      if (ex) {
        next = prev.map(i => getKey(i.pid, i.size, i.color) === key ? { ...i, qty: i.qty + qty } : i);
      } else {
        next = [...prev, { pid: p.id, name: p.name, cat: p.cat, price: p.price, img: p.imgs[0], size, color, colName, qty }];
      }
      save(next);
      return next;
    });
  };

  const quickAdd = (p: Product) => {
    addToCart(p, p.sizes[0], p.colors[0], p.colNames[0]);
  };

  const removeFromCart = (key: string) => {
    setCart(prev => {
      const next = prev.filter(i => getKey(i.pid, i.size, i.color) !== key);
      save(next);
      return next;
    });
  };

  const updateQty = (key: string, delta: number) => {
    setCart(prev => {
      const next = prev.map(i => getKey(i.pid, i.size, i.color) === key ? { ...i, qty: Math.max(1, i.qty + delta) } : i);
      save(next);
      return next;
    });
  };

  const clearCart = () => { setCart([]); save([]); };

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  return <CartContext.Provider value={{ cart, addToCart, quickAdd, removeFromCart, updateQty, clearCart, cartTotal, cartCount }}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
