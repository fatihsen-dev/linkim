import { create } from "zustand";

interface InitialState {
   user: null | object;
   login: (usr: object | null) => void;
   signout: () => void;
}

export const useAuthStore = create<InitialState>()((set) => ({
   user: null,
   login: (usr) => set((state) => ({ user: usr })),
   signout: () => set((state) => ({ user: null })),
}));
