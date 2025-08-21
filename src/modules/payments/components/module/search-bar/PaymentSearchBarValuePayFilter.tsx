import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarPayment } from '../../../utils/formSchemaSearchBarPayment';
import { formFieldsSearchBarPayment } from '../../../utils/formFieldsSearchBarPayment';

interface PaymentSearchBarValuePayFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarPayment>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  disabled?: boolean;
}

export const PaymentSearchBarValuePayFilter: React.FC<
  PaymentSearchBarValuePayFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, disabled = false }) => {
  return (
    <FilterDropdownItem
      label={'Valor a pagar'}
      actionOnSave={() => onAddFilter('filter_by_value_pay')}
      actionOnClose={() => onClearErrors('filter_by_value_pay')}
      dataTestId="filter-value-pay"
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={numberFilterOptions}
            {...formFieldsSearchBarPayment.type_filter_value_pay}
            control={formSearchBar.control}
            name="filter_by_value_pay.type_filter_value_pay"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarPayment.value_pay}
            control={formSearchBar.control}
            type="number"
            name="filter_by_value_pay.value_pay"
            step={50}
          />
        </>
      }
    />
  );
};
