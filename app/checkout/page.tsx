'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';
import { fmt } from '@/lib/utils';
import { WA } from '@/lib/data';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { addOrder } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const [fn, setFn] = useState(user?.name.split(' ')[0] || '');
  const [ln, setLn] = useState(user?.name.split(' ').slice(1).join(' ') || '');
  const [ph, setPh] = useState(user?.phone || '');
  const [em, setEm] = useState(user?.email || '');
  const [addr, setAddr] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pin, setPin] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const ship = cartTotal >= 1999 ? 0 : 149;
  const total = cartTotal + ship;

  const placeOrder = () => {
    const cleanPh = ph.replace(/\s/g, '').replace('+91', '');
    const checks: Record<string, boolean> = {
      Fn: !fn, Ln: !ln, Ph: !/^[6-9]\d{9}$/.test(cleanPh),
      Addr: addr.length < 5, City: !city, State: !state, Pin: pin.length !== 6,
    };
    setErrors(checks);
    if (Object.values(checks).some(Boolean)) return;

    const oid = 'ORD-' + Date.now().toString(36).toUpperCase();
    const order = {
      id: oid, uid: user?.id || null, gName: `${fn} ${ln}`, gPhone: cleanPh,
      items: cart.map(i => ({ pid: i.pid, name: i.name, price: i.price, qty: i.qty, size: i.size, img: i.img })),
      sub: cartTotal, ship, total, status: 'PENDING' as const,
      addr: `${addr}, ${city}, ${state} - ${pin}`, createdAt: new Date().toISOString(),
    };
    addOrder(order);

    const lines = cart.map(i => `  - ${i.name} x${i.qty} = Rs.${(i.price * i.qty).toLocaleString('en-IN')}`).join('\n');
    const msg = `New Order - Jamboos Boutique\nOrder: #${oid}\n\nCustomer: ${fn} ${ln}\nPhone: ${cleanPh}\n${em ? 'Email: ' + em + '\n' : ''}Address: ${addr}, ${city}, ${state} - ${pin}\n${notes ? 'Notes: ' + notes + '\n' : ''}\nItems:\n${lines}\n\nTotal: Rs.${total.toLocaleString('en-IN')}\n\nPlease confirm and share payment details. Thank you!`;
    window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');
    clearCart();
    router.push('/success');
  };

  const errField = (name: string) => errors[name] ? 'border-red' : '';

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="max-w-[980px] mx-auto px-6 py-[26px] grid grid-cols-[1fr_360px] gap-[26px] items-start">
        <div className="col-span-2">
          <div className="text-[12px] text-g400 mb-1">
            <Link href="/cart" className="cursor-pointer hover:text-bk transition-colors">Cart</Link>
            <span className="mx-[6px] text-g200">›</span><span>Checkout</span>
          </div>
          <h1 className="font-serif text-[28px] font-semibold mt-[6px]">Checkout</h1>
        </div>

        <div>
          <div className="bg-white border border-g200 rounded-[10px] p-5 mb-[14px]">
            <div className="text-[12px] font-bold uppercase tracking-[.08em] text-bk mb-[14px] pb-[11px] border-b border-g100">Shipping Information</div>
            <div className="grid grid-cols-2 gap-[14px]">
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">First Name *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk focus:shadow-[0_0_0_3px_rgba(0,0,0,.05)] bg-white transition-colors ${errField('Fn')}`} value={fn} onChange={e => setFn(e.target.value)} placeholder="Priya" />
                {errors.Fn && <span className="text-[11px] text-red">Required</span>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Last Name *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk focus:shadow-[0_0_0_3px_rgba(0,0,0,.05)] transition-colors ${errField('Ln')}`} value={ln} onChange={e => setLn(e.target.value)} placeholder="Sharma" />
                {errors.Ln && <span className="text-[11px] text-red">Required</span>}
              </div>
              <div className="col-span-2 flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">WhatsApp Number *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors ${errField('Ph')}`} type="tel" value={ph} onChange={e => setPh(e.target.value)} placeholder="+91 98765 43210" />
                {errors.Ph && <span className="text-[11px] text-red">Enter valid 10-digit number</span>}
              </div>
              <div className="col-span-2 flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Email (optional)</label>
                <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="email" value={em} onChange={e => setEm(e.target.value)} placeholder="priya@email.com" />
              </div>
              <div className="col-span-2 flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Delivery Address *</label>
                <textarea className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk resize-y min-h-[80px] transition-colors ${errField('Addr')}`} rows={3} value={addr} onChange={e => setAddr(e.target.value)} placeholder="House no, Street, Area…" />
                {errors.Addr && <span className="text-[11px] text-red">Enter full address</span>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">City *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors ${errField('City')}`} value={city} onChange={e => setCity(e.target.value)} placeholder="Mumbai" />
                {errors.City && <span className="text-[11px] text-red">Required</span>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">State *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors ${errField('State')}`} value={state} onChange={e => setState(e.target.value)} placeholder="Maharashtra" />
                {errors.State && <span className="text-[11px] text-red">Required</span>}
              </div>
              <div className="flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Pincode *</label>
                <input className={`px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors ${errField('Pin')}`} value={pin} onChange={e => setPin(e.target.value)} placeholder="400050" maxLength={6} />
                {errors.Pin && <span className="text-[11px] text-red">6-digit pincode</span>}
              </div>
              <div className="col-span-2 flex flex-col gap-[5px]">
                <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Special Instructions</label>
                <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Color preference, size…" />
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[18px] font-bold mb-[14px]">Order Summary</h2>
          <div className="bg-g50 border border-g200 rounded-[10px] p-5">
            <div className="mb-[13px] pb-[13px] border-b border-g200">
              {cart.map((i, idx) => (
                <div key={idx} className="flex gap-[10px] items-center py-[7px]">
                  <Image src={i.img} alt={i.name} width={48} height={62} className="w-12 h-[62px] rounded-md object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-semibold">{i.name}</div>
                    <div className="text-[11px] text-g400">Qty: {i.qty}</div>
                  </div>
                  <span className="text-[13px] font-bold">{fmt(i.price * i.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-[14px] text-g600 mb-[9px]"><span>Subtotal</span><span>{fmt(cartTotal)}</span></div>
            <div className="flex justify-between items-center text-[14px] text-g600 mb-[9px]"><span>Shipping</span><span style={{ color: ship === 0 ? 'var(--color-grn)' : 'inherit' }}>{ship === 0 ? 'FREE' : fmt(ship)}</span></div>
            <div className="flex justify-between items-center font-bold text-[16px] text-bk border-t border-g200 pt-[11px] mt-1"><span>Total</span><span>{fmt(total)}</span></div>
            <button onClick={placeOrder} className="mt-[14px] w-full inline-flex items-center justify-center gap-2 px-8 py-[14px] rounded-md text-[15px] font-semibold bg-grn text-white hover:bg-[#15803d] transition-all">📲 Place Order via WhatsApp</button>
            <p className="text-center text-[11px] text-g400 mt-2">You&apos;ll be redirected to WhatsApp to confirm</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
