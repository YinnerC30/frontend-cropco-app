import { Form } from "@/components";
import { FormProps } from "@/modules/core/interfaces/form/FormProps";
import { useWorkDetailForm } from "../../hooks/useWorkDetailForm";
import { FormFieldCommand } from "@/modules/core/components/form/fields/FormFieldCommand";
import { formFieldsWorkDetails } from "../../utils/formFieldsWorkDetails";
import { FormFieldInput } from "@/modules/core/components/form/fields/FormFieldInput";
import { Employee } from "@/modules/employees/interfaces/Employee";
import { WorkDetail } from "../../interfaces/WorkDetail";
import { useEffect } from "react";

export const FormWorkDetail = ({
  defaultValues,
  onSubmit,
  readOnly = false,
}: FormProps) => {
  const {
    queryEmployees,
    formWorkDetail,
    details,
    openPopoverCommand,
    setOpenPopoverCommand,
  } = useWorkDetailForm();

  useEffect(() => {
    if (defaultValues) {
      formWorkDetail.reset({
        employee: defaultValues.employee,
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

  const onSubmitWorkDetail = (values: any) => {
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
          (item: WorkDetail) => item.employee.id === record.id
        );
        if (state && record.id !== defaultValues?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  return (
    <Form {...formWorkDetail}>
      <form
        onSubmit={formWorkDetail.handleSubmit(onSubmitWorkDetail)}
        className="mx-5"
        id="formWorkDetail"
      >
        <FormFieldCommand
          openPopover={openPopoverCommand}
          setOpenPopover={setOpenPopoverCommand}
          data={filterEmployeesToShow() || []}
          form={formWorkDetail}
          nameToShow={"first_name"}
          control={formWorkDetail.control}
          description={formFieldsWorkDetails.employee.description}
          label={formFieldsWorkDetails.employee.label}
          name={"employee.id"}
          placeholder={formFieldsWorkDetails.employee.placeholder}
          readOnly={readOnly}
        />

        <FormFieldInput
          control={formWorkDetail.control}
          description={formFieldsWorkDetails.value_pay.description}
          label={formFieldsWorkDetails.value_pay.label}
          name={"value_pay"}
          placeholder={formFieldsWorkDetails.value_pay.placeholder}
          readOnly={readOnly}
          type="number"
        />
      </form>
    </Form>
  );
};
