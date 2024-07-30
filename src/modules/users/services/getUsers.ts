import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseGetUsers } from '../interfaces/Response';

export async function getUsers({
  search = '',
  limit = 10,
  offset = 0,
}): Promise<ResponseGetUsers> {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.users}?${params}`);
  return data;
}
