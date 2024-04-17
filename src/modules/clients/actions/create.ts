import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Client } from '@/modules/clients/Client';

export const createClient = async (client: Client) =>
  await cropcoAPI.post(`${pathsCropco.clients}`, client);
