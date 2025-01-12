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

interface FormFieldInputProps extends FormFieldProps {
  step?: number;
  min?: number;
  autoFocus?: boolean;
  hiddenInput?: boolean;
}

export const FormFieldInput: React.FC<FormFieldInputProps> = memo(
  ({
    control,
    description,
    label,
    name,
    placeholder,
    readOnly = false,
    type: typeInput = 'text',
    className = '',
    children,
    step = 0,
    min = 0,
    autoFocus = false,
    hiddenInput = false,
  }) => {
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
                  className={`w-60 ${hiddenInput && 'hidden'}`}
                  placeholder={placeholder}
                  {...field}
                  readOnly={readOnly}
                  type={typeInput}
                  step={step}
                  min={min}
                  autoFocus={autoFocus}
                  onChange={(e) => {
                    typeInput === 'number'
                      ? field.onChange(parseInt(e.target.value, 10))
                      : field.onChange(e.target.value);
                  }}
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
