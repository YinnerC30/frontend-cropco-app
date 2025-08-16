import { Button, PopoverContent, PopoverTrigger } from '@/components';
import { ButtonRefetchData, Loading } from '@/modules/core/components';

import { CheckIcon } from 'lucide-react';

import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { Popover } from '@radix-ui/react-popover';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

import { ScrollArea } from '@/components/ui/scroll-area';

import { CapitalizeFirstWord } from '@/auth';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { formSchemaSearchBarSale } from '@/modules/sales/utils';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { z } from 'zod';

interface Props {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarSale>,
    unknown
  >;
  onAddFilter: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => Promise<boolean>;
  onClearErrors: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => void;

  queryCrops: UseQueryGetAllRecordsReturn<Crop>;
  disabled: boolean;
}

export const SaleSearchBarCropsFilter: React.FC<Props> = (props) => {
  const [openPopoverCrop, setOpenPopoverCrop] = useState(false);
  const { formSearchBar, onAddFilter, onClearErrors, queryCrops, disabled } =
    props;

  // Funciones extraídas para mejorar la legibilidad
  const handleRefetchCrops = async () => {
    await queryCrops.refetch();
  };

  const handleCropSelection = (
    field: ControllerRenderProps<any, any>,
    item: Crop,
    currentCrops: any[] | undefined
  ) => {
    const isCropSelected = field?.value?.some((i: any) => i.id === item?.id);

    if (isCropSelected) {
      // Remover cultivo si ya está seleccionado
      formSearchBar.setValue(
        'crops',
        [...field?.value?.filter((i: any) => i.id !== item?.id)],
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    } else {
      // Agregar cultivo si no está seleccionado
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
    setOpenPopoverCrop(false);
  };

  const renderCropButton = (field: ControllerRenderProps<any, any>) => {
    const currentCrops = formSearchBar.watch('crops');

    if (queryCrops.isLoading || queryCrops.isFetching) {
      return (
        <div className="w-[200px]">
          <Loading className="" />
        </div>
      );
    }

    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={openPopoverCrop}
        className={cn(
          'justify-between',
          !field.value && 'text-muted-foreground'
        )}
        ref={field.ref}
        onBlur={field.onBlur}
        disabled={disabled}
        data-testid="btn-open-command-crop"
      >
        {field.value.length > 0 && !!queryCrops.data
          ? `${currentCrops!.length} seleccionado(s)`
          : 'Selecciona cultivos'}

        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
      </Button>
    );
  };

  const renderCropItem = (
    item: Crop,
    index: number,
    field: ControllerRenderProps<any, any>
  ) => {
    const isSelected = field?.value.some((i: any) => i.id === item?.id);

    return (
      <CommandItem
        value={item?.['name']}
        key={item.id!}
        onSelect={() => {
          const currentCrops = formSearchBar.watch('crops');
          handleCropSelection(field, item, currentCrops);
        }}
        data-testid={`form-field-command-item-${index}`}
      >
        <div className="">{item?.['name']}</div>
        <CheckIcon
          className={cn(
            'ml-auto h-4 w-4',
            isSelected ? 'opacity-100' : 'opacity-0'
          )}
        />
      </CommandItem>
    );
  };

  const renderCropList = (field: ControllerRenderProps<any, any>) => {
    return (
      <ScrollArea className="w-auto h-56 p-1 pr-2">
        <CommandEmpty>
          {`${CapitalizeFirstWord('cultivo')} no encontrado`}
        </CommandEmpty>
        <CommandGroup>
          {queryCrops?.data?.records.map((item, index) =>
            renderCropItem(item, index, field)
          )}
        </CommandGroup>
      </ScrollArea>
    );
  };

  return (
    <FilterDropdownItem
      label={'Cultivos'}
      className=" lg:w-[280px]"
      content={
        <>
          <FormField
            control={formSearchBar.control}
            name={`crops`}
            render={({ field }: { field: ControllerRenderProps<any, any> }) => {
              return (
                <FormItem className="">
                  <FormLabel className="block my-2">
                    {'Cultivos involucrados:'}
                  </FormLabel>
                  <Popover
                    open={openPopoverCrop}
                    onOpenChange={setOpenPopoverCrop}
                    modal={true}
                  >
                    <div className="flex flex-wrap gap-2">
                      <PopoverTrigger asChild>
                        <FormControl>{renderCropButton(field)}</FormControl>
                      </PopoverTrigger>
                      <ButtonRefetchData
                        onClick={handleRefetchCrops}
                        disabled={false}
                        content="Actualizar datos de cultivos involucrados"
                      />
                    </div>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder={`Buscar cultivo...`}
                          className="h-9"
                        />
                        <CommandList>{renderCropList(field)}</CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    {'Cultivo(s) que han participado en la venta'}
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
      dataTestId="filter-crops"
    />
  );
};
