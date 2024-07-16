import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseGetPurchases } from "../interfaces/ResponseGetPurchases";

export async function getPurchases({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseGetPurchases> {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.purchase}/all?${params}`);
  return data;
}
