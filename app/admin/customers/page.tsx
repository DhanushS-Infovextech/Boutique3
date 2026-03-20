'use client';

import { useAuth } from '@/context/AuthContext';
import { useStore } from '@/context/StoreContext';
import { useToast } from '@/context/ToastContext';

export default function AdminCustomers() {
  const { users } = useAuth();
  const { orders } = useStore();
  const { toast } = useToast();
  const custs = users.filter(u => u.role === 'user');

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px]">
        <div><h1 className="font-serif text-[26px] font-semibold">Customers</h1><p className="text-[13px] text-g400 mt-[3px]">{custs.length} registered</p></div>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-g200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-g50 border-b border-g200">
            <tr>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Customer</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Email</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Phone</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Orders</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Joined</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {custs.map(u => {
              const uo = orders.filter(o => o.uid === u.id);
              return (
                <tr key={u.id} className="hover:bg-g50">
                  <td className="px-[15px] py-[11px] border-b border-g100">
                    <div className="flex items-center gap-[10px]">
                      <div className="w-8 h-8 rounded-full bg-bk text-white flex items-center justify-center text-[13px] font-bold shrink-0">{u.name[0]}</div>
                      <span className="font-semibold text-[13px]">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-[15px] py-[11px] border-b border-g100 text-[13px]">{u.email}</td>
                  <td className="px-[15px] py-[11px] border-b border-g100 text-[13px]">{u.phone || '—'}</td>
                  <td className="px-[15px] py-[11px] border-b border-g100">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-[3px] text-[10px] font-bold ${uo.length > 0 ? 'bg-[#dcfce7] text-[#166534]' : 'bg-g100 text-g600'}`}>{uo.length} order{uo.length !== 1 ? 's' : ''}</span>
                  </td>
                  <td className="px-[15px] py-[11px] border-b border-g100 text-[12px] text-g400">{u.joined}</td>
                  <td className="px-[15px] py-[11px] border-b border-g100">
                    <button onClick={() => toast('Customer profile view', 'i')} className="px-2 py-[5px] rounded-md border border-g200 bg-white cursor-pointer text-g500 text-[11px] font-semibold hover:border-bk hover:text-bk transition-all">View</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
