import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import filterSlice from './slices/filterSlice';
import pizzasSlice from './slices/pizzasSlice';
import userSlice from './slices/userSlice';



export const store = configureStore({
  reducer: {
    filters: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
    user: userSlice
  },
});

store.subscribe(() => {
  console.log('STATE ==== ', store.getState());
});
