import { RootState, useAppSelector } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";
import { setToken } from "../utils/authenticationSlice";
import { useCheckAuthStatus } from "./useCheckAuthStatus";

export const useAuthenticationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const saveUserInLocalStorage = (values: UserActive) => {
    localStorage.setItem("user-active", JSON.stringify(values));
    dispatch(setUserActive(values));
  };

  const isActiveSesion = () => {
    if (user.token.length > 0) {
      return true;
    }
    return false;
  };

  const getTokenSesion = () => {
    return user?.token;
  };

  const getTimeStartSesionUser = () => {
    return user?.timeStartSesion;
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  const LogOutUser = () => {
    dispatch(removeUserActive());
    localStorage.removeItem("user-active");
    navigate("/authentication/login", { replace: true });
  };

  const redirectToLogin = () => {
    navigate("/authentication/login");
  };

  const renewJWT = (token: string) => {
    dispatch(setToken(token));
  };

  const TIME_ACTIVE_TOKEN = 20 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 10 * 1000;

  const { mutate, isPending, isError, error } = useCheckAuthStatus();

  const validateToken = () => {
    console.log("Enviando mutacion al backend");
    mutate({ token: getTokenSesion() });
  };

  const setupAuthCheckInterval = () => {
    return setInterval(() => {
      validateToken();
    }, TIME_ACTIVE_TOKEN);
  };

  useEffect(() => {
    if (isActiveSesion()) {
      console.log("Validando token");
      const intervalId = setupAuthCheckInterval();
      return () => {
        clearInterval(intervalId);
      };
    } else {
      redirectToLogin();
    }
  }, []);

  if (isError) {
    const { statusCode } = error.response.data;
    if (statusCode === 401) {
      LogOutUser();
    }
  }

  return {
    LogOutUser,
    user,
    saveUserInLocalStorage,
    isActiveSesion,
    getTokenSesion,
    redirectToLogin,
    TIME_ACTIVE_TOKEN,
    TIME_QUESTION_RENEW_TOKEN,
    getTimeStartSesionUser,
    renewJWT,
    redirectToDashboard,
    validateToken,
    isPendingValidateToken: isPending,
    isErrorValidateToken: isError,
  };
};
