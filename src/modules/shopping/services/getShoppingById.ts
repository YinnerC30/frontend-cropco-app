import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getShoppingById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.purchase}/${id}`);
  return data;
};
