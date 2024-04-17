import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { HarvestProcessed } from '@/modules/harvests/Harvest';

interface ResponseHarvestProcessed {
  rowCount: number;
  rows: HarvestProcessed[];
  pageCount: number;
}

export const getHarvestsProcessed = async ({
  search = '',
  limit = 10,
  offset = 0,
}): Promise<ResponseHarvestProcessed> => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.harvestsProcessed}?${params}`,
  );
  return data;
};
