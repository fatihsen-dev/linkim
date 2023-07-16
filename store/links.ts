import { create } from "zustand";

interface InitialState {
   links: LinkT[];
   setLinks: (links: LinkT[]) => void;
}

export const useLinksStore = create<InitialState>()((set) => ({
   links: [],
   setLinks: (links) => set((state) => ({ links: links })),
}));
