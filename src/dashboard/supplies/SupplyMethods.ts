import { CreateSupply } from '@/dashboard/supplies/interfaces/Supply';
import { cropcoAPI } from '../../api/cropcoAPI';

export const createSupply = async (supply: CreateSupply) =>
  await cropcoAPI.post('/supplies', supply);

export const getSupplies = async ({
  parameter = '',
  limit = 100,
  offset = 0,
}) => {
  const res = await cropcoAPI.get(
    `/supplies?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getSupplyById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/supplies/${id}`);
  return res.data;
};

export const updateSupply = async ({ id, supply }: any) => {
  await cropcoAPI.patch(`/supplies/${id}`, supply);
};

export const deleteSupply = async (id: string) =>
  await cropcoAPI.delete(`/supplies/${id}`);
