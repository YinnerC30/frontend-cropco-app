import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { User } from '../../../interfaces/User';

export const updateUser = async (user: User) => {
  const { id, ...rest } = user;
  await cropcoAPI.patch(`${pathsCropco.users}/${id}`, rest);
};
