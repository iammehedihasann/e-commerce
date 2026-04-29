import { create } from "zustand";
import { persist } from "zustand/middleware";
import { addWishlistItem, fetchWishlist, removeWishlistItem } from "../services/wishlistService.js";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      setWishlist: (wishlist) => set({ wishlist }),
      toggleItem: (product) => {
        const wishlist = get().wishlist;
        const exists = wishlist.some((item) => item.id === product.id);

        const updatedWishlist = exists
          ? wishlist.filter((item) => item.id !== product.id)
          : [...wishlist, product];

        set({ wishlist: updatedWishlist });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              if (exists) {
                const serverWishlist = await removeWishlistItem(product.id);
                set({ wishlist: serverWishlist });
              } else {
                const serverWishlist = await addWishlistItem(product.id);
                set({ wishlist: serverWishlist });
              }
            } catch {
              const serverWishlist = await fetchWishlist().catch(() => null);
              if (serverWishlist) set({ wishlist: serverWishlist });
            }
          })();
        }
      },
      removeItem: (productId) => {
        const updatedWishlist = get().wishlist.filter((item) => item.id !== productId);
        set({ wishlist: updatedWishlist });

        const token = localStorage.getItem("accessToken");
        if (token) {
          (async () => {
            try {
              const serverWishlist = await removeWishlistItem(productId);
              set({ wishlist: serverWishlist });
            } catch {
              const serverWishlist = await fetchWishlist().catch(() => null);
              if (serverWishlist) set({ wishlist: serverWishlist });
            }
          })();
        }
      }
    }),
    { name: "wishlist-storage" }
  )
);
