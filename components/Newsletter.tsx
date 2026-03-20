'use client';

import { useState } from 'react';
import { useToast } from '@/context/ToastContext';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!email.includes('@')) { toast('Enter a valid email', 'e'); return; }
    setEmail('');
    toast('Subscribed! ✨ Thanks for joining.');
  };

  return (
    <div className="bg-bk py-14 px-6 text-center">
      <h2 className="font-serif text-[30px] font-semibold text-white mb-2">Stay in Style</h2>
      <p className="text-g400 text-[14px] mb-6">Subscribe for exclusive access to new arrivals, special offers and style tips.</p>
      <div className="flex max-w-[440px] mx-auto rounded-md overflow-hidden border border-white/[.14]">
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email address" className="flex-1 px-4 py-3 bg-white/[.07] border-none text-white text-[14px] outline-none placeholder:text-white/[.38]" />
        <button onClick={handleSubmit} className="bg-rose text-white border-none px-5 py-3 font-bold cursor-pointer text-[13px] transition-colors hover:bg-[#960040]">Subscribe</button>
      </div>
      <p className="text-white/25 text-[12px] mt-[10px]">No spam, unsubscribe anytime.</p>
    </div>
  );
}
