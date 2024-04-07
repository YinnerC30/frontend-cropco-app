import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getEmployeeById = async (id: string) => {
  const { data } = await cropcoAPI.get(`${pathsCropco.employees}/${id}`);
  return data;
};
