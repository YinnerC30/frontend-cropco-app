import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { FormFieldProps } from "../../interfaces/FormFieldProps";
import { UnitOfMeasure } from "@/modules/supplies/interfaces/UnitOfMeasure";

interface FormFieldSelectProps<T> extends FormFieldProps {
  items: T[];
}

export const FormFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  items,
  readOnly = false,
  className = "",
}: FormFieldSelectProps<any>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <div className="w-48 ">
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {items.map((item: UnitOfMeasure) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
