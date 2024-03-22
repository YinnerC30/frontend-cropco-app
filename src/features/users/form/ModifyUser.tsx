import { DialogTemplate } from '@/components/common/DialogTemplate';
import { getUserById, updateUser } from '@/services/cropcoAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { formFields, formSchema } from './ElementsUserForm';

export const ModifyUser = ({ id }: any) => {
  // const { data: defaultValues, isLoading } = useGetUserByIdQuery(id);

  const queryClient = useQueryClient();

  const { isLoading, data: defaultValues } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById({ id }),
  });

  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Usuario actualizado con éxito');
    },
    onError: (error: AxiosError | any) => {
      const { data } = error.response;
      toast(`Hubo un problema actualizando el usuario, ${data.message}`);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateUserMutation.mutate({ id, user: values });
  };

  return (
    <>
      {isLoading ? (
        <h1>Cargando...</h1>
      ) : (
        <DialogTemplate
          onSubmit={onSubmit}
          formSchema={formSchema}
          defaultValues={{ ...defaultValues, password: '' }}
          formFields={formFields}
          nameButtonTrigger="Modificar"
        />
      )}
    </>
  );
};
