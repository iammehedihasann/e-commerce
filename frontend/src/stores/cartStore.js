import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartItems,
  fetchCart
} from "../services/cartService.js";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      setCart: (cart) => set({ cart }),
      addItem: (product, quantity = 1) => {
        const cart = get().cart;
        const existing = cart.find((item) => item.id === product.id);
        const nextQuantity = Math.max(1, quantity);

        if (existing) {
          const updatedCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + nextQuantity } : item
          );
          set({
            cart: updatedCart
          });
          const token = localStorage.getItem("accessToken");
          if (token) {
            (async () => {
              try {
                const serverCart = await updateCartItem(product.id, existing.quantity + nextQuantity);
                set({ cart: serverCart });
              } catch {
                // Re-fetch to recover from server-side stock validation errors.
                const serverCart = await fetchCart().catch(() => null);
                if (serverCart) set({ cart: serverCart });
              }
            })();
          }
          return;
        }

        const updatedCart = [...cart, { ...product, quantity: nextQuantity }];
        set({ cart: updatedCart });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              const serverCart = await addCartItem(product.id, nextQuantity);
              set({ cart: serverCart });
            } catch {
              const serverCart = await fetchCart().catch(() => null);
              if (serverCart) set({ cart: serverCart });
            }
          })();
        }
      },
      removeItem: (productId) => {
        const updatedCart = get().cart.filter((item) => item.id !== productId);
        set({ cart: updatedCart });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              const serverCart = await removeCartItem(productId);
              set({ cart: serverCart });
            } catch {
              const serverCart = await fetchCart().catch(() => null);
              if (serverCart) set({ cart: serverCart });
            }
          })();
        }
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          const updatedCart = get().cart.filter((item) => item.id !== productId);
          set({ cart: updatedCart });

          const token = localStorage.getItem("accessToken");
          if (token) {
            (async () => {
              try {
                const serverCart = await removeCartItem(productId);
                set({ cart: serverCart });
              } catch {
                const serverCart = await fetchCart().catch(() => null);
                if (serverCart) set({ cart: serverCart });
              }
            })();
          }
          return;
        }

        const updatedCart = get().cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({
          cart: updatedCart
        });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              const serverCart = await updateCartItem(productId, quantity);
              set({ cart: serverCart });
            } catch {
              const serverCart = await fetchCart().catch(() => null);
              if (serverCart) set({ cart: serverCart });
            }
          })();
        }
      },
      clearCart: () => {
        set({ cart: [] });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              const serverCart = await clearCartItems();
              set({ cart: serverCart });
            } catch {
              // ignore
            }
          })();
        }
      },
      totalItems: () => get().cart.reduce((sum, item) => sum + item.quantity, 0)
    }),
    { name: "cart-storage" }
  )
);
