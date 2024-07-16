import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updatePurchase } from "../services/updatePurchase";

export const usePatchPurchase = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updatePurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      queryClient.invalidateQueries({ queryKey: ["purchases", id] });
      toast.success(`Compra actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización de la compra, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
