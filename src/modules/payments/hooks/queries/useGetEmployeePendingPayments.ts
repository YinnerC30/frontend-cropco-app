import { useQuery } from '@tanstack/react-query';
import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setDataEmployee } from '../../utils/paymentSlice';

export const getEmployeeWithPaymentsPending = async (id: string) => {
  const { data } = await cropcoAPI.get(
    `${pathsCropco.employees}/pending-payments/one/${id}`
  );
  return data;
};

export const useGetEmployeePendingPayments = (
  id = '',
  canExecuteQuery = true
) => {
  const dispatch = useAppDispatch();
  const query = useQuery({
    queryKey: ['employee', 'pending-payments', id],
    queryFn: () => getEmployeeWithPaymentsPending(id),
    enabled: id.length > 0 && canExecuteQuery,
    staleTime: 60_000 * 3,
  });

  useEffect(() => {
    if (query.isSuccess) {
      const { harvests_detail, works_detail } = query.data;
      dispatch(setDataEmployee({ harvests_detail, works_detail }));
    }
  }, [query.isSuccess, id]);

  return query;
};
