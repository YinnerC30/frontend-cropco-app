import { Form } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { formFieldsConsumptionDetail } from '@/modules/consumption/utils';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';

import { useGetAllCrops } from '@/modules/crops/hooks';
import { useGetAllSuppliesStock } from '@/modules/supplies/hooks';
import { useEffect } from 'react';

export const FormConsumptionDetailsFields: React.FC = () => {
  const { formConsumptionDetail, consumptionDetail, readOnly } =
    useFormConsumptionContext();

  const { query: queryCrops } = useGetAllCrops({
    allRecords: true,
    queryValue: '',
  });

  // FIX: Traer solo suministros con stock
  const { query: querySupplies } = useGetAllSuppliesStock({
    queryValue: '',
    allRecords: true,
  });

  useEffect(() => {
    formConsumptionDetail.reset(consumptionDetail);
  }, [consumptionDetail]);

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
          name={'crop'}
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
          name={'supply'}
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
