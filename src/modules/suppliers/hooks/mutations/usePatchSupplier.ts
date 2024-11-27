import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';
import { useManageErrorApp } from '@/modules/authentication/hooks';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';

export const updateSupplier = async (supplier: Supplier) => {
  const { id, ...rest } = supplier;
  return await cropcoAPI.patch(
    `${pathsCropco.suppliers}/update/one/${id}`,
    rest
  );
};

export const usePatchSupplier = () => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: updateSupplier,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      navigate(MODULE_SUPPLIER_PATHS.ViewAll);
      toast.success(`Proveedor actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      handleError({
        error: updateError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios empleados',
      });
    },
    retry: 1,
  });
  return mutation;
};
