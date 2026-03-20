'use client';

import { useStore } from '@/context/StoreContext';
import { useModal } from '@/context/ModalContext';
import { useToast } from '@/context/ToastContext';
import { fmt } from '@/lib/utils';
import { WA } from '@/lib/data';
import { Order } from '@/lib/types';

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore();
  const { showModal, closeModal } = useModal();
  const { toast } = useToast();
  const statusColor: Record<string, string> = { PENDING: 'bg-[#fef9c3] text-[#854d0e]', CONFIRMED: 'bg-[#dbeafe] text-[#1e40af]', PROCESSING: 'bg-[#dbeafe] text-[#1e40af]', SHIPPED: 'bg-[#f3e8ff] text-[#6b21a8]', DELIVERED: 'bg-[#dcfce7] text-[#166534]', CANCELLED: 'bg-[#fee2e2] text-[#991b1b]' };
  const statuses: Order['status'][] = ['PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];

  const viewOrder = (o: Order) => {
    showModal(
      <div>
        <div className="px-[22px] py-[18px] border-b border-g100 flex items-center justify-between">
          <h3 className="text-[16px] font-bold">Order {o.id}</h3>
          <button onClick={closeModal} className="text-g400 text-[22px] leading-none hover:text-bk cursor-pointer bg-none border-none">×</button>
        </div>
        <div className="p-[22px]">
          <div className="mb-[14px] pb-[14px] border-b border-g100 text-[13px] space-y-[3px]">
            <div><strong>Customer:</strong> {o.gName || 'Guest'}</div>
            <div><strong>Phone:</strong> {o.gPhone || '—'}</div>
            <div><strong>Address:</strong> {o.addr || '—'}</div>
            <div><strong>Date:</strong> {new Date(o.createdAt).toLocaleString('en-IN')}</div>
          </div>
          <div className="mb-[14px] pb-[14px] border-b border-g100">
            {o.items.map((i, idx) => (
              <div key={idx} className="flex justify-between text-[13px] py-1"><span>{i.name} × {i.qty}</span><span className="font-semibold">{fmt(i.price * i.qty)}</span></div>
            ))}
          </div>
          <div className="flex justify-between font-bold text-[15px]"><span>Total</span><span>{fmt(o.total)}</span></div>
        </div>
        <div className="px-[22px] py-[14px] border-t border-g100 flex gap-[10px] justify-end">
          <button onClick={closeModal} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-transparent text-g600 border border-g200 hover:border-bk hover:text-bk transition-all">Close</button>
          <button onClick={() => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(`Hi! Your Jamboos order ${o.id} status: ${o.status}`)}`, '_blank')} className="inline-flex items-center justify-center gap-2 px-4 py-[7px] rounded-md text-[12px] font-semibold bg-grn text-white hover:bg-[#15803d] transition-all">📲 WhatsApp</button>
        </div>
      </div>
    );
  };

  return (
    <div className="p-[26px] animate-fadeIn">
      <div className="flex items-start justify-between mb-[22px]">
        <div><h1 className="font-serif text-[26px] font-semibold">Orders</h1><p className="text-[13px] text-g400 mt-[3px]">{orders.length} total orders</p></div>
      </div>
      <div className="overflow-x-auto rounded-[10px] border border-g200 bg-white">
        <table className="w-full border-collapse text-[13px]">
          <thead className="bg-g50 border-b border-g200">
            <tr>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Order ID</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Customer</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Items</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Total</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Status</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Date</th>
              <th className="px-[15px] py-[10px] text-left text-[11px] font-bold uppercase tracking-[.08em] text-g400 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="hover:bg-g50">
                <td className="px-[15px] py-[11px] border-b border-g100 font-semibold text-[12px]">{o.id}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <div className="text-[13px] font-medium">{o.gName || 'Guest'}</div>
                  <div className="text-[11px] text-g400">{o.gPhone || ''}</div>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100">{o.items.length} item{o.items.length !== 1 ? 's' : ''}</td>
                <td className="px-[15px] py-[11px] border-b border-g100 font-bold">{fmt(o.total)}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <select className="px-2 py-1 border border-g200 rounded-md text-[11px] outline-none w-[120px] cursor-pointer bg-white" value={o.status} onChange={e => { updateOrderStatus(o.id, e.target.value as Order['status']); toast('Order ' + o.id + ' → ' + e.target.value, 'i'); }}>
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-[15px] py-[11px] border-b border-g100 text-[12px] text-g400">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                <td className="px-[15px] py-[11px] border-b border-g100">
                  <button onClick={() => viewOrder(o)} className="px-2 py-[5px] rounded-md border border-g200 bg-white cursor-pointer text-g500 text-[11px] font-semibold hover:border-bk hover:text-bk transition-all">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
