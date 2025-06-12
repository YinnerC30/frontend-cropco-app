import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { BulkRecords } from "@/modules/core/interfaces/bulk-data/BulkRecords";
import { UseDeleteBulkResponse } from "@/modules/core/interfaces/responses/UseDeleteBulkResponse";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteBulkHarvests = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.harvests}/remove/bulk`, {
    data: {
      recordsIds: data.harvestIds,
    },
  });
};

export const useDeleteBulkHarvests = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkHarvests,
      onSuccess: async ({ data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ["harvests"] });
        await queryClient.invalidateQueries({
          queryKey: ["crops"],
        });
        await queryClient.invalidateQueries({
          queryKey: ["harvests-amount-year"],
        });

        if (success.length > 0 && failed.length === 0) {
          toast.success(`Cosechas eliminadas`);
        } else if (failed.length > 0) {
          toast.error(
            `No se pudieron eliminar algunas cosechas, es posible que alguna tenga aun cosechas pendientes de pago`
          );
        }
      },
      onError: (error) => {
        handleError({
          error,
          messagesStatusError: {},
        });
      },

      retry: false,
    });

  return mutation;
};
