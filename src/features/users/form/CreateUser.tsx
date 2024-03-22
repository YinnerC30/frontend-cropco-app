import { createUser } from '@/services/cropcoAPI';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';

import { defaultValues, formFields, formSchema } from './ElementsUserForm';
import { toast } from 'sonner';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogForm } from '@/components/common/DialogForm';

export const CreateUser = () => {
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast('Usuario fue creado exitosamente');
      form.reset();
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
      <DialogForm name={'Crear'}>
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
                    <FormLabel className="text-left">{record.label}</FormLabel>
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
    </>
  );
};
