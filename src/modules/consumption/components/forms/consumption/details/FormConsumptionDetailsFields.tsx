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
  Loading,
} from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { SupplyStock } from '@/modules/supplies/interfaces/SupplyStock';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';

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

  useEffect(() => {
    addSupplyStock({
      id: consumptionDetail.supply.id,
      name: consumptionDetail.supply?.name!,
      amount: consumptionDetail.amount,
    } as any);
    formConsumptionDetail.reset(consumptionDetail);
  }, [consumptionDetail]);

  useEffect(() => {
    formConsumptionDetail.reset(consumptionDetail);
  }, [consumptionDetail]);

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
