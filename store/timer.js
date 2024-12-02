import { create, get } from "zustand";
import TimerModel from "../models/timer";
import TomatoModel from "../models/tomato";
import DayModel from "../models/day";

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
    // 递增
    timer.id = get().timerList.length + 1;
    return set((state) => ({ timerList: [...state.timerList, timer] }));
  },
  removeTimer: (timer) =>
    set((state) => ({
      timerList: state.timerList.filter((t) => t.id !== timer.id),
    })),
}));

const useTomatoStore = create((set, get) => ({
  tomatoList: [
    new TomatoModel({
      id: 1,
      title: "测试",
      duration: 30 * 60,
      type: TimerModel.TYPE.TOMATO,
      createdAt: new Date(),
    }),
    new TomatoModel({
      id: 2,
      title: "测试2",
      duration: 15 * 60,
      type: TimerModel.TYPE.REST,
      createdAt: new Date(),
    }),
  ],
  addTomato: (timer) => {
    let tomato = new TomatoModel({
      title: timer.title,
      duration: timer.duration,
      type: timer.type,
      createdAt: new Date(),
    });

    return set((state) => ({ tomatoList: [...state.tomatoList, tomato] }));
  },

  dayItems: () => {
    // 返回 DayModel 对象列表
    let items = [];
    // 拿到所有日期字符串
    let dateStrs = get().dateStrItems();
    dateStrs.forEach((dateStr) => {
      let tomatos = get().tomatosByDate(dateStr);
      items.push(new DayModel({ dateStr, tomatos }));
    });
    return items;
  },

  dateItems: () => {
    let items = {};
    get().tomatoList.forEach((tomato) => {
      let dateStr = tomato.createdAtStr;
      if (!items[dateStr]) {
        items[dateStr] = [];
      }
      items[dateStr].push(tomato);
    });
    return items;
  },
  dateStrItems: () => {
    return Object.keys(get().dateItems());
  },
  // 返回某一天的全部 tomatos
  tomatosByDate: (dateStr) => {
    return get().dateItems()[dateStr];
  },

  removeTomato: (tomato) =>
    set((state) => ({
      tomatoList: state.tomatoList.filter((t) => t.id !== tomato.id),
    })),
}));

export { useTimerStore, useTomatoStore };
