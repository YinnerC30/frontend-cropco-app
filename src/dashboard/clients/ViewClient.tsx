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
import { Textarea } from '@/components/ui/textarea';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { defaultValues, formFields, formSchema } from './ElementsClientForm';
import { useGetClient } from './hooks/useGetClient';

export const ViewClient = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);

  const navigate = useNavigate();

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

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <div className="flex flex-col items-center w-full h-full">
      <ScrollArea
        type="auto"
        className="h-[480px] w-[380px]  rounded-b-md mb-10"
      >
        <Form {...form}>
          <form className="mx-5" id="formUser">
            {formFields.map((record: CustomFormField) => (
              <FormField
                key={record.name}
                control={form.control}
                name={record.name}
                render={({ field }) => (
                  <FormItem className="my-1">
                    <FormLabel>{record.label}</FormLabel>
                    {record.type === 'string' && (
                      <FormControl>
                        <Input
                          readOnly
                          className="w-80"
                          placeholder={record.placeholder}
                          {...field}
                        />
                      </FormControl>
                    )}
                    {record.type === 'text' && (
                      <FormControl>
                        <Textarea
                          readOnly
                          placeholder={record.placeholder}
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                    )}
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
        <Button onClick={() => navigate(-1)}>Volver</Button>
      </div>
    </div>
  );
};
