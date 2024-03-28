import { createSlice } from "@reduxjs/toolkit";

const DisplaySlice = createSlice({
  name: "Display",
  initialState: {
    items: [],
  },
  reducers: {
    DisplayItems(state, action) {
      state.items = state.items.concat(action.payload);
    },
    DeleteItem(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    UpdateItem(state, action) {
      const { id, updatedItem } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...updatedItem };
      }
    },
  },
});

export const DisplaySliceActions = DisplaySlice.actions;

export default DisplaySlice;
