import { createSlice } from "@reduxjs/toolkit";

const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: localStorage.getItem("token") || "",
    isLogged: localStorage.getItem("token") ? true : false,
    id: "",
    items: [],
  },
  reducers: {
    DisplayData(state, action) {
      state.items = action.payload;
    },
    LogIn(state, action) {
      state.token = action.payload;
      state.isLogged = true;
    },
    LogOut(state, action) {
      state.token = "";
      state.isLogged = false;
    },
  },
});
export const TokenSliceActions = TokenSlice.actions;
export default TokenSlice;
