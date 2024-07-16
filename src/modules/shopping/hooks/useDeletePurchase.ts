import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deletePurchase } from "../services/deletePurchase";

export const useDeletePurchase = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deletePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success(`Compra eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación de la compra, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
