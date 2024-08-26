import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface CheckAuthStatusData {
  token: string;
}

export const checkAuthStatus = async (authData: CheckAuthStatusData) => {
  return await cropcoAPI.post(`${pathsCropco.authentication}/check-status`,{
    authData
  });
};
