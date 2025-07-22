import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
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
import { Separator } from '@/components';

export interface SelectElement {
  key: string;
  value: string;
  label: string;
}
interface SelectItemValues {
  groupName: string;
  elements: SelectElement[];
}

interface FormFieldSelectWithGroupsProps extends FormFieldProps {
  groups: SelectItemValues[];
  currentValue?: string;
  manualValidationValue?: boolean;
  isValueInArray?: boolean;
  manualOnChangeValue?: boolean;
  callBackOnChangeValue?: (
    field: ControllerRenderProps<any, string>,
    value: string
  ) => void;
}

export const FormFieldSelectWithGroups: React.FC<FormFieldSelectWithGroupsProps> =
  memo(
    ({
      control,
      name,
      label,
      placeholder,
      description,
      groups,
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
                  // open
                >
                  <SelectTrigger ref={field.ref} data-testid="btn-select-field">
                    {showSelectValue ? (
                      <SelectValue placeholder={placeholder} />
                    ) : (
                      <span>Selecciona</span>
                    )}
                  </SelectTrigger>

                  <SelectContent>
                    {groups.map((item: SelectItemValues) => (
                      <SelectGroup key={item.groupName}>
                        <SelectLabel>{item.groupName}</SelectLabel>
                        <Separator />
                        {item.elements.map((element) => (
                          <SelectItem key={element.key} value={element.value} data-value={element.value}>
                            {element.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
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
