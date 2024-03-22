import { createUser } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { DialogTemplate } from '@/components/common/DialogTemplate';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';
import { toast } from 'sonner';
import { AxiosError } from 'axios';

export const CreateUser = () => {
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Usuario fue creado exitosamente');
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema creando el usuario, ${data.message}`);
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
        nameButtonTrigger="Crear"
      />
    </>
  );
};
