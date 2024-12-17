import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { formFieldsConsumptionDetail } from '@/modules/consumption/utils';

import { useEffect } from 'react';

export const FormConsumptionDetailsFields = () => {
  const {
    formConsumptionDetail,
    consumptionDetail,
    queryCrops,
    readOnly,
    querySupplies,
  } = useFormConsumptionContext();

  useEffect(() => {
    formConsumptionDetail.reset(consumptionDetail);
  }, [consumptionDetail]);

  console.log(formConsumptionDetail.formState);
  console.log(consumptionDetail);

  return (
    <Form {...formConsumptionDetail}>
      <form className="z-50 mx-5" id="formConsumptionDetail">
        <FormFieldCommand
          data={queryCrops?.data?.rows || []}
          form={formConsumptionDetail}
          nameToShow={'name'}
          control={formConsumptionDetail.control}
          description={formFieldsConsumptionDetail.crop.description}
          label={formFieldsConsumptionDetail.crop.label}
          name={'crop.id'}
          placeholder={formFieldsConsumptionDetail.crop.placeholder}
          readOnly={false}
          nameEntity="cultivo"
          isLoading={queryCrops.isLoading}
          className="w-52"
        />
        <FormFieldCommand
          data={querySupplies?.data?.rows || []}
          form={formConsumptionDetail}
          nameToShow={'name'}
          control={formConsumptionDetail.control}
          description={formFieldsConsumptionDetail.supply.description}
          label={formFieldsConsumptionDetail.supply.label}
          name={'supply.id'}
          placeholder={formFieldsConsumptionDetail.supply.placeholder}
          readOnly={readOnly}
          isLoading={querySupplies.isLoading}
          nameEntity="suministro"
          className="w-52"
        />

        <FormFieldInput
          control={formConsumptionDetail.control}
          description={formFieldsConsumptionDetail.amount.description}
          label={formFieldsConsumptionDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsConsumptionDetail.amount.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
