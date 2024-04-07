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
import { Textarea } from '@/components/ui/textarea';
import { UnitOfMeasureSupply } from '@/enums/UnitOfMeasure';
import { CustomFormField } from '@/interfaces/CustomFormField';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { z } from 'zod';
import { defaultValues, formFields, formSchema } from './ElementsSupplyForm';
import { useGetSupply } from './hooks/useGetSupply';
import { usePatchSupply } from './hooks/usePatchSupply';

export const ModifySupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);
  const { mutate, isSuccess, isPending } = usePatchSupply();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate({ id, ...values });
  };

  useEffect(() => {
    // console.log(data);
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
            id="formSupply"
          >
            {formFields.map((record: CustomFormField) => (
              <FormField
                key={record.name}
                control={form.control}
                name={record.name}
                render={({ field }) => {
                  console.log(field);
                  return (
                    <FormItem className="my-4">
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

                      {record.type === 'select' && (
                        <Select
                          onValueChange={field.onChange}
                          // defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={record.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value={UnitOfMeasureSupply.GRAMOS}>
                              GRAMOS
                            </SelectItem>
                            <SelectItem value={UnitOfMeasureSupply.MILILITROS}>
                              MILILITROS
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}

                      <FormDescription>{record.description}</FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            ))}
          </form>
        </Form>
      </ScrollArea>

      <div className="flex justify-between w-48 mt-5 ml-5">
        <Button type="submit" form="formSupply" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Actualizar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
