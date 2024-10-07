import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseApiGetAllRecords } from "@/modules/core/interfaces/ResponseApiGetAllRecords";
import { User } from "../interfaces/User";
import { BasicQueryData } from "@/modules/core/interfaces/BasicQueryData";

export async function getUsers(
  values: BasicQueryData
): Promise<ResponseApiGetAllRecords<User>> {
  const { query: value = "", limit = 10, offset = 0 } = values;

  const params = new URLSearchParams({
    search: value,
    limit: limit.toString(),
    offset: offset.toString(),
  });

  const { data } = await cropcoAPI.get(`${pathsCropco.users}/all?${params}`);
  return data;
}
