import { CaretSortIcon, CheckIcon, ReloadIcon } from '@radix-ui/react-icons';
import { z } from 'zod';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from '@radix-ui/react-icons';
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
import { defaultValuesHarvest, formSchemaHarvest } from './ElementsHarvestForm';
import { usePostHarvest } from './hooks/usePostHarvest';
import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { UnitOfMeasureHarvest } from '@/enums/UnitOfMeasure';
import { Crop } from '@/interfaces/Crop';
import { HarvestDetail } from '@/interfaces/Harvest';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { toast } from 'sonner';
import { useGetAllCrops } from '../crops/hooks/useGetAllCrops';
import { CancelRegister } from './CancelRegister';
import { reset } from './harvestSlice';
import { FormHarvestDetail } from './FormHarvestDetail';
import { DataTableHarvestDetail } from './DataTableHarvestDetails';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

export const FormHarvest = () => {
  const navigate = useNavigate();

  const formHarvest = useForm<z.infer<typeof formSchemaHarvest>>({
    resolver: zodResolver(formSchemaHarvest),
    defaultValues: defaultValuesHarvest,
  });

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
  });

  const { mutate, isSuccess, isPending } = usePostHarvest();
  const details: any = useAppSelector((state: any) => state.harvest.details);
  const data = details.map((item: any) => {
    return { ...item, first_name: item.employee.first_name };
  });

  const onSubmitHarvest = async (values: z.infer<typeof formSchemaHarvest>) => {
    if (details.length === 0) {
      toast.error('Debes registrar al menos 1 registro de algún empleado');
      return;
    }
    mutate({
      ...values,
      crop: { id: values.crop.id },
      details: details.map((item: HarvestDetail) => {
        return { ...item, employee: { id: item.employee.id } };
      }),
    });
  };

  // Details
  const dispatch = useAppDispatch();

  // Estados
  if (isSuccess) {
    dispatch(reset());
    navigate('../view');
  }

  if (queryCrops.isLoading) return <Loading />;

  if (queryCrops.isError) {
    return <ErrorLoading />;
  }
  return (
    <>
      <Label className="text-2xl">Registro de cosecha</Label>
      <Separator className="my-2" />

      {/* Formulario principal */}
      <Form {...formHarvest}>
        <form
          noValidate
          onSubmit={formHarvest.handleSubmit(onSubmitHarvest)}
          id="formHarvest"
        >
          <FormField
            key={'date'}
            control={formHarvest.control}
            name={'date'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Fecha:'}</FormLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-[240px] pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? (
                          format(field.value, 'PPP', { locale: es })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      locale={es}
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date: any) =>
                        date > new Date() || date < new Date('1900-01-01')
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Seleccione la fecha cuando se realizo la cosecha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'crop'}
            control={formHarvest.control}
            name={'crop'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Cultivo:'}</FormLabel>

                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          'w-[200px] justify-between',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value.id
                          ? queryCrops.data.rows.find(
                              (item: Crop) => item.id === field.value.id,
                            )?.name
                          : 'Selecciona un cultivo'}

                        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder="Buscar cultivo..."
                        className="h-9"
                      />
                      <CommandList>
                        <ScrollArea className="w-auto h-56">
                          <CommandEmpty>Cultivo no encontrado.</CommandEmpty>
                          <CommandGroup>
                            {queryCrops.data.rows &&
                              Array.isArray(queryCrops.data.rows) &&
                              queryCrops.data.rows.map((crop: Crop | any) => {
                                return (
                                  <CommandItem
                                    value={crop.name}
                                    key={crop.id!}
                                    onSelect={() => {
                                      formHarvest.setValue('crop', crop!);
                                    }}
                                  >
                                    {crop.name}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        crop.id! === field.value.id
                                          ? 'opacity-100'
                                          : 'opacity-0',
                                      )}
                                    />
                                  </CommandItem>
                                );
                              })}
                          </CommandGroup>
                        </ScrollArea>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Seleccione el cultivo donde se ejecuto la cosecha
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'unit_of_measure'}
            control={formHarvest.control}
            name={'unit_of_measure'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Unidad de medida:'}</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-40">
                    <SelectTrigger>
                      <SelectValue placeholder={'Selecciona'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={UnitOfMeasureHarvest.LIBRAS}>
                      {UnitOfMeasureHarvest.LIBRAS}
                    </SelectItem>
                    <SelectItem value={UnitOfMeasureHarvest.KILOGRAMOS}>
                      {UnitOfMeasureHarvest.KILOGRAMOS}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Seleccione la unidad de medida utilizada
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'observation'}
            control={formHarvest.control}
            name={'observation'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Observación:'}</FormLabel>

                <FormControl>
                  <Textarea
                    placeholder={'Durante la cosecha ocurrió...'}
                    className="resize-none w-72"
                    rows={5}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Añada alguna observación si es necesario
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Separator className="w-full my-5" />
      <Label className="text-sm">
        A continuación registre de forma individual la cosecha que ha realizado
        cada empleado:
      </Label>

      <FormHarvestDetail />

      <DataTableHarvestDetail data={data} />
      <Separator className="w-full my-5" />

      {/* Botones de guardar o cancelar */}
      <div className="flex gap-2 my-6 ">
        <Button type="submit" form="formHarvest" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
        <CancelRegister />
      </div>
    </>
  );
};
