import { es } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { FormFieldProps } from "../../interfaces/form/FormFieldProps";

export const FormFieldCalendar = ({
  control,
  description,
  label,
  name,
  placeholder,
  readOnly = false,
  className = "",
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>

          <div className="block">
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    ref={field.ref}
                    disabled={readOnly}
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground" && className
                    )}
                  >
                    {field.value ? (
                      format(field.value, "PPP", { locale: es })
                    ) : (
                      <span>{placeholder}</span>
                    )}
                    <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  locale={es}
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
