import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

interface CheckAuthStatusData {
  token: string;
}

export const renewToken = async (authData: CheckAuthStatusData) => {
  
  return await cropcoAPI.post(
    `${pathsCropco.authentication}/renew-token`,
    authData,
    {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    }
  );
};
