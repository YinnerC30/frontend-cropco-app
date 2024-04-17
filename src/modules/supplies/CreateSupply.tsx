import { ButtonCancelRegister } from '@/components/common/ButtonCancelRegister';
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

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UnitOfMeasureSupply } from '@/modules/harvests/UnitOfMeasure';
import { usePostSupply } from './hooks/usePostSupply';

export const CreateSupply = () => {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate, isSuccess, isPending } = usePostSupply();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    mutate(values);
  };

  if (isSuccess) {
    navigate('../view');
  }

  return (
    <>
      <Label className="text-2xl">Registro de insumo</Label>
      <Separator className="my-2" />
      <ScrollArea type="auto" className="h-[80vh] w-full  mb-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            id="formUser"
            className="flex flex-col gap-2 ml-1"
          >
            <FormField
              control={form.control}
              name={'name'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.name.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.name.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.name.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'brand'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.brand.label}</FormLabel>
                  <FormControl>
                    <Input
                      className="w-56"
                      placeholder={formFields.brand.placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFields.brand.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={'unit_of_measure'}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.unit_of_measure.label}</FormLabel>
                  <div className="w-40 ">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={formFields.unit_of_measure.placeholder}
                        />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={UnitOfMeasureSupply.GRAMOS}>
                          GRAMOS
                        </SelectItem>
                        <SelectItem value={UnitOfMeasureSupply.MILILITROS}>
                          MILILITROS
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <FormDescription>
                    {formFields.unit_of_measure.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`observation`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.observation.label}</FormLabel>

                  <FormControl>
                    <Textarea
                      placeholder={formFields.observation.placeholder}
                      className="resize-none w-96"
                      rows={4}
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    {formFields.observation.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <div className="flex w-48 gap-2 mt-2">
            <Button type="submit" form="formUser" disabled={isPending}>
              {isPending && (
                <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />
              )}
              Guardar
            </Button>
            <ButtonCancelRegister action={() => navigate(-1)} />
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
