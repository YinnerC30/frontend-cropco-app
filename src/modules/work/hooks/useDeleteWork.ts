import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { deleteWork } from "../services/deleteWork";

export const useDeleteWork = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
      toast.success(`Trabajo eliminado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la eliminación del trabajo, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
};
