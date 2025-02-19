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

import { CheckboxTableCustomClient } from '@/modules/core/components/table/CheckboxTableCustomClient';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { FormProps } from '@/modules/core/interfaces';

import { Sale, SaleDetail } from '@/modules/sales/interfaces';
import { formSchemaSale } from '@/modules/sales/utils';
import { formSchemaSaleDetails } from '@/modules/sales/utils/formSchemaSaleDetail';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ActionsTableSaleDetail } from './details/ActionsTableSaleDetail';
import { columnsSaleDetail } from './details/ColumnsTableSaleDetail';
import { useGetAllCropsWithStock } from '@/modules/crops/hooks/queries/useGetAllCropsWithStock';


const defaultValuesSale = {
  date: undefined,
  details: [],
  total: 0,
  quantity: 0,
};

const defaultValuesSaleDetail: SaleDetail = {
  id: undefined,
  client: {
    id: '',
    first_name: '',
  },
  crop: {
    id: '',
    name: '',
  },
  total: 0,
  quantity: 0,
  is_receivable: false,
};

export interface CropStock {
  id: string;
  name: string;
  stock: number;
}

export type FormSaleProps = FormProps<z.infer<typeof formSchemaSale>, Sale>;

export interface FormSaleContextValues {
  formSale: ReturnType<typeof useCreateForm>;
  formSaleDetail: UseFormReturn<z.infer<typeof formSchemaSaleDetails>, unknown>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaSale>) => void;
  total: number;
  quantity: number;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  openDialog: boolean;
  saleDetail: SaleDetail;
  setSaleDetail: React.Dispatch<React.SetStateAction<SaleDetail>>;
  dataTableSaleDetail: DataTableGenericReturn<SaleDetail>;
  detailsSale: SaleDetail[];
  addSaleDetail: (saleDetail: SaleDetail) => void;
  modifySaleDetail: (saleDetail: SaleDetail) => void;
  resetSaleDetails: () => void;
  handleOpenDialog: () => void;
  toggleStatusPayment: (id: string) => void;
  handleCloseDialog: (event: React.MouseEvent<HTMLButtonElement>) => void;
  resetSaleDetail: () => void;
  handleDeleteBulkSaleDetails: () => void;
  removeSaleDetail: (saleDetail: SaleDetail) => void;
  actionsSalesModule: Record<string, boolean>;
  queryCropsWithStock: ReturnType<typeof useGetAllCropsWithStock>;
  cropStock: CropStock[];
  addCropStock: (cropStock: CropStock) => void;
  removeCropStock: (cropStock: CropStock) => void;
  validateAvailableStock: (record: CropStock) => boolean;
}

type SaleAction =
  | {
      type: 'REMOVE' | 'MODIFY' | 'ADD';
      payload?: SaleDetail;
    }
  | {
      type: 'RESET';
      payload: SaleDetail[];
    }
  | {
      type: 'TOGGLE_STATUS_PAYMENT';
      payload: string;
    };

const saleDetailsReducer = (
  state: SaleDetail[],
  action: SaleAction
): SaleDetail[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.payload as SaleDetail];
    case 'REMOVE':
      return state.filter((detail) => detail.id !== action.payload?.id);
    case 'MODIFY':
      return state.map((item) =>
        item.id !== action.payload?.id ? item : (action.payload as SaleDetail)
      );
    case 'RESET':
      return [...action.payload];
    case 'TOGGLE_STATUS_PAYMENT':
      return state.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            is_receivable: !item.is_receivable,
          };
        }
        return item;
      });
  }
};

type CropStockAction =
  | {
      type: 'ADD';
      payload: CropStock;
    }
  | {
      type: 'REMOVE';
      payload: CropStock;
    }
  | {
      type: 'RESET';
      payload: CropStock[];
    };

const cropStockReducer = (
  state: CropStock[],
  action: CropStockAction
): CropStock[] => {
  if (!action) {
    throw new Error('Action is undefined');
  }
  switch (action.type) {
    case 'ADD':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            stock: item.stock + action.payload.stock,
          };
        }
        return item;
      });
    case 'REMOVE':
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            stock: item.stock - action.payload.stock,
          };
        }
        return item;
      });
    case 'RESET':
      return [...action.payload];
  }
};

export const FormSaleContext = createContext<FormSaleContextValues | undefined>(
  undefined
);

export const FormSaleProvider: React.FC<
  FormSaleProps & {
    children: React.ReactNode;
  }
