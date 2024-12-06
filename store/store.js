import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  currentTimer: null,
  lastTimer: null,
  _timerId: null,
  setTimerId: (timerId) => set({ _timerId: timerId }),
  setCurrentTimer: (timer) => set({ currentTimer: timer }),
  remainTimerLabel: "",
  setRemainTimerLabel: (label) => set({ remainTimerLabel: label }),
  finishTimer: () => {
    clearInterval(get()._timerId);
    set({
      lastTimer: get().currentTimer,
      currentTimer: null,
      remainTimerLabel: "",
    });
  },
  stopTimer: () => {
    clearInterval(get()._timerId);
    set({
      lastTimer: null,
      currentTimer: null,
      remainTimerLabel: "",
    });
  },
  startTimer: (timer) => {
    if (get().currentTimer !== null) {
      console.log("timer is running");
      return;
    }

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
        get().finishTimer();
        return;
      }
      remainingTime -= 1;
    }, 1000);

    get().setTimerId(_timerId);
  },
  running: () => {
    return get().currentTimer !== null;
  },
}));

export { useGlobalStore };
