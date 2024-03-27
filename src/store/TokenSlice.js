import { createSlice } from "@reduxjs/toolkit";

const TokenSlice = createSlice({
  name: "token",
  initialState: {
    token: "",
    isLogged: false,
    id: "",
  },
  reducers: {
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
