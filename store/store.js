import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  globalCurrentTimer: null,
  setGlobalCurrentTimer: (timer) => set({ globalCurrentTimer: timer }),
  globalRemainTimerLabel: "",
  setGlobalRemainTimerLabel: (label) => set({ globalRemainTimerLabel: label }),
  finishTimer: () => {
    set({ globalCurrentTimer: null });
    set({ remainTimerLabel: "" });
  },
  startTimer: (timer) => {
    set({ globalCurrentTimer: timer });
    let remainingTime = timer.duration;
    const _timerId = setInterval(() => {
      console.log("timer running: ", remainingTime);
      let remainMinutes = Math.floor(remainingTime / 60);
      let remainSeconds = remainingTime % 60;
      let remainLabel = `${remainMinutes
        .toString()
        .padStart(2, "0")}:${remainSeconds.toString().padStart(2, "0")}`;

      get().setGlobalRemainTimerLabel(remainLabel);

      if (remainingTime <= 0) {
        clearInterval(_timerId);
        get().finishTimer();
        return;
      }
      remainingTime -= 1;
    }, 1000);
  },
  globalRunning: () => {
    return get().globalCurrentTimer !== null;
  },
}));

export { useGlobalStore };
