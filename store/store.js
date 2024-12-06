import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  currentTimer: null,
  lastTimer: null,
  setCurrentTimer: (timer) => set({ currentTimer: timer }),
  remainTimerLabel: "",
  setRemainTimerLabel: (label) => set({ remainTimerLabel: label }),
  finishTimer: () => {
    set({
      lastTimer: get().currentTimer,
      currentTimer: null,
      remainTimerLabel: "",
    });
  },
  stopTimer: () => {
    set({
      lastTimer: null,
      currentTimer: null,
      remainTimerLabel: "",
    });
  },
  startTimer: (timer) => {
    set({ currentTimer: timer, lastTimer: null });
    let remainingTime = timer.duration;
    const _timerId = setInterval(() => {
      console.log("timer running: ", remainingTime);
      let remainMinutes = Math.floor(remainingTime / 60);
      let remainSeconds = remainingTime % 60;
      let remainLabel = `${remainMinutes
        .toString()
        .padStart(2, "0")}:${remainSeconds.toString().padStart(2, "0")}`;

      get().setRemainTimerLabel(remainLabel);

      if (remainingTime <= 0) {
        clearInterval(_timerId);
        get().finishTimer();
        return;
      }
      remainingTime -= 1;
    }, 1000);
  },
  running: () => {
    return get().currentTimer !== null;
  },
}));

export { useGlobalStore };
