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
import { ControllerRenderProps } from 'react-hook-form';

interface SelectItemValues {
  key: string;
  value: string;
  label: string;
}

interface FormFieldSelectProps extends FormFieldProps {
  items: SelectItemValues[];
  currentValue?: string;
  manualValidationValue?: boolean;
  isValueInArray?: boolean;
  manualOnChangeValue?: boolean;
  callBackOnChangeValue?: (
    field: ControllerRenderProps<any, string>,
    value: string
  ) => void;
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
    isValueInArray = false,
    manualValidationValue = false,
    manualOnChangeValue = false,
    callBackOnChangeValue = (
      field: ControllerRenderProps<any, string>,
      value: string
    ) => {},
  }) => {
    const [showSelectValue, setShowSelectValue] = useState(true);

    const handleOnChangeValue = (
      field: ControllerRenderProps<any, string>,
      value: string
    ) => {
      if (!manualOnChangeValue) {
        field.onChange(value);
        return;
      }
      callBackOnChangeValue(field, value);
    };

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
                  handleOnChangeValue(field, value);
                }}
                defaultValue={isValueInArray ? field.value[0] : field.value}
                value={isValueInArray ? field.value[0] : field.value || ''}
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
