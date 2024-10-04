import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteEmployee = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.employees}/remove/one/${id}`);
