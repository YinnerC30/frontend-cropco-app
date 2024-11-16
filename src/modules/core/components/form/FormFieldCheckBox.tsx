import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  Checkbox,
} from "@/components";
import { FormFieldProps } from "../../interfaces/Form/FormFieldProps";

export const FormFieldCheckBox = ({
  control,
  name,
  label,
  description,
  readOnly,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>

          <div className="flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md w-[280px]">
            <FormControl>
              <Checkbox
                disabled={readOnly}
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>

            <div className="space-y-1 leading-none ">
              <FormDescription className="py-1">{description}</FormDescription>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
};
