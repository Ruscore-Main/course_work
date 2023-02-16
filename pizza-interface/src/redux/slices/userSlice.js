import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { userAPI } from '../../api/api';

const initialState = {
  id: null,
  login: null,
  password: null,
  role: null,
  cart: [],
};

export const regUser = createAsyncThunk('user/regUser', async (params) => {
  const { login, password } = params;
  try {
    const user = (await userAPI.registerUser(login, password)).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

export const authUser = createAsyncThunk('user/authUser', async (params) => {
  const { login, password } = params;
  try {
    const user = (await userAPI.authorizateUser(login, password)).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

// cart thunks
export const addPizzaToCart = createAsyncThunk('user/addPizzaToCart', async (params, thunkAPI) => {
  const { name, price, category, type, size, imageUrl } = params;
  const userId = thunkAPI.getState().user.id;
  const payload = {
    name,
    price,
    category,
    type,
    size,
    imageUrl,
    userId,
  };
  const pizza = await userAPI.addToCart(payload);
  return pizza;
});

// Очистка корзины
export const clearCart = createAsyncThunk('user/clearCart', async (params, thunkAPI) => {
    const currentUser = thunkAPI.getState().user;
    debugger;
    const resp = await userAPI.clearCart(currentUser);
    return resp;
});


export const clearPizzasFromCart = createAsyncThunk('user/clearPizzasFromCart', async (params, thunkAPI) => {
    const { name, price, category, type, size, imageUrl } = params;
    const userId = thunkAPI.getState().user.id;
    const payload = {
        name,
        price,
        category,
        type,
        size,
        imageUrl,
        userId,
    };
    const resp = await userAPI.clearPizzas(payload);
    return resp;
});



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.cart = action.payload.cart;
    },
    removeUser(state) {
      state.id = null;
      state.login = null;
      state.password = null;
      state.role = null;
      state.cart = [];
    }
  },

  extraReducers: {
    [regUser.fulfilled]: (state, action) => {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.cart = action.payload.cart;
    },

    [authUser.fulfilled]: (state, action) => {
      if (action.payload?.login) {
        state.id = action.payload.id;
        state.login = action.payload.login;
        state.password = action.payload.password;
        state.role = action.payload.role;
        state.cart = action.payload.cart;
      }
    },

    [addPizzaToCart.fulfilled]: (state, action) => {
        state.cart = [...state.cart.filter(el => el.id !== action.payload.id), {...action.payload}]
    },

    [clearCart.fulfilled]: (state) => {
        state.cart = [];
    },

    [clearPizzasFromCart.fulfilled]: (state, action) => {
        const {type, name, size} = action.payload;
        state.cart = state.cart.filter(el => el.name !== name && el.size !== size && el.type !== type)
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
