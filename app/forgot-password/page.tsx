'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [alert, setAlert] = useState('');

  const handleSubmit = () => {
    if (!email.includes('@')) return;
    setAlert('If an account exists, a reset link has been sent.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-g50 p-6">
      <div className="w-full max-w-[440px] bg-white rounded-[10px] border border-g200 shadow-[0_8px_40px_rgba(0,0,0,.1)] p-9 animate-scaleUp">
        <div className="font-serif text-[26px] font-bold tracking-[.1em] text-center mb-1">JAMBOOS</div>
        <div className="text-center text-[13px] text-g400 mb-7">Reset your password</div>
        {alert && <div className="px-4 py-[11px] rounded-md text-[13px] mb-[14px] border bg-[#dcfce7] text-[#166534] border-[#bbf7d0]">{alert}</div>}
        <div className="flex flex-col gap-[13px]">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Email Address</label>
            <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <button onClick={handleSubmit} className="w-full inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Send Reset Link</button>
        </div>
        <div className="text-center text-[13px] text-g500 mt-[14px]"><Link href="/login" className="text-bk font-semibold underline">← Back to login</Link></div>
      </div>
    </div>
  );
}
