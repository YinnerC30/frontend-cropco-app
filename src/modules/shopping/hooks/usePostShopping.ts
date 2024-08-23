import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createShopping } from "../services/createShopping";


export const usePostShopping = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createShopping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppings"] });
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
