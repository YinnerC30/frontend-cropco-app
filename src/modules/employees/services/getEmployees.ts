import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { ResponseApiGetAllRecords } from '@/modules/core/interfaces/Responses/ResponseApiGetAllRecords';
import { Employee } from '../interfaces/Employee';

interface Props {
  search: string;
  limit: number;
  offset: number;
  allRecords: boolean;
}

export const getEmployees = async ({
  search = '',
  limit = 10,
  offset = 0,
  allRecords,
}: Props): Promise<ResponseApiGetAllRecords<Employee>> => {
  let params = new URLSearchParams();
  params.append('search', search);
  params.append('limit', limit.toString());
  params.append('offset', offset.toString());
  params.append('allRecords', allRecords.toString());

  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/all?${params}`
  );
  return data;
};
