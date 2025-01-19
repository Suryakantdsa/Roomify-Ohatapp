// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isCollapsed: false,
//   activeMenuIndex: 0,
// };

// const sidebarSlice = createSlice({
//   name: "sidebar",
//   initialState,
//   reducers: {
//     toggleSidebar: (state) => {
//       state.isCollapsed = !state.isCollapsed;
//     },
//     setActiveMenuIndex: (state, action) => {
//       state.activeMenuIndex = action.payload;
//     },
//   },
// });

// export const { toggleSidebar, setActiveMenuIndex } = sidebarSlice.actions;
// export default sidebarSlice.reducer;

import { create } from "zustand";

interface sidebarStoreInterface {
  isCollapsed: boolean;
  activeMenuIndex: number | null;
  menuName: String;
  toggleSideBar: () => void;
  setActiveMenuIndex: (index: number) => void;
  setMenuName: (name: string) => void;
}

const useSidebarStore = create<sidebarStoreInterface>((set) => ({
  isCollapsed: false,
  activeMenuIndex: 0,
  menuName: "Home",
  toggleSideBar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setActiveMenuIndex: (index) => set(() => ({ activeMenuIndex: index })),
  setMenuName: (name) => set({ menuName: name }),
}));

export default useSidebarStore;
