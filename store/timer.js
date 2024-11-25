import { create } from "zustand";
import TimerModel from "../models/timer";

const useTimerStore = create((set) => ({
  timerList: [
    new TimerModel({
      id: 1,
      title: "工作",
      duration: 25 * 60,
      order: 0,
      type: TimerModel.TYPE.TOMATO,
    }),
    new TimerModel({
      id: 2,
      title: "休息",
      duration: 5 * 60,
      order: 1,
      type: TimerModel.TYPE.REST,
    }),
    new TimerModel({
      id: 3,
      title: "测试",
      duration: 5,
      order: 1,
      type: TimerModel.TYPE.REST,
    }),
    new TimerModel({
      id: 4,
      title: "测试2",
      duration: 5,
      order: 1,
      type: TimerModel.TYPE.REST,
    }),
  ],
  addTimer: (timer) => {
    timer.id = Date.now();
    return set((state) => ({ timerList: [...state.timerList, timer] }));
  },
  removeTimer: (timer) =>
    set((state) => ({
      timerList: state.timerList.filter((t) => t.id !== timer.id),
    })),
}));

export { useTimerStore };
