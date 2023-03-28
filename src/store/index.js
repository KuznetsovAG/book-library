import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../reducers/bookReducer";

export default configureStore({
  reducer: {
    bookReducer,
  },
});
