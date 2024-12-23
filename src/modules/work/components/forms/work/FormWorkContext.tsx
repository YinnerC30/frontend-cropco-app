import React, { createContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/auth/hooks';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllEmployees } from '@/modules/employees/hooks';
import { Employee } from '@/modules/employees/interfaces/Employee';

import { useFormChange } from '@/modules/core/components';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { ActionsTableWorkDetail } from './details/ActionsTableWorkDetail';
import { columnsWorkDetail } from './details/ColumnsTableWorkDetail';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { formSchemaWork } from '@/modules/work/utils/formSchemaWork';
import { MODULE_WORKS_PATHS } from '@/modules/work/routes/pathRoutes';
import { formSchemaWorkDetails } from '@/modules/work/utils/formSchemaWorkDetails';

export const FormWorkContext = createContext<any>(null);

export const defaultValuesWorkDetail: WorkDetail = {
  employee: {
    id: '',
    first_name: '',
  },
  value_pay: 1000,
  payment_is_pending: true,
};

export const FormWorkProvider = ({
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  readOnly,
}: any & { children: React.ReactNode }) => {
  const [isOpenDialogForm, setIsOpenDialogForm] = useState(false);
  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsWork, setDetailsWork] = useState(detailsDefaultValues);

  const removeWorkDetail = (workDetail: WorkDetail) => {
    setDetailsWork((details: any) =>
      details.filter((detail: WorkDetail) => detail.id !== workDetail.id)
    );
  };

  const modifyWorkDetail = (workDetail: WorkDetail) => {
    setDetailsWork((details = []) =>
      details.map((item: any) =>
        item.id !== workDetail.id ? item : workDetail
      )
    );
  };

  const resetWorkDetails = () => {
    setDetailsWork([]);
  };

  const total = detailsWork.reduce(
    (total: number, detail: WorkDetail) =>
      Number(total) + Number(detail.value_pay),
    0
  );

  const formWork = useCreateForm({
    schema: formSchemaWork,
    defaultValues,
  });

  const executeValidationFormWork = async () => {
    return await formWork.trigger();
  };

  const columnsTable = useCreateColumnsTable({
    columns: columnsWorkDetail,
    actions: ActionsTableWorkDetail,
    hiddenActions: readOnly,
  });

  const dataTableWorkDetail = useDataTableGeneric({
    columns: columnsTable,
    data: detailsWork,
  });

  const { getIdsToRowsSelected, resetSelectionRows, hasSelectedRecords } =
    dataTableWorkDetail;

  const { setIsActiveDialog } = useDialogStatus();
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [workDetail, setWorkDetail] = useState(defaultValuesWorkDetail);

  const resetWorkDetail = () => {
    setWorkDetail(defaultValuesWorkDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const { hasPermission } = useAuthContext();

  const handleReturnToModule = () => {
    navigate(MODULE_WORKS_PATHS.ViewAll);
  };

  const formWorkDetail = useCreateForm({
    schema: formSchemaWorkDetails,
    defaultValues: workDetail,
    validationMode: 'onChange',
  });

  const { query: queryEmployees } = useGetAllEmployees({
    queryValue: '',
    allRecords: true,
  });

  const findEmployeeName = (id: string): string => {
    return (
      queryEmployees?.data?.rows.find((item: Employee) => item.id === id)
        ?.first_name || ''
    );
  };

  const resetForm = () => {
    formWorkDetail.reset(defaultValuesWorkDetail);
  };

  const handleOpenDialog = () => {
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  const ClearFormWorkDetail = () => {
    resetForm();
    setIsActiveDialog(false);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormWorkDetail,
      });
      return;
    }
    ClearFormWorkDetail();
  };

  const getCurrentDataWorkDetail = () => {
    const values = { ...formWorkDetail.getValues() };
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
        const state = detailsWork.some(
          (item: WorkDetail) => item.employee.id === record.id
        );
        if (state && record.id !== workDetail?.employee?.id) {
          return;
        }
        return record;
      }) || []
    );
  };

  const handleDeleteBulkWorkDetails = () => {
    const recordsIds = getIdsToRowsSelected().map((el: any) => el.id);
    const currentValues = [...formWork.watch('details')];
    const result = currentValues.filter((element: any) => {
      if (!recordsIds.includes(element.id)) {
        return element;
      }
    });

    for (const record of getIdsToRowsSelected()) {
      removeWorkDetail(record as WorkDetail);
    }
    resetSelectionRows();
    formWork.setValue('details', result, {
      shouldValidate: true,
      shouldDirty: true,
    });
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formWork.setValue('total', total, { shouldValidate: true });
  }, [total]);

  return (
    <FormWorkContext.Provider
      value={{
        form: formWork,
        isOpenDialogForm,
        setIsOpenDialogForm,
        isSubmitting,
        onSubmit,
        readOnly,
        handleReturnToModule,
        hasPermission,
        total,
        workDetail,
        setWorkDetail,
        filterEmployeesToShow,
        getCurrentDataWorkDetail,
        resetForm,
        formWorkDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetWorkDetail,
        ...dataTableWorkDetail,
        handleDeleteBulkWorkDetails,
        hasSelectedRecords,
        executeValidationFormWork,
        queryEmployees,
        detailsWork,
        setDetailsWork,
        removeWorkDetail,
        modifyWorkDetail,
        resetWorkDetails,
      }}
    >
      {children}
    </FormWorkContext.Provider>
  );
};
