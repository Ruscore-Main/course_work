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
    debugger;
    const user = await userAPI.registerUser(login, password);
    return user;
})

export const authUser = createAsyncThunk('user/authUser', async (params) => {
    const {login, password} = params;
    const user = await userAPI.authorizateUser(login, password);
    return user;
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
            state.id = action.payload.id;
            state.login = action.payload.login;
            state.password = action.payload.password;
            state.role = action.payload.role;
            state.cart = action.payload.cart;
        }
    }
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;