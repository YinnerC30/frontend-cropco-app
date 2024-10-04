import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { User } from '../interfaces/User';

export async function createUser(user: User): Promise<User> {
  return await cropcoAPI.post(`${pathsCropco.users}/create`, user);
}
