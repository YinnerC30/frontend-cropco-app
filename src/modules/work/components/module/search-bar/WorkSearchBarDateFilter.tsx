import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldCalendar, FormFieldSelect } from '@/modules/core/components';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarWork } from '../../../utils/formSchemaSearchBarWork';
import { formFieldsSearchBarWork } from '../../../utils/formFieldsSearchBarWork';
import { ParamQueryWork } from '../WorkModuleContext';

interface WorkSearchBarDateFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarWork>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  paramsQuery: ParamQueryWork;
  disabled?: boolean;
}

export const WorkSearchBarDateFilter: React.FC<
  WorkSearchBarDateFilterProps
> = ({ formSearchBar, onAddFilter, onClearErrors, disabled = false }) => {
  return (
    <FilterDropdownItem
      label={'Fecha'}
      actionOnSave={() => onAddFilter('filter_by_date')}
      actionOnClose={() => onClearErrors('filter_by_date')}
      dataTestId="filter-date"
      content={
        <>
          <FormFieldSelect
            items={dateFilterOptions}
            disabled={disabled}
            {...formFieldsSearchBarWork.type_filter_date}
            name="filter_by_date.type_filter_date"
            control={formSearchBar.control}
          />
          <FormFieldCalendar
            disabled={disabled}
            {...formFieldsSearchBarWork.date}
            control={formSearchBar.control}
            name="filter_by_date.date"
          />
        </>
      }
    />
  );
};
