import { Button, Input } from "@/components";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { useUserForm } from "../hooks/useUserForm";
import { formFields } from "../utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onSubmit: any;
  isPending: boolean;
  defaultValues?: any;
  readOnly?: boolean;
}
export const FormUser = ({
  onSubmit,
  isPending,
  defaultValues,
  readOnly = false,
}: Props) => {
  const { showPassword, togglePasswordVisibility, form } = useUserForm();
  const navigate = useNavigate();

  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formUser"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFields.first_name.description}
          label={formFields.first_name.label}
          name={"first_name"}
          placeholder={formFields.first_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFields.last_name.description}
          label={formFields.last_name.label}
          name={"last_name"}
          placeholder={formFields.last_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFields.email.description}
          label={formFields.email.label}
          name={"email"}
          placeholder={formFields.email.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFields.cell_phone_number.description}
          label={formFields.cell_phone_number.label}
          name={"cell_phone_number"}
          placeholder={formFields.cell_phone_number.placeholder}
          readOnly={readOnly}
        />

        {!readOnly && (
          <>
            <FormField
              control={form.control}
              name={`password.password1`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.password1.label}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        readOnly={readOnly}
                      />
                    </FormControl>
                    <Button onClick={(e) => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {formFields.password1.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`password.password2`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.password2.label}</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input
                        className="w-56"
                        {...field}
                        type={showPassword ? "text" : "password"}
                        readOnly={readOnly}
                      />
                    </FormControl>
                    <Button onClick={(e) => togglePasswordVisibility(e)}>
                      {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                    </Button>
                  </div>
                  <FormDescription>
                    {formFields.password2.description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </form>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending}
          formId={"formUser"}
          className={"flex w-48 gap-2 mt-2"}
        />
      )}

      {readOnly && (
        <Button className="my-2" onClick={() => navigate(-1)}>
          Volver
        </Button>
      )}
    </Form>
  );
};
