import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createPurchase } from "../services/createPurchase";

export const usePostPurchase = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPurchase,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
      toast.success(`Compra registrada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación de la compra, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
