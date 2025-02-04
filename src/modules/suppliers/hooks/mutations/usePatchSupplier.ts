import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { Supplier } from '@/modules/suppliers/interfaces/Supplier';
import { useNavigate } from 'react-router-dom';
import { MODULE_SUPPLIER_PATHS } from '../../routes/pathRoutes';

export const updateSupplier = async (
  supplier: Supplier
): PromiseReturnRecord<void> => {
  const { id, ...rest } = supplier;
  return await cropcoAPI.patch(
    `${pathsCropco.suppliers}/update/one/${id}`,
    rest
  );
};

export const usePatchSupplier = (): UseMutationReturn<void, Supplier> => {
  const queryClient = useQueryClient();
  const { handleError } = useManageErrorApp();
  const navigate = useNavigate();
  const mutation: UseMutationReturn<void, Supplier> = useMutation({
    mutationFn: updateSupplier,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['suppliers'] });
      await queryClient.invalidateQueries({ queryKey: ['supplier'] });
      navigate(MODULE_SUPPLIER_PATHS.ViewAll);
      toast.success(`Proveedor actualizado`);
    },
    onError: (error) => {
      handleError({
        error,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios empleados',
      });
    },
    retry: 1,
  });
  return mutation;
};
