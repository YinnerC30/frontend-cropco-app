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
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';

import { Crop } from '@/interfaces/Crop';
import { cn } from '@/lib/utils';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
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
import { columnsHarvestDetail } from './ColumnsHarvestDetail';
import { DataTableHarvestDetail } from './DataTableHarvestDetails';
import {
  defaultValuesHarvest,
  formFieldsHarvest,
  formSchemaHarvest,
} from './ElementsHarvestForm';
import { add, calculateTotal, reset } from './harvestSlice';
import { useGetHarvest } from './hooks/useGetHarvest';

export const ViewHarvest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useAppDispatch();
  const { data, isLoading, isError } = useGetHarvest(id!);

  useEffect(() => {
    dispatch(reset());
  }, []);

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
  });

  const { details, total, value_pay } = useAppSelector(
    (state: any) => state.harvest,
  );

  const formHarvest = useForm<z.infer<typeof formSchemaHarvest>>({
    resolver: zodResolver(formSchemaHarvest),
    defaultValues: defaultValuesHarvest,
  });

  useEffect(() => {
    if (data) {
      formHarvest.reset({
        ...data,
        date: new Date(`${data.date}T00:00:00-05:00`),
      });
      dispatch(add(data.details));
      dispatch(calculateTotal());
    }
  }, [data]);

  if (queryCrops.isLoading) return <Loading />;
  if (isLoading) return <Loading />;

  if (queryCrops.isError && isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Información de la cosecha</Label>
      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        {/* Formulario principal */}
        <Form {...formHarvest}>
          <form id="formHarvest" className="ml-1">
            <FormField
              control={formHarvest.control}
              name={'date'}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsHarvest.date.label}
                  </FormLabel>

                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          variant={'outline'}
                          className={cn(
                            'w-[240px] pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          {field.value ? (
                            format(field.value, 'PPP', { locale: es })
                          ) : (
                            <span>{formFieldsHarvest.date.placeholder}</span>
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
                    {formFieldsHarvest.date.description}
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
                  <FormLabel className="block">
                    {formFieldsHarvest.crop.label}
                  </FormLabel>

                  <Popover modal={true}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          disabled
                          variant="outline"
                          role="combobox"
                          className={cn(
                            'w-[200px] justify-between',
                            !field.value && 'text-muted-foreground',
                          )}
                          ref={field.ref}
                          onBlur={field.onBlur}
                        >
                          {field.value
                            ? queryCrops.data.rows.find(
                                (item: Crop) => item.id === field.value,
                              )?.name
                            : formFieldsHarvest.crop.placeholder}

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
                                        formHarvest.setValue(
                                          'crop.id',
                                          crop.id!,
                                        );
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
                    {formFieldsHarvest.crop.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formHarvest.control}
              name={'observation'}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">
                    {formFieldsHarvest.observation.label}
                  </FormLabel>

                  <FormControl>
                    <Textarea
                      disabled
                      placeholder={'Durante la cosecha ocurrió...'}
                      className="resize-none w-72"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {formFieldsHarvest.observation.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>

          <Separator className="w-full my-5" />

          <DataTableHarvestDetail
            data={details}
            columns={columnsHarvestDetail}
          />

          <div className="flex flex-col gap-4 ml-1 w-[300px] h-[120px] justify-center">
            <FormField
              control={formHarvest.control}
              name={'total'}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{'Total cosechado:'}</FormLabel>

                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      {...field}
                      className="w-40 text-center"
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

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              key={'value_pay'}
              control={formHarvest.control}
              name={'value_pay'}
              render={({ field }) => (
                <FormItem className="flex items-center justify-between">
                  <FormLabel>{'Total valor a pagar:'}</FormLabel>

                  <FormControl>
                    <Input
                      disabled
                      readOnly
                      className="w-40 text-center"
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

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="w-full my-5" />

          {/* Botones de guardar o cancelar */}
          <div className="flex gap-2 my-6 ">
            <Button onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </Form>
      </ScrollArea>
    </>
  );
};
