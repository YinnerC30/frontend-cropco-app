import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";

export const deleteSale = async (id: string) =>
  await cropcoAPI.delete(`${pathsCropco.sales}/remove/one/${id}`);


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
