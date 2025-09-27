import { seat } from "@/interfaces";
import { create } from "zustand";

export type Store = {
  seats: seat[];
  setSeats: (seats: seat[]) => void;
  makeSeatAvailable: (id: number) => void;
};

const userGlobalStore = create<Store>()((set) => ({
  seats: [],
  setSeats: (payload: seat[]) =>
    set(() => ({
      seats: [...payload],
    })),
  makeSeatAvailable: (id: number) =>
    set((state) => {
      const updatedSeats = [...state.seats];
      updatedSeats[id - 1] = {
        ...updatedSeats[id - 1],
        status: "available",
      };
      return {
        seats: updatedSeats,
      };
    }),
}));

export const useSeatsStore = userGlobalStore;
