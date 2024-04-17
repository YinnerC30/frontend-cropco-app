import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Employee } from '@/modules/employees/Employee';

export const createEmployee = async (employee: Employee) =>
  await cropcoAPI.post(`${pathsCropco.employees}`, employee);
