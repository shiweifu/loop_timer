import { create } from "zustand";
const useBearStore = create((set) => ({
  currentTimer: null,
  setCurrentTimer: (timer) => set({ currentTimer: timer }),
  remainTimerLabel: "0m",
  setRemainTimerLabel: (label) => set({ remainTimerLabel: label }),
}));

export { useBearStore };
