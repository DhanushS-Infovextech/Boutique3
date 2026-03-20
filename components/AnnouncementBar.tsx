'use client';

import Link from 'next/link';

export default function AnnouncementBar() {
  return (
    <div className="bg-bk text-white text-center py-[9px] px-4 text-[12px] tracking-[.02em]">
      ✨ <strong className="text-gold">Free Shipping</strong> on orders above ₹1,999 &nbsp;|&nbsp; Use code <strong className="text-gold">JAMBOOS10</strong> for 10% off
    </div>
  );
}
