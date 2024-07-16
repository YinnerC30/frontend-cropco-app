import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getConsumptionById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.consumption}/${id}`);
  return data;
};
