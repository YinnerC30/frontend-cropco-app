import { Form } from '@/components';
import {
  FormFieldCommand,
  FormFieldInput,
  FormFieldSelect,
} from '@/modules/core/components';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';

import { formFieldsHarvestDetail } from '@/modules/harvests/utils';
import {
  MassUnitOfMeasure,
  UnitsType
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useCallback, useEffect } from 'react';

export const FormHarvestDetailsFields: React.FC = () => {
  const { formHarvestDetail, harvestDetail, queryEmployees, detailsHarvest } =
    useFormHarvestContext();

  const filterEmployeesToShow = useCallback((): Employee[] => {
    return (
      queryEmployees?.data?.records.filter((record: Employee) => {
        const state = detailsHarvest.some(
          (item: HarvestDetail) => item.employee.id === record.id
        );
        if (state && record.id !== harvestDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  }, [queryEmployees.data, detailsHarvest]);

  useEffect(() => {
    formHarvestDetail.reset(harvestDetail);
  }, [harvestDetail]);

  return (
    <Form {...formHarvestDetail}>
      <form className="z-50 mx-5" id="formHarvestDetail">
        <FormFieldCommand
          data={filterEmployeesToShow() || []}
          form={formHarvestDetail}
          nameToShow={'full_name'}
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.employee.description}
          label={formFieldsHarvestDetail.employee.label}
          name={'employee'}
          placeholder={formFieldsHarvestDetail.employee.placeholder}
          disabled={false}
          nameEntity="empleado"
          isLoading={queryEmployees.isLoading || queryEmployees.isRefetching}
          className="w-52"
          reloadData={async() => {
            await queryEmployees.refetch()
          }}
        />

        <FormFieldSelect
          items={UnitsType[MassUnitOfMeasure.GRAMOS]}
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.unit_of_measure.description}
          label={formFieldsHarvestDetail.unit_of_measure.label}
          name={'unit_of_measure'}
          placeholder={formFieldsHarvestDetail.unit_of_measure.placeholder}
          disabled={false}
          // currentValue={currentUnitType}
          // manualValidationValue
        />

        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.amount.description}
          label={formFieldsHarvestDetail.amount.label}
          name={'amount'}
          placeholder={formFieldsHarvestDetail.amount.placeholder}
          disabled={false}
          type="number"
          allowDecimals
        />
        <FormFieldInput
          control={formHarvestDetail.control}
          description={formFieldsHarvestDetail.value_pay.description}
          label={formFieldsHarvestDetail.value_pay.label}
          name={'value_pay'}
          placeholder={formFieldsHarvestDetail.value_pay.placeholder}
          disabled={false}
          type="number"
          step={50}
        />
      </form>
    </Form>
  );
};
