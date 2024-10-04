import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { User } from "../interfaces/User";

export async function updateUser({ id, ...rest }: User): Promise<void> {
  await cropcoAPI.patch(`${pathsCropco.users}/update/one/${id}`, rest);
}
