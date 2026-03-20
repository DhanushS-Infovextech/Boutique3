'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
  const { login, demoLogin } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [errors, setErrors] = useState({ email: false, pw: false });
  const [alert, setAlert] = useState('');

  const handleLogin = () => {
    const e = { email: !email || !email.includes('@'), pw: pw.length < 6 };
    setErrors(e);
    if (e.email || e.pw) return;
    const u = login(email, pw);
    if (!u) { setAlert('Invalid credentials. Try <b>admin@jamboos.in / admin123</b> or <b>user@jamboos.in / user123</b>'); return; }
    toast('Welcome back, ' + u.name.split(' ')[0] + '! 👋');
    if (u.role === 'admin') router.push('/admin');
    else router.push('/');
  };

  const handleDemo = (role: 'admin' | 'user') => {
    const u = demoLogin(role);
    if (u) {
      toast('Welcome back, ' + u.name.split(' ')[0] + '! 👋');
      if (u.role === 'admin') router.push('/admin');
      else router.push('/');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-g50 p-6">
      <div className="w-full max-w-[440px] bg-white rounded-[10px] border border-g200 shadow-[0_8px_40px_rgba(0,0,0,.1)] p-9 animate-scaleUp">
        <div className="font-serif text-[26px] font-bold tracking-[.1em] text-center mb-1">JAMBOOS</div>
        <div className="text-center text-[13px] text-g400 mb-7">Sign in to your account</div>
        {alert && <div className="px-4 py-[11px] rounded-md text-[13px] mb-[14px] border bg-[#fee2e2] text-[#991b1b] border-[#fecaca]" dangerouslySetInnerHTML={{ __html: alert }} />}
        <div className="flex flex-col gap-[13px]">
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Email</label>
            <input className={`px-[13px] py-[10px] border rounded-md text-[13px] outline-none focus:border-bk focus:shadow-[0_0_0_3px_rgba(0,0,0,.05)] transition-colors ${errors.email ? 'border-red' : 'border-g200'}`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
            {errors.email && <span className="text-[11px] text-red">Valid email required</span>}
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-[12px] font-semibold text-g800 tracking-[.03em]">Password</label>
            <input className={`px-[13px] py-[10px] border rounded-md text-[13px] outline-none focus:border-bk transition-colors ${errors.pw ? 'border-red' : 'border-g200'}`} type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 6 characters" />
            {errors.pw && <span className="text-[11px] text-red">Min. 6 characters</span>}
          </div>
          <button onClick={handleLogin} className="w-full inline-flex items-center justify-center gap-2 px-6 py-[11px] rounded-md text-[13px] font-semibold bg-bk text-white hover:bg-[#1a1a1a] transition-all">Sign In</button>
        </div>
        <div className="text-center text-[12px] text-g400 my-[14px] relative before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-[43%] before:h-px before:bg-g200 after:content-[''] after:absolute after:top-1/2 after:right-0 after:w-[43%] after:h-px after:bg-g200">or try demo</div>
        <div className="flex flex-col gap-2">
          <button onClick={() => handleDemo('user')} className="w-full inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[13px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Demo as Customer</button>
          <button onClick={() => handleDemo('admin')} className="w-full inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[13px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Demo as Admin</button>
        </div>
        <div className="text-center text-[13px] text-g500 mt-4">Forgot password? <Link href="/forgot-password" className="text-bk font-semibold underline">Reset it</Link></div>
        <div className="text-center text-[13px] text-g500 mt-[14px]">No account? <Link href="/register" className="text-bk font-semibold underline">Create one</Link></div>
      </div>
    </div>
  );
}
