import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const getUsers = async ({ parameter = '', limit = 10, offset = 0 }) => {
  const params = new URLSearchParams();
  params.append('parameter', parameter);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.users}?${params}`);
  return data;
};
