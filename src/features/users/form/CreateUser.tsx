import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { useUserActions } from '../hooks/useUserActions';
import { defaultValues, formFields, formSchema } from './ElementsUserForm';
import { Link } from 'react-router-dom';

export const CreateUser = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { createUserMutation } = useUserActions();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createUserMutation.mutate(values);
    form.reset();
  };

  return (
    <>
      {/* TODO: Mejorar estilos */}
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
          Guardar
        </Button>
        <Button asChild>
          <Link to={'../view'}>Cancelar</Link>
        </Button>
      </div>
    </>
  );
};
