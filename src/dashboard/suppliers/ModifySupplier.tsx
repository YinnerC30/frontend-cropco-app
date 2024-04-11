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
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { defaultValues, formFields, formSchema } from './ElementsSupplierForm';
import { useGetSupplier } from './hooks/useGetSupplier';
import { usePatchSupplier } from './hooks/usePatchSupplier';

export const ModifySupplier = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);
  const { mutate, isSuccess, isPending } = usePatchSupplier();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, ...values });
  };

  useEffect(() => {
    
    if (data) {
      form.reset({
        ...data,
        company_name: undefined,
      });
    }
  }, [data]);

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
        className="h-[450px] w-[380px]  rounded-b-md mb-10"
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-5"
            id="formUser"
          >
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
                          className="w-80"
                          placeholder={record.placeholder}
                          {...field}
                        />
                      </FormControl>
                    )}
                    {record.type === 'text' && (
                      <FormControl>
                        <Textarea
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
        <Button type="submit" form="formUser" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Actualizar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
