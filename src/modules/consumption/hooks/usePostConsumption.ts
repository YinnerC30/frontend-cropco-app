import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createConsumption } from "../services/createConsumption";

export const usePostConsumption = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createConsumption,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consumptions"] });
      queryClient.invalidateQueries({ queryKey: ["supplies"] });
      toast.success(`Consumo de insumo registrado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del registro de consumo de insumos, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
