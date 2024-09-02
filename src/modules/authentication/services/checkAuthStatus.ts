import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface CheckAuthStatusData {
  token: string;
}

export const checkAuthStatus = async (authData: CheckAuthStatusData) => {
  const response = await cropcoAPI.post(
    `${pathsCropco.authentication}/check-status`,
    authData
  );

  return response;
};
