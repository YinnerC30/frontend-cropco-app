import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getUserById } from '@/services/cropcoAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useUserActions } from '../hooks/useUserActions';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';
import { ReloadIcon } from '@radix-ui/react-icons';

export const ModifyUser = () => {
  const { id } = useParams();
  const { updateUserMutation } = useUserActions();
  const { mutate, isSuccess, isPending } = updateUserMutation;

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['users', id],
    queryFn: () => getUserById({ id }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
        password: '',
      });
    }
  }, [data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, user: values });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  if (isSuccess) {
    navigate('../view');
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <ScrollArea
        type="auto"
        className="h-[480px] w-[380px]  rounded-b-md mb-10"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-5"
            id="formUser"
          >
            {formFields.map((record: any) => (
              <FormField
                key={record.name}
                control={form.control}
                name={record.name}
                render={({ field }) => (
                  <FormItem className="my-1">
                    <FormLabel>{record.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={record.placeholder}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>{record.description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </ScrollArea>

      <div className="flex justify-between w-48 mt-5 ml-5">
        <Button type="submit" form="formUser" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Actualizar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
