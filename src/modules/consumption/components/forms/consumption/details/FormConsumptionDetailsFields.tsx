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
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
  Loading,
} from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import {
  UnitOfMeasure,
  UnitsType,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { defaultValuesConsumptionDetail } from '../FormConsumptionContext';

export const FormConsumptionDetailsFields: React.FC = () => {
  const {
    formConsumptionDetail,
    consumptionDetail,
    readOnly,
    querySuppliesStock,
    suppliesStock,
    addSupplyStock,
    currentSupply,
    currentUnitType,
    setCurrentSupply,
    setCurrentUnitType,
  } = useFormConsumptionContext();

  const { query: queryCrops } = useGetAllCrops({
    all_records: true,
    queryValue: '',
  });

  const [openPopover, setOpenPopover] = useState(false);

  const currentLocalSupply = formConsumptionDetail.watch(
    'supply'
  ) as Partial<Supply>;
  const currentLocalUnitType = formConsumptionDetail.watch(
    'unit_of_measure'
  ) as UnitOfMeasure;

  useEffect(() => {
    setCurrentSupply(currentLocalSupply);
  }, [currentLocalSupply]);

  useEffect(() => {
    setCurrentUnitType(currentLocalUnitType);
  }, [currentLocalUnitType]);

  useEffect(() => {
    addSupplyStock({
      id: consumptionDetail.supply.id,
      name: consumptionDetail.supply?.name!,
      amount: consumptionDetail.amount,
      unit_of_measure: consumptionDetail.unit_of_measure,
      supply: consumptionDetail.supply,
    } as any);
    formConsumptionDetail.reset(consumptionDetail);
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
          isLoading={queryCrops.isLoading}
          className="w-52"
        />

        <FormField
          control={formConsumptionDetail.control}
          name={`supply.id`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => {
            return (
              <FormItem className="my-4">
                <FormLabel className="block">
                  {formFieldsConsumptionDetail.supply.label}
                </FormLabel>

                <Popover
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                  modal={true}
                >
                  <PopoverTrigger asChild>
                    <FormControl>
                      {querySuppliesStock.isLoading ? (
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

                          {!!field.value && (
                            <Badge
                              className={`${!field.value ? 'hidden' : 'ml-10'}`}
                              variant={'cyan'}
                            >
                              {'Disponibles: ' +
                                FormatNumber(
                                  suppliesStock.find((item: SupplyStock) => {
                                    return item.id === field.value;
                                  })?.['amount'] || 0
                                )}

                              {suppliesStock.find((item: SupplyStock) => {
                                return item.id === field.value;
                              })?.['unit_of_measure'] === 'GRAMOS'
                                ? ' g'
                                : ' ml'}
                            </Badge>
                          )}

                          <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                        </Button>
                      )}
                    </FormControl>
                  </PopoverTrigger>
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
                                  <div className="flex justify-between w-full ">
                                    <span>{item?.['name']}</span>
                                    <span className="font-bold">
                                      {FormatNumber(item?.['amount']) +
                                        ' ' +
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
                  {formFieldsConsumptionDetail.supply.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
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
          currentSupply.unit_of_measure === UnitOfMeasure.GRAMOS && (
            <FormFieldSelect
              items={UnitsType[UnitOfMeasure.GRAMOS]}
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
          currentSupply.unit_of_measure === UnitOfMeasure.MILILITROS && (
            <FormFieldSelect
              items={UnitsType[UnitOfMeasure.MILILITROS]}
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
