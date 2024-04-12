import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action.payload ->", action.payload);
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;