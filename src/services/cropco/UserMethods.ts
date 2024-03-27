import { CreateUser } from '@/features/users/interfaces/User';
import { cropcoAPI } from './cropcoAPI';

export const createUser = async (user: CreateUser) =>
  await cropcoAPI.post('/users', user);

export const getUsers = async ({ parameter = '', limit = 100, offset = 0 }) => {
  const res = await cropcoAPI.get(
    `/users?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getUserById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/users/${id}`);
  return res.data;
};

export const updateUser = async ({ id, user }: any) => {
  await cropcoAPI.patch(`/users/${id}`, user);
};

export const deleteUser = async (id: string) =>
  await cropcoAPI.delete(`/users/${id}`);
