import { create } from "zustand";

interface InitialState {
   user: null | UserT;
   profile: null | ProfileT;
   login: (user: UserT | null, profile: null | ProfileT) => void;
   signout: () => void;
}

export const useAuthStore = create<InitialState>()((set) => ({
   user: null,
   profile: null,
   login: (user, profile) => set((state) => ({ user: user, profile: profile })),
   signout: () => set((state) => ({ user: null, profile: null })),
}));
