import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { UnitOfMeasureHarvest } from '@/enums/UnitOfMeasure';
import { Crop } from '@/interfaces/Crop';
import { HarvestDetail } from '@/interfaces/Harvest';
import { cn } from '@/lib/utils';
import {
  AppDispatch,
  RootState,
  useAppDispatch,
  useAppSelector,
} from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CalendarIcon,
  CaretSortIcon,
  CheckIcon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { useGetAllCrops } from '../crops/hooks/useGetAllCrops';
import { CancelRegister } from './CancelRegister';
import { DataTableHarvestDetail } from './DataTableHarvestDetails';
import { defaultValuesHarvest, formSchemaHarvest } from './ElementsHarvestForm';
import { FormHarvestDetail } from './FormHarvestDetail';
import { reset } from './harvestSlice';
import { usePostHarvest } from './hooks/usePostHarvest';

export const FormHarvest = () => {
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(reset());
  }, []);

  const navigate = useNavigate();
  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
  });

  const { mutate, isSuccess, isPending } = usePostHarvest();
  const { details, total, value_pay } = useAppSelector(
    (state: RootState) => state.harvest,
  );

  const formHarvest = useForm<z.infer<typeof formSchemaHarvest>>({
    resolver: zodResolver(formSchemaHarvest),
    defaultValues: defaultValuesHarvest,
  });

  const onSubmitHarvest = (values: z.infer<typeof formSchemaHarvest>) => {
    if (details.length === 0) {
      toast.error('Debes registrar al menos 1 cosecha de algún empleado');
      return;
    }
    mutate({
      ...values,
      crop: { id: values.crop.id },
      total,
      value_pay,
      details: details.map((item: HarvestDetail) => {
        return { ...item, employee: { id: item.employee.id } };
      }),
    });
  };

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
      {/* Formulario principal */}
      <Form {...formHarvest}>
        <form id="formHarvest">
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
            key={'crop.id'}
            control={formHarvest.control}
            name={'crop.id'}
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
                        {field.value
                          ? queryCrops.data.rows.find(
                              (item: Crop) => item.id === field.value,
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
                                      formHarvest.setValue('crop.id', crop.id!);
                                      formHarvest.trigger('crop.id');
                                    }}
                                  >
                                    {crop.name}
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        crop.id! === field.value
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
          <FormField
            key={'total'}
            control={formHarvest.control}
            name={'total'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Total:'}</FormLabel>

                <FormControl>
                  <Input
                    readOnly
                    {...field}
                    className="w-80"
                    placeholder={'0'}
                    type="number"
                    min={0}
                    onChange={e => {
                      return !Number.isNaN(e.target.value)
                        ? field.onChange(parseFloat(e.target.value))
                        : 0;
                    }}
                    value={total}
                  />
                </FormControl>

                <FormDescription>
                  Introduce la cantidad que ha cosechado
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            key={'value_pay'}
            control={formHarvest.control}
            name={'value_pay'}
            render={({ field }) => (
              <FormItem className="my-4">
                <FormLabel className="block">{'Valor a pagar:'}</FormLabel>

                <FormControl>
                  <Input
                    readOnly
                    className="w-80"
                    placeholder={'0'}
                    {...field}
                    type="number"
                    min={0}
                    step={50}
                    onChange={e => {
                      return !Number.isNaN(e.target.value)
                        ? field.onChange(parseFloat(e.target.value))
                        : 0;
                    }}
                    value={value_pay}
                  />
                </FormControl>

                <FormDescription>Introduce el valor a pagar</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>

        <Separator className="w-full my-5" />
        <Label className="text-sm">
          A continuación registre de forma individual la cosecha que ha
          realizado cada empleado:
        </Label>

        <FormHarvestDetail />

        <DataTableHarvestDetail data={details} />
        <Separator className="w-full my-5" />

        {/* Botones de guardar o cancelar */}
        <div className="flex gap-2 my-6 ">
          <Button
            type="submit"
            form="formHarvest"
            disabled={isPending}
            onClick={formHarvest.handleSubmit(onSubmitHarvest)}
          >
            {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
            Guardar
          </Button>
          <CancelRegister />
        </div>
      </Form>
    </>
  );
};
