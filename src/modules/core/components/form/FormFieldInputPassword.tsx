import {
  Button,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';
import { FormFieldProps } from '../../interfaces/Form/FormFieldProps';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { useState } from 'react';

interface FormFieldInputProps extends FormFieldProps {
  step?: number;
  min?: number;
  autoFocus?: boolean;
}

export const FormFieldInputPassword = ({
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
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <div className="flex gap-2">
            <FormControl>
              <Input
                className="w-56"
                {...field}
                type={showPassword ? 'text' : 'password'}
              />
            </FormControl>
            <Button onClick={togglePasswordVisibility}>
              {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
            </Button>
          </div>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
