import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Sale } from '../../interfaces';
import { useNavigate } from 'react-router-dom';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';

export const updateSale = async (sale: Sale): PromiseReturnRecord<void> => {
  const { id, ...rest } = sale;
  return await cropcoAPI.patch(`${pathsCropco.sales}/update/one/${id}`, rest);
};

export const usePatchSale = (id: string): UseMutationReturn<void, Sale> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Sale> = useMutation({
    mutationFn: updateSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({ queryKey: ['sales', id] });
      navigate(MODULE_SALES_PATHS.ViewAll);
      toast.success(`Venta actualizada`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });
  return mutation;
};
