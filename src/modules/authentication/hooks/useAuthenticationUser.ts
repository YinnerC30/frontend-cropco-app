import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";
import { setToken } from "../utils/authenticationSlice";
import { useCheckAuthStatus } from "./useCheckAuthStatus";
import { useRenewToken } from "./useRenewToken";

export const useAuthenticationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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

  const redirectToDashboard = () => {
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/authentication/login", { replace: true });
  };

  const LogOutUser = () => {
    removeUserInState();
    removeUserInLocalStorage();
    redirectToLogin();
  };

  const renewTokenInState = (token: string) => {
    dispatch(setToken(token));
  };
  const renewTokenInLocalStorage = (token: string) => {
    localStorage.setItem("user-active", JSON.stringify({ ...user, token }));
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

  return {
    user,
    saveUserInLocalStorage,
    removeUserInLocalStorage,
    removeUserInState,
    getTokenSesion,
    isActiveSesion,
    getTimeStartSesionUser,
    redirectToDashboard,
    redirectToLogin,
    LogOutUser,
    renewTokenInState,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    mutationCheckAuthStatus,
    mutationRenewToken,
    validateToken,
    renewToken,
    renewTokenInLocalStorage,
  };
};
