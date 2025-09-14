import { IUser } from "@/interfaces";
import { create } from "zustand";

export type Store = {
  user: IUser | null;
  setUser: (payload: IUser) => void;
};

const userGlobalStore = create<Store>()((set) => ({
  user: null,
  setUser: (payload: IUser) => set(() => ({ user: payload })),
}));

export const useUserStore = userGlobalStore;
