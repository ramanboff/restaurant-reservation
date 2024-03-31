import { create } from "zustand";
export const useRestaurants = create((set) => ({
  restaurants: [],
  modalState: false,
  date: new Date(),
  time: "10:00",
  guests: "0",

  setRestaurants: (newData) => set({ restaurants: newData }),
  setModalState: (newData) => set({ modalState: newData }),
  setDate: (newData) => set({ date: newData }),
  setTime: (newData) => set({ time: newData }),
  setGuests: (newData) => set({ guests: newData }),
}));
