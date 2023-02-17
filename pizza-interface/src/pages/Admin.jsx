import React from 'react';
import { AddNewPizza, TablePizza } from './../components';
import { useDispatch, useSelector } from 'react-redux';
import { useAuth } from '../hooks/use-auth';
import { Navigate } from 'react-router-dom';

const Admin = () => {

  const {isAuth, role, login} = useAuth();
  const {items, isLoaded} = useSelector(({ pizzas }) => ({
    items: pizzas.items,
    isLoaded: pizzas.isLoaded
  }));
  const dispatch = useDispatch();

  if (!isAuth) {
    return <Navigate to='/login' />
  }

  if (role !== "Admin") {
    return <Navigate to='/' />
  }

  



  return (
    <div className="container">
      <h2 className="content__title">Панель администрации: {login}</h2>
      <div className="admin__wrapper">
        <AddNewPizza items={items} dispatch={dispatch}/>
        
        {
          isLoaded ?
          <TablePizza items={items} dispatch={dispatch}/>
          : "Идет загрузка"
        }
      </div>
    </div>
  );
};

export default Admin;
