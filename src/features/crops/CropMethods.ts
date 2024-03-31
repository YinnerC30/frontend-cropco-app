import { CreateCrop } from '@/features/crops/interfaces/Crop';
import { cropcoAPI } from '../../api/cropcoAPI';

export const createCrop = async (crop: CreateCrop) => {
  await cropcoAPI.post('/crops', crop);
};

export const getCrops = async ({ parameter = '', limit = 100, offset = 0 }) => {
  const res = await cropcoAPI.get(
    `/crops?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getCropById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/crops/${id}`);
  return res.data;
};

export const updateCrop = async ({ id, crop }: any) => {
  await cropcoAPI.patch(`/crops/${id}`, crop);
};

export const deleteCrop = async (id: string) =>
  await cropcoAPI.delete(`/crops/${id}`);
