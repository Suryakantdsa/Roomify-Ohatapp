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

type State = {
  isCollapsed: Boolean;
  activeMenuIndex: number | null;
};
type Actions = {
  toggleSideBar: (state: Boolean) => void;
  setActiveMenuIndex: (index: number) => void;
};

const useSidebarStore = create<State & Actions>((set) => ({
  isCollapsed: false,
  activeMenuIndex: null,
  toggleSideBar: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
  setActiveMenuIndex: (index) => set(() => ({ activeMenuIndex: index })),
}));

export default useSidebarStore;
