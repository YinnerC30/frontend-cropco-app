import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { LoginUserData } from "../interfaces/LoginUserData";

export const loginUser = async (loginUserData: LoginUserData) => {
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/login`,
    loginUserData
  );
};
