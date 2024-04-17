import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export async function deleteUser(id: string): Promise<void> {
  await cropcoAPI.delete(`${pathsCropco.users}/${id}`);
}
