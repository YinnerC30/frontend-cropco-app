import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deletePayment = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.payments}/remove/one/${id}`);