> = ({
  children,
  defaultValues = defaultValuesSale,
  isSubmitting = false,
  onSubmit = (values) => console.log(values),
  readOnly = false,
}) => {
  const { getActionsModule } = useAuthContext();
  const actionsSalesModule = useMemo(() => getActionsModule('sales'), []);

  const detailsDefaultValues = defaultValues?.details ?? [];
  const [detailsSale, dispatchSaleDetails] = useReducer(
    saleDetailsReducer,
    detailsDefaultValues
  );

  const addSaleDetail = (saleDetail: SaleDetail): void => {
    dispatchSaleDetails({ type: 'ADD', payload: saleDetail });
  };

  const removeSaleDetail = (saleDetail: SaleDetail): void => {
    dispatchSaleDetails({ type: 'REMOVE', payload: saleDetail });
  };

  const modifySaleDetail = (saleDetail: SaleDetail): void => {
    dispatchSaleDetails({ type: 'MODIFY', payload: saleDetail });
  };

  const resetSaleDetails = (): void => {
    dispatchSaleDetails({ type: 'RESET', payload: detailsDefaultValues });
  };

  const toggleStatusPayment = (id: string): void => {
    dispatchSaleDetails({ type: 'TOGGLE_STATUS_PAYMENT', payload: id });
  };

  useEffect(() => {
    if (detailsDefaultValues.length > 0) {
      resetSaleDetails();
    }
  }, [detailsDefaultValues]);

  const queryCropsWithStock = useGetAllCropsWithStock();

  const [cropStock, dispatchCropStock] = useReducer(cropStockReducer, []);

  const validateAvailableStock = (record: CropStock): boolean => {
    const crop = cropStock.find((item) => item.id === record.id);
    if (!crop) {
      throw new Error('Cultivo no encontrado');
    }
    const result = crop?.stock >= record.stock && record.stock >= 0;
    if (!result) {
      toast.error(
        `No hay suficiente inventario para el cultivo ${record.name}.\nInventario disponible: ${crop.stock} Kg`
      );
    }
    return result;
  };

  const addCropStock = (cropStock: CropStock): void => {
    dispatchCropStock({ type: 'ADD', payload: cropStock });
  };

  const removeCropStock = (cropStock: CropStock): void => {
    dispatchCropStock({ type: 'REMOVE', payload: cropStock });
  };

  const resetCropStock = (data: CropStock[]): void => {
    dispatchCropStock({
      type: 'RESET',
      payload: data,
    });
  };

  const formSale = useCreateForm({
    schema: formSchemaSale,
    defaultValues,
  });

  const total = detailsSale.reduce(
    (total: number, detail: SaleDetail) => Number(total) + Number(detail.total),
    0
  );
  const quantity = detailsSale.reduce(
    (quantity: number, detail: SaleDetail) =>
      Number(quantity) + Number(detail.quantity),
    0
  );

  const columnsTable = useCreateColumnsTable({
    columns: columnsSaleDetail,
    actions: ActionsTableSaleDetail,
    hiddenActions: readOnly,
    customCheckbox: CheckboxTableCustomClient,
  });

  const dataTableSaleDetail = useDataTableGeneric<SaleDetail>({
    columns: columnsTable,
    rows: detailsSale,
  });

  const { getIdsToRowsSelected, resetSelectionRows } = dataTableSaleDetail;

  const {  showToast, markChanges } = useFormChange();

  const [saleDetail, setSaleDetail] = useState(defaultValuesSaleDetail);

  const resetSaleDetail = () => {
    setSaleDetail(defaultValuesSaleDetail);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const formSaleDetail: UseFormReturn<
    z.infer<typeof formSchemaSaleDetails>,
    unknown
  > = useCreateForm({
    schema: formSchemaSaleDetails,
    defaultValues: saleDetail,
    validationMode: 'onChange',
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormSaleDetail = () => {
    removeCropStock({
      id: saleDetail.crop.id,
      name: saleDetail.crop?.name!,
      stock: saleDetail.quantity,
    });
    // formSaleDetail.reset(defaultValuesSaleDetail);
    if (formSale.formState.isDirty) {
      markChanges(true);
    }
    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formSaleDetail.formState.isDirty) {
      showToast({
        skiptRedirection: true,
        action: ClearFormSaleDetail,
      });
      return;
    }
    ClearFormSaleDetail();
  };

  const handleDeleteBulkSaleDetails = () => {
    for (const record of getIdsToRowsSelected()) {
      const data = detailsSale.find((item) => item.id === record.id);
      addCropStock({
        id: data?.crop.id!,
        name: data?.crop.name,
        stock: data?.quantity!,
      });
      removeSaleDetail(record as SaleDetail);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    formSale.setValue('details', detailsSale, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: true,
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [detailsSale, isFirstRender]);

  useEffect(() => {
    formSale.setValue('total', total, { shouldValidate: true });
    formSale.setValue('quantity', quantity, { shouldValidate: true });
  }, [total, quantity]);

  useEffect(() => {
    if (queryCropsWithStock.isSuccess) {
      resetCropStock(queryCropsWithStock.data?.rows as CropStock[]);
    }
  }, [queryCropsWithStock.data]);

  return (
    <FormSaleContext.Provider
      value={{
        formSale,
        isSubmitting,
        onSubmit,
        readOnly,
        total,
        saleDetail,
        setSaleDetail,
        formSaleDetail,
        openDialog,
        setOpenDialog,
        handleOpenDialog,
        handleCloseDialog,
        resetSaleDetail,
        dataTableSaleDetail,
        handleDeleteBulkSaleDetails,
        detailsSale,
        addSaleDetail,
        removeSaleDetail,
        modifySaleDetail,
        resetSaleDetails,
        quantity,
        actionsSalesModule,
        queryCropsWithStock,
        cropStock,
        addCropStock,
        removeCropStock,
        validateAvailableStock,
        toggleStatusPayment,
      }}
    >
      {children}
    </FormSaleContext.Provider>
  );
};
