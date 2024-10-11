import { RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { UserActive } from '../interfaces';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';
import {
  removeUserInLocalStorage,
  renewTokenInLocalStorage,
  saveUserInLocalStorage,
} from '../utils/manageUserInLocalStorage';

export const useAuthenticationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const tokenSesion = user?.token;

  const isLogin = user?.token?.length > 0;

  const dispatch = useDispatch();

  const saveUserInState = (user: UserActive) => {
    dispatch(setUserActive(user));
  };

  const saveUser = (user: UserActive) => {
    saveUserInLocalStorage(user);
    saveUserInState(user);
  };

  // Eliminar usuario
  const removeUserInState = () => {
    dispatch(removeUserActive());
  };

  const removeUser = () => {
    removeUserInLocalStorage();
    removeUserInState();
  };

  const updateUserActions = (modules: any) => {
    saveUserInLocalStorage({ ...user, modules });
    saveUserInState({ ...user, modules });
  };

  const renewTokenInState = (token: string) => {
    dispatch(setToken(token));
  };

  const updateTokenInClient = (token: string) => {
    renewTokenInLocalStorage(user, token);
    renewTokenInState(token);
  };

  const TIME_ACTIVE_TOKEN = 20 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 10 * 1000;

  return {
    saveUser,
    isLogin,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    removeUser,
    updateUserActions,
    updateTokenInClient,
    tokenSesion,
  };
};
