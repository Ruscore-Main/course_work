import React from 'react';
import { useSelector } from 'react-redux';

import BasketFull from './BasketFull';
import BasketEmpty from './BasketEmpty';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';

const Basket = () => {
  const {isAuth} = useAuth();
  const { cart } = useSelector((state) => state.user);
  if (!isAuth) {
    return <Navigate to={'/login'} />
  }
  const [totalCount] = [
    cart.reduce((sum, el) => sum + el.count, 0)
  ];
  return (
    <>
      {
      totalCount ? 
      <BasketFull />
      :<BasketEmpty />
      }
    </>
  );
};

export default Basket;
