import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteSupplier = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.suppliers}/remove/one/${id}`);
