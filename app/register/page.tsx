'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [fn, setFn] = useState('');
  const [ln, setLn] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pw, setPw] = useState('');
  const [alert, setAlert] = useState('');

  const handleReg = () => {
    if (!fn || !ln || !email.includes('@') || pw.length < 6) { setAlert('Please fill all required fields correctly.'); return; }
    const result = register(fn + ' ' + ln, email, phone, pw);
    if (result.error) { setAlert(result.error); return; }
    toast('Welcome, ' + fn + '! 👋');
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-g50 p-6">
      <div className="w-full max-w-[440px] bg-white rounded-[10px] border border-g200 shadow-[0_8px_40px_rgba(0,0,0,.1)] p-9 animate-scaleUp">
        <div className="font-serif text-[26px] font-bold tracking-[.1em] text-center mb-1">JAMBOOS</div>
        <div className="text-center text-[13px] text-g400 mb-7">Create your account</div>
        {alert && <div className="px-4 py-[11px] rounded-md text-[13px] mb-[14px] border bg-[#fee2e2] text-[#991b1b] border-[#fecaca]">{alert}</div>}
        <div className="flex flex-col gap-[13px]">
          <div className="grid grid-cols-2 gap-[14px]">
            <div className="flex flex-col gap-[5px]">
              <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">First Name *</label>
              <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={fn} onChange={e => setFn(e.target.value)} placeholder="Priya" />
            </div>
            <div className="flex flex-col gap-[5px]">
              <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Last Name *</label>
              <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" value={ln} onChange={e => setLn(e.target.value)} placeholder="Sharma" />
            </div>
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Email *</label>
            <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Phone</label>
            <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Password *</label>
            <input className="px-[13px] py-[10px] border border-g200 rounded-md text-[13px] outline-none focus:border-bk transition-colors" type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 6 characters" />
          </div>
          <button onClick={handleReg} className="w-full inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Create Account</button>
        </div>
        <div className="text-center text-[13px] text-g500 mt-[14px]">Already have an account? <Link href="/login" className="text-bk font-semibold underline">Sign in</Link></div>
      </div>
    </div>
  );
}
