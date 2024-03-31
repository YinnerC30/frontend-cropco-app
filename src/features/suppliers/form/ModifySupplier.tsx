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
import { getSupplierById } from '@/features/suppliers/SupplierMethods';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useSupplierActions } from '../hooks/useSupplierActions';
import { defaultValues, formFields, formSchema } from './ElementsSupplierForm';

export const ModifySupplier = () => {
  const { id } = useParams();
  const { updateSupplierMutation } = useSupplierActions();
  const { mutate, isSuccess, isPending } = updateSupplierMutation;

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['supplier', id],
    queryFn: () => getSupplierById({ id }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (data) {
      form.reset({
        ...data,
      });
    }
  }, [data]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, supplier: values });
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
            id="formSupplier"
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
        <Button type="submit" form="formSupplier" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Actualizar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
