import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { formFieldsSearchBarSale } from '@/modules/sales/utils';
import { UnitsType } from '@/modules/supplies/interfaces/UnitOfMeasure';
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

export const SaleSearchBarAmountFilter: React.FC<Props> = (props) => {
  const { formSearchBar, onAddFilter, onClearErrors, disabled } = props;

  return (
    <FilterDropdownItem
      label={'Cantidad'}
      actionOnSave={() => onAddFilter('filter_by_amount')}
      actionOnClose={() => onClearErrors('filter_by_amount')}
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={numberFilterOptions}
            {...formFieldsSearchBarSale.type_filter_amount}
            control={formSearchBar.control}
            name="filter_by_amount.type_filter_amount"
          />
          <FormFieldSelect
            disabled={disabled}
            items={UnitsType.MASS}
            {...formFieldsSearchBarSale.type_unit_of_measure}
            control={formSearchBar.control}
            name="filter_by_amount.type_unit_of_measure"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarSale.amount}
            control={formSearchBar.control}
            type="number"
            name="filter_by_amount.amount"
          />
        </>
      }
      dataTestId="filter-amount"
    />
  );
};
