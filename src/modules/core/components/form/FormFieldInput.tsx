import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { FormFieldProps } from '../../interfaces/FormFieldProps';

interface FormFieldInputProps extends FormFieldProps {
  step?: number;
  min?: number;
  autoFocus?: boolean;
}

export const FormFieldInput = ({
  control,
  description,
  label,
  name,
  placeholder,
  readOnly = false,
  type = 'text',
  className = '',
  children,
  step = 0,
  min = 0,
  autoFocus = false,
}: FormFieldInputProps) => {
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
                className={`w-56 `}
                placeholder={placeholder}
                {...field}
                readOnly={readOnly}
                type={type}
                step={step}
                min={min}
                autoFocus={autoFocus}
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
};
