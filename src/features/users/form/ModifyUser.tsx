import { DialogForm } from '@/components/common/DialogForm';
import { getUserById, updateUser } from '@/services/cropcoAPI';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'sonner';
import { z } from 'zod';
import { formFields, formSchema } from './ElementsUserForm';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const ModifyUser = ({ id }: any) => {
  // const { data: defaultValues, isLoading } = useGetUserByIdQuery(id);

  const queryClient = useQueryClient();

  const { isLoading, data: defaultValues } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById({ id }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
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
        <DialogForm name={'Modificar'}>
          <Form {...form}>
            <form
              id="formTemplate"
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              {formFields.map((record: any) => (
                <FormField
                  key={record.name}
                  control={form.control}
                  name={record.name}
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-4 items-center gap-4">
                      <FormLabel className="text-left">
                        {record.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          style={{
                            width: '280px',
                          }}
                          className="col-span-3"
                          placeholder={record.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage
                        style={{
                          marginLeft: '100px',
                        }}
                        className="col-span-4"
                      />
                    </FormItem>
                  )}
                />
              ))}
            </form>
          </Form>
        </DialogForm>
      )}
    </>
  );
};
