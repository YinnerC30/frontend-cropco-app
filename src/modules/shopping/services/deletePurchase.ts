import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deletePurchase = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.purchase}/${id}`);
};
