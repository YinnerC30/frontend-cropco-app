import {
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
  PopoverContent,
  PopoverTrigger,
  ScrollArea,
} from '@/components';
import { ButtonRefetchData, Loading } from '@/modules/core/components';
import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { CapitalizeFirstWord } from '@/auth';
import { cn } from '@/lib/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Popover } from '@radix-ui/react-popover';
import { CheckIcon, X } from 'lucide-react';
import React, { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarConsumption } from '../../../utils/formSchemaSearchBarConsumption';

interface ConsumptionSearchBarCropsFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarConsumption>,
    unknown
  >;
  onAddFilter: (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => Promise<boolean>;
  onClearErrors: (
    name: keyof z.infer<typeof formSchemaSearchBarConsumption>
  ) => void;
  queryCrops: any;
  disabled: boolean;
}

export const ConsumptionSearchBarCropsFilter: React.FC<
  ConsumptionSearchBarCropsFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, queryCrops, disabled }) => {
  const [openPopoverCrops, setOpenPopoverCrops] = useState(false);

  return (
    <FilterDropdownItem
      label={'Cultivos'}
      className="lg:w-[280px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`crops`}
            render={({ field }: { field: ControllerRenderProps<any, any> }) => {
              const currentCrops = formSearchBar.watch('crops');

              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Cultivos involucrados:'}
                  </FormLabel>
                  <Popover
                    open={openPopoverCrops}
                    onOpenChange={setOpenPopoverCrops}
                    modal={true}
                  >
                    <div className="flex flex-wrap justify-center gap-2">
                      <PopoverTrigger asChild>
                        <FormControl>
                          {queryCrops.isLoading || queryCrops.isFetching ? (
                            <div className="w-[200px]">
                              <Loading className="" />
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={openPopoverCrops}
                              className={` ${cn(
                                'justify-between',
                                !field.value && 'text-muted-foreground'
                              )}`}
                              ref={field.ref}
                              onBlur={field.onBlur}
                              disabled={disabled}
                              data-testid="btn-consumption-crops-select"
                            >
                              {field.value.length > 0 && !!queryCrops.data
                                ? `${currentCrops!.length} seleccionado(s)`
                                : 'Selecciona cultivo'}

                              <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                            </Button>
                          )}
                        </FormControl>
                      </PopoverTrigger>
                    </div>

                    <div className="flex items-center justify-center">
                      <Button
                        type="button"
                        onClick={() => {
                          formSearchBar.setValue('crops', [], {
                            shouldValidate: false,
                            shouldDirty: false,
                          });
                        }}
                        size={'icon'}
                        variant={'outline'}
                        className="w-8 mr-1 bg-destructive hover:bg-destructive/80"
                        data-testid="btn-consumption-clear-crops"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                      <ButtonRefetchData
                        onClick={async () => {
                          await queryCrops.refetch();
                        }}
                        disabled={false}
                        content="Actualizar datos de cultivos involucrados"
                        data-testid="btn-consumption-refetch-crops-detail"
                      />
                    </div>

                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Buscar cultivo...`}
                          className="h-9"
                          data-testid="input-consumption-search-crops"
                        />
                        <CommandList>
                          <ScrollArea className="w-auto h-56 p-1 pr-2">
                            <CommandEmpty>{`${CapitalizeFirstWord(
                              'cultivo'
                            )} no encontrado`}</CommandEmpty>
                            <CommandGroup>
                              {queryCrops?.data?.records.map((item: any) => {
                                return (
                                  <CommandItem
                                    value={item?.['name']}
                                    key={item.id!}
                                    onSelect={() => {
                                      if (
                                        field?.value?.some(
                                          (i: any) => i.id === item?.id
                                        )
                                      ) {
                                        formSearchBar.setValue(
                                          'crops',
                                          [
                                            ...field?.value?.filter(
                                              (i: any) => i.id !== item?.id
                                            ),
                                          ],
                                          {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                          }
                                        );
                                      } else {
                                        formSearchBar.setValue(
                                          'crops',
                                          [
                                            ...(currentCrops || []),
                                            {
                                              id: item.id,
                                              name: item['name'],
                                            },
                                          ],
                                          {
                                            shouldValidate: true,
                                            shouldDirty: true,
                                          }
                                        );
                                      }
                                      setOpenPopoverCrops(false);
                                    }}
                                    data-testid={`option-consumption-crop-${item.id}`}
                                  >
                                    <div className="">{item?.['name']}</div>
                                    <CheckIcon
                                      className={cn(
                                        'ml-auto h-4 w-4',
                                        field?.value.some((i: any) => {
                                          return i.id === item?.id;
                                        })
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
                    {'Cultivos(s) que han participado en el consumo'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </>
      }
      actionOnSave={() => onAddFilter('crops')}
      actionOnClose={() => onClearErrors('crops')}
    />
  );
};
