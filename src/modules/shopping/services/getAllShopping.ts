import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseGetShopping } from "../interfaces/ResponseGetShopping";

export async function getAllShopping({
  limit = 10,
  offset = 0,
  after_date = "",
  before_date = "",
  minor_total = 0,
  major_total = 0,
}): Promise<ResponseGetShopping> {
  const params = new URLSearchParams();
  +params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  if (after_date.length > 0) {
    params.append("after_date", new Date(after_date).toISOString());
  }
  if (before_date.length > 0) {
    params.append("before_date", new Date(before_date).toISOString());
  }
  if (minor_total != 0) {
    params.append("minor_total", minor_total.toString());
  }
  if (major_total != 0) {
    params.append("major_total", major_total.toString());
  }

  const { data } = await cropcoAPI.get(`${pathsCropco.purchase}/all?${params}`);
  return data;
}
