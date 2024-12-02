import React, { createContext } from 'react';

import { Employee } from '@/modules/employees/interfaces/Employee';
import {
  useFormHarvestContext,
  useHarvestDetailForm,
} from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { useGetAllEmployees } from '@/modules/employees/hooks';

export const FormHarvestDetailsContext = createContext<any>(null);

interface Props {
  onSubmit: (data: any) => void;
  children: React.ReactNode;
}

export const FormHarvestDetailsProvider = ({ onSubmit, children }: Props) => {
  const { harvestDetail } = useFormHarvestContext();

  const {
    formHarvestDetail,
    openPopoverEmployee,
    setOpenPopoverEmployee,
    details,
  } = useHarvestDetailForm({ values: harvestDetail });

  const { query: queryEmployees } = useGetAllEmployees({
    searchParameter: '',
    allRecords: true,
  });

  const findEmployeeName = (id: string): string => {
    return (
      queryEmployees?.data?.rows.find((item: Employee) => item.id === id)
        ?.first_name || ''
    );
  };

  const resetForm = () => {
    formHarvestDetail.reset({
      employee: { id: '', first_name: '' },
      total: 0,
      value_pay: 0,
    });
  };

  const onSubmitHarvestDetail = async () => {
    const values = formHarvestDetail.getValues();
    const employeeIdForm = values.employee.id;
    const nameEmployee = findEmployeeName(employeeIdForm);
    const data = {
      ...values,
      employee: { id: employeeIdForm, first_name: nameEmployee },
    };
    console.log(data);
    await onSubmit(data);
    resetForm();
  };

  const filterEmployeesToShow = (): Employee[] => {
    return (
      queryEmployees?.data?.rows.filter((record: Employee) => {
        const state = details.some(
          (item: HarvestDetail) => item.employee.id === record.id
        );
        if (state && record.id !== harvestDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  return (
    <FormHarvestDetailsContext.Provider
      value={{
        formHarvestDetail,
        openPopoverEmployee,
        setOpenPopoverEmployee,
        queryEmployees,
        details,
        findEmployeeName,
        onSubmitHarvestDetail,
        filterEmployeesToShow,
        resetForm,
      }}
    >
      {children}
    </FormHarvestDetailsContext.Provider>
  );
};
