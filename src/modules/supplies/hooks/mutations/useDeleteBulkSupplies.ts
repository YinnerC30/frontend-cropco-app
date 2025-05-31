import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { BulkRecords } from "@/modules/core/interfaces/bulk-data/BulkRecords";
import { UseDeleteBulkResponse } from "@/modules/core/interfaces/responses/UseDeleteBulkResponse";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteBulkSupplies = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.supplies}/remove/bulk`, {
    data: {
      recordsIds: data.suppliesIds,
    },
  });
};

export const useDeleteBulkSupplies = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkSupplies,
      onSuccess: async ({ data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ["supplies"] });
        await queryClient.invalidateQueries({ queryKey: ["supply"] });
        await queryClient.invalidateQueries({ queryKey: ["consumption"] });
        await queryClient.invalidateQueries({ queryKey: ["shopping"] });

        if (success.length > 0 && failed.length === 0) {
          toast.success(`Suministros eliminados`);
        } else if (failed.length > 0) {
          toast.error(
            `No se pudieron eliminar algunos insumos, es posible que alguno tenga aun stock disponible`
          );
        }
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
