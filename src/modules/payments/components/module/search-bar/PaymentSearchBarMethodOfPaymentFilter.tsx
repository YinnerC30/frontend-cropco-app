import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldSelect } from '@/modules/core/components';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import {
  formSchemaSearchBarPayment,
  MethodOfPaymentSearchBar,
} from '../../../utils/formSchemaSearchBarPayment';
import { formFieldsSearchBarPayment } from '../../../utils/formFieldsSearchBarPayment';

interface PaymentSearchBarMethodOfPaymentFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarPayment>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  disabled?: boolean;
}

export const PaymentSearchBarMethodOfPaymentFilter: React.FC<
  PaymentSearchBarMethodOfPaymentFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, disabled = false }) => {
  return (
    <FilterDropdownItem
      label={'Método de pago'}
      actionOnSave={() => onAddFilter('filter_by_method_of_payment')}
      actionOnClose={() => onClearErrors('filter_by_method_of_payment')}
      dataTestId="filter-method-of-payment"
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={[
              {
                key: MethodOfPaymentSearchBar.EFECTIVO,
                value: MethodOfPaymentSearchBar.EFECTIVO,
                label: 'Efectivo',
              },
              {
                key: MethodOfPaymentSearchBar.INTERCAMBIO,
                value: MethodOfPaymentSearchBar.INTERCAMBIO,
                label: 'Intercambio',
              },
              {
                key: MethodOfPaymentSearchBar.TRANSFERENCIA,
                value: MethodOfPaymentSearchBar.TRANSFERENCIA,
                label: 'Transferencia',
              },
              {
                key: MethodOfPaymentSearchBar.NONE,
                value: MethodOfPaymentSearchBar.NONE,
                label: 'Ninguno',
              },
            ]}
            {...formFieldsSearchBarPayment.method_of_payment}
            control={formSearchBar.control}
            name="filter_by_method_of_payment.method_of_payment"
          />
        </>
      }
    />
  );
};
