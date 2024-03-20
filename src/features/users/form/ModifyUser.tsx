import { useGetUserByIdQuery } from '@/services/cropco';
import { useNavigate, useParams } from 'react-router-dom';
import { UserForm } from './UserForm';

import { z } from 'zod';
import { formSchema } from './ElementsUserForm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser } from '@/services/cropcoAPI';

export const ModifyUser = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(id);

  const navigation = useNavigate();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserMutation.mutate({ id, user: values });
    navigation('../');
  };

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <UserForm
          values={{ ...data, password: '' }}
          nameButtonSubmit="Actualizar"
          onSubmit={onSubmit}
        />
      )}
    </>
  );
};
