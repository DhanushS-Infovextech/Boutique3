'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { fmt } from '@/lib/utils';

export default function CartPage() {
  const { cart, removeFromCart, updateQty, cartTotal, cartCount } = useCart();
  const { toast } = useToast();
  const ship = cartTotal >= 1999 ? 0 : 149;
  const total = cartTotal + ship;

  const getKey = (pid: string, size: string, color: string) => `${pid}|${size}|${color}`;

  const applyCoupon = () => {
    const inp = document.getElementById('cpnInp') as HTMLInputElement;
    const c = inp?.value.trim().toUpperCase();
    if (c === 'JAMBOOS10') toast('Coupon applied! 10% off ✓');
    else toast('Invalid coupon', 'e');
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {cart.length === 0 ? (
        <div className="text-center py-[100px] px-5">
          <div className="text-[52px] mb-4">🛍</div>
          <h3 className="text-[18px] font-bold mb-2">Your cart is empty</h3>
          <p className="text-g500 text-[14px] mb-[22px]">Looks like you haven&apos;t added anything yet</p>
          <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Continue Shopping</Link>
        </div>
      ) : (
        <div className="max-w-[1100px] mx-auto px-6 py-[26px] grid grid-cols-[1fr_360px] gap-[26px]">
          <div>
            <div className="flex items-center justify-between mb-5">
              <h1 className="font-serif text-[28px] font-semibold">Shopping Cart <span className="text-[14px] font-normal text-g400">({cartCount} items)</span></h1>
              <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Continue Shopping</Link>
            </div>
            <div className="flex flex-col gap-[14px]">
              {cart.map(item => {
                const key = getKey(item.pid, item.size, item.color);
                return (
                  <div key={key} className="flex gap-4 p-4 border border-g200 rounded-[10px] bg-white hover:shadow-[0_2px_8px_rgba(0,0,0,.07)] transition-shadow">
                    <Link href={`/product/${item.pid}`} className="w-[88px] h-[114px] rounded-md overflow-hidden shrink-0">
                      <Image src={item.img} alt={item.name} width={88} height={114} className="w-full h-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold uppercase tracking-[.08em] text-g400 mb-[3px]">{item.cat}</div>
                      <div className="text-[14px] font-semibold mb-1 leading-[1.35]">{item.name}</div>
                      <div className="text-[12px] text-g400 mb-[9px]">Size: {item.size || '—'} · <span className="inline-block w-[10px] h-[10px] rounded-full align-middle mr-0.5" style={{ background: item.color }} />{item.colName || '—'}</div>
                      <div className="text-[16px] font-bold mb-[9px]">{fmt(item.price * item.qty)}</div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-g200 rounded-md overflow-hidden">
                          <button onClick={() => updateQty(key, -1)} className="w-[38px] h-[38px] bg-white border-none cursor-pointer text-[18px] font-light flex items-center justify-center hover:bg-g50">−</button>
                          <div className="w-[44px] text-center text-[14px] font-semibold border-x border-g200 h-[38px] flex items-center justify-center">{item.qty}</div>
                          <button onClick={() => updateQty(key, 1)} className="w-[38px] h-[38px] bg-white border-none cursor-pointer text-[18px] font-light flex items-center justify-center hover:bg-g50">+</button>
                        </div>
                        <button onClick={() => removeFromCart(key)} className="text-[12px] text-g400 bg-none border-none cursor-pointer hover:text-red transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="bg-g50 border border-g200 rounded-[10px] p-5 sticky top-[76px]">
              <h2 className="text-[16px] font-bold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center text-[14px] text-g600 mb-[9px]"><span>Subtotal ({cartCount} items)</span><span>{fmt(cartTotal)}</span></div>
              <div className="flex justify-between items-center text-[14px] text-g600 mb-[9px]"><span>Shipping</span><span style={{ color: ship === 0 ? 'var(--color-grn)' : 'inherit' }}>{ship === 0 ? 'FREE' : fmt(ship)}</span></div>
              {ship > 0 && <p className="text-[11px] text-grn mb-2">Add {fmt(1999 - cartTotal)} more for free shipping!</p>}
              <div className="flex gap-2 my-[13px]">
                <input id="cpnInp" placeholder="Coupon code (JAMBOOS10)" className="flex-1 px-3 py-[9px] border border-g200 rounded-md text-[13px] outline-none" />
                <button onClick={applyCoupon} className="bg-bk text-white border-none px-[14px] py-[9px] rounded-md text-[12px] font-bold cursor-pointer">Apply</button>
              </div>
              <div className="flex justify-between items-center font-bold text-[16px] text-bk border-t border-g200 pt-[11px] mt-1"><span>Total</span><span>{fmt(total)}</span></div>
              <Link href="/checkout" className="mt-4 inline-flex items-center justify-center w-full gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all mb-[10px]">Proceed to Checkout</Link>
              <Link href="/shop" className="inline-flex items-center justify-center w-full gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Continue Shopping</Link>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}
