import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteClient = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.clients}/remove/one/${id}`);
