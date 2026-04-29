import { create } from "zustand";
import { persist } from "zustand/middleware";
import { fetchMe, login as loginRequest, register as registerRequest } from "../services/authService";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setSession: ({ user, accessToken, refreshToken }) => {
        localStorage.setItem("accessToken", accessToken);
        set({ user, accessToken, refreshToken, isAuthenticated: true });
      },
      login: async (payload) => {
        const session = await loginRequest(payload);
        localStorage.setItem("accessToken", session.accessToken);
        set({ ...session, isAuthenticated: true });
        return session.user;
      },
      register: async (payload) => {
        const session = await registerRequest(payload);
        localStorage.setItem("accessToken", session.accessToken);
        set({ ...session, isAuthenticated: true });
        return session.user;
      },
      hydrateSession: async () => {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
          return null;
        }

        try {
          const user = await fetchMe();
          set((state) => ({
            ...state,
            user,
            accessToken: token,
            isAuthenticated: true
          }));
          return user;
        } catch {
          localStorage.removeItem("accessToken");
          set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
          return null;
        }
      },
      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
