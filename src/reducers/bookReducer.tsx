import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Books, StateBooks } from "../types/Book";

export const fetchBooks = createAsyncThunk<Books[], undefined, {rejectValue: string, state: {bookReducer: StateBooks}}>(
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
        }&key=AIzaSyCwC_E0LIPWXjmm5RBTxZaE6ukP1dDJNUI
             &maxResults=30&startIndex=${state.bookReducer.startIndex}`
      );
      console.log('response :>> ', response);
      dispatch(totalBooks(response.data.totalItems));
      return response.data.items;
    } catch (error) {
      return rejectWithValue('Cant search book. Server Error'); 
    }
  }
);

export const foundBooks = createAsyncThunk<Books, string | undefined, {rejectValue: string}>(
  "bookCard/foundBooks",
  async function (id, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${id}`
      );
      return response.data;
    } catch (error) {
      console.log('hello error');
      return rejectWithValue('Cant search book. Not found book');
    }
  }
);

const initialState:StateBooks = {
  books: [],
  loading: false,
  total: 0,
  hasError: false,
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
    addSearchValue: (state, action: PayloadAction<string | number>) => {
      state.search = action.payload;
    },
    setCategoriesValue: (state, action: PayloadAction<string>) => {
      state.categories = action.payload;
    },
    setSeletValues: (state, action: PayloadAction<string>) => {
      state.selectValue = action.payload;
    },
    totalBooks: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },
    clearBooks: (state) => {
      state.books = [];
    },
    updateStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchBooks.pending, (state) => {
      state.loading = "loading";
      state.hasError = false;
    })
    .addCase(fetchBooks.fulfilled, (state, action) => {
      state.loading = "success";
      state.books.push(...action.payload);
    })
    .addCase(fetchBooks.rejected, (state) => {
      state.loading = "rejected";
      state.hasError = true;
    })
    .addCase(foundBooks.pending, (state) => {
      state.loading = "loading";
      state.hasError = false;
    })
    .addCase(foundBooks.fulfilled, (state, action) => {
      state.loading = "success";
      state.foundBooks = action.payload;
    })
    .addCase(foundBooks.rejected, (state) => {
      state.hasError = true;
    })
  },
});

export default bookReducer.reducer;
export const {
  addSearchValue,
  setCategoriesValue,
  setSeletValues,
  totalBooks,
  updateStartIndex,
  clearBooks,
} = bookReducer.actions;
