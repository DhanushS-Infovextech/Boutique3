'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { CATS } from '@/lib/data';
import { useStore } from '@/context/StoreContext';
import { Suspense } from 'react';

function ShopContent() {
  const searchParams = useSearchParams();
  const initCat = searchParams.get('cat') || 'all';
  const { products } = useStore();

  const [shopCat, setShopCat] = useState(initCat);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [maxPrice, setMaxPrice] = useState(70000);
  const [fTrend, setFTrend] = useState(false);
  const [fNew, setFNew] = useState(false);
  const [fSale, setFSale] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (shopCat !== 'all') list = list.filter(p => p.cid === shopCat);
    if (search) { const q = search.toLowerCase(); list = list.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q)); }
    list = list.filter(p => p.price <= maxPrice);
    if (fTrend) list = list.filter(p => p.tags.includes('trending'));
    if (fNew) list = list.filter(p => p.tags.includes('new'));
    if (fSale) list = list.filter(p => p.orig > p.price);
    if (sort === 'pa') list.sort((a, b) => a.price - b.price);
    if (sort === 'pd') list.sort((a, b) => b.price - a.price);
    if (sort === 'rat') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'new') list.sort((a, b) => b.id.localeCompare(a.id));
    return list;
  }, [products, shopCat, search, sort, maxPrice, fTrend, fNew, fSale]);

  const catName = CATS.find(c => c.id === shopCat)?.name || 'All Collections';

  const reset = () => { setShopCat('all'); setSearch(''); setSort(''); setMaxPrice(70000); setFTrend(false); setFNew(false); setFSale(false); };

  return (
    <>
      {/* HEADER */}
      <div className="bg-g50 border-b border-g200 py-[30px]">
        <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between flex-wrap gap-[14px]">
          <div>
            <div className="text-[12px] text-g400 mb-1">
              <Link href="/" className="cursor-pointer hover:text-bk transition-colors">Home</Link>
              <span className="mx-[6px] text-g200">›</span><span>Shop</span>
            </div>
            <h1 className="font-serif text-[30px] font-semibold">{catName}</h1>
            <p className="text-[13px] text-g400 mt-[3px]">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex gap-[10px] items-center flex-wrap">
            <input className="px-[14px] py-[9px] border border-g200 rounded-md text-[13px] outline-none w-[200px] focus:border-bk transition-colors" type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} />
            <select className="px-[14px] py-[9px] border border-g200 rounded-md text-[13px] outline-none cursor-pointer bg-white pr-8" value={sort} onChange={e => setSort(e.target.value)} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none' stroke='%236b7280' stroke-width='2'%3E%3Cpath d='m1 1 5 5 5-5'/%3E%3C/svg%3E\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', appearance: 'none' }}>
              <option value="">Sort: Featured</option>
              <option value="pa">Price: Low → High</option>
              <option value="pd">Price: High → Low</option>
              <option value="rat">Top Rated</option>
              <option value="new">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* SHOP LAYOUT */}
      <div className="max-w-[1280px] mx-auto px-6 py-[26px] grid grid-cols-[220px_1fr] gap-[26px]">
        {/* SIDEBAR */}
        <aside className="bg-white border border-g200 rounded-[10px] p-[18px] h-fit sticky top-[74px]">
          <div className="mb-5 pb-5 border-b border-g100">
            <div className="text-[11px] font-bold uppercase tracking-[.1em] text-bk mb-[11px]">Category</div>
            {[{ id: 'all', name: 'All Categories' }, ...CATS].map(c => (
              <label key={c.id} className="flex items-center gap-2 cursor-pointer text-[13px] text-g600 mb-[7px] hover:text-bk transition-colors">
                <input type="radio" name="cr" checked={shopCat === c.id} onChange={() => setShopCat(c.id)} className="cursor-pointer accent-bk shrink-0" /> {c.name}
              </label>
            ))}
          </div>
          <div className="mb-5 pb-5 border-b border-g100">
            <div className="text-[11px] font-bold uppercase tracking-[.1em] text-bk mb-[11px]">Price Range</div>
            <input type="range" min="0" max="70000" step="500" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} className="w-full accent-bk" />
            <div className="flex justify-between text-[11px] text-g400 mt-[5px]"><span>₹0</span><span>₹{maxPrice.toLocaleString('en-IN')}</span></div>
          </div>
          <div className="mb-5 pb-5 border-b border-g100">
            <div className="text-[11px] font-bold uppercase tracking-[.1em] text-bk mb-[11px]">Collections</div>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-g600 mb-[7px] hover:text-bk"><input type="checkbox" checked={fTrend} onChange={e => setFTrend(e.target.checked)} className="cursor-pointer accent-bk" /> Trending</label>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-g600 mb-[7px] hover:text-bk"><input type="checkbox" checked={fNew} onChange={e => setFNew(e.target.checked)} className="cursor-pointer accent-bk" /> New Arrivals</label>
            <label className="flex items-center gap-2 cursor-pointer text-[13px] text-g600 mb-[7px] hover:text-bk"><input type="checkbox" checked={fSale} onChange={e => setFSale(e.target.checked)} className="cursor-pointer accent-bk" /> On Sale</label>
          </div>
          <button onClick={reset} className="w-full px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Reset Filters</button>
        </aside>

        {/* PRODUCTS */}
        <div>
          <div className="flex flex-wrap gap-[7px] mb-[18px]">
            {[{ id: 'all', name: 'All' }, ...CATS].map(c => (
              <span key={c.id} onClick={() => setShopCat(c.id)} className={`px-[14px] py-[5px] rounded-[20px] text-[12px] font-medium cursor-pointer border transition-all ${shopCat === c.id ? 'bg-bk text-white border-bk' : 'bg-white text-g600 border-g200 hover:bg-bk hover:text-white hover:border-bk'}`}>{c.name}</span>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16 px-5">
              <div className="text-[52px] mb-4">🔍</div>
              <h3 className="text-[18px] font-bold mb-2">No products found</h3>
              <p className="text-g500 text-[14px] mb-[22px]">Try adjusting your filters</p>
              <button onClick={reset} className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Reset</button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
        <ShopContent />
      </Suspense>
      <Footer />
    </>
  );
}
