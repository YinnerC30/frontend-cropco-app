import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarWork } from '../../../utils/formSchemaSearchBarWork';
import { formFieldsSearchBarWork } from '../../../utils/formFieldsSearchBarWork';

interface WorkSearchBarValuePayFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarWork>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  disabled?: boolean;
}

export const WorkSearchBarValuePayFilter: React.FC<
  WorkSearchBarValuePayFilterProps
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
            {...formFieldsSearchBarWork.type_filter_value_pay}
            control={formSearchBar.control}
            name="filter_by_value_pay.type_filter_value_pay"
          />
          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarWork.value_pay}
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
