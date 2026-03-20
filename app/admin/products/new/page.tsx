'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';
import { CATS } from '@/lib/data';
import { uid } from '@/lib/utils';

export default function AddProductPage() {
  const { addProduct } = useStore();
  const { toast } = useToast();
  const router = useRouter();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [cid, setCid] = useState(CATS[0].id);
  const [cat, setCat] = useState('');
  const [price, setPrice] = useState('');
  const [orig, setOrig] = useState('');
  const [stock, setStock] = useState('');
  const [trending, setTrending] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [imgs, setImgs] = useState<string[]>([]);
  const [sizes, setSizes] = useState('XS,S,M,L,XL');
  const [colors, setColors] = useState('#e8b4c0');
  const [colNames, setColNames] = useState('Default');
  const [alert, setAlert] = useState('');

  const addImg = () => {
    if (!imgUrl.trim()) return;
    setImgs([...imgs, imgUrl.trim()]);
    setImgUrl('');
    toast('Image added ✓');
  };

  const save = () => {
    const p = parseInt(price) || 0;
    const o = parseInt(orig) || p;
    if (!name || !desc || p <= 0) { setAlert('Name, description and price are required.'); return; }
    const tags: string[] = [];
    if (trending) tags.push('trending');
    if (isNew) tags.push('new');
    const finalImgs = imgs.length > 0 ? imgs : ['/images/kai-s-photography-2s3GhhJz2uY-unsplash.jpg'];

    addProduct({
      id: uid(), name, desc, cid,
      cat: cat || (CATS.find(c => c.id === cid)?.name || ''),
      price: p, orig: o, stock: parseInt(stock) || 0,
      tags, imgs: finalImgs,
      sizes: sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: colors.split(',').map(s => s.trim()).filter(Boolean),
      colNames: colNames.split(',').map(s => s.trim()).filter(Boolean),
      rating: 4.5, reviews: 0, care: 'Handle with care.',
    });
    toast('Product created ✓');
    router.push('/admin/products');
  };

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="mb-[22px]">
        <button onClick={() => router.push('/admin/products')} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all mb-2">← Back</button>
        <h1 className="font-serif text-[26px] font-semibold">Add New Product</h1>
      </div>
      <div className="max-w-[840px]">
        {alert && <div className="px-4 py-[11px] rounded-md text-[13px] mb-[14px] border bg-[#fee2e2] text-[#991b1b] border-[#fecaca]">{alert}</div>}

        <div className="bg-white border border-g200 rounded-[10px] p-5 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-[14px] pb-[11px] border-b border-g100">Basic Information</div>
          <div className="grid grid-cols-2 gap-[14px]">
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Product Name *</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rose Anarkali Suit" /></div>
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Sub-type</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={cat} onChange={e => setCat(e.target.value)} placeholder="e.g. Anarkali, Saree…" /></div>
            <div className="col-span-2 flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Description *</label><textarea className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk resize-y min-h-[80px] transition-colors" rows={4} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the product…" /></div>
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Category *</label><select className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none cursor-pointer bg-white" value={cid} onChange={e => setCid(e.target.value)}>{CATS.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</select></div>
          </div>
        </div>

        <div className="bg-white border border-g200 rounded-[10px] p-5 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-[14px] pb-[11px] border-b border-g100">Pricing & Stock</div>
          <div className="grid grid-cols-2 gap-[14px]">
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Sale Price (₹) *</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="4999" /></div>
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Original Price (₹)</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="number" value={orig} onChange={e => setOrig(e.target.value)} placeholder="7999" /></div>
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Stock Count</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="number" value={stock} onChange={e => setStock(e.target.value)} placeholder="15" /></div>
          </div>
        </div>

        <div className="bg-white border border-g200 rounded-[10px] p-5 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-[14px] pb-[11px] border-b border-g100">Labels & Variants</div>
          <div className="flex gap-5 mb-[14px] flex-wrap">
            <label className="flex items-center gap-2 cursor-pointer text-[13px]"><input type="checkbox" checked={trending} onChange={e => setTrending(e.target.checked)} className="accent-bk cursor-pointer" /> 🔥 Trending</label>
            <label className="flex items-center gap-2 cursor-pointer text-[13px]"><input type="checkbox" checked={isNew} onChange={e => setIsNew(e.target.checked)} className="accent-bk cursor-pointer" /> ✨ New Arrival</label>
          </div>
          <div className="grid grid-cols-2 gap-[14px]">
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Sizes (comma-separated)</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={sizes} onChange={e => setSizes(e.target.value)} /></div>
            <div className="flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Color Hex (comma-separated)</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={colors} onChange={e => setColors(e.target.value)} /></div>
            <div className="col-span-2 flex flex-col gap-[5px]"><label className="text-[12px] font-semibold text-g800">Color Names (comma-separated)</label><input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={colNames} onChange={e => setColNames(e.target.value)} /></div>
          </div>
        </div>

        <div className="bg-white border border-g200 rounded-[10px] p-5 mb-4">
          <div className="text-[11px] font-bold uppercase tracking-[.1em] text-g400 mb-[14px] pb-[11px] border-b border-g100">Product Images</div>
          <div className="flex gap-2 mb-[14px]">
            <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none flex-1 focus:border-bk transition-colors" value={imgUrl} onChange={e => setImgUrl(e.target.value)} placeholder="Paste image URL or path like /images/..." onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addImg())} />
            <button onClick={addImg} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Add</button>
          </div>
          {imgs.length > 0 && (
            <div className="grid grid-cols-4 gap-[10px]">
              {imgs.map((img, i) => (
                <div key={i} className="relative aspect-[3/4] rounded-md overflow-hidden border-2 border-g200">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {i === 0 && <div className="absolute top-[5px] left-[5px] bg-gold text-white text-[9px] font-bold px-[6px] py-0.5 rounded-[2px] uppercase tracking-[.05em]">Primary</div>}
                  <button onClick={() => setImgs(imgs.filter((_, j) => j !== i))} className="absolute top-[5px] right-[5px] w-7 h-7 rounded-full bg-white text-red border-none cursor-pointer flex items-center justify-center text-[12px]">✕</button>
                </div>
              ))}
            </div>
          )}
          {imgs.length === 0 && <div className="text-center p-6 bg-g50 rounded-md border border-dashed border-g200"><div className="text-[32px] mb-2">🖼</div><p className="text-[13px] text-g400">No images added yet. Paste a URL above.</p></div>}
        </div>

        <div className="flex gap-3 justify-end mt-[6px]">
          <button onClick={() => router.push('/admin/products')} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Cancel</button>
          <button onClick={save} className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Create Product</button>
        </div>
      </div>
    </div>
  );
}
