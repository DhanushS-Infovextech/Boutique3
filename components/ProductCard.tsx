'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { fmt, dc } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }: { product: Product }) {
  const p = product;
  const d = dc(p.orig, p.price);
  const { quickAdd } = useCart();
  const { isWished, toggleWish } = useWishlist();
  const { toast } = useToast();
  const { user } = useAuth();
  const router = useRouter();
  const w = isWished(p.id);

  const handleAddCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    quickAdd(p);
    toast(p.name.slice(0, 28) + '… added to cart 🛍');
  };

  const handleWish = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) { router.push('/login'); return; }
    const added = toggleWish(p.id);
    toast(added ? 'Added to wishlist ♥' : 'Removed from wishlist', added ? 's' : 'i');
  };

  return (
    <Link href={`/product/${p.id}`} className="block cursor-pointer group">
      <div className="relative rounded-[10px] overflow-hidden aspect-[3/4] bg-g50">
        <Image src={p.imgs[0]} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.06]" sizes="(max-width: 768px) 50vw, 25vw" />
        <div className="absolute top-[10px] left-[10px] flex flex-col gap-1 z-[1]">
          {d > 0 && <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase bg-rose text-white">-{d}%</span>}
          {p.tags.includes('new') && <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase bg-bk text-white">NEW</span>}
          {p.tags.includes('trending') && <span className="inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold tracking-[.05em] uppercase bg-bk text-gold">🔥 TRENDING</span>}
        </div>
        <div className="absolute bottom-[10px] left-[10px] right-[10px] flex gap-[6px] opacity-0 translate-y-[6px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          <button onClick={handleAddCart} className="flex-1 bg-black/[.88] text-white border-none rounded-md py-[9px] text-[12px] font-semibold cursor-pointer backdrop-blur-[4px] transition-colors hover:bg-bk">Add to Cart</button>
          <button onClick={handleWish} className={`w-9 shrink-0 border-none rounded-md py-[9px] text-[14px] cursor-pointer flex items-center justify-center backdrop-blur-[4px] ${w ? 'bg-white text-rose' : 'bg-white/90 text-g500 hover:text-rose hover:bg-white'}`}>♥</button>
        </div>
      </div>
      <div className="pt-[11px] px-0.5">
        <div className="text-[10px] font-bold uppercase tracking-[.1em] text-g400 mb-[3px]">{p.cat}</div>
        <div className="text-[14px] font-medium leading-[1.35] mb-1">{p.name}</div>
        <div className="flex items-center gap-1 text-[12px] text-g400 mb-[6px]">
          <span className="text-gold text-[11px]">★★★★★</span>{p.rating} <span>({p.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-bold">{fmt(p.price)}</span>
          <span className="text-[12px] text-g400 line-through">{fmt(p.orig)}</span>
          {d > 0 && <span className="text-[10px] font-bold text-rose bg-rose2 px-[6px] py-0.5 rounded-[2px]">-{d}%</span>}
        </div>
      </div>
    </Link>
  );
}
