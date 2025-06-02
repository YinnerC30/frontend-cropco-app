import { useAuthContext } from "@/auth";
import {
  DataTableManualReturn,
  useDataTableManual,
} from "@/modules/core/hooks";
import { useCreateColumnsTable } from "@/modules/core/hooks/data-table/useCreateColumnsTable";
import { createContext, useEffect, useMemo, useState } from "react";

import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from "@/modules/core/hooks/useAdvancedQueryDataPlus";
import { BulkRecords } from "@/modules/core/interfaces";
import { UseMutationReturn } from "@/modules/core/interfaces/responses/UseMutationReturn";
import { UseQueryGetAllRecordsReturn } from "@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn";
import { useDeleteBulkShopping } from "../../hooks/mutations/useDeleteBulkShopping";
import { useDeleteShopping } from "../../hooks/mutations/useDeleteShopping";
import {
  GetShoppingProps,
  useGetAllShopping,
} from "../../hooks/queries/useGetAllShopping";
import { ShoppingSupplies } from "../../interfaces";
import { ActionsTableShopping } from "./ActionsTableShopping";
import columnsShopping from "./ColumnsTableShopping";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useGetShoppingPDF } from "../../hooks/queries/useGetShoppingPDF";
import { useGetAllSuppliersWithShopping } from "@/modules/suppliers/hooks/queries/useGetAllSuppliersWithShopping";
import { useGetAllSuppliesWithShopping } from "@/modules/supplies/hooks/queries/useGetAllSuppliesWithShopping";
import { Supply } from "@/modules/supplies/interfaces/Supply";
import { Supplier } from "@/modules/suppliers/interfaces/Supplier";

export interface paramQueryShopping {
  filter_by_date: {
    type_filter_date: string | undefined;
    date: undefined | Date;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | undefined;
    value_pay: number;
  };
  suppliers: { id: string }[];
  supplies: { id: string }[];
}

export interface ShoppingModuleContextValues {
  paramsQuery: paramQueryShopping;
  queryShopping: UseQueryGetAllRecordsReturn<ShoppingSupplies>;
  dataTable: DataTableManualReturn<ShoppingSupplies>;
  mutationDeleteShopping: UseMutationReturn<void, BulkRecords>;
  mutationDeleteOneShopping: UseMutationReturn<void, string>;
  actionsShoppingModule: Record<string, boolean>;
  hasParamsQuery: boolean;
  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  shoppingIdDocument: string;
  setShoppingIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
  querySupplies: UseQueryGetAllRecordsReturn<Supply>,
  querySuppliers: UseQueryGetAllRecordsReturn<Supplier>,
}

const paramsShopping: ItemQueryAdvanced[] = [
  {
    propertyName: "filter_by_date",
    defaultValue: false,
  },
  {
    propertyName: "type_filter_date",
    defaultValue: undefined,
  },
  {
    propertyName: "date",
    defaultValue: undefined,
  },
  {
    propertyName: "filter_by_value_pay",
    defaultValue: false,
  },
  {
    propertyName: "type_filter_value_pay",
    defaultValue: undefined,
  },
  {
    propertyName: "filter_by_value_pay",
    defaultValue: false,
  },

  {
    propertyName: "supplies",
    defaultValue: [],
    isArray: true,
  },
  {
    propertyName: "suppliers",
    defaultValue: [],
    isArray: true,
  },
];

export const ShoppingModuleContext = createContext<
  ShoppingModuleContextValues | undefined
>(undefined);

export const ShoppingModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }: { children: React.ReactNode }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsShopping);

  const {
    query: queryShopping,
    pagination,
    setPagination,
  } = useGetAllShopping(paramsValues as GetShoppingProps);

  const querySupplies = useGetAllSuppliesWithShopping();
  const querySuppliers = useGetAllSuppliersWithShopping();

  const { getActionsModule } = useAuthContext();

  const actionsShoppingModule = useMemo(() => getActionsModule("shopping"), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsShopping,
    actions: ActionsTableShopping,
  });

  const dataTable = useDataTableManual<ShoppingSupplies>({
    columns: columnsTable,
    infoPagination: queryShopping.isSuccess
      ? {
          pageCount: queryShopping.data?.total_page_count ?? 0,
          rowCount: queryShopping.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryShopping.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteShopping = useDeleteBulkShopping();
  const mutationDeleteOneShopping = useDeleteShopping();

  const [shoppingIdDocument, setShoppingIdDocument] = useState("");
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetDocument = useGetShoppingPDF({
    shoppingId: shoppingIdDocument,
    stateQuery: executeQuery,
    actionPDF: "DownloadPDF",
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setShoppingIdDocument("");
    },
  });

  useEffect(() => {
    if (hasValues) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [hasValues]);

  const contextValue: ShoppingModuleContextValues = {
    actionsShoppingModule,
    queryShopping,
    dataTable,
    paramsQuery: {
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: !paramsValues.value_pay ? 0 : paramsValues.value_pay,
      },
      suppliers: paramsValues.suppliers.map((spr: string) => ({ id: spr })),
      supplies: paramsValues.supplies.map((sup: string) => ({ id: sup })),
    },
    mutationDeleteShopping,
    mutationDeleteOneShopping,
    hasParamsQuery: hasValues,
    queryGetDocument,
    setExecuteQuery,
    shoppingIdDocument,
    setShoppingIdDocument,
    querySuppliers,
    querySupplies
  };

  return (
    <ShoppingModuleContext.Provider value={contextValue}>
      {children}
    </ShoppingModuleContext.Provider>
  );
};
