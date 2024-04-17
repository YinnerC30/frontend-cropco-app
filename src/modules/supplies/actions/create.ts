import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supply } from '@/interfaces/Supply';

export const createSupply = async (supply: Supply) =>
  await cropcoAPI.post(`${pathsCropco.supplies}`, supply);
