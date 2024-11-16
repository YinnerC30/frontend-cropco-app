import { Button } from "@/components/ui/button";
import { Form } from "../../../components/ui/form";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/FormFieldTextArea";
import { FormProps } from "@/modules/core/interfaces/Form/FormProps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupplierForm } from "../hooks/useSupplierForm";
import { formFieldsSupplier } from "../utils/formFieldsSupplier";

export const FormSupplier = ({
  onSubmit,
  readOnly = false,
  isSubmitting: isPending = false,
  defaultValues,
}: FormProps) => {
  const { form } = useSupplierForm();
  const navigate = useNavigate();
  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSupplier"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.first_name.description}
          label={formFieldsSupplier.first_name.label}
          name={"first_name"}
          placeholder={formFieldsSupplier.first_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.last_name.description}
          label={formFieldsSupplier.last_name.label}
          name={"last_name"}
          placeholder={formFieldsSupplier.last_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.email.description}
          label={formFieldsSupplier.email.label}
          name={"email"}
          placeholder={formFieldsSupplier.email.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.cell_phone_number.description}
          label={formFieldsSupplier.cell_phone_number.label}
          name={"cell_phone_number"}
          placeholder={formFieldsSupplier.cell_phone_number.placeholder}
          readOnly={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsSupplier.address.description}
          label={formFieldsSupplier.address.label}
          name={"address"}
          placeholder={formFieldsSupplier.address.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupplier.company_name.description}
          label={formFieldsSupplier.company_name.label}
          name={"company_name"}
          placeholder={formFieldsSupplier.company_name.placeholder}
          readOnly={readOnly}
        />
      </form>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending}
          formId={"formSupplier"}
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
