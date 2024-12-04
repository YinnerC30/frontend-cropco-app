import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { useFormHarvestContext } from '@/modules/harvests/hooks';

import { formFieldsHarvestDetail } from '@/modules/harvests/utils';
import { useEffect } from 'react';

export const FormHarvestDetailsFields = () => {
  const { formHarvestDetail, filterEmployeesToShow, harvestDetail } =
    useFormHarvestContext();

  useEffect(() => {
    formHarvestDetail.reset(harvestDetail);
  }, [harvestDetail]);

  return (
    <Form {...formHarvestDetail}>
      <form className="z-50 mx-5" id="formHarvestDetail">
        <FormFieldCommand
          data={filterEmployeesToShow() || []}
          form={formHarvestDetail}
          nameToShow={'first_name'}
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.employee.description}
          label={formFieldsHarvestDetail.employee.label}
          name={'employee.id'}
          placeholder={formFieldsHarvestDetail.employee.placeholder}
          readOnly={false}
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