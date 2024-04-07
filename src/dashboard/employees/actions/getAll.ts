import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

interface Props {
  parameter: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getEmployees = async ({
  parameter = '',
  limit = 10,
  offset = 0,
  allRecords,
}: Props) => {
  let params = new URLSearchParams();
  params.append('parameter', parameter);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('allRecords', allRecords.toString());

  const { data } = await cropcoAPI.get(`${pathsCropco.employees}?${params}`);
  return data;
};
