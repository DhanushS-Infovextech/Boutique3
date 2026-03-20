'use client';

import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ddRef.current && !ddRef.current.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener('click', h);
    return () => document.removeEventListener('click', h);
  }, []);

  return (
    <nav className={`bg-white border-b border-g200 sticky top-0 z-[500] transition-shadow duration-200 ${scrolled ? 'shadow-[0_2px_16px_rgba(0,0,0,.09)]' : ''}`}>
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[62px]">
        <Link href="/" className="font-serif text-[26px] font-bold tracking-[.12em]">JAMBOOS</Link>
        <div className="flex gap-[26px]">
          <Link href="/" className="text-[13px] font-medium text-g600 hover:text-bk relative pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-full after:h-[1.5px] after:bg-bk after:transition-[right_.22s] hover:after:right-0">Home</Link>
          <Link href="/shop" className="text-[13px] font-medium text-g600 hover:text-bk relative pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-full after:h-[1.5px] after:bg-bk after:transition-[right_.22s] hover:after:right-0">Shop</Link>
          <Link href="/shop?cat=ethnic-wear" className="text-[13px] font-medium text-g600 hover:text-bk relative pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-full after:h-[1.5px] after:bg-bk after:transition-[right_.22s] hover:after:right-0">Ethnic</Link>
          <Link href="/shop?cat=western-wear" className="text-[13px] font-medium text-g600 hover:text-bk relative pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-full after:h-[1.5px] after:bg-bk after:transition-[right_.22s] hover:after:right-0">Western</Link>
          <Link href="/shop?cat=party-wear" className="text-[13px] font-medium text-g600 hover:text-bk relative pb-0.5 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:right-full after:h-[1.5px] after:bg-bk after:transition-[right_.22s] hover:after:right-0">Party</Link>
        </div>
        <div className="flex items-center gap-0.5">
          <Link href="/shop" className="p-2 rounded-md text-g500 hover:text-bk hover:bg-g50 transition-all flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </Link>
          <Link href={user ? '/account?tab=wishlist' : '/login'} className="p-2 rounded-md text-g500 hover:text-bk hover:bg-g50 transition-all flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </Link>
          <Link href="/cart" className="p-2 rounded-md text-g500 hover:text-bk hover:bg-g50 transition-all flex items-center justify-center relative">
            <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            {cartCount > 0 && <span className="absolute top-0.5 right-0.5 bg-rose text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cartCount}</span>}
          </Link>
          <div className="relative" ref={ddRef}>
            <button className="p-2 rounded-md text-g500 hover:text-bk hover:bg-g50 transition-all flex items-center justify-center" onClick={(e) => { e.stopPropagation(); setDdOpen(!ddOpen); }}>
              <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-current fill-none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            {ddOpen && (
              <div className="absolute top-[calc(100%+8px)] right-0 w-[196px] bg-white border border-g200 rounded-[10px] shadow-[0_8px_30px_rgba(0,0,0,.12)] overflow-hidden z-[600] animate-scaleUp">
                {user ? (
                  <>
                    <div className="px-4 py-[9px] text-[11px] text-g400 font-semibold uppercase tracking-[.06em] border-b border-g100">{user.email}</div>
                    <Link href="/account?tab=profile" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] hover:bg-g50 cursor-pointer">My Profile</Link>
                    <Link href="/account?tab=orders" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] hover:bg-g50 cursor-pointer">My Orders</Link>
                    <Link href="/account?tab=wishlist" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] hover:bg-g50 cursor-pointer">Wishlist</Link>
                    {user.role === 'admin' && (
                      <>
                        <div className="h-px bg-g100 my-1" />
                        <Link href="/admin" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] text-rose font-semibold hover:bg-g50 cursor-pointer">⚙ Admin Dashboard</Link>
                      </>
                    )}
                    <div className="h-px bg-g100 my-1" />
                    <button onClick={() => { logout(); setDdOpen(false); }} className="block w-full text-left px-4 py-[10px] text-[13px] text-red hover:bg-g50 cursor-pointer">Sign Out</button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] hover:bg-g50 cursor-pointer">Login</Link>
                    <Link href="/register" onClick={() => setDdOpen(false)} className="block px-4 py-[10px] text-[13px] hover:bg-g50 cursor-pointer">Create Account</Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
