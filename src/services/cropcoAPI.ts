import { CreateCrop } from '@/features/crops/interfaces/Crop';
import { CreateUser } from '@/features/users/interfaces/User';
import axios from 'axios';

const cropcoAPI = axios.create({
  baseURL: `${import.meta.env.VITE_HOST_API_CROPCO}`,
});

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

export const createCrop = async (crop: CreateCrop) =>
  await cropcoAPI.post('/crops', crop);

export const getCrops = async ({ parameter = '', limit = 100, offset = 0 }) => {
  const res = await cropcoAPI.get(
    `/crops?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getCropById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/crops/${id}`);
  return res.data;
};

export const updateCrop = async ({ id, crop }: any) => {
  await cropcoAPI.patch(`/crops/${id}`, crop);
};

export const deleteCrop = async (id: string) =>
  await cropcoAPI.delete(`/crops/${id}`);
