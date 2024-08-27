import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";
import { setToken } from "../utils/authenticationSlice";

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

  const redirectToLogin = () => {
    navigate("/authentication/login");
  };

  const redirectToDashboard = () => {
    navigate("/");
  };

  const LogOutUser = () => {
    dispatch(removeUserActive());
    localStorage.removeItem("user-active");
    navigate("/authentication/login", { replace: true });
  };

  const renewJWT = (token: string) => {
    dispatch(setToken(token));
  };

  const TIME_ACTIVE_TOKEN = 15 * 1000;
  const TIME_QUESTION_RENEW_TOKEN = 10 * 1000;

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
  };
};
