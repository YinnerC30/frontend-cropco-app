import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllEmployees } from '@/modules/employees/hooks';
import { Employee } from '@/modules/employees/interfaces/Employee';

import { useFormChange } from '@/modules/core/components';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { MODULE_HARVESTS_PATHS } from '@/modules/harvests/routes/pathRoutes';
import {
  formSchemaHarvest,
  formSchemaHarvestDetail,
} from '@/modules/harvests/utils';
import { toast } from 'sonner';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { ActionsTableHarvestDetail } from './details/ActionsTableHarvestDetail';
import { columnsHarvestDetail } from './details/ColumnsTableHarvestDetail';

export const FormHarvestContext = createContext<any>(null);

export const defaultValuesHarvestDetail: HarvestDetail = {
  employee: {
    id: '',
    first_name: '',
  },
  total: 10,
  value_pay: 1000,
};

const defaultValuesHarvest = {
  date: undefined,
  crop: { id: '', name: '' },
  observation: '',
  details: [],
  total: 0,
  value_pay: 0,
};

export const FormHarvestProvider = ({
  children,
  defaultValues = defaultValuesHarvest,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState<boolean>(false);
  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsHarvest, setDetailsHarvest] =
    useState<HarvestDetail[]>(detailsDefaultValues);

  const removeHarvestDetail = (harvestDetail: HarvestDetail): void => {
    setDetailsHarvest((details: any) =>
      details.filter((detail: HarvestDetail) => detail.id !== harvestDetail.id)
    );
  };

  const modifyHarvestDetail = (harvestDetail: HarvestDetail): void => {
    setDetailsHarvest((details = []) =>
      details.map((item: any) =>
        item.id !== harvestDetail.id ? item : harvestDetail
      )
    );
  };

  const resetHarvestDetails = (): void => {
    setDetailsHarvest([]);
  };

  const total = detailsHarvest.reduce(
    (total: number, detail: HarvestDetail) =>
      Number(total) + Number(detail.total),
    0
  );
  const value_pay = detailsHarvest.reduce(
    (total: number, detail: HarvestDetail) =>
      Number(total) + Number(detail.value_pay),
    0
  );

  const formHarvest = useCreateForm({
    schema: formSchemaHarvest,
    defaultValues,
  });

  const executeValidationFormHarvest = async (): Promise<boolean> => {
    return await formHarvest.trigger();
  };

  const columnsTable = useCreateColumnsTable<HarvestDetail>({
    columns: columnsHarvestDetail,
    actions: ActionsTableHarvestDetail,
    hiddenActions: readOnly,
  });

  const dataTableHarvestDetail = useDataTableGeneric<HarvestDetail>({
    columns: columnsTable,
    rows: detailsHarvest,
  });

  const { setIsActiveDialog } = useDialogStatus();
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [harvestDetail, setHarvestDetail] = useState<HarvestDetail>(
    defaultValuesHarvestDetail
  );

  const resetHarvestDetail = (): void => {
    setHarvestDetail(defaultValuesHarvestDetail);
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_HARVESTS_PATHS.ViewAll);
  };

  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: harvestDetail,
    validationMode: 'onChange',
  });

  const { query: queryEmployees } = useGetAllEmployees({
    queryValue: '',
    allRecords: true,
  });

  const resetForm = () => {
    formHarvestDetail.reset(defaultValuesHarvestDetail);
  };

  const handleOpenDialog = (): void => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormHarvestDetail = (): void => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
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

  const getCurrentDataHarvestDetail = (): HarvestDetail => {
    const values = { ...formHarvestDetail.getValues() };
    const employeeIdForm: string = values?.employee?.id;
    const nameEmployee: string = values?.employee?.first_name;
    const data: HarvestDetail = {
      total: +values.total,
      value_pay: +values.value_pay,
      employee: { id: employeeIdForm, first_name: nameEmployee },
    };
    return data;
  };

  const filterEmployeesToShow = (): Employee[] => {
    return (
      queryEmployees?.data?.rows.filter((record: Employee) => {
        const state = detailsHarvest.some(
          (item: HarvestDetail) => item.employee.id === record.id
        );
        if (state && record.id !== harvestDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  const handleDeleteBulkHarvestDetails = (): void => {
    const recordsIds = dataTableHarvestDetail
      .getIdsToRowsSelected()
      .map((el: any) => el.id);
    const currentValues = [...formHarvest.watch('details')];
    const result = currentValues.filter((element: HarvestDetail) => {
      if (!recordsIds.includes(element.id)) {
        return element;
      }
    });

    for (const record of dataTableHarvestDetail.getIdsToRowsSelected()) {
      removeHarvestDetail(record as HarvestDetail);
    }
    dataTableHarvestDetail.resetSelectionRows();
    formHarvest.setValue('details', result, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formHarvest.setValue('total', total, { shouldValidate: true });
    formHarvest.setValue('value_pay', value_pay, { shouldValidate: true });
  }, [total, value_pay]);

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
        ...dataTableHarvestDetail,
        handleDeleteBulkHarvestDetails,
        hasSelectedRecords: dataTableHarvestDetail.hasSelectedRecords,
        executeValidationFormHarvest,
        queryEmployees,
        detailsHarvest,
        setDetailsHarvest,
        removeHarvestDetail,
        modifyHarvestDetail,
        resetHarvestDetails,
        dataTableHarvestDetail,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
