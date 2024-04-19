import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Employee } from '../interfaces/Employee';


export const createEmployee = async (employee: Employee) =>
  await cropcoAPI.post(`${pathsCropco.employees}`, employee);
