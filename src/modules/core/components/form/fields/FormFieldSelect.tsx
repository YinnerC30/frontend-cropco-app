import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { FieldValues } from 'react-hook-form';

interface SelectItemValues {
  key: string;
  value: string;
  label: string;
}

interface FormFieldSelectProps extends FormFieldProps {
  items: SelectItemValues[];
}

export const FormFieldSelect = ({
  control,
  name,
  label,
  placeholder,
  description,
  items,
  readOnly = false,
  className = '',
}: FormFieldSelectProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }: any) => (
        <FormItem className={className + 'ml-1'}>
          <FormLabel>{label}</FormLabel>
          <div className="w-48 ">
            <Select
              onValueChange={(value: any) => {
                field.onChange(value);
              }}
              defaultValue={field.value}
              value={field.value}
              disabled={readOnly}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>

              <SelectContent>
                {[...items].map((item: SelectItemValues) => (
                  <SelectItem key={item.key} value={item.value}>
                    {item.label}
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
