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
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { Loading } from '../../shared/Loading';
import { CapitalizeFirstWord } from '@/auth';

interface FormFieldCommandProps extends FormFieldProps {
  openPopover?: boolean;
  setOpenPopover?: any;
  data: any[];
  form: any;
  nameToShow: string;
  isLoading?: boolean;
  nameEntity?: string;
}

export const FormFieldCommand = ({
  control,
  name,
  label,
  placeholder,
  data = [],
  form,
  description,
  nameToShow,
  readOnly,
  isLoading = false,
  nameEntity = 'registro',
  className,
}: FormFieldCommandProps) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => {
        return (
          <FormItem className="my-4">
            <FormLabel className="block">{label}</FormLabel>

            <Popover
              open={openPopover}
              onOpenChange={setOpenPopover}
              modal={true}
            >
              <PopoverTrigger asChild>
                <FormControl>
                  {isLoading ? (
                    <Loading />
                  ) : (
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openPopover}
                      className={cn(
                        'justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                      ref={field.ref}
                      onBlur={field.onBlur}
                      disabled={readOnly}
                    >
                      {field.value
                        ? data.find((item: any) => item.id === field.value)?.[
                            nameToShow
                          ]
                        : placeholder}

                      <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                    </Button>
                  )}
                </FormControl>
              </PopoverTrigger>
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
                        {data &&
                          Array.isArray(data) &&
                          data.map((item: any) => {
                            return (
                              <CommandItem
                                value={item?.[nameToShow]}
                                key={item.id!}
                                onSelect={() => {
                                  if (field.value === item.id) {
                                    form.setValue(name, '');
                                  } else {
                                    form.setValue(name, item.id!, {
                                      shouldDirty: true,
                                    });
                                    form.trigger(name);
                                  }
                                  setOpenPopover(false);
                                }}
                              >
                                {item?.[nameToShow]}
                                <CheckIcon
                                  className={cn(
                                    'ml-auto h-4 w-4',
                                    item.id! === field.value
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
