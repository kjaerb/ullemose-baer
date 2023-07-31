import { create } from "zustand";

export const periodOptions = [
  { value: 7, label: "7 dage" },
  { value: 30, label: "30 dage" },
  { value: 90, label: "3 måneder" },
];

export const yearOptions = [
  { value: new Date().getFullYear(), label: new Date().getFullYear() },
  { value: 2024, label: 2024 },
];

interface OrderStore {
  period: (typeof periodOptions)[number]["value"];
  setPeriod: (period: number) => void;
  year: (typeof yearOptions)[number]["value"];
  setYear: (year: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  period: 7,
  setPeriod: (period) => set({ period }),
  year: new Date().getFullYear(),
  setYear: (year) => set({ year }),
}));

export default useOrderStore;
