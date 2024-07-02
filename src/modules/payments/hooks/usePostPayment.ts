import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createPayment } from "../services/create";

export const usePostPayment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
      toast.success(`Pago registrado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante el registro del pago, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
