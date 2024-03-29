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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getSupplyById } from '@/services/cropco/SupplyMethods';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { useSupplyActions } from '../hooks/useSuppliesActions';
import { defaultValues, formFields, formSchema } from './ElementsSupplyForm';

export const ViewSupply = () => {
  const { id } = useParams();
  const { updateSupplyMutation } = useSupplyActions();
  const { mutate, isSuccess, isPending } = updateSupplyMutation;

  const navigate = useNavigate();

  const { isLoading, data } = useQuery({
    queryKey: ['supplies', id],
    queryFn: () => getSupplyById({ id }),
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
    mutate({ id, supply: values });
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
                  <FormItem className="my-4">
                    <FormLabel>{record.label}</FormLabel>

                    {record.type === 'select' && (
                      <Select onValueChange={field.onChange} {...field} disabled>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={record.placeholder} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="GRAMOS">GRAMOS</SelectItem>
                          <SelectItem value="MILILITROS">MILILITROS</SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                    {record.type !== 'select' && (
                      <Input
                        readOnly
                        className="w-80"
                        placeholder={record.placeholder}
                        {...field}
                      />
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
