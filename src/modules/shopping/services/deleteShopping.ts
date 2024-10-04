import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteShopping = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.purchase}/remove/one/${id}`);
};
