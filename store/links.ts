import { create } from "zustand";

interface InitialState {
   editLink: LinkT | null;
   links: LinkT[];
   setLinks: (links: LinkT[]) => void;
   setEditLink: (link: LinkT) => void;
}

export const useLinksStore = create<InitialState>()((set) => ({
   editLink: null,
   links: [],
   setLinks: (links) => set((state) => ({ links: links })),
   setEditLink: (link) => set((state) => ({ editLink: link })),
}));
