'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { fmt } from '@/lib/utils';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { products, orders } = useStore();
  const { users } = useAuth();
  const chartRef = useRef<HTMLDivElement>(null);

  const rev = orders.reduce((s, o) => s + o.total, 0);
  const pendingCount = orders.filter(o => o.status === 'PENDING').length;
  const customerCount = users.filter(u => u.role === 'user').length;

  useEffect(() => {
    if (!chartRef.current) return;
    const data = [38000, 42000, 61000, 45000, 74000, 88000, 52000];
    const lbls = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const mx = Math.max(...data);
    chartRef.current.innerHTML = data.map((v, i) => `
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
        <div style="font-size:9px;font-weight:700;color:#4b5563">${(v / 1000).toFixed(0)}K</div>
        <div style="width:100%;border-radius:3px 3px 0 0;background:#b5004a;height:${Math.round(v / mx * 100)}%;opacity:${0.4 + i / data.length * 0.6}"></div>
        <div style="font-size:9px;color:#9ca3af;white-space:nowrap">${lbls[i]}</div>
      </div>
    `).join('');
  }, []);

  const statusColor: Record<string, string> = {
    PENDING: 'bg-[#fef9c3] text-[#854d0e]',
    DELIVERED: 'bg-[#dcfce7] text-[#166534]',
    SHIPPED: 'bg-[#dbeafe] text-[#1e40af]',
  };

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px] gap-[14px] flex-wrap">
        <div>
          <h1 className="font-serif text-[26px] font-semibold">Dashboard</h1>
          <p className="text-[13px] text-g400 mt-[3px]">Welcome back, {user?.name.split(' ')[0]}!</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-[22px]">
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Products</div>
          <div className="font-serif text-[30px] font-semibold mb-1">{products.length}</div>
          <div className="text-[12px] text-grn">↑ Active listings</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Orders</div>
          <div className="font-serif text-[30px] font-semibold mb-1">{orders.length}</div>
          <div className={`text-[12px] ${pendingCount > 0 ? 'text-rose' : 'text-grn'}`}>{pendingCount} pending</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Customers</div>
          <div className="font-serif text-[30px] font-semibold mb-1">{customerCount}</div>
          <div className="text-[12px] text-grn">↑ Registered</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Revenue</div>
          <div className="font-serif text-[20px] font-semibold mb-1">{fmt(rev)}</div>
          <div className="text-[12px] text-grn">All time</div>
        </div>
      </div>

      {/* Chart + Recent Orders */}
      <div className="grid grid-cols-[2fr_1fr] gap-5 mb-5">
        <div className="bg-white border border-g200 rounded-[10px]">
          <div className="px-5 py-[15px] border-b border-g100 flex items-center justify-between">
            <h3 className="text-[14px] font-bold">Revenue — Last 7 Days</h3>
          </div>
          <div className="p-[18px]">
            <div className="h-[200px] relative mt-[10px]">
              <div ref={chartRef} className="flex items-end gap-1 h-full pb-5" />
            </div>
          </div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px]">
          <div className="px-5 py-[15px] border-b border-g100 flex items-center justify-between">
            <h3 className="text-[14px] font-bold">Recent Orders</h3>
            <Link href="/admin/orders" className="inline-flex items-center justify-center gap-1 px-[11px] py-[5px] rounded-md text-[11px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">View All</Link>
          </div>
          {orders.slice(0, 5).map(o => (
            <div key={o.id} className="flex justify-between items-center px-[18px] py-[11px] border-b border-g50">
              <div>
                <div className="text-[13px] font-semibold">{o.gName || 'Guest'}</div>
                <div className="text-[11px] text-g400">{o.items.length} items · {o.id}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[13px]">{fmt(o.total)}</div>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase ${statusColor[o.status] || 'bg-[#dbeafe] text-[#1e40af]'}`}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white border border-g200 rounded-[10px]">
        <div className="px-5 py-[15px] border-b border-g100">
          <h3 className="text-[14px] font-bold">Top Products</h3>
        </div>
        <div className="p-[14px_18px] grid grid-cols-4 gap-3">
          {[...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4).map(p => (
            <Link key={p.id} href={`/product/${p.id}`} className="flex gap-[10px] items-center cursor-pointer">
              <Image src={p.imgs[0]} alt={p.name} width={40} height={52} className="w-10 h-[52px] rounded-md object-cover shrink-0" />
              <div>
                <div className="text-[12px] font-semibold leading-[1.3]">{p.name}</div>
                <div className="text-[11px] text-g400">{p.reviews} reviews</div>
                <div className="text-[12px] font-bold text-rose">{fmt(p.price)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
