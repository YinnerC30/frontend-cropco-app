import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { User } from '../../../interfaces/User';

export const createUser = async (user: User) =>
  await cropcoAPI.post(`${pathsCropco.users}`, user);
