import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllEmployees } from '@/modules/employees/hooks';
import { Employee } from '@/modules/employees/interfaces/Employee';
import { useHarvestForm } from '@/modules/harvests/hooks';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import { formSchemaHarvestDetail } from '@/modules/harvests/utils';
import {
  add,
  calculateTotal,
  reset,
} from '@/modules/harvests/utils/harvestSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';

export const FormHarvestContext = createContext<any>(null);

export const defaultValuesHarvestDetail: HarvestDetail = {
  employee: {
    id: '',
    first_name: '',
  },
  total: 0,
  value_pay: 0,
};

export const FormHarvestProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const formState = useHarvestForm({
    values: defaultValues,
  });

  const [harvestDetail, setHarvestDetail] = useState(
    defaultValuesHarvestDetail
  );

  const { form } = formState;

  const { details, total, value_pay } = useAppSelector(
    (state: any) => state.harvest
  );
  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
  };

  const dispatch: AppDispatch = useAppDispatch();

  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: harvestDetail,
  });

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

  const getCurrentDataHarvestDetail = () => {
    const values = formHarvestDetail.watch();
    console.log(values);
    const employeeIdForm = values?.employee?.id;
    const nameEmployee = findEmployeeName(employeeIdForm);
    const data = {
      ...values,
      employee: { id: employeeIdForm, first_name: nameEmployee },
    };
    return data;
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

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (defaultValues) {
      dispatch(add(defaultValues.details));
      dispatch(calculateTotal());
    }
  }, [defaultValues]);

  useEffect(() => {
    dispatch(calculateTotal());
  }, [details]);

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      total,
      value_pay,
    });
  }, [total, value_pay]);

  useEffect(() => {
    form.setValue('details', details);
  }, [details]);

  return (
    <FormHarvestContext.Provider
      value={{
        ...formState,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        details,
        total,
        value_pay,
        harvestDetail,
        setHarvestDetail,
        filterEmployeesToShow,
        getCurrentDataHarvestDetail,
        resetForm,
        formHarvestDetail,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
