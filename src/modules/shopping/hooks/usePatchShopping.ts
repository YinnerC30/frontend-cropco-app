import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updateShopping } from "../services/updateShopping";


export const usePatchShopping = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateShopping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppings"] });
      queryClient.invalidateQueries({ queryKey: ["shoppings", id] });
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
