import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkSuppliers = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.suppliers}/remove/bulk`, {
    data: {
      recordsIds: data.suppliersIds,
    },
  });
};

export const useDeleteBulkSuppliers = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const querySupplier = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkSuppliers,
      onSuccess: async ({ status, data: { failed, success } }) => {
        querySupplier.invalidateQueries({ queryKey: ['suppliers'] });
        querySupplier.invalidateQueries({ queryKey: ['shopping'] });
        ManageMessageBulkRemove({
          status,
          // customMessages: {
          //   multiStatus:
          //     'No se pudieron eliminar algunos empleados, revisa si tienen cosechas o trabajos pendientes de pago',
          // },
        });
        // toast.success(`Proveedores eliminados`);
      },
      onError: (error) => {
        handleError({
          error,
          handlers: {},
        });
      },

      retry: false,
    });

  return mutation;
};
