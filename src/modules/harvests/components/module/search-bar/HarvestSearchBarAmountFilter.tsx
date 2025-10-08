import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldInput, FormFieldSelect } from '@/modules/core/components';
import { numberFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UnitsType } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarHarvest } from '../../../utils/formSchemaSearchBarHarvest';
import { formFieldsSearchBarHarvest } from '../../../utils/formFieldsSearchBarHarvest';

interface HarvestSearchBarAmountFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarHarvest>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  disabled?: boolean;
}

export const HarvestSearchBarAmountFilter: React.FC<HarvestSearchBarAmountFilterProps> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  disabled = false,
}) => {
  return (
    <FilterDropdownItem
      label={'Cantidad'}
      actionOnSave={() => onAddFilter('filter_by_amount')}
      actionOnClose={() => onClearErrors('filter_by_amount')}
      dataTestId="filter-amount"
      content={
        <>
          <FormFieldSelect
            disabled={disabled}
            items={numberFilterOptions}
            {...formFieldsSearchBarHarvest.type_filter_amount}
            control={formSearchBar.control}
            name="filter_by_amount.type_filter_amount"
          />

          <FormFieldSelect
            items={UnitsType.MASS}
            control={formSearchBar.control}
            description={
              formFieldsSearchBarHarvest.type_unit_of_measure.description
            }
            label={formFieldsSearchBarHarvest.type_unit_of_measure.label}
            name={'filter_by_amount.type_unit_of_measure'}
            placeholder={
              formFieldsSearchBarHarvest.type_unit_of_measure.placeholder
            }
            disabled={disabled}
          />

          <FormFieldInput
            disabled={disabled}
            {...formFieldsSearchBarHarvest.amount}
            control={formSearchBar.control}
            type="number"
            name="filter_by_amount.amount"
          />
        </>
      }
    />
  );
};
