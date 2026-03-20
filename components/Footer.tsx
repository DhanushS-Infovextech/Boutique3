'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-14 pb-6">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-[2.2fr_1fr_1fr_1.3fr] gap-10 mb-11">
          <div>
            <div className="font-serif text-2xl font-bold tracking-[.1em] mb-3">JAMBOOS</div>
            <p className="text-white/40 text-[13px] leading-[1.75] mb-[18px]">Curating premium fashion for the modern woman. From ethnic elegance to western chic — discover your style at Jamboos Boutique.</p>
            <div className="flex gap-2">
              {['f', 'in', 'tw', 'yt'].map(s => (
                <div key={s} className="w-8 h-8 rounded-full bg-white/[.07] border border-white/10 flex items-center justify-center cursor-pointer text-white/40 text-[11px] font-bold transition-all hover:bg-rose hover:border-rose hover:text-white">{s}</div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-[.12em] uppercase text-white/30 mb-[14px]">Quick Links</h4>
            <ul className="space-y-[9px]">
              <li><Link href="/shop" className="text-white/50 text-[13px] hover:text-white transition-colors">Shop All</Link></li>
              <li><Link href="/shop?cat=ethnic-wear" className="text-white/50 text-[13px] hover:text-white transition-colors">Ethnic Wear</Link></li>
              <li><Link href="/shop?cat=western-wear" className="text-white/50 text-[13px] hover:text-white transition-colors">Western Wear</Link></li>
              <li><Link href="/shop?cat=party-wear" className="text-white/50 text-[13px] hover:text-white transition-colors">Party Wear</Link></li>
              <li><Link href="/shop?cat=bridal" className="text-white/50 text-[13px] hover:text-white transition-colors">Bridal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-[.12em] uppercase text-white/30 mb-[14px]">Customer Service</h4>
            <ul className="space-y-[9px]">
              <li><Link href="/account?tab=orders" className="text-white/50 text-[13px] hover:text-white transition-colors">Track Order</Link></li>
              <li><span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Returns</span></li>
              <li><span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Size Guide</span></li>
              <li><span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">FAQ</span></li>
              <li><span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Privacy</span></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold tracking-[.12em] uppercase text-white/30 mb-[14px]">Contact Us</h4>
            <div className="flex gap-[10px] mb-[9px] text-white/50 text-[13px] leading-[1.5]"><span>📍</span><span>123 Fashion Street, Linking Road, Mumbai 400050</span></div>
            <div className="flex gap-[10px] mb-[9px] text-white/50 text-[13px] leading-[1.5]"><span>📞</span><span>+91 98765 43210</span></div>
            <div className="flex gap-[10px] mb-[9px] text-white/50 text-[13px] leading-[1.5]"><span>✉️</span><span>hello@jamboos.in</span></div>
          </div>
        </div>
        <div className="border-t border-white/[.07] pt-[22px] flex justify-between items-center gap-3 flex-wrap">
          <p className="text-white/25 text-[12px]">© 2024 Jamboos Boutique. All rights reserved.</p>
          <div className="flex gap-[18px]">
            <span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Terms</span>
            <span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Privacy</span>
            <span className="text-white/50 text-[13px] cursor-pointer hover:text-white transition-colors">Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
