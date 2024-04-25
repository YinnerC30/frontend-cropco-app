import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteSale } from "../services/delete";

export const useDeleteSale = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      toast.success(`Venta eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación de la venta, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
