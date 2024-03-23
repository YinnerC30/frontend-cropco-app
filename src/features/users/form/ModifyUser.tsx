import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getUserById } from '@/services/cropcoAPI';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useUserActions } from '../hooks/useUserActions';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

export const ModifyUser = () => {
  const { id } = useParams();
  const { updateUserMutation } = useUserActions();

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
    updateUserMutation.mutate({ id, user: values });
    form.reset();
  };

  if (isLoading) {
    return (
      <>
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
                      <Skeleton className="w-[700px] h-[20px]" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
        <div className="flex justify-between w-48 mt-5 ml-5">
          <Button type="submit" form="formUser">
            Actualizar
          </Button>
          <Button asChild>
            <Link to={'../view'}>Cancelar</Link>
          </Button>
        </div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Alert variant="destructive" className="mt-5 ml-5 w-80">
          <ExclamationTriangleIcon className="w-4 h-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            No se encontró la información del usuario
          </AlertDescription>
        </Alert>
        <Button asChild className="mt-5 ml-5">
          <Link to={'../view'}>Volver</Link>
        </Button>
      </>
    );
  }

  return (
    <>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>
      <div className="flex justify-between w-48 mt-5 ml-5">
        <Button type="submit" form="formUser">
          Actualizar
        </Button>
        <Button asChild>
          <Link to={'../view'}>Cancelar</Link>
        </Button>
      </div>
    </>
  );
};
