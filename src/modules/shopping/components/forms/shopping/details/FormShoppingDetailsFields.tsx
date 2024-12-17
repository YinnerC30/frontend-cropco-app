import { Form } from '@/components';
import { FormFieldCommand, FormFieldInput } from '@/modules/core/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { formFieldsShoppingDetail } from '@/modules/shopping/utils';

import { useEffect } from 'react';

export const FormShoppingDetailsFields = () => {
  const {
    formShoppingDetail,
    filterSuppliersToShow,
    shoppingDetail,
    querySuppliers,
    readOnly,
    querySupplies,
  } = useFormShoppingContext();

  useEffect(() => {
    formShoppingDetail.reset(shoppingDetail);
  }, [shoppingDetail]);

  return (
    <Form {...formShoppingDetail}>
      <form className="z-50 mx-5" id="formShoppingDetail">
        <FormFieldCommand
          data={querySuppliers?.data?.rows || []}
          form={formShoppingDetail}
          nameToShow={'first_name'}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supplier.description}
          label={formFieldsShoppingDetail.supplier.label}
          name={'supplier.id'}
          placeholder={formFieldsShoppingDetail.supplier.placeholder}
          readOnly={false}
          nameEntity="proveedor"
          isLoading={querySuppliers.isLoading}
          className="w-52"
        />
        <FormFieldCommand
          data={querySupplies?.data?.rows || []}
          form={formShoppingDetail}
          nameToShow={'name'}
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.supply.description}
          label={formFieldsShoppingDetail.supply.label}
          name={'supply.id'}
          placeholder={formFieldsShoppingDetail.supply.placeholder}
          readOnly={readOnly}
          isLoading={querySupplies.isLoading}
          nameEntity="cultivo"
          className="w-52"
        />

        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.amount.description}
          label={formFieldsShoppingDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsShoppingDetail.amount.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
        <FormFieldInput
          control={formShoppingDetail.control}
          description={formFieldsShoppingDetail.total.description}
          label={formFieldsShoppingDetail.total.label}
          name={'total'}
          placeholder={formFieldsShoppingDetail.total.placeholder}
          readOnly={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};