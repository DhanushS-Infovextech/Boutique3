'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { CATS } from '@/lib/data';
import { fmt } from '@/lib/utils';

export default function AdminProducts() {
  const { products, deleteProduct } = useStore();
  const { showModal, closeModal } = useModal();
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');

  const filtered = products.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (catFilter && p.cid !== catFilter) return false;
    return true;
  });

  const handleDelete = (id: string, name: string) => {
    showModal(
      <div>
        <div className="px-[22px] py-[18px] border-b border-g100 flex items-center justify-between">
          <h3 className="text-[16px] font-bold">Delete Product</h3>
          <button onClick={closeModal} className="text-g400 text-[22px] leading-none hover:text-bk cursor-pointer bg-none border-none">×</button>
        </div>
        <div className="p-[22px]">
          <p className="text-[14px] text-g600">Are you sure you want to delete <strong>{name}</strong>? This cannot be undone.</p>
        </div>
        <div className="px-[22px] py-[14px] border-t border-g100 flex gap-[10px] justify-end">
          <button onClick={closeModal} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Cancel</button>
          <button onClick={() => { deleteProduct(id); closeModal(); toast('Product deleted', 'i'); }} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-red text-white hover:bg-[#b91c1c] transition-all">Delete</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px] gap-[14px] flex-wrap">
        <div>
          <h1 className="font-serif text-[26px] font-semibold">Products</h1>
          <p className="text-[13px] text-g400 mt-[3px]">{products.length} total</p>
        </div>
        <Link href="/admin/products/new" className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">+ Add Product</Link>
      </div>

      <div className="flex gap-[10px] mb-[14px]">
        <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none w-[220px] focus:border-bk transition-colors" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
        <select className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none w-[180px] cursor-pointer bg-white" value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option value="">All Categories</option>
          {CATS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-g200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-g50 border-b border-g200">
            <tr>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Product</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Category</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Price</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Stock</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Flags</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} className="hover:bg-g50">
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-[50px] rounded-md overflow-hidden shrink-0"><Image src={p.imgs[0]} alt={p.name} width={40} height={50} className="w-full h-full object-cover" /></div>
                    <div><div className="font-semibold text-[13px]">{p.name}</div><div className="text-[11px] text-g400">ID: {p.id}</div></div>
                  </div>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">{CATS.find(c => c.id === p.cid)?.name || p.cid}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="font-bold">{fmt(p.price)}</div>
                  {p.orig > p.price && <div className="text-[11px] text-g400 line-through">{fmt(p.orig)}</div>}
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase ${p.stock > 5 ? 'bg-[#dcfce7] text-[#166534]' : p.stock > 0 ? 'bg-[#fef9c3] text-[#854d0e]' : 'bg-[#fee2e2] text-[#991b1b]'}`}>{p.stock > 0 ? p.stock + ' in stock' : 'Out of stock'}</span>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="flex flex-wrap gap-1">
                    {p.tags.includes('trending') && <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold text-gold bg-bk">Trending</span>}
                    {p.tags.includes('new') && <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold bg-[#dbeafe] text-[#1e40af]">New</span>}
                  </div>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="flex items-center gap-1">
                    <Link href={`/admin/products/${p.id}/edit`} className="px-2 py-[5px] rounded-md border border-g200 bg-white cursor-pointer text-g500 text-[11px] font-semibold hover:border-bk hover:text-bk transition-all flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit
                    </Link>
                    <button onClick={() => handleDelete(p.id, p.name)} className="px-2 py-[5px] rounded-md border border-g200 bg-white cursor-pointer text-g500 text-[11px] font-semibold hover:border-red hover:text-red hover:bg-[#fff5f5] transition-all flex items-center gap-1">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
