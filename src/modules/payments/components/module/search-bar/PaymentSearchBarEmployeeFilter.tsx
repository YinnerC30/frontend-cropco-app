import { FormFieldCommand } from '@/modules/core/components';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaSearchBarPayment } from '../../../utils/formSchemaSearchBarPayment';
import { formFieldsSearchBarPayment } from '../../../utils/formFieldsSearchBarPayment';

interface PaymentSearchBarEmployeeFilterProps {
  formSearchBar: UseFormReturn<
    z.infer<typeof formSchemaSearchBarPayment>,
    unknown
  >;
  onAddFilter: (name: string) => Promise<boolean>;
  onClearErrors: (name: string) => void;
  paramsQuery: any;
  queryEmployees: any;
  disabled?: boolean;
}

export const PaymentSearchBarEmployeeFilter: React.FC<
  PaymentSearchBarEmployeeFilterProps
> = ({
  formSearchBar,
  onAddFilter,
  onClearErrors,
  paramsQuery,
  queryEmployees,
  disabled = false,
}) => {
  return (
    <FormFieldCommand
      data={queryEmployees?.data?.records || []}
      form={formSearchBar}
      nameToShow="full_name"
      control={formSearchBar.control}
      name="employee"
      placeholder={formFieldsSearchBarPayment.employee.placeholder}
      className="w-auto lg:w-[300px]"
      description={''}
      label={''}
      disabled={disabled}
      actionFinal={() => onAddFilter('employee.id')}
      isLoading={queryEmployees.isLoading || queryEmployees.isFetching}
      reloadData={async () => {
        await queryEmployees.refetch();
      }}
      contentTooltip="Actualizar datos de empleados involucrados"
    />
  );
};
