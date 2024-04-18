import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  borrowedBooks: null,
  books: null,
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBorrowedBooks: (state, action) => {
      state.borrowedBooks = action.payload;
    },

    setBooks: (state, action) => {
      state.books = action.payload;
    },

    removeBooks: (state) => {
      state.books = initialState.books;
    },

    removeBorrowedBooks: (state) => {
      state.borrowedBooks = initialState.borrowedBooks;
    },
  },
});

export const { setBorrowedBooks, setBooks, removeBooks, removeBorrowedBooks } = bookSlice.actions;
export default bookSlice.reducer;
