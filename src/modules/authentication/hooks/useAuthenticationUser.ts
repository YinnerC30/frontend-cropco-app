import { RootState, useAppSelector } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserActive } from '../interfaces';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';
import { useCheckAuthStatus } from './useCheckAuthStatus';
import { useRenewToken } from './useRenewToken';

export const useAuthenticationUser = () => {
  const KEY_USER_LOCAL_STORAGE = 'user-active';

  const { user } = useAppSelector((state: RootState) => state.authentication);

  const { modules = [] } = user;

  const modulesUser = modules.map((module: any) => module?.name);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const saveUserInState = (user: UserActive) => {
    dispatch(setUserActive(user));
  };

  const saveUserInLocalStorage = (user: UserActive) => {
    localStorage.setItem(KEY_USER_LOCAL_STORAGE, JSON.stringify(user));
  };

  const saveUser = (user: UserActive) => {
    saveUserInLocalStorage(user);
    saveUserInState(user);
  };

  // Eliminar usuario
  const removeUserInState = () => {
    dispatch(removeUserActive());
  };

  const removeUserInLocalStorage = () => {
    localStorage.removeItem(KEY_USER_LOCAL_STORAGE);
  };

  const removeUser = () => {
    removeUserInLocalStorage();
    removeUserInState();
  };

  const updateUserActions = (modules: any) => {
    console.log(modules);
    saveUserInLocalStorage({ ...user, modules });
    saveUserInState({ ...user, modules });
  };

  const getTokenSesion = () => user?.token;

  const isActiveSesion = () => user.token.length > 0;

  const URL_LOGIN = '/app/authentication/login';
  const URL_HOME = '/app/home';
  const URL_LOGOUT = '/app/authentication/logout';

  const redirectToLogin = () => {
    navigate(URL_LOGIN, { replace: true });
  };

  const redirectToHome = () => {
    navigate(URL_HOME, { replace: true });
  };

  const LogOutUser = () => {
    removeUser();
    redirectToLogin();
  };

  const renewTokenInState = (token: string) => {
    dispatch(setToken(token));
  };
  const renewTokenInLocalStorage = (token: string) => {
    localStorage.setItem(
      KEY_USER_LOCAL_STORAGE,
      JSON.stringify({ ...user, token })
    );
  };

  const updateTokenInClient = (token: string) => {
    renewTokenInLocalStorage(token);
    renewTokenInState(token);
  };

  const MINUTE = 60 * 1000;
  const HOUR = MINUTE * 60;
  const TIME_ACTIVE_TOKEN = 6 * HOUR;
  const TIME_QUESTION_RENEW_TOKEN = 5.5 * HOUR;

  const mutationCheckAuthStatus = useCheckAuthStatus();

  const mutationRenewToken = useRenewToken();

  const validateToken = () => {
    mutationCheckAuthStatus.mutate({ token: getTokenSesion() });
  };

  const renewToken = () => {
    mutationRenewToken.mutate({ token: getTokenSesion() });
  };

  // Effects
  const { pathname } = useLocation();

  useEffect(() => {
    const { isSuccess, isError } = mutationCheckAuthStatus;

    if (isSuccess && pathname === '/app') {
      redirectToHome();
    }
    if (isError) {
      LogOutUser();
    }
  }, [mutationCheckAuthStatus]);

  useEffect(() => {
    const { isSuccess, isError, error, data } = mutationRenewToken;

    if (isSuccess) {
      const { token } = data.data;
      updateTokenInClient(token);
    }
    if (isError) {
      const { statusCode } = error.response.data;
      statusCode === 401 && console.error('No se pudo actualizar el token');
    }
  }, [mutationRenewToken]);

  return {
    user,
    saveUser,
    isActiveSesion,
    LogOutUser,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    URL_LOGOUT,
    mutationCheckAuthStatus,
    mutationRenewToken,
    validateToken,
    renewToken,
    redirectToHome,
    redirectToLogin,
    modulesUser,
    removeUser,
    updateUserActions,
  };
};
