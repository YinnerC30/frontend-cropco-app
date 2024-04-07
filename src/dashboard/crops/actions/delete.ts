import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteCrop = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.crops}/${id}`);
