import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function (_, { rejectWithValue, getState, dispatch }) {
    const state = getState();
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${
          state.bookReducer.search
        }${
          state.bookReducer.categories.length > 0
            ? `+subject:${state.bookReducer.categories}`
            : ""
        }&orderBy=${
          state.bookReducer.selectValue
        }&key=AIzaSyA6SaT23KNiiA6DnUfUQTvFeyAcQEkwnSU
             &maxResults=30&startIndex=${state.bookReducer.startIndex}`
      );
      console.log("response :>> ", response);
      dispatch(totalBooks(response.data.totalItems));
      return response.data.items;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

export const foundBooks = createAsyncThunk(
  "bookCard/foundBooks",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      return response.data;
    } catch (error) {
      rejectWithValue(error.message);
    }
  }
);

const initialState = {
  books: [],
  loading: false,
  total: 0,
  error: null,
  search: "",
  categories: "",
  selectValue: "relevance",
  foundBooks: null,
  startIndex: 0,
};

const bookReducer = createSlice({
  name: "book",
  initialState,
  reducers: {
    addSearchValue: (state, action) => {
      state.search = action.payload;
    },
    setCategoriesValue: (state, action) => {
      state.categories = action.payload;
    },
    setSeletValues: (state, action) => {
      state.selectValue = action.payload;
    },
    totalBooks: (state, action) => {
      state.total = action.payload;
    },
    clearBooks: (state) => {
      state.books = [];
    },
    updateStartIndex: (state, action) => {
      state.startIndex = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    [fetchBooks.fulfilled]: (state, action) => {
      state.loading = "success";
      state.books.push(...action.payload);
    },
    [fetchBooks.rejected]: (state, action) => {
      state.loading = "rejected";
      state.error = action.payload;
    },
    [foundBooks.pending]: (state) => {
      state.loading = "loading";
      state.error = null;
    },
    [foundBooks.fulfilled]: (state, action) => {
      state.loading = "success";
      state.foundBooks = action.payload;
    },
    [foundBooks.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export default bookReducer.reducer;
export const {
  addSearchValue,
  setCategoriesValue,
  setSeletValues,
  totalBooks,
  setStartIndex,
  updateStartIndex,
  clearBooks,
} = bookReducer.actions;
