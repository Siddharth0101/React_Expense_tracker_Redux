import { configureStore } from "@reduxjs/toolkit";
import TokenSlice from "./TokenSlice";
import DisplaySlice from "./DisplaySlice";

const ReduxStore = configureStore({
  reducer: { LogInStore: TokenSlice.reducer, Display: DisplaySlice.reducer },
});
export default ReduxStore;
