'use client';

import { ToastProvider, ToastContainer } from '@/context/ToastContext';
import { ModalProvider, ModalContainer } from '@/context/ModalContext';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { StoreProvider } from '@/context/StoreContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <ModalProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <StoreProvider>
                {children}
                <ToastContainer />
                <ModalContainer />
              </StoreProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ModalProvider>
    </ToastProvider>
  );
}
