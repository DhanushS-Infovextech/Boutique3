'use client';

import { useEffect, useRef } from 'react';
import { useStore } from '@/context/StoreContext';
import { useAuth } from '@/context/AuthContext';
import { CATS } from '@/lib/data';
import { fmt } from '@/lib/utils';

export default function AdminAnalytics() {
  const { products, orders } = useStore();
  const { users } = useAuth();
  const chartRef = useRef<HTMLDivElement>(null);

  const rev = orders.reduce((s, o) => s + o.total, 0);
  const avgOrder = orders.length > 0 ? rev / orders.length : 0;
  const custs = users.filter(u => u.role === 'user').length;

  const catStats = CATS.map(c => ({
    name: c.name,
    count: products.filter(p => p.cid === c.id).length,
    rev: orders.reduce((s, o) => s + o.items.filter(i => products.find(p => p.id === i.pid)?.cid === c.id).reduce((ss, i) => ss + i.price * i.qty, 0), 0),
  }));

  useEffect(() => {
    if (!chartRef.current) return;
    const data = [31, 45, 72, 58, 83, 92, 67, 55, 78, 99, 88, 64];
    const lbls = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const mx = Math.max(...data);
    chartRef.current.innerHTML = data.map((v, i) =>
      `<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
        <div style="font-size:9px;font-weight:700;color:#4b5563">${v}</div>
        <div style="width:100%;border-radius:3px 3px 0 0;background:linear-gradient(180deg,#b5004a,#c9a84c);height:${Math.round(v / mx * 100)}%;opacity:${0.5 + i / data.length * 0.5}"></div>
        <div style="font-size:9px;color:#9ca3af">${lbls[i]}</div>
      </div>`
    ).join('');
  }, []);

  return (
    <div className="p-[26px] animate-fadeIn">
      <h1 className="font-serif text-[26px] font-semibold mb-[22px]">Analytics</h1>

      <div className="grid grid-cols-4 gap-4 mb-5">
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Total Revenue</div>
          <div className="font-serif text-[24px] font-semibold">{fmt(rev)}</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Avg Order Value</div>
          <div className="font-serif text-[24px] font-semibold">{fmt(Math.round(avgOrder))}</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Total Orders</div>
          <div className="font-serif text-[24px] font-semibold">{orders.length}</div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px] px-5 py-[18px]">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-2">Customers</div>
          <div className="font-serif text-[24px] font-semibold">{custs}</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5 mb-5">
        <div className="bg-white border border-g200 rounded-[10px]">
          <div className="px-5 py-[15px] border-b border-g100">
            <h3 className="text-[14px] font-bold">Monthly Sales</h3>
          </div>
          <div className="p-[18px]">
            <div ref={chartRef} className="flex items-end gap-1 h-[180px] pb-5" />
          </div>
        </div>
        <div className="bg-white border border-g200 rounded-[10px]">
          <div className="px-5 py-[15px] border-b border-g100">
            <h3 className="text-[14px] font-bold">Revenue by Category</h3>
          </div>
          <div className="p-5">
            {catStats.map(c => (
              <div key={c.name} className="flex items-center justify-between py-[9px] border-b border-g50 last:border-b-0">
                <div>
                  <div className="text-[13px] font-semibold">{c.name}</div>
                  <div className="text-[11px] text-g400">{c.count} products</div>
                </div>
                <div className="text-[13px] font-bold">{fmt(c.rev)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
