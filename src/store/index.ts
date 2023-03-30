import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";

const store = configureStore({
  reducer: {
    bookReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
