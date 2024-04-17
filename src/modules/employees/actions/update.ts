import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Employee } from '@/interfaces/Employee';

export const updateEmployee = async (employee: Employee) => {
  const { id, ...rest } = employee;
  await cropcoAPI.patch(`${pathsCropco.employees}/${id}`, rest);
};
