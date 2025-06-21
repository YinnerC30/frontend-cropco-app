import { cropcoAPI, pathsCropco } from "@/api/cropcoAPI";
import { PromiseReturnRecord } from "@/auth/interfaces/PromiseReturnRecord";
import { useAuthTenantContext } from "@/management/auth/components/AuthTenantContext";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export interface DataResetPassword {
  password: string;
}

async function resetPasswordAdministrator(
  id: string
): PromiseReturnRecord<DataResetPassword> {
  return await cropcoAPI.put(`${pathsCropco.administrators}/reset-password/one/admin/${id}`);
}

export function usePatchResetPasswordAdministrator(): UseMutationReturn<
  DataResetPassword,
  string
> {
  const { handleError } = useAuthTenantContext();

  const mutation: UseMutationReturn<DataResetPassword, string> = useMutation({
    mutationFn: resetPasswordAdministrator,
    onSuccess: () => {
      toast.success(`Contraseña restablecida`);
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          notFound: "No se encontro el usuario para restablecer su contraseña",
          unauthorized: "No tienes permiso para restablecer la contraseña",
        },
      });
    },
    retry: false,
  });
  return mutation;
}
