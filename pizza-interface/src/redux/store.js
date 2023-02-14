import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';



export const store = configureStore({
  reducer: {
    filters: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

store.subscribe(() => {
  console.log(store.getState());
});
