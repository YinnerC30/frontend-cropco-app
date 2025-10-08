import { FilterDropdownItem } from '@/modules/core/components/search-bar/FilterDropdownItem';
import { FormFieldCalendar, FormFieldSelect } from '@/modules/core/components';
import { dateFilterOptions } from '@/modules/core/interfaces/queries/FilterOptions';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarPayment } from '../../../utils/formSchemaSearchBarPayment';
import { formFieldsSearchBarPayment } from '../../../utils/formFieldsSearchBarPayment';

interface PaymentSearchBarDateFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarPayment>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  paramsQuery: any;
  disabled?: boolean;
}

export const PaymentSearchBarDateFilter: React.FC<
  PaymentSearchBarDateFilterProps
> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  paramsQuery,
  disabled = false,
}) => {
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
            {...formFieldsSearchBarPayment.type_filter_date}
            name="filter_by_date.type_filter_date"
            control={formSearchBar.control}
          />
          <FormFieldCalendar
            disabled={disabled}
            {...formFieldsSearchBarPayment.date}
            control={formSearchBar.control}
            name="filter_by_date.date"
          />
        </>
      }
    />
  );
};
