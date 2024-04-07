import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getUserById = async ({ id }: any) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.users}/${id}`);
  return data;
};
