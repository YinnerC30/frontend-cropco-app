import {
  Button,
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
import { useGetAllClients } from '@/modules/clients/hooks';
import {
  ButtonRefetchData,
  FormFieldCheckBox,
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
  Loading,
} from '@/modules/core/components';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { formFieldsSaleDetail } from '@/modules/sales/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { CapitalizeFirstWord } from '@/auth/helpers';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  MassUnitOfMeasure,
  UnitsType
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useEffect, useRef, useState } from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { CropStock } from '../FormSaleContext';
import { BadgeCropStock } from './BadgeCropStock';
import { CommandItemCropStock } from './CommandItemCropStock';

export const FormSaleDetailsFields: React.FC = () => {
  const {
    readOnly,
    saleDetail,
    formSaleDetail,
    queryCropsWithStock,
    cropStock,
    addCropStock,
  } = useFormSaleContext();

  const { query: queryClients } = useGetAllClients({
    queryValue: '',
    all_records: true,
  });

  const [openPopover, setOpenPopover] = useState(false);

  const currentUnitType = formSaleDetail.watch(
    'unit_of_measure'
  ) as MassUnitOfMeasure;

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      addCropStock({
        id: saleDetail.crop.id,
        name: saleDetail.crop?.name!,
        stock: saleDetail.amount,
        unit_of_measure: saleDetail.unit_of_measure!,
      });
      firstRender.current = false;
    }

    formSaleDetail.reset(saleDetail);
  }, [saleDetail]);

  return (
    <Form {...formSaleDetail}>
      <form className="z-50 mx-5" id="formSaleDetail">
        <FormFieldCommand
          data={queryClients?.data?.records || []}
          form={formSaleDetail}
          nameToShow={'full_name'}
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.client.description}
          label={formFieldsSaleDetail.client.label}
          name={'client'}
          placeholder={formFieldsSaleDetail.client.placeholder}
          disabled={false}
          nameEntity="cliente"
          isLoading={queryClients.isLoading || queryClients.isFetching}
          className="w-52"
          reloadData={async () => {
            await queryClients.refetch();
          }}
        />

        <FormField
          control={formSaleDetail.control}
          name={`crop.id`}
          render={({ field }: { field: ControllerRenderProps<any, any> }) => {
            return (
              <FormItem className="my-4">
                <FormLabel className="block">
                  {formFieldsSaleDetail.crop.label}
                </FormLabel>

                <Popover
                  open={openPopover}
                  onOpenChange={setOpenPopover}
                  modal={true}
                >
                  <div className="flex gap-2">
                    <PopoverTrigger asChild>
                      <FormControl>
                        {queryCropsWithStock.isLoading ||
                        queryCropsWithStock.isFetching ? (
                          <div className="w-[200px]">
                            <Loading className="" />
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openPopover}
                            className={`w-80 ${cn(
                              'justify-between',
                              !field.value && 'text-muted-foreground'
                            )}`}
                            ref={field.ref}
                            onBlur={field.onBlur}
                            disabled={readOnly}
                          >
                            <span className="overflow-auto truncate text-muted-foreground text-ellipsis">
                              {!!field.value
                                ? cropStock.find((item: CropStock) => {
                                    return item.id === field.value;
                                  })?.['name']
                                : formFieldsSaleDetail.crop.placeholder}
                            </span>

                            {!!field.value && (
                              <BadgeCropStock
                                field={field}
                                cropsStock={cropStock}
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
                        await queryCropsWithStock.refetch();
                      }}
                      disabled={false}
                    />
                  </div>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        placeholder={`Buscar ${'cultivo'}...`}
                        className="h-9"
                      />
                      <CommandList>
                        <ScrollArea className="w-auto h-56 p-1 pr-2">
                          <CommandEmpty>{`${CapitalizeFirstWord(
                            'cultivo'
                          )} no encontrado`}</CommandEmpty>
                          <CommandGroup>
                            {cropStock.map((item) => {
                              return (
                                <CommandItem
                                  disabled={item?.['stock'] === 0}
                                  value={item?.['name']}
                                  key={item.id!}
                                  onSelect={() => {
                                    if (field?.value === item?.id) {
                                      formSaleDetail.setValue('crop', {
                                        id: '',
                                        ['name']: '',
                                      });
                                    } else {
                                      formSaleDetail.setValue(
                                        'crop',
                                        {
                                          id: item?.id,
                                          ['name']: item['name'],
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
                                  <CommandItemCropStock
                                    field={field}
                                    converTo={currentUnitType}
                                    item={item}
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
                  {formFieldsSaleDetail.crop.description}
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormFieldSelect
          items={UnitsType[MassUnitOfMeasure.GRAMOS]}
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.unit_of_measure.description}
          label={formFieldsSaleDetail.unit_of_measure.label}
          name={'unit_of_measure'}
          placeholder={formFieldsSaleDetail.unit_of_measure.placeholder}
          disabled={false}
        />

        <FormFieldCheckBox
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.is_receivable.description}
          label={formFieldsSaleDetail.is_receivable.label}
          name={'is_receivable'}
          placeholder={formFieldsSaleDetail.is_receivable.placeholder}
          disabled={false}
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.amount.description}
          label={formFieldsSaleDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsSaleDetail.amount.placeholder}
          disabled={false}
          type="number"
          step={50}
          allowDecimals
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.value_pay.description}
          label={formFieldsSaleDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsSaleDetail.value_pay.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
