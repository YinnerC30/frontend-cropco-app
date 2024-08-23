import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseGetShopping } from "../interfaces/ResponseGetShopping";

export async function getAllShopping({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseGetShopping> {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.purchase}/all?${params}`);
  return data;
}
