import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon, ReloadIcon } from '@radix-ui/react-icons';
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
import {
  defaultValuesHarvest,
  formFieldsHarvest,
  formSchemaHarvest,
} from './ElementsHarvestForm';
import { usePostHarvest } from './hooks/usePostHarvest';

import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { DataTable } from '@/components/table/DataTable';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { CustomFormField } from '@/interfaces/CustomFormField';
import { Employee } from '@/interfaces/Employee';
import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { PaginationState } from '@tanstack/react-table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import { useGetAllCrops } from '../crops/hooks/useGetAllCrops';
import { useGetAllEmployees } from '../employees/hooks/useGetAllEmployees';
import columnsHarvestDetail from './ColumnsHarvestDetail';
import {
  defaultValuesHarvestDetail,
  formFieldsHarvestDetail,
  formSchemaHarvestDetail,
} from './ElementsHarvestDetailForm';
import { add, reset } from './harvestSlice';

export const CreateHarvest = () => {
  const navigate = useNavigate();

  const formHarvest = useForm<z.infer<typeof formSchemaHarvest>>({
    resolver: zodResolver(formSchemaHarvest),
    defaultValues: defaultValuesHarvest,
  });

  const { query: queryCrops } = useGetAllCrops({
    searchParameter: '',
    allRecords: true,
  });
  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: '',
    allRecords: true,
  });

  const { mutate, isSuccess, isPending } = usePostHarvest();
  const details = useAppSelector(state => state.harvest.details);

  const onSubmitHarvest = async (values: z.infer<typeof formSchemaHarvest>) => {
    console.log(values);
    mutate({
      ...values,
      details: details.map(({ id, ...rest }) => ({ ...rest, employee: id })),
    });
  };

  // Details

  const dispatch = useAppDispatch();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const formHarvestDetail = useForm<z.infer<typeof formSchemaHarvestDetail>>({
    resolver: zodResolver(formSchemaHarvestDetail),
    defaultValues: defaultValuesHarvestDetail,
  });

  const onSubmitHarvestDetail = async (
    values: z.infer<typeof formSchemaHarvestDetail>,
  ) => {
    const isIncludes = details.some(item => item.employee === values.employee);
    if (isIncludes) return;
    const [id, name] = values.employee.split('|');
    dispatch(add({ ...values, employee: name, id }));
    formHarvestDetail.reset();
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
    <div className="flex flex-col items-center w-full h-full">
      <Form {...formHarvest}>
        <form
          onSubmit={formHarvest.handleSubmit(onSubmitHarvest)}
          className="mx-5"
          id="formHarvest"
        >
          {formFieldsHarvest.map((record: CustomFormField) => (
            <FormField
              key={record.name}
              control={formHarvest.control}
              name={record.name}
              render={({ field }) => (
                <FormItem className="my-4">
                  <FormLabel className="block">{record.label}</FormLabel>

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

                  {record.type === 'number' && (
                    <FormControl>
                      <Input
                        className="w-80"
                        placeholder={record.placeholder}
                        {...field}
                        type="number"
                        min={0}
                        onChange={e =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                  )}

                  {record.type === 'date' && (
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
                  )}

                  {record.type === 'select' &&
                    record.name === 'unit_of_measure' && (
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
                          <SelectItem value={UnitOfMeasureHarvest.LIBRAS}>
                            {UnitOfMeasureHarvest.LIBRAS}
                          </SelectItem>
                          <SelectItem value={UnitOfMeasureHarvest.KILOGRAMOS}>
                            {UnitOfMeasureHarvest.KILOGRAMOS}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}

                  {record.type === 'select' && record.name === 'crop' && (
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
                        {queryCrops.data.rows.map((item: Crop) => (
                          <SelectItem key={item.id} value={item.id!}>
                            {item.name}
                          </SelectItem>
                        ))}
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

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Agregar</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Agregar</DialogTitle>
            <DialogDescription>
              {/* Agrega información de cosecha por empleado */}
            </DialogDescription>
          </DialogHeader>

          <Form {...formHarvestDetail}>
            <form
              onSubmit={formHarvestDetail.handleSubmit(onSubmitHarvestDetail)}
              className="mx-5"
              id="formDetail"
            >
              {formFieldsHarvestDetail.map((record: CustomFormField) => (
                <FormField
                  key={record.name}
                  control={formHarvestDetail.control}
                  name={record.name}
                  render={({ field }) => (
                    <FormItem className="my-4">
                      <FormLabel className="block">{record.label}</FormLabel>

                      {record.type === 'string' && (
                        <FormControl>
                          <Input
                            className="w-80"
                            placeholder={record.placeholder}
                            {...field}
                          />
                        </FormControl>
                      )}

                      {record.type === 'number' && (
                        <FormControl>
                          <Input
                            className="w-80"
                            placeholder={record.placeholder}
                            {...field}
                            type="number"
                            min={0}
                            onChange={e =>
                              field.onChange(parseFloat(e.target.value))
                            }
                          />
                        </FormControl>
                      )}

                      {record.type === 'select' && (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={record.placeholder} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {queryEmployees.data.rows.map((item: Employee) => (
                              <SelectItem
                                key={item.id}
                                value={`${item.id!}|${item.first_name} ${
                                  item.last_name
                                }`}
                              >
                                {`${item.first_name} ${item.last_name}`}
                              </SelectItem>
                            ))}
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

          <DialogFooter>
            <Button type="submit" form="formDetail">
              Guardar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DataTable
        columns={columnsHarvestDetail}
        rows={details}
        data={{
          rowCount: details.length,
          pageCount: Math.ceil(details.length / pagination.pageSize),
        }}
        pagination={pagination}
        setPagination={setPagination}
      ></DataTable>

      <div className="flex justify-between w-48 mt-5 ml-5">
        <Button type="submit" form="formHarvest" disabled={isPending}>
          {isPending && <ReloadIcon className="w-4 h-4 mr-2 animate-spin" />}
          Guardar
        </Button>
        <Button onClick={() => navigate(-1)}>Cancelar</Button>
      </div>
    </div>
  );
};
