import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';
import { useManageErrorApp } from '@/auth/hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';

export const createSupplier = async (supplier: Supplier) => {
  return await cropcoAPI.post(`${pathsCropco.suppliers}/create`, supplier);
};

export const usePostSupplier = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: createSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      navigate(MODULE_SUPPLIER_PATHS.ViewAll);
      toast.success(`Proveedor creado`);
    },
    onError: (error: AxiosError) => {
      const createError: AxiosError | any = error;
      handleError({
        error: createError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios empleados',
      });
    },
    retry: 1,
  });

  return mutation;
};
