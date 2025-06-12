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

import { useGetAllCropsWithStock } from '@/modules/crops/hooks/queries/useGetAllCropsWithStock';
import { Sale, SaleDetail } from '@/modules/sales/interfaces';
import { formSchemaSale } from '@/modules/sales/utils';
import { formSchemaSaleDetails } from '@/modules/sales/utils/formSchemaSaleDetail';
import { UseFormReturn } from 'react-hook-form';
import { z } from 'zod';
import { ActionsTableSaleDetail } from './details/ActionsTableSaleDetail';
import { columnsSaleDetail } from './details/ColumnsTableSaleDetail';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';

const defaultValuesSale = {
  date: undefined,
  details: [],
  value_pay: 0,
  amount: 0,
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
  unit_of_measure: MassUnitOfMeasure.KILOGRAMOS,
  value_pay: 0,
  amount: 0,
  is_receivable: false,
};

export interface CropStock {
  id: string;
  name: string;
  stock: number;
  unit_of_measure: MassUnitOfMeasure;
}

export type FormSaleProps = FormProps<z.infer<typeof formSchemaSale>, Sale>;

export interface FormSaleContextValues {
  formSale: ReturnType<typeof useCreateForm>;
  formSaleDetail: UseFormReturn<z.infer<typeof formSchemaSaleDetails>, unknown>;
  readOnly: boolean;
  isSubmitting: boolean;
  onSubmit: (values: z.infer<typeof formSchemaSale>) => void;
  value_pay: number;
  amount: number;
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
  unitTypeToShowAmount: MassUnitOfMeasure;
  setUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
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
  onSubmit = (values) => {},
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

    let result: boolean;

    let saleAmountInGrams: number = -1;

    try {
      saleAmountInGrams = convert(
        record.stock,
        record.unit_of_measure,
        MassUnitOfMeasure.GRAMOS,
      );
    } catch (error) {
      return false;
    }

    result = crop.stock >= saleAmountInGrams && record.stock >= 0;

    const cropStockConverted = convert(
      crop.stock,
      MassUnitOfMeasure.GRAMOS,
      record.unit_of_measure
    );

    if (!result) {
      toast.error(
        `No hay suficiente inventario para el cultivo ${
          record.name
        }.\nInventario disponible: ${cropStockConverted} ${
          UnitSymbols[record.unit_of_measure]
        }`
      );
    }
    formSaleDetail.setError(
      'amount',
      {
        message: 'El monto ingresado supera al que hay disponible',
        type: 'custom',
      },
      { shouldFocus: true }
    );
    return result;
  };

  const { convert } = useUnitConverter();

  const addCropStock = (cropStock: CropStock): void => {
    const result = convert(
      cropStock.stock,
      cropStock.unit_of_measure,
      MassUnitOfMeasure.GRAMOS,
    );
    dispatchCropStock({
      type: 'ADD',
      payload: { ...cropStock, stock: result },
    });
  };

  const removeCropStock = (cropStock: CropStock): void => {
    const result = convert(
      cropStock.stock,
      cropStock.unit_of_measure,
      MassUnitOfMeasure.GRAMOS,
    );
    dispatchCropStock({
      type: 'REMOVE',
      payload: { ...cropStock, stock: result },
    });
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

  const value_pay = detailsSale.reduce(
    (value_pay: number, detail: SaleDetail) =>
      Number(value_pay) + Number(detail.value_pay),
    0
  );
  // const amount = detailsSale.reduce(
  //   (amount: number, detail: SaleDetail) =>
  //     Number(amount) + Number(detail.amount),
  //   0
  // );

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const amount = useMemo<number>(
    () =>
      detailsSale.reduce((amount: number, detail: SaleDetail) => {
        const convertedAmount = convert(
          Number(detail.amount),
          detail.unit_of_measure!,
          unitTypeToShowAmount
        );
        return Number(amount) + convertedAmount;
      }, 0),
    [detailsSale, unitTypeToShowAmount]
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

  const { showToast, markChanges } = useFormChange();

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
      stock: saleDetail.amount,
      unit_of_measure: saleDetail.unit_of_measure!,
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
        skipRedirection: true,
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
        stock: data?.amount!,
        unit_of_measure: data?.unit_of_measure!,
      });
      removeSaleDetail(record as SaleDetail);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  useEffect(() => {
    formSale.setValue('details', detailsSale, {
      shouldValidate: detailsSale.length > 0,
      shouldDirty: true,
    });
    formSale.setValue('value_pay', value_pay, { shouldValidate: true });
    formSale.setValue('amount', amount, { shouldValidate: true });
  }, [detailsSale]);

  useEffect(() => {
    if (queryCropsWithStock.isSuccess) {
      resetCropStock(queryCropsWithStock.data?.records as CropStock[]);
    }
  }, [queryCropsWithStock.data]);

  return (
    <FormSaleContext.Provider
      value={{
        formSale,
        isSubmitting,
        onSubmit,
        readOnly,
        value_pay,
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
        amount,
        actionsSalesModule,
        queryCropsWithStock,
        cropStock,
        addCropStock,
        removeCropStock,
        validateAvailableStock,
        toggleStatusPayment,
        unitTypeToShowAmount,
        setUnitTypeToShowAmount,
      }}
    >
      {children}
    </FormSaleContext.Provider>
  );
};
