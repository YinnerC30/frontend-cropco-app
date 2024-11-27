import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
} from "@/components";
import { Switch } from "@/components/ui/switch";
import { FormFieldProps } from "../../interfaces/form/FormFieldProps";

export const FormFieldSwitch = ({
  control,
  name,
  label,
  description,
}: FormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row justify-between w-72">
          <div className="space-y-0.5">
            <FormLabel>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <FormControl>
            <Switch
              checked={field.value}
              onCheckedChange={field.onChange}
              aria-readonly
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};
