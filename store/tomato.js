import { create } from "zustand";
import dayjs from "dayjs";
import { getUUID } from "../constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TomatoModel from "../models/tomato";
import TimerModel from "../models/timer";
import DayModel from "../models/day";

const asyncStorageMiddleware = (config) => (set, get, api) => {
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("TOMATO_DATA");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const tomatoList = parsedData.tomatoList.map(
          (item) => new TomatoModel(item)
        );
        parsedData.tomatoList = tomatoList;
        set(parsedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const saveData = async (newState) => {
    try {
      const serializedData = JSON.stringify(newState);
      await AsyncStorage.setItem("TOMATO_DATA", serializedData);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };
  loadData();
  return config(
    (...args) => {
      const result = set(...args);
      saveData(get());
      return result;
    },
    get,
    api
  );
};

const useTomatoStore = create(
  asyncStorageMiddleware((set, get) => {
    return {
      tomatoList: [],
      addTomato: (timer) => {
        let tomato = new TomatoModel({
          id: getUUID(),
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
    };
  })
);

export { useTomatoStore };
