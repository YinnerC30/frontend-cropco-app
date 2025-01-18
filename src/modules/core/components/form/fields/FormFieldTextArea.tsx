import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from '@/components';
import React, { memo } from 'react';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';

export const FormFieldTextArea: React.FC<FormFieldProps> = memo(
  ({
    control,
    description,
    label,
    name,
    placeholder,
    disabled: readOnly = false,
    className,
  }) => {
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
