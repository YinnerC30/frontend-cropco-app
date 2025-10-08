import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarHarvest } from '../../../utils/formSchemaSearchBarHarvest';
import { formFieldsSearchBarHarvest } from '../../../utils/formFieldsSearchBarHarvest';

interface HarvestSearchBarValuePayFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  disabled?: boolean;
}

export const HarvestSearchBarValuePayFilter: React.FC<HarvestSearchBarValuePayFilterProps> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  disabled = false,
}) => {
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
            {...formFieldsSearchBarHarvest.type_filter_value_pay}
            control={formSearchBar.control}
            name="filter_by_value_pay.type_filter_value_pay"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarHarvest.value_pay}
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
