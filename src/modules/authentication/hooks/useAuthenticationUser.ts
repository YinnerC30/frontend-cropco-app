import { RootState, useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";
import { setToken } from "../utils/authenticationSlice";
import { useCheckAuthStatus } from "./useCheckAuthStatus";
import { useRenewToken } from "./useRenewToken";
import { toast } from "sonner";

export const useAuthenticationUser = () => {
  const { user } = useAppSelector((state: RootState) => state.authentication);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const saveUserInLocalStorage = (values: UserActive) => {
    localStorage.setItem("user-active", JSON.stringify(values));
    dispatch(setUserActive(values));
  };

  const [currentToken, setCurrentToken] = useState("");

  const getTokenSesion = () => {
    return user?.token;
  };

  const isActiveSesion = () => {
    if (user.token.length > 0) {
      setCurrentToken(getTokenSesion());
      return true;
    }
    return false;
  };

  const getTimeStartSesionUser = () => {
    return user?.timeStartSesion;
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  const redirectToLogin = () => {
    navigate("/authentication/login");
  };

  const LogOutUser = () => {
    dispatch(removeUserActive());
    localStorage.removeItem("user-active");
    navigate("/authentication/login", { replace: true });
  };

  const renewJWT = (token: string) => {
    dispatch(setToken(token));
  };

  const TIME_ACTIVE_TOKEN = 20 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 10 * 1000;

  const { mutate, isPending, isError, error } = useCheckAuthStatus();
  const mutationRenewToken = useRenewToken();

  const validateToken = () => {
    mutate({ token: currentToken });
  };

  const renewToken = () => {
    mutationRenewToken.mutate({ token: currentToken });
  };

  const setupAuthCheckInterval = () => {
    return setInterval(() => {
      toast.info("Se verificara el token");
      validateToken();
    }, TIME_ACTIVE_TOKEN);
  };

  const setupRenewTokenInterval = () => {
    return setInterval(() => {
      toast.info("Se renovara el token");
      renewToken();
    }, TIME_QUESTION_RENEW_TOKEN);
  };

  useEffect(() => {
    if (isActiveSesion()) {
      const intervalId1 = setupRenewTokenInterval();
      const intervalId2 = setupAuthCheckInterval();
      return () => {
        clearInterval(intervalId1);
        clearInterval(intervalId2);
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

  // Buscar como forzar un nuevo renderizado
  useEffect(() => {
    if (mutationRenewToken.isSuccess) {
      const { data } = mutationRenewToken;

      renewJWT(data.data.token);
      setCurrentToken(data.data.token);
    }
  }, []);

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
