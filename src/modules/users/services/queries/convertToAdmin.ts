import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { User } from '../interfaces';

export async function convertToAdmin(id: string): Promise<User> {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/convert-to-admin/one/${id}`
  );
  return data;
}
