import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Crop } from "@/modules/crops/interfaces/Crop";

import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "../../interfaces/FormFieldProps";

interface FormFieldCommandProps extends FormFieldProps {
  openPopover: boolean;
  setOpenPopover: any;
  data: any[];
  form: any;
  nameToShow: string;
}

export const FormFieldCommand = ({
  control,
  name,
  label,
  openPopover,
  setOpenPopover,
  placeholder,
  data = [],
  form,
  description,
  nameToShow,
  readOnly,
}: FormFieldCommandProps) => {
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
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openPopover}
                    className={cn(
                      "w-[200px] justify-between",
                      !field.value && "text-muted-foreground"
                    )}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    disabled={readOnly}
                  >
                    {field.value
                      ? data.find((item: Crop) => item.id === field.value)?.[
                          nameToShow
                        ]
                      : placeholder}

                    <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput
                    placeholder="Buscar cultivo..."
                    className="h-9"
                  />
                  <CommandList>
                    <ScrollArea className="w-auto h-56">
                      <CommandEmpty>Cultivo no encontrado.</CommandEmpty>
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
                                    form.setValue(name, undefined);
                                  } else {
                                    form.setValue(name, item.id!);
                                    form.trigger(name);
                                  }
                                  setOpenPopover(false);
                                }}
                              >
                                {item?.[nameToShow]}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    item.id! === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
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
