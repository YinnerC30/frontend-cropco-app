import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { createSupply } from "../services/createSupply";
import { Supply } from "../interfaces/Supply";

export const usePostSupply = (): UseMutationResult<
  Supply,
  AxiosError<unknown, any>,
  Supply,
  unknown
> => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createSupply,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suppliers"] });
      toast.success(`Insumo creado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la creación del Insumo, ${data.message}`
      );
    },
    retry: 1,
  });

  return mutation;
};
