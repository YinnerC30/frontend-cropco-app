import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { HarvestStock } from "@/modules/harvests/interfaces/HarvestStock";

interface ResponseHarvestProcessed {
  rowCount: number;
  rows: HarvestStock[];
  pageCount: number;
}

export const getHarvestStock = async ({
  search = "",
  limit = 10,
  offset = 0,
}): Promise<ResponseHarvestProcessed> => {
  const params = new URLSearchParams();
  params.append("search", search);
  params.append("limit", limit.toString());
  params.append("offset", offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsStock}?${params}`
  );
  return data;
};
