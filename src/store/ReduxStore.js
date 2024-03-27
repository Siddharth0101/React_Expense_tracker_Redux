import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./TokenSlice";

const ReduxStore = configureStore({
  reducer: { LogInStore: TokenSlice.reducer },
});
export default ReduxStore;
