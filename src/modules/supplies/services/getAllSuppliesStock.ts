import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseGetSupplies } from "../interfaces/Response";

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getAllSuppliesStock = async ({
  search = "",
  limit = 10,
  offset = 0,
  allRecords = false,
}: Props): Promise<ResponseGetSupplies> => {
  let params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());
  params.append("allRecords", allRecords.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}/stock/all?${params}`);
  return data;
};
