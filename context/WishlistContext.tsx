'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

interface WishlistContextType {
  wishlist: string[];
  toggleWish: (pid: string) => boolean; // returns true if added, false if removed
  isWished: (pid: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('jb_wish');
      if (saved) setWishlist(JSON.parse(saved));
    } catch {}
  }, []);

  const save = useCallback((w: string[]) => {
    localStorage.setItem('jb_wish', JSON.stringify(w));
  }, []);

  const toggleWish = (pid: string): boolean => {
    let added = false;
    setWishlist(prev => {
      const i = prev.indexOf(pid);
      let next: string[];
      if (i > -1) { next = prev.filter(x => x !== pid); added = false; }
      else { next = [...prev, pid]; added = true; }
      save(next);
      return next;
    });
    return added;
  };

  const isWished = (pid: string) => wishlist.includes(pid);

  return <WishlistContext.Provider value={{ wishlist, toggleWish, isWished }}>{children}</WishlistContext.Provider>;
}

export const useWishlist = () => useContext(WishlistContext);
