import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  invoices: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setInvoices: (state, action) => {
      state.invoices = action.payload;
    },
    removeUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { setUser, setInvoices, removeUser } = userSlice.actions;
export default userSlice.reducer;
