import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteShopping = async (id: string) => {
  await cropcoAPI.delete(`${pathsCropco.shopping}/remove/one/${id}`);
};


export const useDeleteShopping = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteShopping,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["shopping"] });
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
