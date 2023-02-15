import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { PizzaCard, Categories, SortPopup } from './../components';
import LoaderPizzaBlock from '../components/LoaderPizzaBlock';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { setCategory } from '../redux/slices/filterSlice';
import { addPizzaToCart } from '../redux/slices/cartSlice';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const categoryNames = ['Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
const sortTypes = [
  { name: 'популярности', type: 'popular' },
  { name: 'цене', type: 'price' },
  { name: 'алфавиту', type: 'name' },
];

const Home = () => {
  // Если пользователь неавторизован
  const {isAuth, login, cart} = useAuth();
  const navigate = useNavigate();
  if (!isAuth) {
    navigate('/login')
  }

  const dispatch = useDispatch();
  const pizzas = useSelector(({ pizzas }) => pizzas.items);
  const isLoaded = useSelector(({ pizzas }) => pizzas.isLoaded);
  const { category, sortBy } = useSelector(({ filters }) => filters);

  const handleAddPizzaToCart = pizza => {
    dispatch(addPizzaToCart(pizza))
  }

  useEffect(() => {
    // Тут собсна и достаём все питсы
    if (!pizzas.length && category == null && sortBy == null) {
      dispatch(fetchPizzas({sortBy: 'popular', category: null}));
    }
    else {
      dispatch(fetchPizzas({sortBy, category}));
    }    
  }, [category, sortBy]);

  const onSelectCategory = React.useCallback((index) => dispatch(setCategory(index)));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onClickItem={onSelectCategory}
          items={categoryNames}
          activeCategory={category}
        />
        <SortPopup items={sortTypes} currentSort={sortBy} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoaded
          ? pizzas.map((pizza) => <PizzaCard onClickAddPizza={handleAddPizzaToCart} {...pizza} key={pizza.id} />)
          : Array.from(Array(10), (_, index) => <LoaderPizzaBlock key={index} />)}
      </div>
    </div>
  );
};

export default Home;
