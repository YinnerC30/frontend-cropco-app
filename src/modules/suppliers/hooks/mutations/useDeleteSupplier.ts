import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";

export const deleteSupplier = async (id: string): PromiseReturnRecord<void> => {
  return await cropcoAPI.delete(`${pathsCropco.suppliers}/remove/one/${id}`);
};

export const useDeleteSupplier = (): UseMutationReturn<void, string> => {
  const queryClient = useQueryClient();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: deleteSupplier,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      await queryClient.invalidateQueries({ queryKey: ["shopping"] });
      toast.success(`Proveedor eliminado`);
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
