import { create } from "zustand";

interface InitialState {
   user: null | UserT;
   login: (usr: UserT | null) => void;
   signout: () => void;
}

export const useAuthStore = create<InitialState>()((set) => ({
   user: null,
   login: (usr) => set((state) => ({ user: usr })),
   signout: () => set((state) => ({ user: null })),
}));
