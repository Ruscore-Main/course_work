import axios from "axios";

const BASE_URL = "https://localhost:44324/api";

export const pizzaInstance = axios.create({
  baseURL: BASE_URL+'/pizza',
});

export const userInstance = axios.create({
  baseURL: BASE_URL+'/user',
});


export const pizzasAPI = {
  // Возвращает массив всех пицц
  getAllPizzas() {
    return pizzaInstance.get().then((resp) => resp.data);
  },
  // Возвращает массив пицц по параметрам
  getPizzasByParams(sortBy, category) {
    return pizzaInstance.get(`?${category !== null ? `category=${category}&` : ''}_sort=${sortBy}&_order=asc`).then((resp) => resp.data);
  },

  addNewPizza(pizza) {
    return pizzaInstance.post('', pizza)
  },

  deletePizza(id) {
    return pizzaInstance.delete(`/${id}`)
  },

  updatePizza(pizza) {
    return pizzaInstance.put(`/${pizza.id}`, pizza)
  }

};

export const userAPI = {
  registerUser(login, password) {
    return userInstance.post('/registration', {login, password});
  },

  authorizateUser(login, password) {
    return userInstance.post('/authorization', {login, password});
  }
}