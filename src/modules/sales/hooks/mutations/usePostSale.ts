import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Sale } from '../interfaces';

export const createSale = async (sale: Sale) =>
  await cropcoAPI.post(`${pathsCropco.sales}/create`, sale);

export const usePostSale = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
      toast.success(`Venta creada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la venta, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
