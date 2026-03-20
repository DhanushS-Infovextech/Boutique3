'use client';

import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  isOpen: boolean;
  content: React.ReactNode | null;
  showModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType>({ isOpen: false, content: null, showModal: () => {}, closeModal: () => {} });

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState<React.ReactNode | null>(null);
  const showModal = (c: React.ReactNode) => { setContent(c); setIsOpen(true); document.body.style.overflow = 'hidden'; };
  const closeModal = () => { setIsOpen(false); setContent(null); document.body.style.overflow = ''; };
  return <ModalContext.Provider value={{ isOpen, content, showModal, closeModal }}>{children}</ModalContext.Provider>;
}

export const useModal = () => useContext(ModalContext);

export function ModalContainer() {
  const { isOpen, content, closeModal } = useModal();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/45 z-[800] flex items-center justify-center p-5 animate-[fadeIn_.18s_ease]" onClick={closeModal}>
      <div className="bg-white rounded-[10px] shadow-[0_8px_40px_rgba(0,0,0,.15)] w-full max-w-[480px] max-h-[90vh] overflow-y-auto animate-[scaleUp_.18s_ease]" onClick={e => e.stopPropagation()}>
        {content}
      </div>
    </div>
  );
}
