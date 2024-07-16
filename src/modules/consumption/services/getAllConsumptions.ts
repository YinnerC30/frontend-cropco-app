import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseGetConsumptions } from "../interfaces/ResponseGetConsumptions";

export async function getAllConsumptions({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseGetConsumptions> {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.consumption}/all?${params}`);
  return data;
}
