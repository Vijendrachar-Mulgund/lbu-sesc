import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courses: null,
  enrolledCourses: null,
};

const coursesSlices = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setEnrolledCourses: (state, action) => {
      state.courses = action.payload;
    },

    removeCourses: (state) => {
      state.courses = initialState.courses;
    },

    removeEnrolledCourses: (state) => {
      state.enrolledCourses = initialState.enrolledCourses;
    },
  },
});

export const { setCourses, setEnrolledCourses, removeCourses, removeEnrolledCourses } = coursesSlices.actions;
export default coursesSlices.reducer;
