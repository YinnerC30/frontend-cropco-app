import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { memo } from 'react';

export const FormFieldTextArea = memo(
  ({
    control,
    description,
    label,
    name,
    placeholder,
    readOnly = false,
    className,
  }: FormFieldProps) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Textarea
                className={`resize-none ${className}`}
                rows={4}
                placeholder={placeholder}
                {...field}
                readOnly={readOnly}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
