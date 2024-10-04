import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getPaymentById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.payments}/one/${id}`);
  return data;
};
