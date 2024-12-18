import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';

export const getEmployeesWithPaymentsMade = async () => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/made-payments/all`
  );
  return data;
};

export const useGetAllEmployeesWithMadePayments = () => {
  const query = useQuery({
    queryKey: ['employees', 'made-payments'],
    queryFn: () => getEmployeesWithPaymentsMade(),
    staleTime: 60_000 * 60,
  });
  return query;
};
