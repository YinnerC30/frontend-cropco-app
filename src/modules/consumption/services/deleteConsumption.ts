import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteConsumption = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.consumption}/${id}`);
};
