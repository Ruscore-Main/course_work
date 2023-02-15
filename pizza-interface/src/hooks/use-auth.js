import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { id, login, role, cart } = useSelector((state) => state.user);
  return {
    isAuth: !!login,
    id,
    login,
    role, 
    cart
  };
};
