import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { updateWork } from "../services/update";
import { Work } from "../interfaces/Work";

export function usePatchWork(
  id: string
): UseMutationResult<void, AxiosError<unknown, any>, Work, unknown> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateWork,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["works"] });
      queryClient.invalidateQueries({ queryKey: ["works", id] });
      toast.success(`Trabajo actualizado`);
    },
    onError: (error: AxiosError) => {
      const updateError: AxiosError | any = error;
      const { data } = updateError.response;
      toast.error(
        `Hubo un problema durante la actualización del trabajo, ${data.message}`
      );
    },
    retry: 1,
  });
  return mutation;
}
