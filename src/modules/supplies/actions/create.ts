import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/modules/supplies/Supply';

export const createSupply = async (supply: Supply) =>
  await cropcoAPI.post(`${pathsCropco.supplies}`, supply);
