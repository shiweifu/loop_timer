import { create } from "zustand";
import TimerModel from "../models/timer";
import { getUUID } from "../constants/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

const asyncStorageMiddleware = (config) => (set, get, api) => {
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("TIMER_DATA");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const timerList = parsedData.timerList.map(
          (item) => new TimerModel(item)
        );
        parsedData.timerList = timerList;
        set(parsedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  const saveData = async (newState) => {
    try {
      const serializedData = JSON.stringify(newState);
      await AsyncStorage.setItem("TIMER_DATA", serializedData);
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

const useTimerStore = create(
  asyncStorageMiddleware((set, get) => {
    return {
      timerList: [],
      addTimer: (timer) => {
        // 递增
        timer.id = getUUID();
        return set((state) => ({ timerList: [...state.timerList, timer] }));
      },
      removeTimer: (timer) =>
        set((state) => ({
          timerList: state.timerList.filter((t) => t.id !== timer.id),
        })),

      getTimer: (id) => {
        return get().timerList.find((t) => t.id === id);
      },

      editTimer: (timer) => {
        let index = get().timerList.findIndex((t) => t.id === timer.id);
        let newTimerList = [...get().timerList];
        newTimerList[index] = timer;
        return set(() => ({ timerList: newTimerList }));
      },
    };
  })
);

export { useTimerStore };
