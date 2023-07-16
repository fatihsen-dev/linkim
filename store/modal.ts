import { create } from "zustand";

interface InitialState {
   status: boolean;
   name: string;
   active: (status: boolean, name: string) => void;
   disable: () => void;
}

export const useModalStore = create<InitialState>()((set) => ({
   status: false,
   name: "",
   active: (status, name) => set((state) => ({ status: status, name: name })),
   disable: () => set(() => ({ status: false })),
}));
