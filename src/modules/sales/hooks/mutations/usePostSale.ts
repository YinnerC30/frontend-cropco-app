import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responsess/UseMutationReturn';
import { useNavigate } from 'react-router-dom';
import { Sale } from '../../interfaces';
import { MODULE_SALES_PATHS } from '../../routes/pathRoutes';

export const createSale = async (sale: Sale): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.sales}/create`, sale);
};

export const usePostSale = (): UseMutationReturn<void, Sale> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Sale> = useMutation({
    mutationFn: createSale,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sales'] });
      await queryClient.invalidateQueries({
        queryKey: ['crops'],
      });
      navigate(MODULE_SALES_PATHS.ViewAll);
      toast.success(`Venta creada`);
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
