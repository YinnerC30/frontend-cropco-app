import { useAuthContext } from '@/auth/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { cropcoAPI, pathsCropco } from '@/api/cropcoAPI';
import { PromiseReturnRecord } from '@/auth/interfaces/PromiseReturnRecord';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { toast } from 'sonner';

async function updateUserStatus(id: string): PromiseReturnRecord<void> {
  return await cropcoAPI.put(`${pathsCropco.users}/toggle-status/one/${id}`);
}
export function usePatchUserStatus(): UseMutationReturn<void, string> {
  const { handleError } = useAuthContext();

  const queryClient = useQueryClient();
  const mutation: UseMutationReturn<void, string> = useMutation({
    mutationFn: (id) => {
      const fetchUpdateStatusUser = updateUserStatus(id);

      toast.promise(fetchUpdateStatusUser, {
        loading: 'Actualizando estado del usuario...',
        success: 'El estado del usuario ha sido actualizado con éxito.',
        error: 'Hubo un error al actualizar el estado del usuario.',
      });

      return fetchUpdateStatusUser;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error) => {
      handleError({
        error,
        messagesStatusError: {
          notFound: 'No se encontro el usuario a actualizar',
          badRequest: 'La solicitud no es válida',
          unauthorized:
            'No tienes permisos para actualizar el estado del usuario',
        },
      });
    },
    retry: 1,
  });
  return mutation;
}
