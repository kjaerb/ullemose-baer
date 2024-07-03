import { create } from "zustand";

export const periodOptions = [
  { value: 7, label: "7 dage" },
  { value: 30, label: "30 dage" },
  { value: 90, label: "3 måneder" },
];

export const yearOptions = [
  { value: 2023, label: 2023 },
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
