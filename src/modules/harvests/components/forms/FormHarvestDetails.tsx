import { Form } from "@/components/ui/form";

import { ErrorLoading, Loading } from "@/modules/core/components";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces/FormProps";
import { Employee } from "@/modules/employees/interfaces/Employee";
import { useHarvestDetailForm } from "../../hooks/useHarvestDetailForm";
import { formFieldsHarvestDetail } from "../../utils";
import { useEffect } from "react";

export const FormHarvestDetails = ({
  onSubmit,
  readOnly = false,
  defaultValues,
}: FormProps) => {
  const {
    formHarvestDetail,
    openPopoverEmployee,
    setOpenPopoverEmployee,
    queryEmployees,
  } = useHarvestDetailForm();

  useEffect(() => {
    if (defaultValues) {
      console.log(defaultValues);
      formHarvestDetail.reset({
        employee: defaultValues.employee,
        total: defaultValues.total,
        value_pay: defaultValues.value_pay,
      });
    }
  }, []);

  const onSubmitHarvestDetail = (values: any) => {
    const employeeIdForm = values.employee.id;
    const nameEmployee = queryEmployees?.data?.rows.find(
      (item: Employee) => item.id === employeeIdForm
    )?.first_name;
    const data = {
      ...values,
      employee: { id: employeeIdForm, first_name: nameEmployee },
    };
    onSubmit(data);
  };

  if (queryEmployees.isLoading) return <Loading />;

  if (queryEmployees.isError) {
    return <ErrorLoading />;
  }

  console.log(formHarvestDetail.getValues());

  return (
    <Form {...formHarvestDetail}>
      <form
        onSubmit={formHarvestDetail.handleSubmit((formData: any) => {
          onSubmitHarvestDetail(formData);
          formHarvestDetail.reset();
        })}
        className="mx-5"
        id="formHarvestDetail"
      >
        <FormFieldCommand
          openPopover={openPopoverEmployee}
          setOpenPopover={setOpenPopoverEmployee}
          data={queryEmployees?.data?.rows || []}
          form={formHarvestDetail}
          nameToShow={"first_name"}
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.employee.description}
          label={formFieldsHarvestDetail.employee.label}
          name={"employee.id"}
          placeholder={formFieldsHarvestDetail.employee.placeholder}
          readOnly={readOnly}
        />

        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.total.description}
          label={formFieldsHarvestDetail.total.label}
          name={"total"}
          placeholder={formFieldsHarvestDetail.total.placeholder}
          readOnly={readOnly}
          type="number"
        />
        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.value_pay.description}
          label={formFieldsHarvestDetail.value_pay.label}
          name={"value_pay"}
          placeholder={formFieldsHarvestDetail.value_pay.placeholder}
          readOnly={readOnly}
          type="number"
        />
      </form>
    </Form>
  );
};
