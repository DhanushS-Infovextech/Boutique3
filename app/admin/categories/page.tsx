'use client';

import Image from 'next/image';
import { useStore } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';
import { CATS } from '@/lib/data';

export default function AdminCategories() {
  const { products } = useStore();
  const { toast } = useToast();

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px]">
        <div>
          <h1 className="font-serif text-[26px] font-semibold">Categories</h1>
          <p className="text-[13px] text-g400 mt-[3px]">{CATS.length} categories</p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-g200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-g50 border-b border-g200">
            <tr>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Category</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Slug</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Products</th>
            </tr>
          </thead>
          <tbody>
            {CATS.map(c => (
              <tr key={c.id} className="hover:bg-g50">
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="flex items-center gap-3">
                    <Image src={c.img} alt={c.name} width={48} height={36} className="w-12 h-9 rounded-md object-cover" />
                    <span className="font-semibold">{c.name}</span>
                  </div>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <code className="text-[11px] bg-g100 px-[6px] py-0.5 rounded-[3px]">{c.id}</code>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-[#dbeafe] text-[#1e40af]">{products.filter(p => p.cid === c.id).length}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
