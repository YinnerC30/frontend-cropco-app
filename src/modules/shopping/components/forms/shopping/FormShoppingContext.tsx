import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
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

import { CheckboxTableCustomClient } from '@/modules/core/components/table/CheckboxTableCustomClient';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { FormProps } from '@/modules/core/interfaces';
import {
  ShoppingDetail,
  ShoppingSupplies,
} from '@/modules/shopping/interfaces';
import { formSchemaShopping } from '@/modules/shopping/utils';
import { formSchemaShoppingDetail } from '@/modules/shopping/utils/formSchemaShoppingDetail';
import { z } from 'zod';
import { ActionsTableShoppingDetail } from './details/ActionsTableShoppingDetail';
import { columnsShoppingDetail } from './details/ColumnsTableShoppingDetail';

const defaultValuesShopping: ShoppingSupplies = {
  id: undefined,
  date: undefined,
  details: [],
  value_pay: 0,
};

export const defaultValuesShoppingDetail: ShoppingDetail = {
  id: undefined,
  supplier: {
    id: '',
    first_name: '',
  },
  supply: {
    id: '',
    name: '',
    unit_of_measure: '',
  },
  unit_of_measure: undefined,
  value_pay: 0,
  amount: 0,
};

export type FormShoppingProps = FormProps<
  z.infer<typeof formSchemaShopping>,
  ShoppingSupplies
>;

export interface FormShoppingContextValues {
  formShopping: ReturnType<typeof useCreateForm>;
  formShoppingDetail: ReturnType<typeof useCreateForm>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaShopping>) => void;
  value_pay: number;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
  shoppingDetail: ShoppingDetail;
  setShoppingDetail: React.Dispatch<React.SetStateAction<ShoppingDetail>>;
  dataTableShoppingDetail: DataTableGenericReturn<ShoppingDetail>;
  detailsShopping: ShoppingDetail[];
  addShoppingDetail: (shoppingDetail: ShoppingDetail) => void;
  modifyShoppingDetail: (shoppingDetail: ShoppingDetail) => void;
  resetShoppingDetails: () => void;
  handleOpenDialog: () => void;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetShoppingDetail: () => void;
  handleDeleteBulkShoppingDetails: () => void;
  removeShoppingDetail: (shoppingDetail: ShoppingDetail) => void;
  actionsShoppingModule: Record<string, boolean>;
}

interface ShoppingAction {
  type: 'REMOVE' | 'MODIFY' | 'RESET' | 'ADD';
  payload?: ShoppingDetail;
}

const shoppingDetailsReducer = (
  state: ShoppingDetail[],
  action: ShoppingAction
): ShoppingDetail[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload as ShoppingDetail];
    case 'REMOVE':
      return state.filter((detail) => detail.id !== action.payload?.id);
    case 'MODIFY':
      return state.map((item) =>
        item.id !== action.payload?.id
          ? item
          : (action.payload as ShoppingDetail)
      );
    case 'RESET':
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const FormShoppingContext = createContext<
  FormShoppingContextValues | undefined
>(undefined);

export const FormShoppingProvider: React.FC<
  FormShoppingProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues = defaultValuesShopping,
  isSubmitting = false,
  onSubmit = (values) => {},
  readOnly = false,
}) => {
  const { getActionsModule } = useAuthContext();
  const actionsShoppingModule = useMemo(() => getActionsModule('supplies'), []);

  const detailsDefaultValues = defaultValues?.details ?? [];

  const [detailsShopping, dispatch] = useReducer(
    shoppingDetailsReducer,
    detailsDefaultValues
  );

  const addShoppingDetail = (shoppingDetail: ShoppingDetail): void => {
    dispatch({ type: 'ADD', payload: shoppingDetail });
  };

  const removeShoppingDetail = (shoppingDetail: ShoppingDetail): void => {
    dispatch({ type: 'REMOVE', payload: shoppingDetail });
  };

  const modifyShoppingDetail = (shoppingDetail: ShoppingDetail): void => {
    dispatch({ type: 'MODIFY', payload: shoppingDetail });
  };

  const resetShoppingDetails = (): void => {
    dispatch({ type: 'RESET' });
  };

  const formShopping = useCreateForm({
    schema: formSchemaShopping,
    defaultValues,
  });

  const value_pay = useMemo<number>(
    () =>
      detailsShopping.reduce(
        (value_pay: number, detail: ShoppingDetail) =>
          Number(value_pay) + Number(detail.value_pay),
        0
      ),
    [detailsShopping]
  );

  const columnsTable = useCreateColumnsTable({
    columns: columnsShoppingDetail,
    actions: ActionsTableShoppingDetail,
    hiddenActions: readOnly,
    customCheckbox: CheckboxTableCustomClient,
  });

  const dataTableShoppingDetail = useDataTableGeneric<ShoppingDetail>({
    columns: columnsTable,
    rows: detailsShopping,
  });

  const { getIdsToRowsSelected, resetSelectionRows } = dataTableShoppingDetail;

  const { showToast, markChanges } = useFormChange();

  const [shoppingDetail, setShoppingDetail] = useState(
    defaultValuesShoppingDetail
  );

  const resetShoppingDetail = () => {
    setShoppingDetail(defaultValuesShoppingDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const formShoppingDetail = useCreateForm({
    schema: formSchemaShoppingDetail,
    defaultValues: shoppingDetail,
    validationMode: 'onChange',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormShoppingDetail = () => {
    if (formShopping.formState.isDirty) {
      markChanges(true);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formShoppingDetail.formState.isDirty) {
      showToast({
        skipRedirection: true,
        action: ClearFormShoppingDetail,
      });
      return;
    }
    ClearFormShoppingDetail();
  };

  const handleDeleteBulkShoppingDetails = () => {
    for (const record of getIdsToRowsSelected()) {
      removeShoppingDetail(record as ShoppingDetail);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las compras!`);
  };

  useEffect(() => {
    formShopping.setValue('details', detailsShopping, {
      shouldValidate: detailsShopping.length > 0,
      shouldDirty: true,
    });
    formShopping.setValue('value_pay', value_pay, { shouldValidate: true });
  }, [detailsShopping]);

  return (
    <FormShoppingContext.Provider
      value={{
        // forms
        formShopping,
        formShoppingDetail,
        // primitives values
        readOnly,
        isSubmitting,
        value_pay,
        // methods
        onSubmit,
        modifyShoppingDetail,
        resetShoppingDetail,
        openDialog,
        setOpenDialog,
        shoppingDetail,
        setShoppingDetail,
        detailsShopping,
        addShoppingDetail,
        // queries
        // queryEmployees,
        dataTableShoppingDetail,
        handleOpenDialog,
        handleCloseDialog,
        resetShoppingDetails,
        handleDeleteBulkShoppingDetails,
        removeShoppingDetail,
        actionsShoppingModule,
      }}
    >
      {children}
    </FormShoppingContext.Provider>
  );
};
