import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllEmployees } from '@/modules/employees/hooks';
import { Employee } from '@/modules/employees/interfaces/Employee';

import { HarvestDetail } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import {
  formSchemaHarvest,
  formSchemaHarvestDetail,
} from '@/modules/harvests/utils';
import {
  add,
  calculateTotal,
  reset,
} from '@/modules/harvests/utils/harvestSlice';
import { AppDispatch, useAppDispatch, useAppSelector } from '@/redux/store';
import { useFormChange } from '@/modules/core/components';
import { useToastDiscardChanges } from '@/modules/core/hooks/useToastDiscardChanges';

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
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);

  const formHarvest = useCreateForm({
    schema: formSchemaHarvest,
    defaultValues,
  });

  const { setIsActiveDialog } = useDialogStatus();

  const { hasUnsavedChanges } = useFormChange();
  const { showToast } = useToastDiscardChanges();

  const [harvestDetail, setHarvestDetail] = useState(
    defaultValuesHarvestDetail
  );

  const resetHarvestDetail = () => {
    setHarvestDetail(defaultValuesHarvestDetail);
  };
  const [openDialog, setOpenDialog] = useState(false);

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
    formHarvestDetail.reset(defaultValuesHarvestDetail);
  };

  const handleOpenDialog = () => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormHarvestDetail = () => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormHarvestDetail,
      });
      return;
    }
    ClearFormHarvestDetail();
  };

  const getCurrentDataHarvestDetail = () => {
    const values = { ...formHarvestDetail.getValues() };
    const employeeIdForm = values?.employee?.id;
    const nameEmployee = findEmployeeName(employeeIdForm);
    const data = {
      total: +values.total,
      value_pay: +values.value_pay,
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
    formHarvest.setValue('total', total);
    formHarvest.setValue('value_pay', value_pay);
  }, [total, value_pay]);

  useEffect(() => {
    formHarvest.setValue('details', details);
  }, [details]);

  return (
    <FormHarvestContext.Provider
      value={{
        form: formHarvest,
        isOpenDialogForm,
        setIsOpenDialogForm,
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
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetHarvestDetail,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
