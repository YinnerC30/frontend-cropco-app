import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { useAuthContext } from "@/auth/hooks";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { Employee } from "../../interfaces/Employee";
import { MODULE_EMPLOYEE_PATHS } from "../../routes/pathRoutes";
import { useNavigate } from "react-router-dom";

export const updateEmployee = async (
  employee: Partial<Employee>
): PromiseReturnRecord<void> => {
  const { id, ...rest } = employee;
  return await cropcoAPI.patch(
    `${pathsCropco.employees}/update/one/${id}`,
    rest
  );
};

export const usePatchEmployee = (): UseMutationReturn<
  void,
  Partial<Employee>
> => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleError } = useAuthContext();
  const mutation: UseMutationReturn<void, Partial<Employee>> = useMutation({
    mutationFn: updateEmployee,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
      await queryClient.invalidateQueries({
        queryKey: ["employee", variables.id],
      });
      await queryClient.invalidateQueries({
        queryKey: ["employees-top-harvests"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["employees-top-works"],
      });
      navigate(MODULE_EMPLOYEE_PATHS.ViewAll);
      toast.success(`Empleado actualizado`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {},
      });
    },
    retry: 1,
  });
  return mutation;
};
