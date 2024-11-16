import { Button } from "@/components/ui/button";
import { Form } from "../../../components/ui/form";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormFieldTextArea } from "@/modules/core/components/form/FormFieldTextArea";
import { FormProps } from "@/modules/core/interfaces/Form/FormProps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useClientForm } from "../hooks/useClientForm";
import { formFieldsClient } from "../utils";

export const FormClient = ({
  onSubmit,
  readOnly = false,
  isSubmitting: isPending = false,
  defaultValues,
}: FormProps) => {
  const { form } = useClientForm();
  const navigate = useNavigate();
  useEffect(() => {
    defaultValues && form.reset(defaultValues);
  }, []);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formClient"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.first_name.description}
          label={formFieldsClient.first_name.label}
          name={"first_name"}
          placeholder={formFieldsClient.first_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.last_name.description}
          label={formFieldsClient.last_name.label}
          name={"last_name"}
          placeholder={formFieldsClient.last_name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.email.description}
          label={formFieldsClient.email.label}
          name={"email"}
          placeholder={formFieldsClient.email.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsClient.cell_phone_number.description}
          label={formFieldsClient.cell_phone_number.label}
          name={"cell_phone_number"}
          placeholder={formFieldsClient.cell_phone_number.placeholder}
          readOnly={readOnly}
        />

        <FormFieldTextArea
          control={form.control}
          description={formFieldsClient.address.description}
          label={formFieldsClient.address.label}
          name={"address"}
          placeholder={formFieldsClient.address.placeholder}
          readOnly={readOnly}
        />
      </form>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending}
          formId={"formClient"}
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
