import { create } from "zustand";
export const useRestaurants = create((set) => ({
  allRestaurants: [],
  updateRestaurants: (newData) => set({ allRestaurants: newData }),
}));
