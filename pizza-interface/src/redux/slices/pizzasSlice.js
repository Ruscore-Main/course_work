import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { pizzasAPI } from "../../api/api";

const initialState = {
    items: [],
    isLoaded: false
}

// Получение товаров
export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzas', async (params) => {
    const {sortBy, category} = params;
    console.log('params ================ ', params);
    let pizzas = [];
    if (category === null && sortBy === "popular") {
        pizzas = await pizzasAPI.getAllPizzas();
    }
    else {
        pizzas = await pizzasAPI.getPizzasByParams(sortBy, category);
    }
    return pizzas;
});

// Добавление нового товара
export const addNewPizza = createAsyncThunk('pizzas/addNewPizza', async (params) => {
    const {payload} = params;
    await pizzasAPI.addNewPizza(payload);
    const pizzas = await pizzasAPI.getAllPizzas();
    return pizzas;
});

// Удаление товара
export const deletePizza = createAsyncThunk('pizzas/deletePizza', async (params) => {
    const {payload} = params;
    await pizzasAPI.deletePizza(payload);
    const pizzas = await pizzasAPI.getAllPizzas();
    return pizzas;
});

// Обновление товара
export const updatePizza = createAsyncThunk('pizzas/updatePizza', async (params) => {
    const {payload} = params;
    await pizzasAPI.updatePizza(payload);
    const pizzas = await pizzasAPI.getAllPizzas();
    return pizzas;
});


const pizzaSlice = createSlice({
    name: "pizza",
    initialState,
    reducers: {
        setPizzas(state, action) {
            state.items = action.payload;
        },

        setLoaded(state, action) {
            state.isLoaded = action.payload;
        }
    },

    extraReducers: {
        // GET        
        [fetchPizzas.pending]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },
        [fetchPizzas.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },
        [fetchPizzas.rejected]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },

        // POST
        [addNewPizza.pending]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },
        [addNewPizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },
        [addNewPizza.rejected]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },

        // DELETE
        [deletePizza.pending]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },
        [deletePizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },
        [deletePizza.rejected]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },

        // PUT
        [updatePizza.pending]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },
        [updatePizza.fulfilled]: (state, action) => {
            state.items = action.payload;
            state.isLoaded = true;
        },
        [updatePizza.rejected]: (state) => {
            state.items = [];
            state.isLoaded = false;
        },
    }
});

export const { setPizzas, setLoaded } = pizzaSlice.actions;

export default pizzaSlice.reducer;