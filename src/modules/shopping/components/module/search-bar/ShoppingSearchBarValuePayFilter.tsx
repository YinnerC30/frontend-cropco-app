import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { formFieldsSearchBarShopping } from '../../../utils/formFieldsSearchBarShopping';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarShopping } from '../../../utils/formSchemaSearchBarShopping';
import { FormFieldSelect, FormFieldInput } from '@/modules/core/components';

interface ShoppingSearchBarValuePayFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarShopping>,
    unknown
  >;
  onAddFilter: (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => Promise<boolean>;
  onClearErrors: (
    name: keyof z.infer<typeof formSchemaSearchBarShopping>
  ) => void;
  disabled: boolean;
}

export const ShoppingSearchBarValuePayFilter: React.FC<
  ShoppingSearchBarValuePayFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, disabled }) => {
  return (
    <FilterDropdownItem
      label={'Total'}
      className="w-[200px] sm:w-[250px] md:w-[250px] lg:w-[285px]"
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={numberFilterOptions}
            {...formFieldsSearchBarShopping.type_filter_value_pay}
            control={formSearchBar.control}
            name="filter_by_value_pay.type_filter_value_pay"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarShopping.value_pay}
            control={formSearchBar.control}
            type="number"
            name="filter_by_value_pay.value_pay"
            step={50}
          />
        </>
      }
      actionOnSave={() => onAddFilter('filter_by_value_pay')}
      actionOnClose={() => onClearErrors('filter_by_value_pay')}
      dataTestId="filter-value-pay"
    />
  );
};
