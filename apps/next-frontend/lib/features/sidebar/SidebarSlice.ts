import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  activeMenuIndex: 0,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    setActiveMenuIndex: (state, action) => {
      state.activeMenuIndex = action.payload;
    },
  },
});

export const { toggleSidebar, setActiveMenuIndex } = sidebarSlice.actions;
export default sidebarSlice.reducer;
