import { configureStore, createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'price',
  initialState: {
    minPrice: 0,
    maxPrice: 0,
    specializations: [],
  },
  reducers: {
    setMinPrice: (state, action) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action) => {
      state.maxPrice = action.payload;
    },
    specializations: (state, action) => {
      state.specializations = action.payload;
    },
  },
});

const filterStore = configureStore({
  reducer: {
    price: filterSlice.reducer,
  },
});

export const { setMinPrice, setMaxPrice } = filterSlice.actions;

export default filterStore;
