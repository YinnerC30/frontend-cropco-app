import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updateSale } from "../services/update";

export const usePatchSale = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
      queryClient.invalidateQueries({ queryKey: ["sales", id] });
      toast.success(`Venta actualizada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización de la venta, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
