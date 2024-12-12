import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components';
import { Switch } from '@/components/ui/switch';
import { memo } from 'react';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';

export const FormFieldSwitch = memo(({
  control,
  name,
  label,
  description,
  className,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={`flex flex-row justify-between ${className} `}>
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
})
