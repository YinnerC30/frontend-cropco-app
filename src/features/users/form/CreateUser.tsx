import { createUser } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { DialogTemplate } from '@/components/common/DialogTemplate';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';

export const CreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: error => {
      // Aquí puedes manejar el error
      console.error('Error al crear usuario:', error);
      // Por ejemplo, mostrar un mensaje de error al usuario
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUserMutation.mutate(values);
  };

  return (
    <>
      <DialogTemplate
        onSubmit={onSubmit}
        formSchema={formSchema}
        defaultValues={defaultValues}
        formFields={formFields}
      />
    </>
  );
};
