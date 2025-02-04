import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Checkbox,
} from '@/components';
import { FormFieldProps } from '../../../interfaces/form/FormFieldProps';
import { memo } from 'react';

export const FormFieldCheckBox: React.FC<FormFieldProps> = memo(
  ({ control, name, label, description, disabled: readOnly, className }) => {
    return (
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>

            <div
              className={`flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md ${className}`}
            >
              <FormControl>
                <Checkbox
                  disabled={readOnly}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <div className="space-y-1 leading-none ">
                <FormDescription className="py-1">
                  {description}
                </FormDescription>
              </div>
            </div>
          </FormItem>
        )}
      />
    );
  }
);
