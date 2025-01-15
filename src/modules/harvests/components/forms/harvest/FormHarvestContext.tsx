import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
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
import { Harvest, HarvestDetail } from '@/modules/harvests/interfaces';
import {
  formSchemaHarvest,
  formSchemaHarvestDetail,
} from '@/modules/harvests/utils';
import { toast } from 'sonner';

import { TypedAxiosError } from '@/auth/interfaces/AxiosErrorResponse';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { FormProps, ResponseApiGetAllRecords } from '@/modules/core/interfaces';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { ActionsTableHarvestDetail } from './details/ActionsTableHarvestDetail';
import { columnsHarvestDetail } from './details/ColumnsTableHarvestDetail';
import { CheckboxTableCustom } from '@/modules/core/components/table/CheckboxTableCustom';

export const defaultValuesHarvestDetail: HarvestDetail = {
  id: undefined,
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

export type FormHarvestProps = FormProps<
  z.infer<typeof formSchemaHarvest>,
  Harvest
>;

export interface FormHarvestContextProps {
  formHarvest: ReturnType<typeof useCreateForm>;
  formHarvestDetail: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaHarvest>) => void;
  total: number;
  value_pay: number;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
  harvestDetail: HarvestDetail;
  setHarvestDetail: React.Dispatch<React.SetStateAction<HarvestDetail>>;
  dataTableHarvestDetail: DataTableGenericReturn<HarvestDetail>;
  queryEmployees: UseQueryResult<
    ResponseApiGetAllRecords<Employee>,
    AxiosError<TypedAxiosError, unknown>
  >;
  detailsHarvest: HarvestDetail[];
  addHarvestDetail: (harvestDetail: HarvestDetail) => void;
  modifyHarvestDetail: (harvestDetail: HarvestDetail) => void;
  resetHarvestDetails: () => void;
  handleOpenDialog: () => void;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetHarvestDetail: () => void;
  handleDeleteBulkHarvestDetails: () => void;
  removeHarvestDetail: (harvestDetail: HarvestDetail) => void;
  actionsHarvestsModule: Record<string, boolean>;
}

interface HarvestAction {
  type: 'REMOVE' | 'MODIFY' | 'RESET' | 'ADD';
  payload?: HarvestDetail;
}

const harvestDetailsReducer = (
  state: HarvestDetail[],
  action: HarvestAction
): HarvestDetail[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload as HarvestDetail];
    case 'REMOVE':
      return state.filter((detail) => detail.id !== action.payload?.id);
    case 'MODIFY':
      return state.map((item) =>
        item.id !== action.payload?.id
          ? item
          : (action.payload as HarvestDetail)
      );
    case 'RESET':
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const FormHarvestContext = createContext<
  FormHarvestContextProps | undefined
>(undefined);

export const FormHarvestProvider: React.FC<
  FormHarvestProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues = defaultValuesHarvest,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const { getActionsModule } = useAuthContext();
  const actionsHarvestsModule = useMemo(() => getActionsModule('harvests'), []);

  const detailsDefaultValues = defaultValues?.details ?? [];

  const [detailsHarvest, dispatch] = useReducer(
    harvestDetailsReducer,
    detailsDefaultValues
  );

  const addHarvestDetail = (harvestDetail: HarvestDetail): void => {
    dispatch({ type: 'ADD', payload: harvestDetail });
  };

  const removeHarvestDetail = (harvestDetail: HarvestDetail): void => {
    dispatch({ type: 'REMOVE', payload: harvestDetail });
  };

  const modifyHarvestDetail = (harvestDetail: HarvestDetail): void => {
    dispatch({ type: 'MODIFY', payload: harvestDetail });
  };

  const resetHarvestDetails = (): void => {
    dispatch({ type: 'RESET' });
  };

  const total = useMemo<number>(
    () =>
      detailsHarvest.reduce(
        (total: number, detail: HarvestDetail) =>
          Number(total) + Number(detail.total),
        0
      ),
    [detailsHarvest]
  );
  const value_pay = useMemo<number>(
    () =>
      detailsHarvest.reduce(
        (total: number, detail: HarvestDetail) =>
          Number(total) + Number(detail.value_pay),
        0
      ),
    [detailsHarvest]
  );

  const columnsTable = useCreateColumnsTable<HarvestDetail>({
    columns: columnsHarvestDetail,
    actions: ActionsTableHarvestDetail,
    hiddenActions: readOnly,
    customCheckbox: CheckboxTableCustom,
  });

  const dataTableHarvestDetail = useDataTableGeneric<HarvestDetail>({
    columns: columnsTable,
    rows: detailsHarvest,
  });
  const { hasUnsavedChanges, showToast } = useFormChange();

  const [harvestDetail, setHarvestDetail] = useState<HarvestDetail>(
    defaultValuesHarvestDetail
  );

  const resetHarvestDetail = (): void => {
    setHarvestDetail(defaultValuesHarvestDetail);
  };

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { query: queryEmployees } = useGetAllEmployees({
    queryValue: '',
    allRecords: true,
  });

  const formHarvestDetail = useCreateForm({
    schema: formSchemaHarvestDetail,
    defaultValues: harvestDetail,
    validationMode: 'onChange',
  });

  const handleOpenDialog = (): void => {
    setOpenDialog(true);
  };

  const handleCloseDialog = (
    event: React.MouseEvent<HTMLButtonElement>
  ): void => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: (): void => {
          formHarvestDetail.reset(defaultValuesHarvestDetail);
          setOpenDialog(false);
        },
      });
      return;
    }
    formHarvestDetail.reset(defaultValuesHarvestDetail);
    setOpenDialog(false);
  };

  const handleDeleteBulkHarvestDetails = (): void => {
    for (const record of dataTableHarvestDetail.getIdsToRowsSelected()) {
      removeHarvestDetail(record as HarvestDetail);
    }
    dataTableHarvestDetail.resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  const formHarvest = useCreateForm({
    schema: formSchemaHarvest,
    defaultValues,
    validationMode: 'onSubmit',
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    console.log('Render');
    formHarvest.setValue('details', detailsHarvest, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: true,
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [detailsHarvest, isFirstRender]);

  useEffect(() => {
    formHarvest.setValue('total', total, { shouldValidate: true });
    formHarvest.setValue('value_pay', value_pay, { shouldValidate: true });
  }, [total, value_pay]);

  return (
    <FormHarvestContext.Provider
      value={{
        // forms
        formHarvest,
        formHarvestDetail,
        // primitives values
        readOnly,
        isSubmitting,
        total,
        value_pay,
        // methods
        onSubmit,
        modifyHarvestDetail,
        resetHarvestDetails,
        openDialog,
        setOpenDialog,
        harvestDetail,
        setHarvestDetail,
        detailsHarvest,
        addHarvestDetail,
        // queries
        queryEmployees,
        dataTableHarvestDetail,
        handleOpenDialog,
        handleCloseDialog,
        resetHarvestDetail,
        handleDeleteBulkHarvestDetails,
        removeHarvestDetail,
        actionsHarvestsModule,
      }}
    >
      {children}
    </FormHarvestContext.Provider>
  );
};
