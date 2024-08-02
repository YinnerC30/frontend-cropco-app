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

export const FormFieldInput = ({
  control,
  description,
  label,
  name,
  placeholder,
  readOnly = false,
  type = 'text',
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              className="w-56"
              placeholder={placeholder}
              {...field}
              readOnly={readOnly}
              type={type}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
