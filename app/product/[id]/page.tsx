'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useStore } from '@/context/StoreContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { fmt, dc } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { products } = useStore();
  const { addToCart } = useCart();
  const { isWished, toggleWish } = useWishlist();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();

  const p = products.find(x => x.id === id);
  const [selImg, setSelImg] = useState(0);
  const [selCol, setSelCol] = useState(0);
  const [selSz, setSelSz] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState(0);

  if (!p) return (<><AnnouncementBar /><Navbar /><div className="text-center py-[100px]"><h2 className="text-2xl font-bold mb-4">Product not found</h2><Link href="/shop" className="text-rose underline">Browse products</Link></div><Footer /></>);

  const d = dc(p.orig, p.price);
  const related = products.filter(x => x.cid === p.cid && x.id !== id).slice(0, 4);
  const w = isWished(p.id);

  const handleAddCart = (buyNow = false) => {
    addToCart(p, selSz || p.sizes[0], p.colors[selCol], p.colNames[selCol], qty);
    toast(p.name.slice(0, 28) + '… added to cart 🛍');
    if (buyNow) router.push('/cart');
  };

  const handleWish = () => {
    if (!user) { router.push('/login'); return; }
    const added = toggleWish(p.id);
    toast(added ? 'Added to wishlist ♥' : 'Removed from wishlist', added ? 's' : 'i');
  };

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      {/* Breadcrumb */}
      <div className="max-w-[1100px] mx-auto px-6 pt-[18px]">
        <div className="text-[12px] text-g400 mb-2">
          <Link href="/" className="cursor-pointer hover:text-bk transition-colors">Home</Link>
          <span className="mx-[6px] text-g200">›</span>
          <Link href="/shop" className="cursor-pointer hover:text-bk transition-colors">Shop</Link>
          <span className="mx-[6px] text-g200">›</span>
          <span>{p.name}</span>
        </div>
      </div>

      {/* Detail */}
      <div className="max-w-[1100px] mx-auto px-6 py-[26px] grid grid-cols-2 gap-[46px]">
        {/* Gallery */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-2 shrink-0">
            {p.imgs.map((img, i) => (
              <div key={i} onClick={() => setSelImg(i)} className={`w-[70px] h-[90px] rounded-md overflow-hidden cursor-pointer border-2 transition-colors ${i === selImg ? 'border-bk' : 'border-transparent'}`}>
                <Image src={img} alt="" width={70} height={90} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex-1 relative rounded-[10px] overflow-hidden aspect-[3/4] group">
            <Image src={p.imgs[selImg]} alt={p.name} fill className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]" sizes="50vw" />
            {d > 0 && <div className="absolute top-[14px] left-[14px] bg-rose text-white text-[11px] font-bold px-[11px] py-[5px] rounded-[3px]">-{d}% OFF</div>}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="text-[11px] font-bold tracking-[.12em] uppercase text-rose mb-[7px]">{p.cat}</div>
          <h1 className="font-serif text-[30px] font-semibold leading-[1.2] mb-[10px]">{p.name}</h1>
          <div className="flex items-center gap-[6px] text-[13px] text-g400 mb-4">
            <span className="text-gold">★★★★★</span> {p.rating} <span>({p.reviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-5 pb-[18px] border-b border-g100">
            <span className="text-[30px] font-bold font-serif">{fmt(p.price)}</span>
            <span className="text-[16px] text-g400 line-through">{fmt(p.orig)}</span>
            {d > 0 && <span className="text-[12px] font-bold text-rose bg-rose2 px-[10px] py-[3px] rounded-[3px]">Save {fmt(p.orig - p.price)}</span>}
          </div>

          {/* Color */}
          <div className="text-[11px] font-bold uppercase tracking-[.08em] text-bk mb-[9px]">Color: <span className="text-[12px] font-normal normal-case tracking-normal text-g400 ml-[6px]">{p.colNames[selCol]}</span></div>
          <div className="flex gap-2 mb-[18px]">
            {p.colors.map((c, i) => (
              <div key={i} onClick={() => setSelCol(i)} title={p.colNames[i]} className={`w-7 h-7 rounded-full cursor-pointer border-2 transition-all ${i === selCol ? 'border-bk shadow-[0_0_0_2px_#fff_inset]' : 'border-transparent'}`} style={{ background: c }} />
            ))}
          </div>

          {/* Size */}
          <div className="text-[11px] font-bold uppercase tracking-[.08em] text-bk mb-[9px]">Size: <span className="text-[12px] font-normal normal-case tracking-normal text-g400 ml-[6px]">{selSz || 'Select a size'}</span> <span className="text-[11px] text-rose cursor-pointer font-normal ml-[6px]">Size Guide</span></div>
          <div className="flex gap-2 flex-wrap mb-[18px]">
            {p.sizes.map(s => (
              <button key={s} onClick={() => setSelSz(s)} className={`min-w-[44px] h-[38px] border rounded-md text-[13px] font-semibold cursor-pointer px-[10px] transition-all ${selSz === s ? 'bg-bk text-white border-bk' : 'bg-white border-g200 hover:bg-bk hover:text-white hover:border-bk'}`}>{s}</button>
            ))}
          </div>

          {/* Qty */}
          <div className="flex items-center gap-[14px] mb-5">
            <span className="text-[11px] font-bold uppercase tracking-[.08em] text-bk">Qty</span>
            <div className="flex items-center border border-g200 rounded-md overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-[38px] h-[38px] bg-white border-none cursor-pointer text-[18px] font-light flex items-center justify-center hover:bg-g50 transition-colors">−</button>
              <div className="w-[44px] text-center text-[14px] font-semibold border-x border-g200 h-[38px] flex items-center justify-center">{qty}</div>
              <button onClick={() => setQty(qty + 1)} className="w-[38px] h-[38px] bg-white border-none cursor-pointer text-[18px] font-light flex items-center justify-center hover:bg-g50 transition-colors">+</button>
            </div>
            <span className="text-[12px] text-g400">{p.stock} in stock</span>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-[10px] mb-[18px]">
            <button onClick={() => handleAddCart(false)} className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-transparent text-bk border-[1.5px] border-bk hover:bg-bk hover:text-white transition-all">Add to Cart</button>
            <button onClick={() => handleAddCart(true)} className="inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,.15)] transition-all">Buy Now</button>
          </div>
          <button onClick={handleWish} className="w-full inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-rose border border-rose hover:bg-rose2 transition-all mb-4">{w ? '♥ Saved' : '♡ Add to Wishlist'}</button>

          <div className="flex gap-4 flex-wrap pt-[14px] border-t border-g100">
            <span className="flex items-center gap-[6px] text-[12px] text-g500">🚚 Free Shipping over ₹1,999</span>
            <span className="flex items-center gap-[6px] text-[12px] text-g500">🔒 Secure Payment</span>
            <span className="flex items-center gap-[6px] text-[12px] text-g500">🔄 Easy Returns</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="flex border-b border-g200 mb-5">
          {['Description', `Reviews (${p.reviews})`, 'Care & Delivery'].map((label, i) => (
            <button key={i} onClick={() => setTab(i)} className={`px-5 py-3 text-[13px] font-semibold cursor-pointer border-b-2 -mb-px transition-all ${tab === i ? 'text-bk border-bk' : 'text-g400 border-transparent'}`}>{label}</button>
          ))}
        </div>
        <div className="text-[14px] text-g600 leading-[1.8] pb-[30px]">
          {tab === 0 && p.desc}
          {tab === 1 && (
            <div>
              <p className="text-g400">Average rating: {p.rating}/5.0 ★ from {p.reviews} reviews</p>
              <div className="mt-[14px] flex flex-col gap-[10px]">
                <div className="p-3 bg-g50 rounded-md"><div className="font-semibold text-[13px] mb-[3px]">Priya M. ★★★★★</div><div className="text-[13px] text-g600">Beautiful quality, exactly as described!</div></div>
                <div className="p-3 bg-g50 rounded-md"><div className="font-semibold text-[13px] mb-[3px]">Meena R. ★★★★★</div><div className="text-[13px] text-g600">Fast delivery and gorgeous product.</div></div>
              </div>
            </div>
          )}
          {tab === 2 && (<><strong>Care Instructions</strong><br /><br />{p.care}<br /><br /><strong>Delivery</strong><br />Standard: 3–5 business days. Express available at checkout.</>)}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-g50 py-10">
          <div className="max-w-[1100px] mx-auto px-6">
            <h2 className="font-serif text-[26px] font-semibold mb-5">You May Also Like</h2>
            <div className="grid grid-cols-4 gap-5">
              {related.map(rp => <ProductCard key={rp.id} product={rp} />)}
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
