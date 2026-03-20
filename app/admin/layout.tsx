'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ADMIN_NAV } from '@/lib/data';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const pathname = usePathname();

  const getActiveId = () => {
    if (pathname === '/admin') return 'dashboard';
    const segment = pathname.split('/admin/')[1]?.split('/')[0];
    return segment || 'dashboard';
  };

  const activeId = getActiveId();

  return (
    <div className="flex min-h-screen bg-g50">
      <nav className="w-[236px] min-h-screen bg-bk text-white flex flex-col py-[22px] px-[10px] shrink-0 sticky top-0 h-screen overflow-y-auto">
        <div className="font-serif text-[22px] font-bold tracking-[.1em] px-2 mb-[3px]">JAMBOOS</div>
        <div className="text-[10px] font-bold tracking-[.15em] uppercase text-white/25 px-2 mb-[26px]">Admin Panel</div>
        <div>
          {ADMIN_NAV.map(p => (
            <Link
              key={p.id}
              href={p.id === 'dashboard' ? '/admin' : `/admin/${p.id}`}
              className={`flex items-center gap-[10px] px-[10px] py-[9px] rounded-md text-[13px] font-medium cursor-pointer w-full text-left mb-[1px] transition-all ${activeId === p.id ? 'bg-rose text-white' : 'text-white/50 hover:bg-white/[.08] hover:text-white/90'}`}
            >
              <span className="text-[13px]">{p.ic}</span> {p.lbl}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-[14px]">
          <Link href="/" className="flex items-center gap-[10px] px-[10px] py-[9px] rounded-md text-[13px] font-medium text-white/50 hover:bg-white/[.08] hover:text-white/90 transition-all">
            <svg viewBox="0 0 24 24" className="w-[15px] h-[15px] stroke-current fill-none" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
            Back to Shop
          </Link>
        </div>
      </nav>
      <div className="flex-1 overflow-auto min-w-0">
        {children}
      </div>
    </div>
  );
}
