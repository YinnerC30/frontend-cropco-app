import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getSupplierById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.suppliers}/one/${id}`);
  return data;
};
