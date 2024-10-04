import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getModules = async () => {
  const { data } = await cropcoAPI.get(`${pathsCropco.authentication}/modules/all`);
  return data;
};
