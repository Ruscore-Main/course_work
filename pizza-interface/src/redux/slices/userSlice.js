import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { userAPI } from "../../api/api";

const initialState = {
    id: null,
    login: null,
    password: null,
    role: null,
    cart: []
}

export const regUser = createAsyncThunk('user/regUser', async (params) => {
    const {login, password} = params;
    try {
        const user = (await userAPI.registerUser(login, password)).data;
        return user;
    }
    catch (error) {
        return error.response.data;
    }
})

export const authUser = createAsyncThunk('user/authUser', async (params, thunkAPI) => {
    const {login, password} = params;
    try {
        const user = (await userAPI.authorizateUser(login, password)).data;
        return user;
    }
    catch (error) {
        return error.response.data;
    }
})

const userSlice = createSlice({
    name: "user",
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
            state.cart = []
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
        }
    }
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;