'use client';

import { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';
import { useWishlist } from '@/context/WishlistContext';
import { useStore } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';
import { ACCOUNT_TABS } from '@/lib/data';
import { fmt } from '@/lib/utils';

function AccountContent() {
  const searchParams = useSearchParams();
  const initTab = searchParams.get('tab') || 'profile';
  const { user, logout, updateProfile, changePassword } = useAuth();
  const { wishlist, toggleWish } = useWishlist();
  const { products, orders } = useStore();
  const { toast } = useToast();
  const router = useRouter();
  const [tab, setTab] = useState(initTab);

  // Profile state
  const [pfFn, setPfFn] = useState(user?.name.split(' ')[0] || '');
  const [pfLn, setPfLn] = useState(user?.name.split(' ').slice(1).join(' ') || '');
  const [pfEm, setPfEm] = useState(user?.email || '');
  const [pfPh, setPfPh] = useState(user?.phone || '');
  const [profAlert, setProfAlert] = useState<{ type: 's' | 'e'; msg: string } | null>(null);

  // Settings state
  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [setAlert, setSAlert] = useState<{ type: 's' | 'e'; msg: string } | null>(null);

  if (!user) { router.push('/login'); return null; }

  const myOrders = orders.filter(o => o.uid === user.id || o.gPhone === user.phone);
  const wishItems = products.filter(p => wishlist.includes(p.id));
  const statusColor: Record<string, string> = { PENDING: 'bg-[#fef9c3] text-[#854d0e]', CONFIRMED: 'bg-[#dbeafe] text-[#1e40af]', PROCESSING: 'bg-[#dbeafe] text-[#1e40af]', SHIPPED: 'bg-[#f3e8ff] text-[#6b21a8]', DELIVERED: 'bg-[#dcfce7] text-[#166534]', CANCELLED: 'bg-[#fee2e2] text-[#991b1b]' };

  const savePf = () => {
    if (!pfFn) { setProfAlert({ type: 'e', msg: 'First name required.' }); return; }
    updateProfile({ name: pfFn + ' ' + pfLn, email: pfEm, phone: pfPh });
    setProfAlert({ type: 's', msg: 'Profile updated!' });
  };

  const chPw = () => {
    if (!changePassword(oldPw, newPw)) {
      if (newPw.length < 6) setSAlert({ type: 'e', msg: 'New password min 6 characters.' });
      else setSAlert({ type: 'e', msg: 'Current password incorrect.' });
      return;
    }
    setSAlert({ type: 's', msg: 'Password updated!' });
    setOldPw(''); setNewPw('');
  };

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-[26px] grid grid-cols-[228px_1fr] gap-[26px]">
      {/* Sidebar */}
      <aside className="bg-white border border-g200 rounded-[10px] p-[14px] h-fit sticky top-[74px]">
        <div className="flex items-center gap-3 px-1 pb-[14px] mb-2 border-b border-g100">
          <div className="w-10 h-10 rounded-full bg-bk text-white flex items-center justify-center text-[15px] font-bold shrink-0 font-serif">{user.name[0].toUpperCase()}</div>
          <div>
            <div className="text-[13px] font-semibold leading-[1.3]">{user.name}</div>
            <div className="text-[11px] text-g400 max-w-[150px] overflow-hidden text-ellipsis whitespace-nowrap" title={user.email}>{user.email}</div>
          </div>
        </div>
        <nav>
          {ACCOUNT_TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-[10px] px-3 py-[9px] rounded-md text-[13px] font-medium cursor-pointer w-full text-left mb-0.5 transition-all ${tab === t.id ? 'bg-bk text-white' : 'text-g600 hover:bg-g50 hover:text-bk'}`}>{t.ic} {t.lbl}</button>
          ))}
          {user.role === 'admin' && <Link href="/admin" className="flex items-center gap-[10px] px-3 py-[9px] rounded-md text-[13px] font-medium text-rose hover:bg-g50 w-full">⚙ Admin Panel</Link>}
          <button onClick={() => { logout(); router.push('/'); }} className="flex items-center gap-[10px] px-3 py-[9px] rounded-md text-[13px] font-medium cursor-pointer w-full text-left text-red hover:bg-g50 transition-all">🚪 Sign Out</button>
        </nav>
      </aside>

      {/* Content */}
      <div>
        {tab === 'profile' && (
          <>
            <h1 className="font-serif text-[26px] font-semibold mb-5">My Profile</h1>
            <div className="bg-white border border-g200 rounded-[10px] p-[22px] max-w-[580px]">
              {profAlert && <div className={`px-4 py-[11px] rounded-md text-[13px] mb-[14px] border ${profAlert.type === 's' ? 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' : 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]'}`}>{profAlert.msg}</div>}
              <div className="grid grid-cols-2 gap-[15px]">
                <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">First Name</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={pfFn} onChange={e => setPfFn(e.target.value)} /></div>
                <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Last Name</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={pfLn} onChange={e => setPfLn(e.target.value)} /></div>
                <div className="col-span-2 flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Email</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="email" value={pfEm} onChange={e => setPfEm(e.target.value)} /></div>
                <div className="col-span-2 flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Phone</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="tel" value={pfPh} onChange={e => setPfPh(e.target.value)} /></div>
              </div>
              <div className="mt-[18px] flex gap-[10px]">
                <button onClick={savePf} className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Save Changes</button>
                <button onClick={() => setTab('profile')} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Discard</button>
              </div>
            </div>
          </>
        )}

        {tab === 'orders' && (
          <>
            <h1 className="font-serif text-[26px] font-semibold mb-5">My Orders</h1>
            {myOrders.length === 0 ? (
              <div className="text-center py-12"><div className="text-[52px] mb-4">📦</div><h3 className="text-[18px] font-bold mb-2">No orders yet</h3><p className="text-g500 text-[14px] mb-[22px]">Your completed orders will appear here</p><Link href="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Start Shopping</Link></div>
            ) : myOrders.map(o => (
              <div key={o.id} className="border border-g200 rounded-[10px] overflow-hidden mb-[14px]">
                <div className="bg-g50 px-[18px] py-[14px] flex items-center justify-between gap-3 flex-wrap border-b border-g200">
                  <div><div className="text-[13px] font-bold">{o.id}</div><div className="text-[11px] text-g400">{new Date(o.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div></div>
                  <div className="flex items-center gap-3"><span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase ${statusColor[o.status] || 'bg-g100 text-g600'}`}>{o.status}</span><span className="text-[15px] font-bold">{fmt(o.total)}</span></div>
                </div>
                <div className="px-[18px] py-4">
                  {o.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-g50 last:border-b-0">
                      <div className="w-12 h-[62px] rounded-md overflow-hidden shrink-0"><Image src={it.img || '/images/bulbul-ahmed-xTrp1WOq2Do-unsplash.jpg'} alt={it.name} width={48} height={62} className="w-full h-full object-cover" /></div>
                      <div className="flex-1"><div className="text-[13px] font-semibold">{it.name}</div><div className="text-[11px] text-g400">Size: {it.size || '—'} · Qty: {it.qty}</div></div>
                      <span className="text-[13px] font-bold">{fmt(it.price * it.qty)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </>
        )}

        {tab === 'wishlist' && (
          <>
            <h1 className="font-serif text-[26px] font-semibold mb-5">My Wishlist ({wishItems.length})</h1>
            {wishItems.length === 0 ? (
              <div className="text-center py-12"><div className="text-[52px] mb-4">♥</div><h3 className="text-[18px] font-bold mb-2">Wishlist is empty</h3><p className="text-g500 text-[14px] mb-[22px]">Save items you love for later</p><Link href="/shop" className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white transition-all">Explore</Link></div>
            ) : (
              <div className="grid grid-cols-3 gap-4">
                {wishItems.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </>
        )}

        {tab === 'settings' && (
          <>
            <h1 className="font-serif text-[26px] font-semibold mb-5">Settings</h1>
            <div className="bg-white border border-g200 rounded-[10px] p-[22px] max-w-[480px] mb-5">
              <h3 className="text-[15px] font-bold mb-[14px]">Change Password</h3>
              {setAlert && <div className={`px-4 py-[11px] rounded-md text-[13px] mb-[14px] border ${setAlert.type === 's' ? 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]' : 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]'}`}>{setAlert.msg}</div>}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Current Password</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} placeholder="Current password" /></div>
                <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">New Password</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="password" value={newPw} onChange={e => setNewPw(e.target.value)} placeholder="New password (min 6)" /></div>
                <button onClick={chPw} className="self-start inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Update Password</button>
              </div>
            </div>
            <div className="bg-white border border-g200 rounded-[10px] p-[22px] max-w-[480px]">
              <h3 className="text-[15px] font-bold mb-1">Danger Zone</h3>
              <p className="text-[13px] text-g500 mb-[14px]">This action cannot be undone.</p>
              <button onClick={() => { if (confirm('Sign out from all devices?')) { logout(); router.push('/'); } }} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-red text-white hover:bg-[#b91c1c] transition-all">Sign Out All Devices</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function AccountPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <AccountContent />
      </Suspense>
      <Footer />
    </>
  );
}
