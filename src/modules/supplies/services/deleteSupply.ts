import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const deleteSupply = async (id: string): Promise<void> =>
  await cropcoAPI.delete(`${pathsCropco.supplies}/remove/one/${id}`);
