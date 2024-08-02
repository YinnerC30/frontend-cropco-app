import { Button } from "@/components/ui/button";
import { Form } from "../../../components/ui/form";

import { ButtonsForm } from "@/modules/core/components/ButtonsForm";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSupplyForm } from "../hooks/useSupplyForm";
import { formFieldsSupply } from "../utils";
import { FormFieldSelect } from "@/modules/core/components/form/FormFieldSelect";
import { UnitOfMeasure } from "../interfaces/UnitOfMeasure";
import { FormFieldTextArea } from "@/modules/core/components/form/FormFieldTextArea";

export const FormSupply = ({
  onSubmit,
  readOnly = false,
  isPending = false,
  defaultValues,
}: FormProps) => {
  const { form } = useSupplyForm();
  const navigate = useNavigate();
  useEffect(() => {
    console.log(defaultValues);
    defaultValues && form.reset(defaultValues);
  }, []);

  console.log(form.getValues());

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="formSupply"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsSupply.name.description}
          label={formFieldsSupply.name.label}
          name={"name"}
          placeholder={formFieldsSupply.name.placeholder}
          readOnly={readOnly}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsSupply.brand.description}
          label={formFieldsSupply.brand.label}
          name={"brand"}
          placeholder={formFieldsSupply.brand.placeholder}
          readOnly={readOnly}
        />
        <FormFieldSelect
          items={[UnitOfMeasure.GRAMOS, UnitOfMeasure.MILILITROS]}
          control={form.control}
          description={formFieldsSupply.unit_of_measure.description}
          label={formFieldsSupply.unit_of_measure.label}
          name={"unit_of_measure"}
          placeholder={formFieldsSupply.unit_of_measure.placeholder}
          readOnly={readOnly}
        />
        <FormFieldTextArea
          control={form.control}
          description={formFieldsSupply.observation.description}
          label={formFieldsSupply.observation.label}
          name={"observation"}
          placeholder={formFieldsSupply.observation.placeholder}
          readOnly={readOnly}
        />
      </form>

      {!readOnly && (
        <ButtonsForm
          isPending={isPending}
          formId={"formSupply"}
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
