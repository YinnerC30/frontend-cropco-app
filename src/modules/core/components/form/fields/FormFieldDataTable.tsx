import { FormField } from '@/components';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import React, { memo } from 'react';

interface FormFieldDataTable extends FormFieldProps {
  children: React.ReactNode;
}

export const FormFieldDataTable: React.FC<FormFieldDataTable> = memo(
  ({ control, name, label, description, children }) => {
    return (
      <>
        <FormField
          control={control}
          name={name}
          render={() => {
            return (
              <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                  <>{children}</>
                </FormControl>
                <FormDescription>{description}</FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
      </>
    );
  }
);
