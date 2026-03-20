'use client';

import Image from 'next/image';
import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Newsletter from '@/components/Newsletter';
import ProductCard from '@/components/ProductCard';
import { CATS, TESTIMONIALS } from '@/lib/data';
import { useStore } from '@/context/StoreContext';

export default function HomePage() {
  const { products } = useStore();
  const trending = products.filter(p => p.tags.includes('trending')).slice(0, 8);
  const editorPicks = [...products].sort((a, b) => b.rating - a.rating).slice(0, 8);
  const igImages = [
    '/images/bulbul-ahmed-q4Z_Z7Z2hHU-unsplash.jpg',
    '/images/bulbul-ahmed-UybW3XFh1mQ-unsplash.jpg',
    '/images/bulbul-ahmed-xTrp1WOq2Do-unsplash.jpg',
    '/images/kai-s-photography-2s3GhhJz2uY-unsplash.jpg',
    '/images/nikhil-uttam-QrOdhsMAQw8-unsplash.jpg',
    '/images/nikhil-uttam-TUxTiExlo2g-unsplash.jpg',
  ];

  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        {/* HERO */}
        <section className="relative min-h-[580px] flex items-center overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/images/bulbul-ahmed-arn2mcDxcEk-unsplash.jpg" alt="Hero" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/[.72] via-black/30 to-transparent" style={{ backgroundImage: 'linear-gradient(105deg, rgba(10,10,10,.72) 0%, rgba(10,10,10,.3) 60%, transparent 100%)' }} />
          </div>
          <div className="relative z-[1] max-w-[1280px] mx-auto px-6 py-16 w-full">
            <div className="text-[12px] font-semibold tracking-[.25em] uppercase text-gold mb-[14px]">Spring / Summer 2024</div>
            <h1 className="font-serif text-[60px] font-semibold text-white leading-[1.1] mb-[14px] max-w-[560px]">New Season,<br/>New You</h1>
            <p className="text-white/75 text-[16px] mb-[30px] max-w-[400px] leading-[1.6]">Discover the Spring/Summer 2024 Collection — where elegance meets everyday style</p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-[14px] rounded-md text-[15px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] hover:-translate-y-px hover:shadow-[0_4px_14px_rgba(0,0,0,.15)] transition-all">Shop Now</Link>
              <Link href="/shop?cat=bridal" className="inline-flex items-center justify-center gap-2 px-8 py-[14px] rounded-md text-[15px] font-semibold bg-transparent text-white border-[1.5px] border-white/70 hover:bg-white/[.12] transition-all">Explore Bridal</Link>
            </div>
            <div className="inline-flex items-center gap-[10px] bg-white/[.12] border border-white/[.22] text-white px-5 py-[10px] rounded-[40px] text-[13px] mt-[22px] backdrop-blur-[8px]">
              <strong className="text-[20px] font-bold font-serif">500+</strong> Designer Collections
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[36px] font-semibold tracking-[.02em] mb-[10px]">Shop by Category</h2>
              <p className="text-g500 text-[15px]">Explore our curated collections tailored for every occasion</p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {CATS.map(c => (
                <Link key={c.id} href={`/shop?cat=${c.id}`} className="relative rounded-[10px] overflow-hidden cursor-pointer aspect-[4/5] group">
                  <Image src={c.img} alt={c.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.07]" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent flex flex-col justify-end p-[22px] transition-colors group-hover:from-black/80">
                    <h3 className="text-white font-serif text-[20px] font-semibold mb-0.5">{c.name}</h3>
                    <p className="text-white/70 text-[12px] mb-3">{c.n} Products</p>
                    <span className="inline-block bg-white text-bk text-[11px] font-bold px-[14px] py-[5px] rounded-[3px] tracking-[.06em] uppercase transition-all group-hover:bg-gold group-hover:text-white w-fit">Explore</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* TRENDING */}
        <section className="py-16 bg-g50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-end justify-between mb-7 gap-3">
              <div>
                <h2 className="font-serif text-[32px] font-semibold tracking-[.02em]">Trending Now</h2>
                <p className="text-[13px] text-g400 mt-1">The most-loved pieces from our latest collections</p>
              </div>
              <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-bk border-[1.5px] border-bk hover:bg-bk hover:text-white transition-all">View All</Link>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {trending.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* SALE BANNER */}
        <section className="relative overflow-hidden">
          <div className="relative h-[300px]">
            <Image src="/images/bulbul-ahmed-blEZQCHeLh4-unsplash.jpg" alt="" fill className="object-cover brightness-[.32]" />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="text-[12px] font-bold tracking-[.25em] uppercase text-gold mb-3">Limited Time Offer</div>
            <h2 className="font-serif text-[48px] font-semibold text-white mb-3">Up to 40% Off</h2>
            <p className="text-white/75 text-[16px] mb-6">Shop our exclusive festive collection with incredible savings</p>
            <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-8 py-[14px] rounded-md text-[15px] font-semibold bg-rose text-white hover:bg-[#960040] hover:-translate-y-px transition-all">Shop the Sale</Link>
          </div>
        </section>

        {/* EDITOR'S PICKS */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex items-end justify-between mb-7 gap-3">
              <div>
                <h2 className="font-serif text-[32px] font-semibold tracking-[.02em]">Editor&apos;s Picks</h2>
                <p className="text-[13px] text-g400 mt-1">Handpicked selections from our fashion editors</p>
              </div>
              <Link href="/shop" className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-bk border-[1.5px] border-bk hover:bg-bk hover:text-white transition-all">View All</Link>
            </div>
            <div className="grid grid-cols-4 gap-5">
              {editorPicks.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-16 bg-g50">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[36px] font-semibold tracking-[.02em] mb-[10px]">What Our Customers Say</h2>
              <p className="text-g500 text-[15px]">Real reviews from real fashion lovers</p>
            </div>
            <div className="grid grid-cols-3 gap-5">
              {TESTIMONIALS.map((r, i) => (
                <div key={i} className="bg-g50 border border-g200 rounded-[10px] p-6">
                  <div className="text-gold text-[14px] mb-3">★★★★★</div>
                  <p className="text-[14px] text-g600 leading-[1.75] italic mb-4">&quot;{r.t}&quot;</p>
                  <div className="flex items-center gap-[10px]">
                    <Image src={r.img} alt={r.n} width={38} height={38} className="rounded-full object-cover w-[38px] h-[38px]" />
                    <div>
                      <div className="text-[13px] font-bold">{r.n}</div>
                      <div className="text-[11px] text-g400">{r.l}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="py-16 bg-white">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[36px] font-semibold tracking-[.02em] mb-[10px]">Follow Us on Instagram</h2>
              <p className="text-g500 text-[15px]">@jamboosboutique — Tag us to get featured!</p>
            </div>
            <div className="grid grid-cols-6 gap-[6px]">
              {igImages.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-md cursor-pointer group">
                  <Image src={img} alt="" fill className="object-cover transition-transform duration-[350ms] group-hover:scale-110" sizes="16vw" />
                  <div className="absolute inset-0 bg-black/45 flex items-center justify-center opacity-0 transition-opacity duration-[220ms] group-hover:opacity-100 text-[18px]">♥</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
