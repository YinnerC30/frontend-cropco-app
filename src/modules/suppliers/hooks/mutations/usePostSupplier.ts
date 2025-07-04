import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { Supplier } from "@/modules/suppliers/interfaces/Supplier";
import { useNavigate } from "react-router-dom";
import { MODULE_SUPPLIER_PATHS } from "../../routes/pathRoutes";

export const createSupplier = async (
  supplier: Supplier
): PromiseReturnRecord<void> => {
  return await cropcoAPI.post(`${pathsCropco.suppliers}/create`, supplier);
};

export const usePostSupplier = (): UseMutationReturn<void, Supplier> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, Supplier> = useMutation({
    mutationFn: createSupplier,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      navigate(MODULE_SUPPLIER_PATHS.ViewAll);
      toast.success(`Proveedor creado`);
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
