import { FormField } from "@/components";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FormFieldProps } from "../../interfaces/FormFieldProps";

interface FormFieldDataTable extends FormFieldProps {
  children: any;
}

export const FormFieldDataTable = ({
  control,
  name,
  label,
  description,
  children,
}: FormFieldDataTable) => {
  return (
    <>
      <FormField
        control={control}
        name={name}
        render={() => {
          return (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <>{children}</>
              </FormControl>
              <FormDescription>{description}</FormDescription>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};
