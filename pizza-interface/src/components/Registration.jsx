import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { regUser } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';

const isValidRegistration = (login, pas, pasr) => {
  if (login.length === 0 && pas.length === 0) return '';
  if (login.length < 6) return 'Логин должен содержать больше 5 символов!';
  if (pas.length <= 8) return 'Пароль должен содержать больше 8 символов!';
  if (pas != pasr) return 'Пароли должны совпадать!';
  return 'Успешно!';
};

const Registration = () => {
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordR, setPasswordR] = useState('');
  let isValid = isValidRegistration(login, password, passwordR);
  const navigate = useNavigate();

  const onClickRegister = () => {
    dispatch(regUser({ login, password })).then((res) => {
      console.log(res);
      navigate('/');
    });
  };

  return (
    <>
      <div className="auth__body">
        <input
          placeholder="Логин"
          type="text"
          className="auth__input"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <input
          placeholder="Пароль"
          type="password"
          className="auth__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          placeholder="Подтвердите пароль"
          type="password"
          className="auth__input"
          value={passwordR}
          onChange={(e) => setPasswordR(e.target.value)}
        />
      </div>

      <button
        className={classNames('button button--auth', { disabled: isValid !== "Успешно!" })}
        onClick={onClickRegister}>
        Зарегистрироваться
      </button>
      <p className="not-valid">{isValid !== "Успешно!" ? isValid : ''}</p>
    </>
  );
};

export default Registration;
