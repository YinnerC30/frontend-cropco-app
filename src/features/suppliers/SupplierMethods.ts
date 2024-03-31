import { CreateSupplier } from '@/features/suppliers/interfaces/Supplier';
import { cropcoAPI } from '../../api/cropcoAPI';

export const createSupplier = async (supplier: CreateSupplier) =>
  await cropcoAPI.post('/suppliers', supplier);

export const getSuppliers = async ({
  parameter = '',
  limit = 100,
  offset = 0,
}) => {
  const res = await cropcoAPI.get(
    `/suppliers?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getSupplierById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/suppliers/${id}`);
  return res.data;
};

export const updateSupplier = async ({ id, supplier }: any) => {
  await cropcoAPI.patch(`/suppliers/${id}`, supplier);
};

export const deleteSupplier = async (id: string) =>
  await cropcoAPI.delete(`/suppliers/${id}`);
