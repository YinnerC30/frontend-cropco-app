import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { memo } from 'react';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { ControllerRenderProps } from 'react-hook-form';

interface FormFieldInputProps extends FormFieldProps {
  step?: number;
  min?: number;
  autoFocus?: boolean;
  hiddenInput?: boolean;
  allowDecimals?: boolean;
}

export const FormFieldInput: React.FC<FormFieldInputProps> = memo(
  ({
    control,
    description,
    label,
    name,
    placeholder,
    disabled: readOnly = false,
    type: typeInput = 'text',
    className = '',
    children,
    step = 0,
    min = 0,
    autoFocus = false,
    hiddenInput = false,
    allowDecimals = false,
  }) => {
    const handleOnChageInput = (
      e: any,
      field: ControllerRenderProps<any, string>
    ) => {
      if (typeInput === 'number') {
        const value = allowDecimals
          ? parseFloat(e.target.value)
          : parseInt(e.target.value, 10);
        field.onChange(value);
      } else {
        field.onChange(e.target.value);
      }
    };

    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className={className}>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <div className="flex gap-4">
                <Input
                  className={`w-60 ${
                    hiddenInput && 'hidden'
                  } overflow-hidden text-ellipsis`}
                  placeholder={placeholder}
                  {...field}
                  readOnly={readOnly}
                  type={typeInput}
                  step={allowDecimals ? 'any' : step}
                  min={min}
                  autoFocus={autoFocus}
                  onChange={(e) => handleOnChageInput(e, field)}
                />
                {children}
              </div>
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
