import { CapitalizeFirstWord } from '@/auth';
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Form,
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
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { formFieldsConsumptionDetail } from '@/modules/consumption/utils';
import {
  ButtonRefetchData,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
  Loading,
} from '@/modules/core/components';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import {
  MassUnitOfMeasure,
  UnitOfMeasure,
  UnitsType,
  VolumeUnitOfMeasure,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { defaultValuesConsumptionDetail } from '../FormConsumptionContext';
import { BadgeSupplyStock } from './BadgeSupplyStock';
import { CommandItemSupplyStock } from './CommandItemSupplyStock';

export const FormConsumptionDetailsFields: React.FC = () => {
  const {
    formConsumptionDetail,
    consumptionDetail,
    readOnly,
    querySuppliesStock,
    suppliesStock,
    addSupplyStock,
  } = useFormConsumptionContext();

  const { query: queryCrops } = useGetAllCrops({
    all_records: true,
    queryValue: '',
  });

  const [openPopover, setOpenPopover] = useState(false);

  const firstRender = useRef(true);

  const currentSupply = formConsumptionDetail.watch(
    'supply'
  ) as Partial<Supply>;

  const currentUnitType = formConsumptionDetail.watch(
    'unit_of_measure'
  ) as UnitOfMeasure;

  useEffect(() => {
    if (firstRender.current) {
      addSupplyStock({
        id: consumptionDetail.supply.id,
        name: consumptionDetail.supply?.name!,
        amount: consumptionDetail.amount,
        unit_of_measure: consumptionDetail.unit_of_measure,
        supply: consumptionDetail.supply,
      } as any);
      firstRender.current = false;
    }
  }, [consumptionDetail]);

  useEffect(() => {
    formConsumptionDetail.reset(consumptionDetail);
  }, [consumptionDetail]);

  useEffect(() => {
    if (
      !!currentSupply.id &&
      currentSupply.id !== consumptionDetail.supply.id
    ) {
      formConsumptionDetail.setValue(
        'unit_of_measure',
        UnitsType[currentSupply.unit_of_measure as keyof typeof UnitsType][0]
          .key,
        { shouldValidate: true }
      );
    } else if (
      !!currentSupply.id &&
      currentSupply.id === consumptionDetail.supply.id
    ) {
      formConsumptionDetail.setValue(
        'unit_of_measure',
        consumptionDetail.unit_of_measure
      );
    } else if (!currentSupply.id && !!currentUnitType) {
      formConsumptionDetail.setValue('unit_of_measure', undefined);
    }
  }, [currentSupply, consumptionDetail]);

  useEffect(() => {
    return () => {
      formConsumptionDetail.reset(defaultValuesConsumptionDetail);
    };
  }, []);

  return (
    <Form {...formConsumptionDetail}>
      <form className="z-50 mx-5" id="formConsumptionDetail">
        <FormFieldCommand
          data={queryCrops?.data?.records || []}
          form={formConsumptionDetail}
          nameToShow={'name'}
          control={formConsumptionDetail.control}
          description={formFieldsConsumptionDetail.crop.description}
          label={formFieldsConsumptionDetail.crop.label}
          name={'crop'}
          placeholder={formFieldsConsumptionDetail.crop.placeholder}
          disabled={false}
          nameEntity="cultivo"
          isLoading={queryCrops.isLoading || queryCrops.isFetching}
          className="w-52"
          reloadData={async () => {
            await queryCrops.refetch();
          }}
        />

        <FormField
          control={formConsumptionDetail.control}
          name={`supply.id`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => (
            <FormItem className="my-4">
              <FormLabel className="block">
                {formFieldsConsumptionDetail.supply.label}
              </FormLabel>

              <Popover
                open={openPopover}
                onOpenChange={setOpenPopover}
                modal={true}
              >
                <div className="flex gap-2">
                  <PopoverTrigger asChild>
                    <FormControl>
                      {querySuppliesStock.isLoading ||
                      querySuppliesStock.isFetching ? (
                        <div className="w-[200px]">
                          <Loading className="" />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover}
                          className={`w-80 ${cn(
                            `${!field.value && 'flex justify-between'}`,
                            !field.value && 'text-muted-foreground'
                          )}`}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          disabled={readOnly}
                        >
                          <span className="overflow-auto truncate text-muted-foreground text-ellipsis">
                            {!!field.value
                              ? suppliesStock.find((item: SupplyStock) => {
                                  return item.id === field.value;
                                })?.['name']
                              : formFieldsConsumptionDetail.supply.placeholder}
                          </span>

                          {!!field.value && !!currentUnitType && (
                            <BadgeSupplyStock
                              field={field}
                              suppliesStock={suppliesStock}
                              convertTo={currentUnitType}
                            />
                          )}

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      )}
                    </FormControl>
                  </PopoverTrigger>

                  <ButtonRefetchData
                    onClick={async () => {
                      await querySuppliesStock.refetch();
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
                          {suppliesStock.map((item) => {
                            return (
                              <CommandItem
                                disabled={item?.['amount'] === 0}
                                value={item?.['name']}
                                key={item.id!}
                                onSelect={() => {
                                  if (field?.value === item?.id) {
                                    formConsumptionDetail.setValue('supply', {
                                      id: '',
                                      ['name']: '',
                                    });
                                  } else {
                                    formConsumptionDetail.setValue(
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
                                }}
                              >
                                <CommandItemSupplyStock
                                  field={field}
                                  item={item}
                                  converTo={
                                    !currentUnitType
                                      ? (item.unit_of_measure as UnitOfMeasure)
                                      : currentUnitType
                                  }
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
                {formFieldsConsumptionDetail.supply.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {!currentSupply.id && (
          <FormFieldSelect
            items={[]}
            control={formConsumptionDetail.control}
            description={
              formFieldsConsumptionDetail.unit_of_measure.description
            }
            label={formFieldsConsumptionDetail.unit_of_measure.label}
            name={'unit_of_measure'}
            placeholder={
              formFieldsConsumptionDetail.unit_of_measure.placeholder
            }
            disabled={true}
            manualValidationValue
          />
        )}

        {!!currentSupply.id &&
          currentSupply.unit_of_measure === MassUnitOfMeasure.GRAMOS && (
            <FormFieldSelect
              items={UnitsType[MassUnitOfMeasure.GRAMOS]}
              control={formConsumptionDetail.control}
              description={
                formFieldsConsumptionDetail.unit_of_measure.description
              }
              label={formFieldsConsumptionDetail.unit_of_measure.label}
              name={'unit_of_measure'}
              placeholder={
                formFieldsConsumptionDetail.unit_of_measure.placeholder
              }
              disabled={readOnly}
              currentValue={currentUnitType!}
              manualValidationValue
            />
          )}

        {!!currentSupply.id &&
          currentSupply.unit_of_measure === VolumeUnitOfMeasure.MILILITROS && (
            <FormFieldSelect
              items={UnitsType[VolumeUnitOfMeasure.MILILITROS]}
              control={formConsumptionDetail.control}
              description={
                formFieldsConsumptionDetail.unit_of_measure.description
              }
              label={formFieldsConsumptionDetail.unit_of_measure.label}
              name={'unit_of_measure'}
              placeholder={
                formFieldsConsumptionDetail.unit_of_measure.placeholder
              }
              disabled={readOnly}
              currentValue={currentUnitType!}
              manualValidationValue
            />
          )}

        <FormFieldInput
          control={formConsumptionDetail.control}
          description={formFieldsConsumptionDetail.amount.description}
          label={formFieldsConsumptionDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsConsumptionDetail.amount.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
