import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getEmployeeWithPaymentsPending = async (id: string) => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/one/${id}`
  );
  return data;
};

export const useGetEmployeePendingPayments = (id: string) => {
  const query = useQuery({
    queryKey: ['employee', 'pending-payments', id],
    queryFn: () => getEmployeeWithPaymentsPending(id),
  });
  return query;
};
