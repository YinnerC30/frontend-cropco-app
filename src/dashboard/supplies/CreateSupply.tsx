import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { zodResolver } from '@hookform/resolvers/zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { defaultValues, formFields, formSchema } from './ElementsSupplyForm';

import { Textarea } from '@/components/ui/textarea';

import { CustomFormField } from '@/interfaces/CustomFormField';
import { usePostSupply } from './hooks/usePostSupply';
import { UnitOfMeasureSupply } from '@/enums/UnitOfMeasure';

export const CreateSupply = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isSuccess, isPending } = usePostSupply();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    mutate(values);
  };

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
                render={({ field }) => (
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
                        defaultValue={field.value}
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
                )}
              />
            ))}
          </form>
        </Form>
      </ScrollArea>

      <div className="flex justify-between w-48 ml-5">
        <Button type="submit" form="formSupply" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
