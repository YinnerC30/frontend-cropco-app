import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/Supply';

export const updateSupply = async (supply: Supply) => {
  const { id, ...rest } = supply;
  await cropcoAPI.patch(`${pathsCropco.supplies}/${id}`, rest);
};
