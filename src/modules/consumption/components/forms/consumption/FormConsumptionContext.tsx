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

import { useFormChange } from '@/modules/core/components';
import {
  DataTableGenericReturn,
  useDataTableGeneric,
} from '@/modules/core/hooks/data-table/useDataTableGeneric';

import { toast } from 'sonner';

import {
  ConsumptionDetails,
  ConsumptionSupplies,
} from '@/modules/consumption/interfaces';
import { formSchemaConsumption } from '@/modules/consumption/utils';
import { formSchemaConsumptionDetail } from '@/modules/consumption/utils/formSchemaConsumptionDetail';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { FormProps } from '@/modules/core/interfaces';
import { z } from 'zod';
import { ActionsTableConsumptionDetail } from '../consumption/details/ActionsTableConsumptionDetail';
import { columnsConsumptionDetail } from '../consumption/details/ColumnsTableConsumptionDetail';

export const defaultValuesConsumptionDetail: ConsumptionDetails = {
  id: undefined,
  supply: { id: '', name: '' },
  crop: { id: '', name: '' },
  amount: 0,
};

const defaultValuesConsumption: ConsumptionSupplies = {
  id: undefined,
  date: undefined,
  details: [],
};

export type FormConsumptionProps = FormProps<
  z.infer<typeof formSchemaConsumption>,
  ConsumptionSupplies
>;

export interface FormConsumptionContextValues {
  formConsumption: ReturnType<typeof useCreateForm>;
  formConsumptionDetail: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaConsumption>) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
  consumptionDetail: ConsumptionDetails;
  setConsumptionDetail: React.Dispatch<
    React.SetStateAction<ConsumptionDetails>
  >;
  dataTableConsumptionDetail: DataTableGenericReturn<ConsumptionDetails>;
  detailsConsumption: ConsumptionDetails[];
  addConsumptionDetail: (consumptionDetail: ConsumptionDetails) => void;
  modifyConsumptionDetail: (consumptionDetail: ConsumptionDetails) => void;
  resetConsumptionDetails: () => void;
  handleOpenDialog: () => void;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetConsumptionDetail: () => void;
  handleDeleteBulkConsumptionDetails: () => void;
  removeConsumptionDetail: (consumptionDetail: ConsumptionDetails) => void;
  actionsConsumptionsModule: Record<string, boolean>;
}

interface ConsumptionAction {
  type: 'REMOVE' | 'MODIFY' | 'RESET' | 'ADD';
  payload?: ConsumptionDetails;
}

const consumptionDetailsReducer = (
  state: ConsumptionDetails[],
  action: ConsumptionAction
): ConsumptionDetails[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload as ConsumptionDetails];
    case 'REMOVE':
      return state.filter((detail) => detail.id !== action.payload?.id);
    case 'MODIFY':
      return state.map((item) =>
        item.id !== action.payload?.id
          ? item
          : (action.payload as ConsumptionDetails)
      );
    case 'RESET':
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const FormConsumptionContext = createContext<
  FormConsumptionContextValues | undefined
>(undefined);

export const FormConsumptionProvider: React.FC<
  FormConsumptionProps & { children: React.ReactNode }
> = ({
  children,
  defaultValues = defaultValuesConsumption,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const { getActionsModule } = useAuthContext();
  const actionsConsumptionsModule = useMemo(
    () => getActionsModule('supplies'),
    []
  );

  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsConsumption, dispatch] = useReducer(
    consumptionDetailsReducer,
    detailsDefaultValues
  );

  const addConsumptionDetail = (
    consumptionDetail: ConsumptionDetails
  ): void => {
    dispatch({ type: 'ADD', payload: consumptionDetail });
  };

  const removeConsumptionDetail = (
    consumptionDetail: ConsumptionDetails
  ): void => {
    dispatch({ type: 'REMOVE', payload: consumptionDetail });
  };

  const modifyConsumptionDetail = (
    consumptionDetail: ConsumptionDetails
  ): void => {
    dispatch({ type: 'MODIFY', payload: consumptionDetail });
  };

  const resetConsumptionDetails = (): void => {
    dispatch({ type: 'RESET' });
  };
  const formConsumption = useCreateForm({
    schema: formSchemaConsumption,
    defaultValues,
  });

  const columnsTable = useCreateColumnsTable({
    columns: columnsConsumptionDetail,
    actions: ActionsTableConsumptionDetail,
    hiddenActions: readOnly,
  });

  const dataTableConsumptionDetail = useDataTableGeneric<ConsumptionDetails>({
    columns: columnsTable,
    rows: detailsConsumption,
  });

  const { getIdsToRowsSelected, resetSelectionRows } =
    dataTableConsumptionDetail;

  const { hasUnsavedChanges, showToast } = useFormChange();

  const [consumptionDetail, setConsumptionDetail] = useState(
    defaultValuesConsumptionDetail
  );

  const resetConsumptionDetail = () => {
    setConsumptionDetail(defaultValuesConsumptionDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const formConsumptionDetail = useCreateForm({
    schema: formSchemaConsumptionDetail,
    defaultValues: consumptionDetail,
    validationMode: 'onSubmit',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormConsumptionDetail = () => {
    formConsumptionDetail.reset(defaultValuesConsumptionDetail);

    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
        action: ClearFormConsumptionDetail,
      });
      return;
    }
    ClearFormConsumptionDetail();
  };

  const handleDeleteBulkConsumptionDetails = () => {
    for (const record of getIdsToRowsSelected()) {
      removeConsumptionDetail(record as ConsumptionDetails);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    formConsumption.setValue('details', detailsConsumption, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: true,
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [detailsConsumption, isFirstRender]);

  return (
    <FormConsumptionContext.Provider
      value={{
        formConsumption,
        isSubmitting,
        onSubmit,
        readOnly,
        consumptionDetail,
        setConsumptionDetail,
        formConsumptionDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetConsumptionDetail,
        dataTableConsumptionDetail,
        handleDeleteBulkConsumptionDetails,
        detailsConsumption,
        removeConsumptionDetail,
        modifyConsumptionDetail,
        resetConsumptionDetails,
        addConsumptionDetail,
        actionsConsumptionsModule,
      }}
    >
      {children}
    </FormConsumptionContext.Provider>
  );
};
