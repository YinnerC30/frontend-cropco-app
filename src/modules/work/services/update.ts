import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Work } from "../interfaces/Work";

export async function updateWork({ id, ...rest }: Work): Promise<void> {
  await cropcoAPI.patch(`${pathsCropco.works}/${id}`, rest);
}
