import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Module } from '../interfaces/Responses/ResponseGetAllModules';

export const getModules = async (): Promise<Module[]> => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.authentication}/modules/all`
  );
  return data;
};
