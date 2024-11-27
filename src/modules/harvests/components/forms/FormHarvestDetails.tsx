import { Form } from "@/components/ui/form";

import { ErrorLoading, Loading } from "@/modules/core/components";
import { FormFieldCommand } from "@/modules/core/components/form/FormFieldCommand";
import { FormFieldInput } from "@/modules/core/components/form/FormFieldInput";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { Employee } from "@/modules/employees/interfaces/Employee";
import { useHarvestDetailForm } from "../../hooks/useHarvestDetailForm";
import { formFieldsHarvestDetail } from "../../utils";
import { useEffect } from "react";
import { HarvestDetail } from "../../interfaces/HarvestDetail";

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
    details,
  } = useHarvestDetailForm();

  useEffect(() => {
    if (defaultValues) {
      formHarvestDetail.reset({
        employee: defaultValues.employee,
        total: defaultValues.total,
        value_pay: defaultValues.value_pay,
      });
    }
  }, []);

  const findEmployeeName = (id: string): string => {
    return (
      queryEmployees?.data?.rows.find((item: Employee) => item.id === id)
        ?.first_name || ""
    );
  };

  const onSubmitHarvestDetail = (values: any) => {
    const employeeIdForm = values.employee.id;
    const nameEmployee = findEmployeeName(employeeIdForm);
    const data = {
      ...values,
      employee: { id: employeeIdForm, first_name: nameEmployee },
    };
    onSubmit(data);
  };

  const filterEmployeesToShow = (): Employee[] => {
    return (
      queryEmployees?.data?.rows.filter((record: Employee) => {
        const state = details.some(
          (item: HarvestDetail) => item.employee.id === record.id
        );
        if (state && record.id !== defaultValues?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  if (queryEmployees.isLoading) {
    return <Loading />;
  }

  if (queryEmployees.isError) {
    return <ErrorLoading />;
  }

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
          data={filterEmployeesToShow() || []}
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
          step={50}
        />
      </form>
    </Form>
  );
};
