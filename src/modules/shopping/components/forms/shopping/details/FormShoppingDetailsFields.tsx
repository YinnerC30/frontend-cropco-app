import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
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

import { formFieldsSaleDetail } from '@/modules/sales/utils';
import { Supply } from '@/modules/supplies/interfaces/Supply';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { CheckIcon } from 'lucide-react';
import { ControllerRenderProps } from 'react-hook-form';

export const FormShoppingDetailsFields: React.FC = () => {
  const { formShoppingDetail, shoppingDetail, readOnly } =
    useFormShoppingContext();

  const { query: querySuppliers } = useGetAllSuppliers({ queryValue: '' });

  const { query: querySupplies } = useGetAllSupplies({
    queryValue: '',
    all_records: true,
  });

  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    formShoppingDetail.reset(shoppingDetail);
  }, [shoppingDetail]);

  return (
    <Form {...formShoppingDetail}>
      <form className="z-50 mx-5" id="formShoppingDetail">
        <FormFieldCommand
          data={querySuppliers?.data?.records || []}
          form={formShoppingDetail}
          nameToShow={'first_name'}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supplier.description}
          label={formFieldsShoppingDetail.supplier.label}
          name={'supplier'}
          placeholder={formFieldsShoppingDetail.supplier.placeholder}
          disabled={false}
          nameEntity="proveedor"
          isLoading={querySuppliers.isLoading}
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
                  <PopoverTrigger asChild>
                    <FormControl>
                      {querySupplies.isLoading ? (
                        <div className="w-[200px]">
                          <Loading className="" />
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openPopover}
                          className={`w-[250px] flex justify-between ${cn(
                            `${!field.value && 'flex justify-between'}`,
                            !field.value && 'text-muted-foreground'
                          )}`}
                          ref={field.ref}
                          onBlur={field.onBlur}
                          disabled={readOnly}
                        >
                          <span>
                            {!!field.value
                              ? querySupplies.data?.records.find(
                                  (item: Supply) => {
                                    return item.id === field.value;
                                  }
                                )?.['name']
                              : formFieldsSaleDetail.crop.placeholder}
                            {!!field.value && (
                              <Badge
                                className={`${
                                  !field.value ? 'hidden' : 'ml-10'
                                }`}
                                variant={'cyan'}
                              >
                                {querySupplies.data?.records.find(
                                  (item: Supply) => {
                                    return item.id === field.value;
                                  }
                                )?.['unit_of_measure'] === 'GRAMOS'
                                  ? ' Gramos'
                                  : ' Mililitros'}
                              </Badge>
                            )}
                          </span>
                          <span>
                            <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                          </span>
                        </Button>
                      )}
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] p-0">
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

        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.amount.description}
          label={formFieldsShoppingDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsShoppingDetail.amount.placeholder}
          disabled={false}
          type="number"
          step={50}
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
