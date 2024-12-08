import { create } from "zustand";
import dayjs from "dayjs";
import { getUUID } from "../constants/utils";
import TomatoModel from "../models/tomato";
import TimerModel from "../models/timer";
import DayModel from "../models/day";

const useTomatoStore = create((set, get) => ({
  tomatoList: [
    new TomatoModel({
      id: getUUID(),
      title: "测试",
      duration: 30 * 60,
      type: TimerModel.TYPE.TOMATO,
      createdAt: new Date(),
    }),
    new TomatoModel({
      id: getUUID(),
      title: "测试2",
      duration: 15 * 60,
      type: TimerModel.TYPE.REST,
      createdAt: dayjs().toDate(),
    }),

    new TomatoModel({
      id: getUUID(),
      title: "测试2",
      duration: 15 * 60,
      type: TimerModel.TYPE.REST,
      // 昨日
      createdAt: dayjs().subtract(1, "day").toDate(),
    }),
    new TomatoModel({
      id: getUUID(),
      title: "测试2",
      duration: 15 * 60,
      type: TimerModel.TYPE.REST,
      // 昨日
      createdAt: dayjs().subtract(2, "day").toDate(),
    }),
  ],
  addTomato: (timer) => {
    let tomato = new TomatoModel({
      title: timer.title,
      duration: timer.duration,
      timerId: timer.id,
      type: timer.type,
      createdAt: dayjs().toDate(),
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
      //   items.push(new DayModel({ dateStr: "asdf", tomatos }));
    });
    return items;
  },

  dateItems: () => {
    let items = {};
    get().tomatoList.forEach((tomato) => {
      let date = tomato.createdAt;
      let dateStr = dayjs(date).format("YYYY-MM-DD");
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
    const groupItems = get().dateItems();
    if (!groupItems[dateStr]) {
      return [];
    }
    return groupItems[dateStr];
  },

  removeTomato: (tomato) =>
    set((state) => ({
      tomatoList: state.tomatoList.filter((t) => t.id !== tomato.id),
    })),

  todayTomatos: () => {
    let todayStr = dayjs().format("YYYY-MM-DD");
    let result = get().tomatosByDate(todayStr);
    return result;
  },

  todayTomatosCount: () => {
    return get().todayTomatos().length;
  },

  todayTomatosDuration: () => {
    let tomatos = get().todayTomatos();
    let duration = 0;
    tomatos.forEach((tomato) => {
      if (tomato.type === TimerModel.TYPE.REST) {
        return;
      }
      duration += tomato.duration;
    });
    let minutes = Math.floor(duration / 60);
    return minutes;
  },
}));

export { useTomatoStore };
