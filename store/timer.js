import { create } from "zustand";
import TimerModel from "../models/timer";
import TomatoModel from "../models/tomato";

class DayModel {
  constructor({ dateStr, tomatos }) {
    this.dateStr = dateStr;
    this.tomatos = tomatos;
    this.tomatoDuration = 0;
    this.restDuration = 0;

    tomatos.forEach((tomato) => {
      if (tomato.type === TimerModel.TYPE.TOMATO) {
        this.tomatoDuration += tomato.duration;
      } else {
        this.restDuration += tomato.duration;
      }
    });
  }
}

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

const useTomatoStore = create((set, get) => ({
  tomatoList: [
    new TomatoModel({
      id: 1,
      title: "测试",
      duration: 30,
      type: TimerModel.TYPE.TOMATO,
      createdAt: new Date(),
    }),
    new TomatoModel({
      id: 2,
      title: "测试2",
      duration: 15,
      type: TimerModel.TYPE.REST,
      createdAt: new Date(),
    }),
  ],
  addTomato: (timer) => {
    let tomato = new TomatoModel({
      title: timer.title,
      duration: timer.duration,
      type: timer.type,
      createdAt: Date.now(),
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
