import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Client } from '@/interfaces/Client';

export const createClient = async (client: Client) =>
  await cropcoAPI.post(`${pathsCropco.clients}`, client);
