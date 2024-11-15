import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteUser = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.users}/remove/one/${id}`);
};
