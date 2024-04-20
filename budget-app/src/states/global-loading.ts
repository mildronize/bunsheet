import { create } from "zustand";

export const useGlobalLoadingStore = create<{
  isLoading: boolean;
  nextRoutePath: string;
  setNextRoutePath: (nextRoutePath: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}>((set) => ({
  isLoading: false,
  nextRoutePath: "",
  setNextRoutePath: (nextRoutePath: string) => set({ nextRoutePath }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
