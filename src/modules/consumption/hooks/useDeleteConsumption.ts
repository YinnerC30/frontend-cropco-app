import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteConsumption } from "../services/deleteConsumption";

export const useDeleteConsumption = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumptions"] });
      toast.success(`Registro de Consumo de insumos eliminada`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del registro de consumo de insumos, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
