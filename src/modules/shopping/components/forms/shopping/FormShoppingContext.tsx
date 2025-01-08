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
  total: 0,
};

const defaultValuesShoppingDetail: ShoppingDetail = {
  id: undefined,
  supplier: {
    id: '',
    first_name: '',
  },
  supply: {
    id: '',
    name: '',
  },
  total: 0,
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
  total: number;
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
  onSubmit = (values) => console.log(values),
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

  const total = useMemo<number>(
    () =>
      detailsShopping.reduce(
        (total: number, detail: ShoppingDetail) =>
          Number(total) + Number(detail.total),
        0
      ),
    [detailsShopping]
  );

  const columnsTable = useCreateColumnsTable({
    columns: columnsShoppingDetail,
    actions: ActionsTableShoppingDetail,
    hiddenActions: readOnly,
  });

  const dataTableShoppingDetail = useDataTableGeneric<ShoppingDetail>({
    columns: columnsTable,
    rows: detailsShopping,
  });

  const { getIdsToRowsSelected, resetSelectionRows } = dataTableShoppingDetail;

  const { hasUnsavedChanges, showToast } = useFormChange();

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
    validationMode: 'onSubmit',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormShoppingDetail = () => {
    formShoppingDetail.reset(defaultValuesShoppingDetail);
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (hasUnsavedChanges) {
      showToast({
        skiptRedirection: true,
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
  const isFirstRender = useRef(true);

  useEffect(() => {
    formShopping.setValue('details', detailsShopping, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: true,
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [detailsShopping, isFirstRender]);

  useEffect(() => {
    formShopping.setValue('total', total, { shouldValidate: true });
  }, [total]);

  return (
    <FormShoppingContext.Provider
      value={{
        // forms
        formShopping,
        formShoppingDetail,
        // primitives values
        readOnly,
        isSubmitting,
        total,
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
