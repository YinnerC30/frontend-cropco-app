import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getClientById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.clients}/one/${id}`);
  return data;
};
