import { create } from "zustand";

interface InitialState {
   status: boolean;
   name: string;
   open: (name: string) => void;
   close: () => void;
}

export const useModalStore = create<InitialState>()((set) => ({
   status: false,
   name: "",
   open: (name) => set((state) => ({ status: true, name: name })),
   close: () => set(() => ({ status: false })),
}));
