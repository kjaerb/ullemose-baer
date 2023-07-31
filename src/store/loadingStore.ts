import { create } from "zustand";

interface LoadingStore {
  ordersLoading: boolean;
  setOrdersLoading: (loading: boolean) => void;
}

const useLoadingStore = create<LoadingStore>((set) => ({
  ordersLoading: true,
  setOrdersLoading: (loading: boolean) => set({ ordersLoading: loading }),
}));

export default useLoadingStore;
