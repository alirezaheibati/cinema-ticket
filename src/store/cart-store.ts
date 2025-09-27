import { seat } from "@/interfaces";
import { create } from "zustand";

export type Store = {
  showId: number | null;
  cart: { seat: seat }[];
  addToCart: (payload: { seat: seat }) => void;
  removeFromCart: (seatNumber: number) => void;
  setShowId: (id: number) => void;
  resetCart: () => void;
};

const userGlobalStore = create<Store>()((set) => ({
  showId: null,
  cart: [],
  setShowId: (payload: number) => {
    set(() => ({
      showId: payload,
    }));
  },
  addToCart: (payload: { seat: seat }) =>
    set((state) => ({
      cart: [...state.cart, { seat: payload.seat }],
    })),
  removeFromCart: (seatNumber: number) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.seat.number !== seatNumber),
    })),
  resetCart: () =>
    set(() => ({
      cart: [],
      showId: null,
    })),
}));

export const useCartStore = userGlobalStore;
