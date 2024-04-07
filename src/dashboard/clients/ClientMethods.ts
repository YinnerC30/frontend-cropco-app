import { CreateClient } from '@/dashboard/clients/interfaces/Client';
import { cropcoAPI } from '../../api/cropcoAPI';

export const createClient = async (client: CreateClient) =>
  await cropcoAPI.post('/clients', client);

export const getClients = async ({
  parameter = '',
  limit = 100,
  offset = 0,
}) => {
  const res = await cropcoAPI.get(
    `/clients?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getClientById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/clients/${id}`);
  return res.data;
};

export const updateClient = async ({ id, client }: any) => {
  await cropcoAPI.patch(`/clients/${id}`, client);
};

export const deleteClient = async (id: string) =>
  await cropcoAPI.delete(`/clients/${id}`);
