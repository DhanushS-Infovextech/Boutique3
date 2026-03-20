'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

type ToastType = 's' | 'e' | 'i';

interface ToastItem {
  id: number;
  msg: string;
  type: ToastType;
}

interface ToastContextType {
  toasts: ToastItem[];
  toast: (msg: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toasts: [], toast: () => {} });

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const toast = useCallback((msg: string, type: ToastType = 's') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2800);
  }, []);
  return <ToastContext.Provider value={{ toasts, toast }}>{children}</ToastContext.Provider>;
}

export const useToast = () => useContext(ToastContext);

export function ToastContainer() {
  const { toasts } = useToast();
  const icons: Record<ToastType, { char: string; bg: string }> = {
    s: { char: '✓', bg: 'bg-green-600' },
    e: { char: '✕', bg: 'bg-red-600' },
    i: { char: 'i', bg: 'bg-rose-700' },
  };
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div key={t.id} className="bg-[#0a0a0a] text-white px-[18px] py-[11px] rounded-md text-[13px] font-medium shadow-[0_8px_24px_rgba(0,0,0,.18)] flex items-center gap-2 max-w-[320px] animate-[slideIn_.25s_ease]">
          <span className={`w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${icons[t.type].bg}`}>{icons[t.type].char}</span>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
