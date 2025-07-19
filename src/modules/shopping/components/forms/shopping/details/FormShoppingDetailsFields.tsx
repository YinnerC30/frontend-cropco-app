import { Form } from '@/components';
import {
  ButtonRefetchData,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
} from '@/modules/core/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { formFieldsShoppingDetail } from '@/modules/shopping/utils';
import { useGetAllSuppliers } from '@/modules/suppliers/hooks';
import { useGetAllSupplies } from '@/modules/supplies/hooks';

import React, { useEffect, useState } from 'react';

import { CapitalizeFirstWord } from '@/auth';
import {
  Badge,
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import { cn } from '@/lib/utils';
import { Loading } from '@/modules/core/components';

import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { formFieldsSaleDetail } from '@/modules/sales/utils';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import {
  getUnitOfMeasureOptions,
  UnitOfMeasure,
  UnitsType
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';
import { defaultValuesShoppingDetail } from '../FormShoppingContext';

export const FormShoppingDetailsFields: React.FC = () => {
  const { formShoppingDetail, shoppingDetail, readOnly } =
    useFormShoppingContext();

  const { getUnitType } = useUnitConverter();

  const { query: querySuppliers } = useGetAllSuppliers({ queryValue: '' });

  const { query: querySupplies } = useGetAllSupplies({
    queryValue: '',
    all_records: true,
  });

  const [openPopover, setOpenPopover] = useState(false);

  const currentSupply = formShoppingDetail.watch('supply') as Partial<Supply>;
  const currentUnitType = formShoppingDetail.watch(
    'unit_of_measure'
  ) as UnitOfMeasure;

  useEffect(() => {
    formShoppingDetail.reset(shoppingDetail);
  }, [shoppingDetail]);

  useEffect(() => {
    if (!!currentSupply.id && currentSupply.id !== shoppingDetail.supply.id) {
      formShoppingDetail.setValue(
        'unit_of_measure',
        getUnitOfMeasureOptions(currentSupply.unit_of_measure as any)[0].key,
        { shouldValidate: true }
      );
    } else if (
      !!currentSupply.id &&
      currentSupply.id === shoppingDetail.supply.id
    ) {
      formShoppingDetail.setValue(
        'unit_of_measure',
        shoppingDetail.unit_of_measure
      );
    } else if (!currentSupply.id && !!currentUnitType) {
      formShoppingDetail.setValue('unit_of_measure', undefined);
    }
  }, [currentSupply, shoppingDetail]);

  useEffect(() => {
    return () => {
      formShoppingDetail.reset(defaultValuesShoppingDetail);
    };
  }, []);

  console.log(formShoppingDetail.formState.errors);

  return (
    <Form {...formShoppingDetail}>
      <form className="z-50 mx-5" id="formShoppingDetail">
        <FormFieldCommand
          data={querySuppliers?.data?.records || []}
          form={formShoppingDetail}
          nameToShow={'full_name'}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supplier.description}
          label={formFieldsShoppingDetail.supplier.label}
          name={'supplier'}
          placeholder={formFieldsShoppingDetail.supplier.placeholder}
          disabled={false}
          nameEntity="proveedor"
          isLoading={querySuppliers.isLoading || querySuppliers.isFetching}
          reloadData={async () => {
            await querySuppliers.refetch();
          }}
          className="w-52"
        />

        <FormField
          control={formShoppingDetail.control}
          name={`supply.id`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => {
            return (
              <FormItem className="my-4">
                <FormLabel className="block">
                  {formFieldsShoppingDetail.supply.label}
                </FormLabel>

                <Popover
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                  modal={true}
                >
                  <div className="flex flex-wrap gap-2 ">
                    <PopoverTrigger asChild>
                      <FormControl>
                        {querySupplies.isLoading || querySupplies.isFetching ? (
                          <div className="w-auto">
                            <Loading className="" />
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPopover}
                            className={`w-auto flex max-w-[80%] gap-2${cn(
                              `${!field.value && 'flex justify-between'}`,
                              !field.value && 'text-muted-foreground'
                            )}`}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            disabled={readOnly}
                          >
                            <span className="mr-2 overflow-auto truncate text-muted-foreground text-ellipsis max-w-36">
                              {!!field.value
                                ? querySupplies.data?.records.find(
                                    (item: Supply) => {
                                      return item.id === field.value;
                                    }
                                  )?.['name']
                                : formFieldsSaleDetail.crop.placeholder}
                            </span>

                            {!!field.value && (
                              <BadgeSupplyUnitOfMeasure
                                field={field}
                                supplies={
                                  querySupplies.data?.records || ([] as any)
                                }
                              />
                            )}

                            <span>
                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </span>
                          </Button>
                        )}
                      </FormControl>
                    </PopoverTrigger>
                    <ButtonRefetchData
                      onClick={async () => {
                        await querySupplies.refetch();
                      }}
                      disabled={false}
                    />
                  </div>
                  <PopoverContent className="w-[280px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Buscar ${'insumo'}...`}
                        className="h-9"
                      />
                      <CommandList>
                        <ScrollArea className="w-auto h-56 p-1 pr-2">
                          <CommandEmpty>{`${CapitalizeFirstWord(
                            'insumo'
                          )} no encontrado`}</CommandEmpty>
                          <CommandGroup>
                            {querySupplies.data?.records.map((item) => {
                              return (
                                <CommandItem
                                  value={item?.['name']}
                                  key={item.id!}
                                  onSelect={() => {
                                    if (field?.value === item?.id) {
                                      formShoppingDetail.setValue('supply', {
                                        id: '',
                                        ['name']: '',
                                      });
                                    } else {
                                      formShoppingDetail.setValue(
                                        'supply',
                                        {
                                          id: item?.id,
                                          ['name']: item['name'],
                                          ['unit_of_measure']:
                                            item?.['unit_of_measure'],
                                        },
                                        {
                                          shouldValidate: true,
                                          shouldDirty: true,
                                        }
                                      );
                                    }
                                    setOpenPopover(false);
                                    // setChangedSupply(true);
                                  }}
                                >
                                  <div className="flex justify-between w-full ">
                                    <span>{item?.['name']}</span>
                                    <span className="font-bold">
                                      {' ' +
                                        CapitalizeFirstWord(
                                          item?.[
                                            'unit_of_measure'
                                          ]?.toLowerCase() || ''
                                        )}
                                    </span>
                                  </div>
                                  <CheckIcon
                                    className={cn(
                                      'ml-auto h-4 w-4',
                                      item.id! === field?.value
                                        ? 'opacity-100'
                                        : 'opacity-0'
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
                  {formFieldsShoppingDetail.supply.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {!currentSupply.id && (
          <FormFieldSelect
            items={[]}
            control={formShoppingDetail.control}
            description={formFieldsShoppingDetail.unit_of_measure.description}
            label={formFieldsShoppingDetail.unit_of_measure.label}
            name={'unit_of_measure'}
            placeholder={formFieldsShoppingDetail.unit_of_measure.placeholder}
            disabled={true}
            manualValidationValue
          />
        )}

        {!!currentSupply.id &&
          getUnitType(currentSupply.unit_of_measure as any) === 'mass' && (
            <FormFieldSelect
              items={UnitsType.MASS}
              control={formShoppingDetail.control}
              description={formFieldsShoppingDetail.unit_of_measure.description}
              label={formFieldsShoppingDetail.unit_of_measure.label}
              name={'unit_of_measure'}
              placeholder={formFieldsShoppingDetail.unit_of_measure.placeholder}
              disabled={readOnly}
              currentValue={currentUnitType}
              manualValidationValue
            />
          )}

        {!!currentSupply.id &&
          getUnitType(currentSupply.unit_of_measure as any) === 'volume' && (
            <FormFieldSelect
              items={UnitsType.VOLUME}
              control={formShoppingDetail.control}
              description={formFieldsShoppingDetail.unit_of_measure.description}
              label={formFieldsShoppingDetail.unit_of_measure.label}
              name={'unit_of_measure'}
              placeholder={formFieldsShoppingDetail.unit_of_measure.placeholder}
              disabled={readOnly}
              currentValue={currentUnitType}
              manualValidationValue
            />
          )}

        {!!currentSupply.id &&
          getUnitType(currentSupply.unit_of_measure as any) === 'length' && (
            <FormFieldSelect
              items={UnitsType.LENGTH}
              control={formShoppingDetail.control}
              description={formFieldsShoppingDetail.unit_of_measure.description}
              label={formFieldsShoppingDetail.unit_of_measure.label}
              name={'unit_of_measure'}
              placeholder={formFieldsShoppingDetail.unit_of_measure.placeholder}
              disabled={readOnly}
              currentValue={currentUnitType!}
              manualValidationValue
            />
          )}

        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.amount.description}
          label={formFieldsShoppingDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsShoppingDetail.amount.placeholder}
          disabled={false}
          type="number"
        />
        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.value_pay.description}
          label={formFieldsShoppingDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsShoppingDetail.value_pay.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};

interface BadgeSupplyUnitOfMeasureProps {
  supplies: [];
  field: ControllerRenderProps<any, any>;
}
const BadgeSupplyUnitOfMeasure: React.FC<BadgeSupplyUnitOfMeasureProps> = ({
  field,
  supplies,
}) => {
  const formatLabelUnitOfMeasure = (): string => {
    const supply: any = supplies.find((item: Supply) => {
      return item.id === field.value;
    });
    return CapitalizeFirstWord(supply.unit_of_measure.toLowerCase() as string);
  };

  return (
    <Badge
      className={`${!field.value ? 'hidden' : 'lg:ml-10'}`}
      variant={'cyan'}
    >
      {formatLabelUnitOfMeasure()}
    </Badge>
  );
};
