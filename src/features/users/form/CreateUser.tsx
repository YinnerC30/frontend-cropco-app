import { createUser } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { formSchema } from './ElementsUserForm';
import { UserForm } from './UserForm';

export const CreateUser = () => {
  const navigation = useNavigate();

  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUserMutation.mutate(values);
    navigation('../');
  };

  return (
    <>
      <UserForm nameButtonSubmit="Crear" onSubmit={onSubmit} />
    </>
  );
};
