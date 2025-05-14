import React, {
  createContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { useAuthContext } from "@/auth/hooks";
import { useCreateForm } from "@/modules/core/hooks";

import { useFormChange } from "@/modules/core/components";
import {
  DataTableGenericReturn,
  useDataTableGeneric,
} from "@/modules/core/hooks/data-table/useDataTableGeneric";

import { toast } from "sonner";

import {
  ConsumptionDetails,
  ConsumptionSupplies,
} from "@/modules/consumption/interfaces";
import { formSchemaConsumption } from "@/modules/consumption/utils";
import { formSchemaConsumptionDetail } from "@/modules/consumption/utils/formSchemaConsumptionDetail";
import { useCreateColumnsTable } from "@/modules/core/hooks/data-table/useCreateColumnsTable";
import { FormProps } from "@/modules/core/interfaces";
import { useGetAllSuppliesStock } from "@/modules/supplies/hooks";
import { SupplyStock } from "@/modules/supplies/interfaces/SupplyStock";
import { z } from "zod";
import { ActionsTableConsumptionDetail } from "../consumption/details/ActionsTableConsumptionDetail";
import { columnsConsumptionDetail } from "../consumption/details/ColumnsTableConsumptionDetail";
import { CheckboxTableCustomClient } from "@/modules/core/components/table/CheckboxTableCustomClient";

export const defaultValuesConsumptionDetail: ConsumptionDetails = {
  id: undefined,
  supply: { id: "", name: "", unit_of_measure: "" },
  crop: { id: "", name: "" },
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
  querySuppliesStock: ReturnType<typeof useGetAllSuppliesStock>;
  suppliesStock: SupplyStock[];
  addSupplyStock: (supplyStock: SupplyStock) => void;
  removeSupplyStock: (supplyStock: SupplyStock) => void;
  validateAvailableStock: (record: SupplyStock) => boolean;
}

interface ConsumptionAction {
  type: "REMOVE" | "MODIFY" | "RESET" | "ADD";
  payload?: ConsumptionDetails;
}

const consumptionDetailsReducer = (
  state: ConsumptionDetails[],
  action: ConsumptionAction
): ConsumptionDetails[] => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload as ConsumptionDetails];
    case "REMOVE":
      return state.filter((detail) => detail.id !== action.payload?.id);
    case "MODIFY":
      return state.map((item) =>
        item.id !== action.payload?.id
          ? item
          : (action.payload as ConsumptionDetails)
      );
    case "RESET":
      return [];
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type SupplyStockAction =
  | {
      type: "ADD";
      payload: SupplyStock;
    }
  | {
      type: "REMOVE";
      payload: SupplyStock;
    }
  | {
      type: "RESET";
      payload: SupplyStock[];
    };

const supplyStockReducer = (
  state: SupplyStock[],
  action: SupplyStockAction
): SupplyStock[] => {
  if (!action) {
    throw new Error("Action is undefined");
  }
  switch (action.type) {
    case "ADD":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: item.amount + action.payload.amount,
          };
        }
        return item;
      });
    case "REMOVE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            amount: item.amount - action.payload.amount,
          };
        }
        return item;
      });
    case "RESET":
      return [...action.payload];
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
    () => getActionsModule("supplies"),
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
    dispatch({ type: "ADD", payload: consumptionDetail });
  };

  const removeConsumptionDetail = (
    consumptionDetail: ConsumptionDetails
  ): void => {
    dispatch({ type: "REMOVE", payload: consumptionDetail });
  };

  const modifyConsumptionDetail = (
    consumptionDetail: ConsumptionDetails
  ): void => {
    dispatch({ type: "MODIFY", payload: consumptionDetail });
  };

  const resetConsumptionDetails = (): void => {
    dispatch({ type: "RESET" });
  };

  const querySuppliesStock = useGetAllSuppliesStock({
    queryValue: "",
    all_records: true,
  });

  const [suppliesStock, dispatchSupplyStock] = useReducer(
    supplyStockReducer,
    []
  );

  const validateAvailableStock = (record: SupplyStock): boolean => {
    const supply = suppliesStock.find((item) => item.id === record.id);
    if (!supply) {
      throw new Error("Suplemento no encontrado");
    }
    const result = supply?.amount >= record.amount && record.amount >= 0;
    if (!result) {
      toast.error(
        `No hay suficiente inventario para el insumo ${record.name}.\nInventario disponible: ${supply.amount} ${supply.unit_of_measure}`
      );
    }
    return result;
  };

  const addSupplyStock = (suppliesStock: SupplyStock): void => {
    dispatchSupplyStock({ type: "ADD", payload: suppliesStock });
  };

  const removeSupplyStock = (suppliesStock: SupplyStock): void => {
    dispatchSupplyStock({ type: "REMOVE", payload: suppliesStock });
  };

  const resetSupplyStock = (data: SupplyStock[]): void => {
    dispatchSupplyStock({
      type: "RESET",
      payload: data,
    });
  };

  const formConsumption = useCreateForm({
    schema: formSchemaConsumption,
    defaultValues,
  });

  const columnsTable = useCreateColumnsTable({
    columns: columnsConsumptionDetail,
    actions: ActionsTableConsumptionDetail,
    hiddenActions: readOnly,
    customCheckbox: CheckboxTableCustomClient,
  });

  const dataTableConsumptionDetail = useDataTableGeneric<ConsumptionDetails>({
    columns: columnsTable,
    rows: detailsConsumption,
  });

  const { getIdsToRowsSelected, resetSelectionRows } =
    dataTableConsumptionDetail;

  const { showToast, markChanges } = useFormChange();

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
    validationMode: "onSubmit",
  });

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const ClearFormConsumptionDetail = () => {
    removeSupplyStock({
      id: consumptionDetail.supply.id,
      name: consumptionDetail.supply?.name!,
      amount: consumptionDetail.amount,
    } as any);
    // formConsumptionDetail.reset(defaultValuesConsumptionDetail);
    if (formConsumption.formState.isDirty) {
      markChanges(true);
    }

    setOpenDialog(false);
  };

  const handleCloseDialog = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (formConsumptionDetail.formState.isDirty) {
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
      const data = detailsConsumption.find((item) => item.id === record.id);
      addSupplyStock({
        id: data?.supply.id!,
        name: data?.supply.name,
        amount: data?.amount!,
      } as any);
      removeConsumptionDetail(record as ConsumptionDetails);
    }
    resetSelectionRows();
    toast.success(`Se han eliminado las cosechas!`);
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    formConsumption.setValue("details", detailsConsumption, {
      shouldValidate: !isFirstRender.current,
      shouldDirty: true,
    });

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
  }, [detailsConsumption, isFirstRender]);

  useEffect(() => {
    if (querySuppliesStock.isSuccess) {
      resetSupplyStock(
        querySuppliesStock.data?.records as unknown as SupplyStock[]
      );
    }
  }, [querySuppliesStock.data]);

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
        addSupplyStock,
        removeSupplyStock,
        validateAvailableStock,
        suppliesStock,
        querySuppliesStock,
      }}
    >
      {children}
    </FormConsumptionContext.Provider>
  );
};
