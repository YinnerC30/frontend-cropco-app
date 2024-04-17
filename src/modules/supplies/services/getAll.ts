import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseGetSupplies } from '../interfaces/Response';

export const getSupplies = async ({
  search = '',
  limit = 10,
  offset = 0,
}): Promise<ResponseGetSupplies> => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.supplies}?${params}`);
  return data;
};
