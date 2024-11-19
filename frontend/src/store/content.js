import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
}));

// we will use contentType to fetch related movie or tv from database.
