import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToCart(state, action) {
      const newItems = {
        ...state.items,
        // Добавляются пиццы по ключу: у каждой пиццы свой ключ, а у этого ключа массив этих пицц
        [action.payload.id]: state.items[action.payload.id]
          ? [...state.items[action.payload.id], action.payload]
          : [action.payload],
      };

      state.items = newItems;
      state.totalCount += 1;
      state.totalPrice += action.payload.price;
    },

    removePizzaFromCart(state, action) {
      const pizza = action.payload;
      const index = state.items[pizza.id].findIndex(
        (el) => el.name === pizza.name && el.type === pizza.type && el.size === pizza.size,
      );

      // если такая пицца существует
      if (~index) {
        state.items[pizza.id].splice(index, 1);
        const newItems = {
          ...state.items,
          // Добавляются пиццы по ключу: у каждой пиццы свой ключ, а у этого ключа массив этих пицц
          [pizza.id]: [...state.items[pizza.id]],
        };

        if (newItems[pizza.id].length === 0) {
          delete newItems[pizza.id];
        }

        state.items = newItems;
        state.totalCount -= 1;
        state.totalPrice -= pizza.price;
      }
    },

    clearPizzasFromCart(state, action) {
      const pizza = action.payload;
      // выделяем только оставшиеся пиццы
      const newPizzas = state.items[pizza.id].filter(
        (el) => el.type !== pizza.type || el.size !== pizza.size,
      );
      // изменение цены полсе удаления пицц
      const totalMinus = state.items[pizza.id].length - newPizzas.length;
      const newItems = {
        ...state.items,
        // здеся просто добавляются пиццы по ключу, у каждой пиццы свой ключ, а у этого ключа массив этих пицц)))
        [pizza.id]: newPizzas,
      };

      // если пицц больше нету по ключу, то удаляем ключ
      if (newItems[pizza.id].length === 0) {
        delete newItems[pizza.id];
      }

      state.items = newItems;
      state.totalCount -= totalMinus;
      state.totalPrice -= pizza.price * totalMinus;
    },

    clearCart(state) {
      state.items = [];
      state.totalCount = 0;
      state.totalPrice = 0;
    },
  },
});

export const {addPizzaToCart, removePizzaFromCart, clearPizzasFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
