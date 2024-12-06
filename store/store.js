import { create } from "zustand";

const useGlobalStore = create((set, get) => ({
  _runAllIndex: -1,
  _timerList: [],
  runNextTimer: () => {
    let index = get()._runAllIndex;
    if (index < get()._timerList.length) {
      get().startTimer(get()._timerList[index]);
      set({ _runAllIndex: index + 1 });
    }
  },
  startRunAllTimers: (timerList) => {
    set({ _runAllIndex: 0, _timerList: timerList });
    get().runNextTimer();
  },

  currentTimer: null,
  lastTimer: null,
  _timerId: null,
  setTimerId: (timerId) => set({ _timerId: timerId }),
  setCurrentTimer: (timer) => set({ currentTimer: timer }),
  remainTimerLabel: "",
  setRemainTimerLabel: (label) => set({ remainTimerLabel: label }),
  finishTimer: () => {
    clearInterval(get()._timerId);
    let _currentTimer = get().currentTimer;
    console.log("currentTimer: ", _currentTimer);
    console.log("lastTimer: ", get().lastTimer);
    set({
      lastTimer: _currentTimer,
      currentTimer: null,
      remainTimerLabel: "",
    });

    if (get().runningAll()) {
      get().runNextTimer();
    }
  },
  stopTimer: () => {
    clearInterval(get()._timerId);
    set({
      lastTimer: null,
      currentTimer: null,
      remainTimerLabel: "",
      _runAllIndex: -1,
      _timerList: [],
    });
  },
  startTimer: (timer) => {
    console.log("start timer: ", timer);
    // 不允许重复启动
    if (get().currentTimer !== null) {
      console.log("timer is running");
      return;
    }

    if (get().runningAll()) {
      console.log("timer is running all");
      set({ currentTimer: timer });
    } else {
      set({ currentTimer: timer, lastTimer: null });
    }
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

  runningAll: () => {
    return get()._runAllIndex > 0;
  },
}));

export { useGlobalStore };
