import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/UserSlice";

const store = configureStore({
  reducer: {
    UserSlice,
  },
});

export default store;
