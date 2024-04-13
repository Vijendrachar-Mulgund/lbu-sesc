import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/user";
import coursesSlices from "./redux/courses";

export const store = configureStore({
  reducer: { user: userSlice, courses: coursesSlices },
});
