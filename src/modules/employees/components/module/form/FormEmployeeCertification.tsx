import { Form } from '@/components';
import { FormFieldCalendar, FormFieldInput } from '@/modules/core/components';
import { formFieldsEmployeeCertification } from '@/modules/employees/utils/formFieldsEmployeeCertification';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  formEmployeeCertification: UseFormReturn<any, any, undefined>;
  //   employee: Partial<Employee>;
}

export const FormEmployeeCertification = ({
  formEmployeeCertification: form,
}: //   employee,
Props) => {
  //   console.log({ employee });
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        id="formEmployeeCertification"
        className="flex flex-col gap-2 ml-1"
      >
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployeeCertification.company_name.description}
          label={formFieldsEmployeeCertification.company_name.label}
          name={'company_name'}
          placeholder={formFieldsEmployeeCertification.company_name.placeholder}
          disabled={false}
        />
        <FormFieldInput
          control={form.control}
          description={
            formFieldsEmployeeCertification.generator_name.description
          }
          label={formFieldsEmployeeCertification.generator_name.label}
          name={'generator_name'}
          placeholder={
            formFieldsEmployeeCertification.generator_name.placeholder
          }
          disabled={false}
        />
        <FormFieldInput
          control={form.control}
          description={
            formFieldsEmployeeCertification.generator_position.description
          }
          label={formFieldsEmployeeCertification.generator_position.label}
          name={'generator_position'}
          placeholder={
            formFieldsEmployeeCertification.generator_position.placeholder
          }
          disabled={false}
        />

        <FormFieldCalendar
          control={form.control}
          description={formFieldsEmployeeCertification.start_date.description}
          label={formFieldsEmployeeCertification.start_date.label}
          name={'start_date'}
          placeholder={formFieldsEmployeeCertification.start_date.placeholder}
          disabled={false}
          className="w-52"
        />

        <FormFieldInput
          control={form.control}
          description={
            formFieldsEmployeeCertification.employee_position.description
          }
          label={formFieldsEmployeeCertification.employee_position.label}
          name={'employee_position'}
          placeholder={
            formFieldsEmployeeCertification.employee_position.placeholder
          }
          disabled={false}
        />
        <FormFieldInput
          control={form.control}
          description={formFieldsEmployeeCertification.id_number.description}
          label={formFieldsEmployeeCertification.id_number.label}
          name={'id_number'}
          placeholder={formFieldsEmployeeCertification.id_number.placeholder}
          disabled={false}
        />
        <FormFieldInput
          control={form.control}
          description={
            formFieldsEmployeeCertification.weekly_working_hours.description
          }
          label={formFieldsEmployeeCertification.weekly_working_hours.label}
          name={'weekly_working_hours'}
          placeholder={
            formFieldsEmployeeCertification.weekly_working_hours.placeholder
          }
          disabled={false}
          type="number"
        />
      </form>
    </Form>
  );
};
