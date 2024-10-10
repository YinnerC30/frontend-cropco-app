import { RootState, useAppSelector } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserActive } from '../interfaces';
import { removeUserActive, setUserActive } from '../utils';
import { setToken } from '../utils/authenticationSlice';

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
  // const TIME_ACTIVE_TOKEN = 6 * HOUR;
  // const TIME_QUESTION_RENEW_TOKEN = 5.5 * HOUR;
  const TIME_ACTIVE_TOKEN = 30 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 15 * 1000;

  return {
    user,
    saveUser,
    isActiveSesion,
    LogOutUser,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    URL_LOGOUT,
    redirectToHome,
    redirectToLogin,
    modulesUser,
    removeUser,
    updateUserActions,
    updateTokenInClient,
    getTokenSesion,
  };
};
