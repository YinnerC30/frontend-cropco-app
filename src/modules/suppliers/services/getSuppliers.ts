import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getSuppliers = async ({ search = '', limit = 10, offset = 0 }) => {
  const params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.suppliers}?${params}`);
  return data;
};
