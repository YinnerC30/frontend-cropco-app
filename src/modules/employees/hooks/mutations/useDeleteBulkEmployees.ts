import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { useAuthContext } from '@/auth/hooks';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { ManageMessageBulkRemove } from '@/modules/core/helpers/ManageMessageBulkRemove';
import { BulkRecords } from '@/modules/core/interfaces/bulk-data/BulkRecords';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBulkEmployees = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.employees}/remove/bulk`, {
    data: {
      recordsIds: data.employeesIds,
    },
  });
};

export const useDeleteBulkEmployees = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkEmployees,
      onSuccess: async ({ status, data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ['employees'] });
        await queryClient.invalidateQueries({ queryKey: ['harvest'] });
        await queryClient.invalidateQueries({ queryKey: ['work'] });
        await queryClient.invalidateQueries({
          queryKey: ['employees-top-harvests'],
        });
        await queryClient.invalidateQueries({
          queryKey: ['employees-top-works'],
        });
        ManageMessageBulkRemove({
          status,
          customMessages: {
            multiStatus:
              'No se pudieron eliminar algunos empleados, revisa si tienen cosechas o trabajos pendientes de pago',
          },
        });
      },
      onError: (error) => {
        handleError({
          error,
          handlers: {
            conflict: {
              message:
                'No se pudieron eliminar los empleados seleccionados, revisa si tienen cosechas o trabajos pendientes de pago',
            },
          },
        });
      },

      retry: false,
    });

  return mutation;
};
