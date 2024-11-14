import { Button } from "@/components/ui/button";
import { Form } from "../../../components/ui/form";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/FormFieldTextArea";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployeeForm } from "../hooks/useEmployeeForm";
import { formFieldsEmployee } from "../utils";

export const FormEmployee = ({
  onSubmit,
  readOnly = false,
  isSubmitting: isPending = false,
  defaultValues,
}: FormProps) => {
  const { form } = useEmployeeForm();
  const navigate = useNavigate();
  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formEmployee"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.first_name.description}
          label={formFieldsEmployee.first_name.label}
          name={"first_name"}
          placeholder={formFieldsEmployee.first_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.last_name.description}
          label={formFieldsEmployee.last_name.label}
          name={"last_name"}
          placeholder={formFieldsEmployee.last_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.email.description}
          label={formFieldsEmployee.email.label}
          name={"email"}
          placeholder={formFieldsEmployee.email.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployee.cell_phone_number.description}
          label={formFieldsEmployee.cell_phone_number.label}
          name={"cell_phone_number"}
          placeholder={formFieldsEmployee.cell_phone_number.placeholder}
          readOnly={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsEmployee.address.description}
          label={formFieldsEmployee.address.label}
          name={"address"}
          placeholder={formFieldsEmployee.address.placeholder}
          readOnly={readOnly}
        />
      </form>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending}
          formId={"formEmployee"}
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
