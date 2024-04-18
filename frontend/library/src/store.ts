import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/user";
import bookSlice from "./redux/books";

export const store = configureStore({
  reducer: { user: userSlice, book: bookSlice },
});
