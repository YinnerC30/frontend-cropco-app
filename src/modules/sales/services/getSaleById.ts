import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getSaleById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.sales}/one/${id}`);
  return data;
};
