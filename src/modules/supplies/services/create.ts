import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/interfaces/Supply';

export const createSupply = async (supply: Supply): Promise<Supply> =>
  await cropcoAPI.post(`${pathsCropco.supplies}`, supply);
