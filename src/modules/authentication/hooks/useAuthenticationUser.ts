import { RootState, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserActive } from "../interfaces";
import { removeUserActive, setUserActive } from "../utils";

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

  const redirectToLogin = () => {
    navigate("/authentication/login");
  };

  const LogOutUser = () => {
    dispatch(removeUserActive());
    localStorage.removeItem("user-active");
    navigate("/authentication/login", { replace: true });
  };

  return {
    LogOutUser,
    user,
    saveUserInLocalStorage,
    isActiveSesion,
    getTokenSesion,
    redirectToLogin,
  };
};
