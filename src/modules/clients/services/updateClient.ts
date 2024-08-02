import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Client } from "@/modules/clients/interfaces/Client";

export const updateClient = async (client: Client) => {
  const { id, ...rest } = client;
  await cropcoAPI.patch(`${pathsCropco.clients}/${id}`, rest);
};
