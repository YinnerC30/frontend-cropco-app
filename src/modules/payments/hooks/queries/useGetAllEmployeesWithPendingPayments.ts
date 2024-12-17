import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getEmployeesWithPaymentsPending = async () => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/all`
  );
  return data;
};

export const useGetAllEmployeesWithPendingPayments = () => {
  const query = useQuery({
    queryKey: ['employees', 'pending-payments'],
    queryFn: () => getEmployeesWithPaymentsPending(),
  });
  return { query };
};
