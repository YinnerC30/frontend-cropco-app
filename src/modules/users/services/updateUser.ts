import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { User } from "../interfaces/User";

export async function updateUser({ id, ...rest }: User): Promise<void> {
  const {data} = await cropcoAPI.patch(`${pathsCropco.users}/update/one/${id}`, rest);
  return data;
}
