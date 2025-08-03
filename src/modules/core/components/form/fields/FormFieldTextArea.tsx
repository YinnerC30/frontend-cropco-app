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

interface FormFieldTextAreaProps extends FormFieldProps {
  rowsTextArea?: number;
}

export const FormFieldTextArea: React.FC<FormFieldTextAreaProps> = memo(
  ({
    control,
    description,
    label,
    name,
    placeholder,
    disabled: readOnly = false,
    className,
    rowsTextArea = 8,
    dataTestiId
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
                className={`${className} ${
                  readOnly ? 'resize-none' : ''
                } max-w-[85vw]`}
                rows={rowsTextArea}
                placeholder={placeholder}
                {...field}
                readOnly={readOnly}
                data-testid={dataTestiId}
                spellCheck={true}
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
