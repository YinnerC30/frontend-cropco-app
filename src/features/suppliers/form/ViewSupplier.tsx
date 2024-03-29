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
import { getSupplierById } from '@/services/cropco/SupplierMethods';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { defaultValues, formFields, formSchema } from './ElementsSupplierForm';

export const ViewSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['clients'],
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

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <div className="flex flex-col items-center w-full h-full">
        <ScrollArea
          type="auto"
          className="h-[480px] w-[380px]  rounded-b-md mb-10"
        >
          <Form {...form}>
            <form className="mx-5" id="formUser">
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
                          readOnly
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

        <div className="flex justify-center w-48 mt-5 ml-5">
          <Button onClick={() => navigate(-1)}>Volver</Button>
        </div>
      </div>
    </>
  );
};
