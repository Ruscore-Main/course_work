import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  category: null,
  sortBy: 'popular',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },

    setCategory(state, action) {
      state.category = action.payload;
    },
  },
});

export const { setSortBy, setCategory } = filterSlice.actions;

export default filterSlice.reducer;
