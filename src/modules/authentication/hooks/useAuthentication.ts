import { RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';

import { UserActive } from '../interfaces';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';
import {
  removeUserInLocalStorage,
  renewTokenInLocalStorage,
  saveUserInLocalStorage,
} from '../utils/manageUserInLocalStorage';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_LOGIN } from '@/config';

export const TIME_ACTIVE_TOKEN = 60_000 * 6;
export const TIME_QUESTION_RENEW_TOKEN = 60_000 * 5.5;

export const useAuthentication = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const redirectToLogin = (): void => {
    navigate(PATH_LOGIN);
  };

  const tokenSesion = user?.token;

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
    queryClient.clear();
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

  useEffect(() => {
    if (!user.isLogin) {
      redirectToLogin();
    }
  }, [user]);

  return {
    saveUser,
    isLogin: user.isLogin,
    removeUser,
    updateUserActions,
    updateTokenInClient,
    tokenSesion,
    user,
  };
};

export default useAuthentication;
