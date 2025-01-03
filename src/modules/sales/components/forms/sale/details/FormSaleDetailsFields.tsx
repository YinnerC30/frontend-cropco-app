import { Form } from '@/components';
import { useGetAllClients } from '@/modules/clients/hooks';
import {
  FormFieldCheckBox,
  FormFieldCommand,
  FormFieldInput,
} from '@/modules/core/components';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { formFieldsSaleDetail } from '@/modules/sales/utils';

import { useEffect } from 'react';

export const FormSaleDetailsFields: React.FC = () => {
  const {
    readOnly,
    saleDetail,
    formSaleDetail,
    queryCropsWithHarvest,
    cropStock,
    addCropStock,
  } = useFormSaleContext();

  const { query: queryClients } = useGetAllClients({
    queryValue: '',
    allRecords: true,
  });

  useEffect(() => {
    addCropStock({
      id: saleDetail.crop.id,
      name: saleDetail.crop?.name!,
      stock: saleDetail.quantity,
    });
    formSaleDetail.reset(saleDetail);
  }, [saleDetail]);

  return (
    <Form {...formSaleDetail}>
      <form className="z-50 mx-5" id="formSaleDetail">
        <FormFieldCommand
          data={queryClients?.data?.rows || []}
          form={formSaleDetail}
          nameToShow={'first_name'}
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.client.description}
          label={formFieldsSaleDetail.client.label}
          name={'client'}
          placeholder={formFieldsSaleDetail.client.placeholder}
          readOnly={false}
          nameEntity="cliente"
          isLoading={queryClients.isLoading}
          className="w-52"
        />
        <FormFieldCommand
          data={cropStock}
          form={formSaleDetail}
          nameToShow={'name'}
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.crop.description}
          label={formFieldsSaleDetail.crop.label}
          name={'crop'}
          placeholder={formFieldsSaleDetail.crop.placeholder}
          readOnly={readOnly}
          isLoading={queryCropsWithHarvest.isLoading}
          nameEntity="cultivo"
          className="w-52"
        />
        <FormFieldCheckBox
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.is_receivable.description}
          label={formFieldsSaleDetail.is_receivable.label}
          name={'is_receivable'}
          placeholder={formFieldsSaleDetail.is_receivable.placeholder}
          readOnly={false}
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.quantity.description}
          label={formFieldsSaleDetail.quantity.label}
          name={'quantity'}
          placeholder={formFieldsSaleDetail.quantity.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
        <FormFieldInput
          control={formSaleDetail.control}
          description={formFieldsSaleDetail.total.description}
          label={formFieldsSaleDetail.total.label}
          name={'total'}
          placeholder={formFieldsSaleDetail.total.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
