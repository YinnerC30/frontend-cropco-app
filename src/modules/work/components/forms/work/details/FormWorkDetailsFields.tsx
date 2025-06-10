import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { formFieldsWorkDetail } from '@/modules/work/utils/formFieldsWorkDetails';

import { useCallback, useEffect } from 'react';

export const FormWorkDetailsFields: React.FC = () => {
  const { formWorkDetail, workDetail, queryEmployees, detailsWork } =
    useFormWorkContext();

  const filterEmployeesToShow = useCallback((): Employee[] => {
    return (
      queryEmployees?.data?.records.filter((record: Employee) => {
        const state = detailsWork.some(
          (item: WorkDetail) => item.employee.id === record.id
        );
        if (state && record.id !== workDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  }, [detailsWork, queryEmployees.data]);

  useEffect(() => {
    formWorkDetail.reset(workDetail);
  }, [workDetail]);

  return (
    <Form {...formWorkDetail}>
      <form className="z-50 mx-5" id="formWorkDetail">
        <FormFieldCommand
          data={filterEmployeesToShow() || []}
          form={formWorkDetail}
          nameToShow={'full_name'}
          control={formWorkDetail.control}
          description={formFieldsWorkDetail.employee.description}
          label={formFieldsWorkDetail.employee.label}
          name={'employee'}
          placeholder={formFieldsWorkDetail.employee.placeholder}
          disabled={false}
          nameEntity="empleado"
          isLoading={queryEmployees.isLoading || queryEmployees.isFetching}
          className="w-52"
          reloadData={async () => {
            await queryEmployees.refetch();
          }}
        />

        <FormFieldInput
          control={formWorkDetail.control}
          description={formFieldsWorkDetail.value_pay.description}
          label={formFieldsWorkDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsWorkDetail.value_pay.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
