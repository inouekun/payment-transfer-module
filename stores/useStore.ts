import { create } from 'zustand';

interface MainState {
  fund: number;
  spend: (by: number) => void;
}

export const useMainStore = create<MainState>()((set) => ({
  fund: 500,
  spend: (by) => set((state) => ({ fund: state.fund - by })),
}));
