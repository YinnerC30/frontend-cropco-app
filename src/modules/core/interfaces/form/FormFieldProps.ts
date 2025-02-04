import { Control } from 'react-hook-form';

export interface FormFieldProps {
  control: Control<any>;
  description: string;
  label: string;
  name: string;
  placeholder: string;
  disabled: boolean;
  type?: 'number' | 'text' | 'password';
  value?: any;
  className?: string;
  children?: React.ReactNode;
}
