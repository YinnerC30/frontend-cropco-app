import { useCreateUserMutation } from '@/services/cropco';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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

import { formSchema, formFields, defaultValues } from './ElementsForm';

export const CreateUser = () => {
  const nameButtonSubmit = 'Crear';

  const navigation = useNavigate();

  const [createUser] = useCreateUserMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    createUser({ user: values });
    navigation('../');
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {formFields.map((record: any) => (
          <FormField
            key={record.name}
            control={form.control}
            name={record.name}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{record.label}</FormLabel>
                <FormControl>
                  <Input placeholder={record.placeholder} {...field} />
                </FormControl>
                <FormDescription>{record.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">{nameButtonSubmit}</Button>
      </form>
    </Form>
  );
};
