import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteShopping } from "../services/deleteShopping";


export const useDeleteShopping = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteShopping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shoppings"] });
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
