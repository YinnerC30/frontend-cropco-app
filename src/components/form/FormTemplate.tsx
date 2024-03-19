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

interface FormTemplateProps {
  formSchema: any;
  defaultValues: any;
  onSubmit: any;
  formFields: any;
  nameButtonSubmit: string;
}

export function FormTemplate({
  formSchema,
  defaultValues,
  onSubmit,
  formFields,
  nameButtonSubmit,
}: FormTemplateProps) {
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
}
