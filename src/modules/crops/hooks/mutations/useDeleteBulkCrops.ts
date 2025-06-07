import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { BulkRecords } from "@/modules/core/interfaces/bulk-data/BulkRecords";
import { UseDeleteBulkResponse } from "@/modules/core/interfaces/responses/UseDeleteBulkResponse";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteBulkCrops = async (
  data: BulkRecords
): PromiseReturnRecord<UseDeleteBulkResponse> => {
  return await cropcoAPI.delete(`${pathsCropco.crops}/remove/bulk`, {
    data: {
      recordsIds: data.cropsIds,
    },
  });
};

export const useDeleteBulkCrops = (): UseMutationReturn<
  UseDeleteBulkResponse,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<UseDeleteBulkResponse, BulkRecords> =
    useMutation({
      mutationFn: deleteBulkCrops,
      onSuccess: async ({ data: { failed, success } }) => {
        await queryClient.invalidateQueries({ queryKey: ["crops"] });
        await queryClient.invalidateQueries({ queryKey: ["harvest"] });
        await queryClient.invalidateQueries({ queryKey: ["work"] });
        await queryClient.invalidateQueries({ queryKey: ["sale"] });
        await queryClient.invalidateQueries({ queryKey: ["consumption"] });
        console.log(success, failed);
        if (success.length > 0 && failed.length === 0) {
          toast.success(`Cultivos eliminados`);
        } else if (failed.length > 0) {
          toast.error(
            `No se pudieron eliminar algunos cultivos, es posible que alguno tenga aun stock disponible`
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
