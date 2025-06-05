import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from 'react';

import { useAuthContext } from '@/auth/hooks';
import { useCreateForm } from '@/modules/core/hooks';
import { useGetAllEmployees } from '@/modules/employees/hooks';
import { Employee } from '@/modules/employees/interfaces/Employee';

import { useFormChange } from '@/modules/core/components';
import {
  DataTableGenericReturn,
  useDataTableGeneric,
} from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { CheckboxTableCustom } from '@/modules/core/components/table/CheckboxTableCustom';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { FormProps, ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { Work } from '@/modules/work/interfaces/Work';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { formSchemaWork } from '@/modules/work/utils/formSchemaWork';
import { formSchemaWorkDetails } from '@/modules/work/utils/formSchemaWorkDetails';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { ActionsTableWorkDetail } from './details/ActionsTableWorkDetail';
import { columnsWorkDetail } from './details/ColumnsTableWorkDetail';

export const defaultValuesWorkDetail: WorkDetail = {
  id: undefined,
  employee: {
    id: '',
    first_name: '',
  },
  value_pay: 1000,
  payment_is_pending: true,
};

const defaultValuesWork = {
  date: undefined,
  crop: { id: '', name: '' },
  description: '',
  details: [],
  value_pay: 0,
};

export type FormWorkProps = FormProps<z.infer<typeof formSchemaWork>, Work>;

export interface FormWorkContextValues {
  formWork: ReturnType<typeof useCreateForm>;
  formWorkDetail: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaWork>) => void;
  value_pay: number;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
  workDetail: WorkDetail;
  setWorkDetail: React.Dispatch<React.SetStateAction<WorkDetail>>;
  dataTableWorkDetail: DataTableGenericReturn<WorkDetail>;
  queryEmployees: UseQueryResult<
    ResponseApiGetAllRecords<Employee>,
    AxiosError<TypedAxiosError, unknown>
  >;
  detailsWork: WorkDetail[];
  addWorkDetail: (workDetail: WorkDetail) => void;
  modifyWorkDetail: (workDetail: WorkDetail) => void;
  resetWorkDetails: () => void;
  handleOpenDialog: () => void;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetWorkDetail: () => void;
  handleDeleteBulkWorkDetails: () => void;
  removeWorkDetail: (workDetail: WorkDetail) => void;
  actionsWorksModule: Record<string, boolean>;
}

type WorkAction =
  | {
      type: 'REMOVE' | 'MODIFY' | 'ADD';
      payload?: WorkDetail;
    }
  | { type: 'RESET'; payload: WorkDetail[] };

const workDetailsReducer = (
  state: WorkDetail[],
  action: WorkAction
): WorkDetail[] => {
  if (action === undefined || action === null) {
    throw new Error('Action is undefined or null');
  }

  switch (action.type) {
    case 'ADD':
      return [...state, action.payload as WorkDetail];
    case 'REMOVE':
      return state.filter((detail) => detail.id !== action.payload?.id);
    case 'MODIFY':
      return state.map((item) =>
        item.id !== action.payload?.id ? item : (action.payload as WorkDetail)
      );
    case 'RESET':
      return [...action?.payload];
  }
};

export const FormWorkContext = createContext<FormWorkContextValues | undefined>(
  undefined
);

export const FormWorkProvider: React.FC<
  FormWorkProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues = defaultValuesWork,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const { getActionsModule } = useAuthContext();
  const actionsWorksModule = useMemo(() => getActionsModule('works'), []);

  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsWork, dispatch] = useReducer(
    workDetailsReducer,
    detailsDefaultValues
  );

  const addWorkDetail = (workDetail: WorkDetail): void => {
    dispatch({ type: 'ADD', payload: workDetail });
  };

  const removeWorkDetail = (workDetail: WorkDetail): void => {
    dispatch({ type: 'REMOVE', payload: workDetail });
  };

  const modifyWorkDetail = (workDetail: WorkDetail): void => {
    dispatch({ type: 'MODIFY', payload: workDetail });
  };

  const resetWorkDetails = (): void => {
    dispatch({ type: 'RESET', payload: detailsDefaultValues });
  };

  const value_pay = useMemo<number>(
    () =>
      detailsWork.reduce(
        (value_pay: number, detail: WorkDetail) =>
          Number(value_pay) + Number(detail.value_pay),
        0
      ),
    [detailsWork]
  );

  const formWork = useCreateForm({
    schema: formSchemaWork,
    defaultValues,
    validationMode: 'onSubmit',
  });

  const columnsTable = useCreateColumnsTable({
    columns: columnsWorkDetail,
    actions: ActionsTableWorkDetail,
    hiddenActions: readOnly,
    customCheckbox: CheckboxTableCustom,
  });

  const dataTableWorkDetail = useDataTableGeneric<WorkDetail>({
    columns: columnsTable,
    rows: detailsWork,
  });

  const { getIdsToRowsSelected, resetSelectionRows } = dataTableWorkDetail;

  const { showToast, markChanges } = useFormChange();

  const [workDetail, setWorkDetail] = useState(defaultValuesWorkDetail);

  const resetWorkDetail = () => {
    setWorkDetail(defaultValuesWorkDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const formWorkDetail = useCreateForm({
    schema: formSchemaWorkDetails,
    defaultValues: workDetail,
    validationMode: 'onSubmit',
  });

  const { query: queryEmployees } = useGetAllEmployees({
    queryValue: '',
    all_records: true,
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormWorkDetail = () => {
    if (formWork.formState.isDirty) {
      markChanges(true);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formWorkDetail.formState.isDirty) {
      showToast({
        skipRedirection: true,
        action: ClearFormWorkDetail,
      });
      return;
    }
    ClearFormWorkDetail();
  };

  const handleDeleteBulkWorkDetails = () => {
    for (const record of getIdsToRowsSelected()) {
      removeWorkDetail(record as WorkDetail);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formWork.setValue('details', detailsWork, {
      shouldValidate: detailsWork.length > 0,
      shouldDirty: true,
    });

    formWork.setValue('value_pay', value_pay, { shouldValidate: true });
  }, [detailsWork]);

  return (
    <FormWorkContext.Provider
      value={{
        formWork,
        isSubmitting,
        onSubmit,
        readOnly,
        value_pay,
        workDetail,
        setWorkDetail,
        formWorkDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetWorkDetail,
        dataTableWorkDetail,
        handleDeleteBulkWorkDetails,
        queryEmployees,
        detailsWork,
        addWorkDetail,
        removeWorkDetail,
        modifyWorkDetail,
        resetWorkDetails,
        actionsWorksModule,
      }}
    >
      {children}
    </FormWorkContext.Provider>
  );
};
