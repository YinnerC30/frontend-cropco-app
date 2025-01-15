import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';

import { formFieldsHarvestDetail } from '@/modules/harvests/utils';
import { useCallback, useEffect } from 'react';

export const FormHarvestDetailsFields: React.FC = () => {
  const { formHarvestDetail, harvestDetail, queryEmployees, detailsHarvest } =
    useFormHarvestContext();

  const filterEmployeesToShow = useCallback((): Employee[] => {
    return (
      queryEmployees?.data?.rows.filter((record: Employee) => {
        const state = detailsHarvest.some(
          (item: HarvestDetail) => item.employee.id === record.id
        );
        if (state && record.id !== harvestDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  }, [queryEmployees.data, detailsHarvest]);

  useEffect(() => {
    formHarvestDetail.reset(harvestDetail);
  }, [harvestDetail]);

  return (
    <Form {...formHarvestDetail}>
      <form className="z-50 mx-5" id="formHarvestDetail">
        <FormFieldCommand
          data={
            filterEmployeesToShow() || []
          }
          form={formHarvestDetail}
          nameToShow={'first_name'}
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.employee.description}
          label={formFieldsHarvestDetail.employee.label}
          name={'employee'}
          placeholder={formFieldsHarvestDetail.employee.placeholder}
          readOnly={false}
          nameEntity="empleado"
          isLoading={queryEmployees.isLoading}
          className="w-52"
        />

        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.total.description}
          label={formFieldsHarvestDetail.total.label}
          name={'total'}
          placeholder={formFieldsHarvestDetail.total.placeholder}
          readOnly={false}
          type="number"
        />
        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.value_pay.description}
          label={formFieldsHarvestDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsHarvestDetail.value_pay.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
