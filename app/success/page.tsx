'use client';

import Link from 'next/link';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function SuccessPage() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <div className="text-center py-20 px-5 max-w-[520px] mx-auto">
        <div className="w-[72px] h-[72px] bg-[#dcfce7] rounded-full flex items-center justify-center mx-auto mb-5 text-[28px] text-grn">✓</div>
        <h1 className="font-serif text-[32px] font-semibold mb-[10px]">Order Placed!</h1>
        <p className="text-[15px] text-g500 mb-7">Your order has been sent to Jamboos Boutique via WhatsApp. They&apos;ll confirm availability and share payment details shortly.</p>
        <div className="text-left bg-g50 border border-g200 rounded-[10px] p-5 mb-7">
          {[
            'Order sent to WhatsApp ✔',
            'Boutique confirms availability & payment',
            'Delivery in 3–5 business days',
            'Cash on delivery / UPI / Bank transfer',
          ].map((step, i) => (
            <div key={i} className="flex gap-3 items-start mb-3 last:mb-0 text-[13px] text-g600">
              <div className="w-5 h-5 bg-bk text-white rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 mt-[1px]">{i + 1}</div>
              <div>{step}</div>
            </div>
          ))}
        </div>
        <Link href="/" className="inline-flex items-center justify-center w-full max-w-[280px] gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all mx-auto">Continue Shopping</Link>
      </div>
      <Footer />
    </>
  );
}
