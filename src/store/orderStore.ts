import { create } from "zustand";

export const periodOptions = [
  { value: 7, label: "7 dage" },
  { value: 30, label: "30 dage" },
  { value: 90, label: "3 måneder" },
];

const currentYear = new Date().getFullYear();
const startYear = 2023;

export const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);


interface OrderStore {
  period: (typeof periodOptions)[number]["value"];
  setPeriod: (period: number) => void;
  year: number;
  setYear: (year: number) => void;
}

const useOrderStore = create<OrderStore>((set) => ({
  period: 7,
  setPeriod: (period) => set({ period }),
  year: years[years.length - 1],
  setYear: (year) => set({ year }),
}));

export default useOrderStore;
