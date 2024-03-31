import { User } from '@/features/users/interfaces/User';
import { cropcoAPI } from '../../api/cropcoAPI';

const PATH = '/users';

export const createUser = async (user: User) =>
  await cropcoAPI.post('/users', user);

export const getUsers = async ({ parameter = '', limit = 10, offset = 0 }) => {
  console.log({ parameter, limit, offset });
  const params = new URLSearchParams();
  params.append('parameter', parameter);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  console.log(params);

  const { data } = await cropcoAPI.get(`${PATH}?${params}`);
  return data;
};

export const getUserById = async ({ id }: any) => {
  const { data } = await cropcoAPI.get(`${PATH}/${id}`);
  return data;
};

export const updateUser = async (user: User) => {
  const { id, ...rest } = user;
  await cropcoAPI.patch(`${PATH}/${id}`, rest);
};

export const deleteUser = async (id: string) =>
  await cropcoAPI.delete(`${PATH}/${id}`);
