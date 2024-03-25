import { createUser, deleteUser, updateUser } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export const useUserActions = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Usuario fue creado exitosamente');
      navigate('../view');
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema creando el usuario, ${data.message}`);
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Usuario actualizado con éxito');
      navigate(-1);
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema actualizando el usuario, ${data.message}`);
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Registro eliminado');
    },
  });

  return {
    createUserMutation,
    deleteUserMutation,
    updateUserMutation,
  };
};
