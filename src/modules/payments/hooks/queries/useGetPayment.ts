import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ConvertStringToDate } from '@/modules/core/helpers';
import { UseGetOneRecordReturn } from '@/modules/core/interfaces/responses/UseGetOneRecordReturn';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { PaymentRecord } from '../../interfaces/ResponseGetOnePayment';
import { CACHE_CONFIG_TIME } from '@/config';

export const getPaymentById = async (
  id: string
): PromiseReturnRecord<PaymentRecord> => {
  return await cropcoAPI.get(`${pathsCropco.payments}/one/${id}`);
};

export const useGetPayment = (
  id: string
): UseGetOneRecordReturn<PaymentRecord> => {
  const { hasPermission, handleError } = useAuthContext();
  const isAuthorized = hasPermission('payments', 'find_one_payment');

  const query: UseGetOneRecordReturn<PaymentRecord> = useQuery({
    queryKey: ['payment', id],
    queryFn: () => getPaymentById(id),
    select: ({ data }) =>
      ({
        ...data,
        date: ConvertStringToDate(data.date!),
        employee: {
          ...data.employee,
          full_name: data.employee.first_name + ' ' + data.employee.last_name
        }
      } as unknown as PaymentRecord),
    enabled: isAuthorized,
    refetchOnWindowFocus: false,
    ...CACHE_CONFIG_TIME.shortTerm,
  });

  useEffect(() => {
    if (!isAuthorized) {
      toast.error(
        'Requieres del permiso de lectura para obtener la información del pago solicitado'
      );
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (query.isError) {
      handleError({
        error: query.error,
        messagesStatusError: {},
      });
    }
  }, [query.isError, query.error]);
  return query;
};
