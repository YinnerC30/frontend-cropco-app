import { CreateEmployee } from '@/features/employees/interfaces/Employee';
import { cropcoAPI } from './cropcoAPI';

export const createEmployee = async (employee: CreateEmployee) =>
  await cropcoAPI.post('/employees', employee);

export const getEmployees = async ({
  parameter = '',
  limit = 100,
  offset = 0,
}) => {
  const res = await cropcoAPI.get(
    `/employees?parameter=${parameter}&limit=${limit}&offset=${offset}`,
  );
  return res.data;
};

export const getEmployeeById = async ({ id }: any) => {
  const res = await cropcoAPI.get(`/employees/${id}`);
  return res.data;
};

export const updateEmployee = async ({ id, employee }: any) => {
  await cropcoAPI.patch(`/employees/${id}`, employee);
};

export const deleteEmployee = async (id: string) =>
  await cropcoAPI.delete(`/employees/${id}`);
