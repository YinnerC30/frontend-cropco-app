import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { formFieldsSearchBarSale } from '@/modules/sales/utils';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarSale } from '@/modules/sales/utils';

interface Props {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarSale>,
    unknown
  >;
  onAddFilter: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => Promise<boolean>;
  onClearErrors: (
    filterName: keyof z.infer<typeof formSchemaSearchBarSale>
  ) => void;
  disabled: boolean;
}

export const SaleSearchBarValuePayFilter: React.FC<Props> = (props) => {
  const { formSearchBar, onAddFilter, onClearErrors, disabled } = props;

  return (
    <FilterDropdownItem
      label={'Valor a pagar'}
      actionOnSave={() => onAddFilter('filter_by_value_pay')}
      actionOnClose={() => onClearErrors('filter_by_value_pay')}
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={numberFilterOptions}
            {...formFieldsSearchBarSale.type_filter_value_pay}
            control={formSearchBar.control}
            name="filter_by_value_pay.type_filter_value_pay"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarSale.value_pay}
            control={formSearchBar.control}
            type="number"
            name="filter_by_value_pay.value_pay"
            step={50}
          />
        </>
      }
      dataTestId="filter-value-pay"
    />
  );
};
