import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { BulkRecords } from "@/modules/core/interfaces/bulk-data/BulkRecords";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const deleteBulkClients = async (
  data: BulkRecords
): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.clients}/remove/bulk`, {
    data: {
      recordsIds: data.clientsIds,
    },
  });
};

export const useDeleteBulkClients = (): UseMutationReturn<
  void,
  BulkRecords
> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, BulkRecords> = useMutation({
    mutationFn: deleteBulkClients,
    onSuccess: async ({ data, status }) => {
      await queryClient.invalidateQueries({ queryKey: ["clients"] });
      await queryClient.invalidateQueries({ queryKey: ["client"] });
      await queryClient.invalidateQueries({ queryKey: ["sales"] });
      await queryClient.invalidateQueries({ queryKey: ["sale"] });
      if (status === 207) {
        toast.info(
          "Algunos clientes no se eliminaron porque tienen ventas pendientes de pago",
          { duration: 5000 }
        );
        return;
      }
      toast.success(`Clientes eliminados`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          conflict: "El cliente tiene ventas pendientes de pago",
        },
      });
    },

    retry: 1,
  });

  return mutation;
};
