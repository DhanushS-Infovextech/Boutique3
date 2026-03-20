'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Order, Product } from '@/lib/types';
import { DEFAULT_ORDERS, DEFAULT_PRODS } from '@/lib/data';

interface StoreContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order['status']) => void;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
}

const StoreContext = createContext<StoreContextType>({} as StoreContextType);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODS);
  const [orders, setOrders] = useState<Order[]>(DEFAULT_ORDERS);

  useEffect(() => {
    try {
      const sp = localStorage.getItem('jb_prods');
      if (sp) setProducts(JSON.parse(sp));
      const so = localStorage.getItem('jb_orders');
      if (so) setOrders(JSON.parse(so));
    } catch {}
  }, []);

  const saveP = useCallback((p: Product[]) => localStorage.setItem('jb_prods', JSON.stringify(p)), []);
  const saveO = useCallback((o: Order[]) => localStorage.setItem('jb_orders', JSON.stringify(o)), []);

  const addOrder = (order: Order) => {
    setOrders(prev => { const next = [order, ...prev]; saveO(next); return next; });
  };

  const updateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(prev => { const next = prev.map(o => o.id === id ? { ...o, status } : o); saveO(next); return next; });
  };

  const addProduct = (product: Product) => {
    setProducts(prev => { const next = [product, ...prev]; saveP(next); return next; });
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    setProducts(prev => { const next = prev.map(p => p.id === id ? { ...p, ...data } : p); saveP(next); return next; });
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => { const next = prev.filter(p => p.id !== id); saveP(next); return next; });
  };

  return <StoreContext.Provider value={{ products, setProducts, orders, setOrders, addOrder, updateOrderStatus, addProduct, updateProduct, deleteProduct }}>{children}</StoreContext.Provider>;
}

export const useStore = () => useContext(StoreContext);
