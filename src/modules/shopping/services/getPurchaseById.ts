import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getPurchaseById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.purchase}/${id}`);
  return data;
};
