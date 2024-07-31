import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { InputProps } from "../../interfaces/InputProps";

export const FormFieldInput = ({
  control,
  description,
  label,
  name,
  placeholder,
  readOnly = false,
}: InputProps) => {
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
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};