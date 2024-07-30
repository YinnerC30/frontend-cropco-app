import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Textarea,
} from "@/components";
import { InputProps } from "../../interfaces/InputProps";

export const FormFieldTextArea = ({
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
            <Textarea
              className="resize-none w-96"
              rows={4}
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
