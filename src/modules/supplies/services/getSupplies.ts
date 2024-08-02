import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseApiGetAllRecords } from "@/modules/core/interfaces";
import { Supply } from "../interfaces/Supply";

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getSupplies = async ({
  search = "",
  limit = 10,
  offset = 0,
  allRecords = false,
}: Props): Promise<ResponseApiGetAllRecords<Supply>> => {
  let params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  params.append("allRecords", allRecords.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}?${params}`);
  return data;
};
