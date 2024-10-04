import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { ResponseApiGetAllRecords } from "@/modules/core/interfaces";
import { HarvestProcessed } from "@/modules/harvests/interfaces/HarvestProcessed";

export const getHarvestsProcessed = async ({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseApiGetAllRecords<HarvestProcessed>> => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsProcessed}/all?${params}`
  );
  return data;
};
