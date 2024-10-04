import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/interfaces/Supply';

export const updateSupply = async (supply: Supply): Promise<void> => {
  const { id, ...rest } = supply;
  await cropcoAPI.patch(`${pathsCropco.supplies}/update/one/${id}`, rest);
};
