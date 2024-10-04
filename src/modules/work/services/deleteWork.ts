import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteWork = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.works}/remove/one${id}`);
