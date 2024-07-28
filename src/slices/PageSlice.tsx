import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const loadPageFromLocalStorage = () => {
  try {
    const serializedPage = localStorage.getItem('page');
    if (serializedPage === null) {
      return 1;
    }
    return JSON.parse(serializedPage);
  } catch (err) {
    console.warn('Error loading page from localStorage:', err);
    return 1;
  }
};

const savePageToLocalStorage = (page: number) => {
  try {
    localStorage.setItem('page', JSON.stringify(page));
  } catch (err) {
    console.warn('Error saving page to localStorage:', err);
  }
};

const initialState = loadPageFromLocalStorage();

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    toTheNextPage: (state) => {
      const newPage = state + 1;
      savePageToLocalStorage(newPage);
      return newPage;
    },
    toThePrevPage: (state) => {
      const newPage = state > 1 ? state - 1 : state;
      savePageToLocalStorage(newPage);
      return newPage;
    },
    setPage: (state, action) => {
      const newPage = action.payload;
      savePageToLocalStorage(newPage);
      return newPage;
    },
  },
});

export const { toTheNextPage, toThePrevPage, setPage } = pageSlice.actions;
export default pageSlice.reducer;
