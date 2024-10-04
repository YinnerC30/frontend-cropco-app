import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { Work } from "../interfaces/Work";

export async function createWork(work: Work): Promise<Work> {
  return await cropcoAPI.post(`${pathsCropco.works}/create`, work);
}
