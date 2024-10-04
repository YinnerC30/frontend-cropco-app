import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseApiGetAllRecords } from "@/modules/core/interfaces";
import { HarvestStock } from "@/modules/harvests/interfaces/HarvestStock";

export const getHarvestStock = async ({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseApiGetAllRecords<HarvestStock>> => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsStock}/stock/all?${params}`
  );
  return data;
};
