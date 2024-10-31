import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { User } from '../interfaces';

export async function getUserById(id: string): Promise<User> {
  const { data } = await cropcoAPI.get(`${pathsCropco.users}/one/${id}`);
  return data;
}
