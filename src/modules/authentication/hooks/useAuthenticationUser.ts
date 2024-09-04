import { RootState, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";
import { setToken } from "../utils/authenticationSlice";
import { useCheckAuthStatus } from "./useCheckAuthStatus";
import { useRenewToken } from "./useRenewToken";

export const useAuthenticationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [validToken, setValidToken] = useState(false);

  const saveUserInLocalStorage = (values: UserActive) => {
    localStorage.setItem("user-active", JSON.stringify(values));
    dispatch(setUserActive(values));
  };

  const removeUserInState = () => {
    dispatch(removeUserActive());
  };

  const removeUserInLocalStorage = () => {
    localStorage.removeItem("user-active");
  };

  const getTokenSesion = () => user?.token;

  const isActiveSesion = () => user.token.length > 0;

  const getTimeStartSesionUser = () => user?.timeStartSesion;

  const URL_LOGIN = "/app/authentication/login";
  const URL_HOME = "/app/home";
  const URL_LOGOUT = "/app/authentication/logout";

  const redirectToLogin = () => {
    navigate(URL_LOGIN, { replace: true });
  };

  const redirectToHome = () => {
    navigate(URL_HOME, { replace: true });
  };

  const LogOutUser = () => {
    removeUserInState();
    removeUserInLocalStorage();
    setValidToken(false);
    redirectToLogin();
  };

  const renewTokenInState = (token: string) => {
    dispatch(setToken(token));
  };
  const renewTokenInLocalStorage = (token: string) => {
    localStorage.setItem("user-active", JSON.stringify({ ...user, token }));
  };

  const updateTokenInClient = (token: string) => {
    renewTokenInLocalStorage(token);
    renewTokenInState(token);
  };

  const TIME_ACTIVE_TOKEN = 20 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 10 * 1000;

  const mutationCheckAuthStatus = useCheckAuthStatus();

  const mutationRenewToken = useRenewToken();

  const validateToken = () => {
    mutationCheckAuthStatus.mutate({ token: getTokenSesion() });
  };

  const renewToken = () => {
    mutationRenewToken.mutate({ token: getTokenSesion() });
  };

  // Efects
  const { pathname } = useLocation();

  useEffect(() => {
    const { isSuccess, isError, error } = mutationCheckAuthStatus;

    if (isSuccess && pathname === "/app") {
      setValidToken(true);
      redirectToHome();
    }
    if (isError) {
      const { statusCode } = error.response.data;
      statusCode === 401 && LogOutUser();
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
      statusCode === 401 && console.log("No se pudo actualizar el token");
    }
  }, [mutationRenewToken]);

  return {
    user,
    saveUserInLocalStorage,
    removeUserInLocalStorage,
    removeUserInState,
    getTokenSesion,
    isActiveSesion,
    getTimeStartSesionUser,
    LogOutUser,
    renewTokenInState,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    URL_LOGIN,
    URL_HOME,
    URL_LOGOUT,
    mutationCheckAuthStatus,
    mutationRenewToken,
    validateToken,
    renewToken,
    renewTokenInLocalStorage,
    redirectToHome,
    redirectToLogin,
    validToken,
  };
};
