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

export const TIME_ACTIVE_TOKEN = 15_000;
export const TIME_QUESTION_RENEW_TOKEN = 6_000;

export const useAuthentication = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const tokenSesion = user?.token;

  const isLogin = user?.token?.length > 0;

  const getModuleActions = (nameModule: string) => {
    return (
      user.modules.find((module: any) => module.name === nameModule)?.actions ??
      []
    );
  };

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

  return {
    saveUser,
    isLogin,
    removeUser,
    updateUserActions,
    updateTokenInClient,
    tokenSesion,
    user,
    getModuleActions,
  };
};

export default useAuthentication;
