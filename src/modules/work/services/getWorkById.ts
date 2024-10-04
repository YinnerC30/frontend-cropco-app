import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Work } from "../interfaces/Work";

export async function getWorkById(id: string): Promise<Work> {
  const { data } = await cropcoAPI.get(`${pathsCropco.works}/one/${id}`);
  return data[0];
}
