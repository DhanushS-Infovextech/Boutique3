'use client';

import { useToast } from '@/context/ToastContext';

const OFFERS = [
  { code: 'JAMBOOS10', desc: '10% off on all orders', type: 'Percentage', val: '10%', min: '₹0', status: 'Active' },
  { code: 'FESTIVE20', desc: '20% off on ethnic wear', type: 'Percentage', val: '20%', min: '₹2,000', status: 'Active' },
  { code: 'FLAT500', desc: '₹500 off on orders above ₹3,000', type: 'Flat', val: '₹500', min: '₹3,000', status: 'Expired' },
];

export default function AdminOffers() {
  const { toast } = useToast();

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px]">
        <div>
          <h1 className="font-serif text-[26px] font-semibold">Offers & Coupons</h1>
          <p className="text-[13px] text-g400 mt-[3px]">{OFFERS.length} coupons</p>
        </div>
        <button onClick={() => toast('Create offer — coming soon!', 'i')} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">+ New Coupon</button>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-g200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-g50 border-b border-g200">
            <tr>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Code</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Description</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Type</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Value</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Min Order</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Status</th>
            </tr>
          </thead>
          <tbody>
            {OFFERS.map(o => (
              <tr key={o.code} className="hover:bg-g50">
                <td className="px-[15px] py-[11px] border-b border-g100 font-bold"><code className="bg-g100 px-[6px] py-0.5 rounded-[3px] text-[12px]">{o.code}</code></td>
                <td className="px-[15px] py-[11px] border-b border-g100">{o.desc}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">{o.type}</td>
                <td className="px-[15px] py-[11px] border-b border-g100 font-semibold">{o.val}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">{o.min}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${o.status === 'Active' ? 'bg-[#dcfce7] text-[#166534]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>{o.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
