import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseApiGetAllRecords } from "@/modules/core/interfaces/ResponseApiGetAllRecords";
import { User } from "../interfaces/User";

export async function getUsers({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseApiGetAllRecords<User>> {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.users}?${params}`);
  return data;
}
