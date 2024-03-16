import { create } from 'zustand'

interface SelectedItemStore {
  selectedStoreItem: any;
  setSelectedStoreItem: (item: any) => void;
}

export const useSelectedItemStore = create<SelectedItemStore>((set) => ({
  selectedStoreItem: null,
  setSelectedStoreItem: (item: any) => set({ selectedStoreItem: item }),
}));
