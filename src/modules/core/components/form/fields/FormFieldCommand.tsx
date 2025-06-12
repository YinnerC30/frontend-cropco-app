import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { Loading } from '../../shared/Loading';
import { ButtonRefetchData } from '../../actions-module/ButtonRefetchData';

interface FormFieldCommandProps extends FormFieldProps {
  data: { id: string; [key: string]: any }[] | any[];
  form: UseFormReturn<any, any, undefined>;
  nameToShow: string;
  isLoading?: boolean;
  nameEntity?: string;
  actionFinal?: () => void;
  nameToControl?: string;
  reloadData?: () => Promise<void>;
  contentTooltip?: string;
}

export const FormFieldCommand: React.FC<FormFieldCommandProps> = ({
  control,
  name,
  label,
  placeholder,
  data = [],
  form,
  description,
  nameToShow,
  disabled: readOnly,
  isLoading = false,
  nameEntity = 'registro',
  className,
  actionFinal,
  reloadData = async () => {},
  contentTooltip = 'Actualizar datos de la consulta',
}) => {
  const [openPopover, setOpenPopover] = useState(false);

  const getFieldNameFromData = (fielValue: string) => {
    const item = data.find((item) => {
      return item.id === fielValue;
    })?.[nameToShow];
    return item;
  };

  const handleOnSelectCommandItem = (
    field: ControllerRenderProps<any, any>,
    item: any
  ) => {
    if (field?.value === item?.id) {
      form.setValue(name, {
        id: '',
        [nameToShow]: '',
      });
    } else {
      form.setValue(
        name,
        {
          id: item?.id,
          [nameToShow]: item[nameToShow],
        },
        {
          shouldValidate: true,
          shouldDirty: true,
        }
      );
    }
    setOpenPopover(false);
    actionFinal && actionFinal();
  };

  return (
    <FormField
      control={control}
      name={`${name}.id`}
      render={({ field }: { field: ControllerRenderProps<any, any> }) => {
        return (
          <FormItem className="my-4">
            <FormLabel className="block">{label}</FormLabel>

            <Popover
              open={openPopover}
              onOpenChange={setOpenPopover}
              modal={true}
            >
              <div className="flex gap-2">
                <PopoverTrigger asChild>
                  <FormControl>
                    {isLoading ? (
                      <div className="w-[200px]">
                        <Loading className="" />
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openPopover}
                        className={`${className} ${cn(
                          'justify-between',
                          !field.value && '',
                          'overflow-hidden text-ellipsis truncate'
                        )}`}
                        ref={field.ref}
                        onBlur={field.onBlur}
                        disabled={readOnly}
                      >
                        <span
                          className={cn(
                            'text-muted-foreground',
                            'overflow-hidden text-ellipsis truncate'
                          )}
                        >
                          {!!field.value
                            ? getFieldNameFromData(field.value)
                            : placeholder}
                        </span>

                        <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                      </Button>
                    )}
                  </FormControl>
                </PopoverTrigger>
                <ButtonRefetchData
                  onClick={async () => {
                    await reloadData();
                  }}
                  disabled={false}
                  content={contentTooltip}
                />
              </div>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder={`Buscar ${nameEntity}...`}
                    className="h-9"
                  />
                  <CommandList>
                    <ScrollArea className="w-auto h-56 p-1 pr-2">
                      <CommandEmpty>{`${CapitalizeFirstWord(
                        nameEntity
                      )} no encontrado`}</CommandEmpty>
                      <CommandGroup>
                        {data.map((item) => {
                          return (
                            <CommandItem
                              disabled={item.disabled}
                              value={item?.[nameToShow]}
                              key={item.id!}
                              onSelect={() => {
                                handleOnSelectCommandItem(field, item);
                              }}
                            >
                              <div className="">{item?.[nameToShow]}</div>
                              <CheckIcon
                                className={cn(
                                  'ml-auto h-4 w-4',
                                  item.id! === field?.value &&
                                    item.id !== undefined &&
                                    item.id.length > 0
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
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};
