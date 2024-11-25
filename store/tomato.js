import create from "zustand";

const useTomatoStore = create((set) => ({
  tomatoList: [],
  addTomato: (tomato) =>
    set((state) => ({ tomatoList: [...state.tomatoList, tomato] })),
  removeTomato: (tomato) =>
    set((state) => ({
      tomatoList: state.tomatoList.filter((t) => t.id !== tomato.id),
    })),
}));
export default useTomatoStore;
