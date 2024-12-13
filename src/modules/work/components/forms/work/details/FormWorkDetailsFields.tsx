import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { formFieldsWorkDetail } from '@/modules/work/utils/formFieldsWorkDetails';

import { useEffect } from 'react';

export const FormWorkDetailsFields = () => {
  const { formWorkDetail, filterEmployeesToShow, workDetail, queryEmployees } =
    useFormWorkContext();

  useEffect(() => {
    formWorkDetail.reset(workDetail);
  }, [workDetail]);

  return (
    <Form {...formWorkDetail}>
      <form className="z-50 mx-5" id="formWorkDetail">
        <FormFieldCommand
          data={filterEmployeesToShow() || []}
          form={formWorkDetail}
          nameToShow={'first_name'}
          control={formWorkDetail.control}
          description={formFieldsWorkDetail.employee.description}
          label={formFieldsWorkDetail.employee.label}
          name={'employee.id'}
          placeholder={formFieldsWorkDetail.employee.placeholder}
          readOnly={false}
          nameEntity="empleado"
          isLoading={queryEmployees.isLoading}
          className="w-52"
        />

        <FormFieldInput
          control={formWorkDetail.control}
          description={formFieldsWorkDetail.value_pay.description}
          label={formFieldsWorkDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsWorkDetail.value_pay.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
