import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteSale = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.sales}/${id}`);
