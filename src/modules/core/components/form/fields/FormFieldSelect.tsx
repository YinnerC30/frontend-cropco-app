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

import React, { memo, useEffect, useState } from 'react';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';

interface SelectItemValues {
  key: string;
  value: string;
  label: string;
}

interface FormFieldSelectProps extends FormFieldProps {
  items: SelectItemValues[];
  currentValue?: string;
  manualValidationValue?: boolean;
}

export const FormFieldSelect: React.FC<FormFieldSelectProps> = memo(
  ({
    control,
    name,
    label,
    placeholder,
    description,
    items,
    disabled: readOnly = false,
    className = '',
    currentValue = undefined,
    manualValidationValue = false,
  }) => {
    const [showSelectValue, setShowSelectValue] = useState(true);

    useEffect(() => {
      if (!currentValue && manualValidationValue) {
        setShowSelectValue(false);
      }
      return () => {
        setShowSelectValue(true);
      };
    }, [currentValue]);

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className + 'ml-1'}>
            <FormLabel>{label}</FormLabel>
            <div className="w-48 ">
              <Select
                onValueChange={(value: any) => {
                  field.onChange(value);
                }}
                defaultValue={field.value}
                value={!!field.value ? field.value : ''}
                disabled={readOnly}
              >
                <SelectTrigger ref={field.ref}>
                  {showSelectValue ? (
                    <SelectValue placeholder={placeholder} />
                  ) : (
                    <span>Selecciona</span>
                  )}
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
  }
);
