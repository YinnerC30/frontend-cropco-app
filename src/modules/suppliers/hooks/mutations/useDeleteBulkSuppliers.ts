import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useManageErrorApp } from '@/auth/hooks';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const deleteBulkSuppliers = async (data: BulkRecords) => {
  await cropcoAPI.delete(`${pathsCropco.suppliers}/remove/bulk`, {
    data: {
      recordsIds: data.suppliersIds,
    },
  });
};

export const useDeleteBulkSuppliers = () => {
  const querySupplier = useQueryClient();
  const { handleError } = useManageErrorApp();
  const mutation = useMutation({
    mutationFn: deleteBulkSuppliers,
    onSuccess: () => {
      querySupplier.invalidateQueries({ queryKey: ['suppliers'] });
      toast.success(`Proveedores eliminados`);
    },
    onError: (error: AxiosError) => {
      const deleteError: AxiosError | any = error;
      handleError({
        error: deleteError as AxiosError,
        messageUnauthoraizedError:
          'No tienes permiso para eliminar varios proveedores',
      });
    },

    retry: 1,
  });

  return mutation;
};
