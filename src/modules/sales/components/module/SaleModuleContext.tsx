import { useAuthContext } from '@/auth';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { createContext, useEffect, useMemo, useState } from 'react';

import {
  ItemQueryAdvanced,
  useAdvancedQueryDataPlus,
} from '@/modules/core/hooks/useAdvancedQueryDataPlus';
import { BulkRecords, TypeFilterDate } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteBulkSales, useDeleteSale } from '../../hooks';
import {
  GetSalesProps,
  useGetAllSales,
} from '../../hooks/queries/useGetAllSales';
import { Sale } from '../../interfaces';
import { ActionsTableSale } from './ActionsTableSale';
import columnsSale from './ColumnsTableSale';
import { UseQueryResult } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useGetSalePDF } from '../../hooks/queries/useGetSalePDF';
import { useGetAllClientsWithSales } from '@/modules/clients/hooks/queries/useGetAllClientsWithSales';
import { useGetAllCropsWithSales } from '@/modules/crops/hooks/queries/useGetAllCropsWithSales';
import { Client } from '@/modules/clients/interfaces/Client';
import { Crop } from '@/modules/crops/interfaces/Crop';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface paramQuerySale {
  clients: { id: string }[];
  crops: { id: string }[];
  filter_by_date: {
    type_filter_date: string | undefined;
    date: string | undefined | Date;
  };
  filter_by_value_pay: {
    type_filter_value_pay: string | undefined;
    value_pay: number;
  };
  filter_by_amount: {
    type_filter_amount: string | undefined;
    type_unit_of_measure: MassUnitOfMeasure | undefined;
    amount: number;
  };
}

export interface SalesModuleContextValues {
  paramsQuery: paramQuerySale;
  querySales: UseQueryGetAllRecordsReturn<Sale>;
  dataTable: DataTableManualReturn<Sale>;
  mutationDeleteSales: UseMutationReturn<void, BulkRecords>;
  mutationDeleteSale: UseMutationReturn<void, string>;
  actionsSalesModule: Record<string, boolean>;
  hasParamsQuery: boolean;
  queryGetDocument: UseQueryResult<Blob, AxiosError>;
  saleIdDocument: string;
  setSaleIdDocument: React.Dispatch<React.SetStateAction<string>>;
  setExecuteQuery: React.Dispatch<React.SetStateAction<boolean>>;
  queryClients: UseQueryGetAllRecordsReturn<Client>;
  queryCrops: UseQueryGetAllRecordsReturn<Crop>;
  unitTypeToShowAmount: MassUnitOfMeasure;
  setUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
}

const paramsSale: ItemQueryAdvanced[] = [
  {
    propertyName: 'filter_by_date',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_date',
    defaultValue: undefined,
  },
  {
    propertyName: 'date',
    defaultValue: undefined,
  },
  {
    propertyName: 'filter_by_value_pay',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_value_pay',
    defaultValue: undefined,
  },
  {
    propertyName: 'value_pay',
    defaultValue: undefined,
  },
  {
    propertyName: 'filter_by_amount',
    defaultValue: false,
  },
  {
    propertyName: 'type_filter_amount',
    defaultValue: undefined,
  },
  {
    propertyName: 'type_unit_of_measure',
    defaultValue: MassUnitOfMeasure.KILOGRAMOS,
  },
  {
    propertyName: 'amount',
    defaultValue: 0,
  },

  {
    propertyName: 'clients',
    defaultValue: [],
    isArray: true,
  },
  {
    propertyName: 'crops',
    defaultValue: [],
    isArray: true,
  },
];

export const SalesModuleContext = createContext<
  SalesModuleContextValues | undefined
>(undefined);

export const SalesModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { paramsValues, hasValues } = useAdvancedQueryDataPlus(paramsSale);

  const {
    query: querySales,
    pagination,
    setPagination,
  } = useGetAllSales(paramsValues as GetSalesProps);

  const queryClients = useGetAllClientsWithSales();
  const queryCrops = useGetAllCropsWithSales();

  const { getActionsModule } = useAuthContext();

  const actionsSalesModule = useMemo(() => getActionsModule('sales'), []);
  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const columnsTable = useCreateColumnsTable({
    columns: columnsSale,
    actions: ActionsTableSale,
  });

  const dataTable = useDataTableManual<Sale>({
    columns: columnsTable,
    infoPagination: querySales.isSuccess
      ? {
          pageCount: querySales.data?.total_page_count ?? 0,
          rowCount: querySales.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: querySales.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteSales = useDeleteBulkSales();
  const mutationDeleteSale = useDeleteSale();

  const [saleIdDocument, setSaleIdDocument] = useState('');
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetDocument = useGetSalePDF({
    saleId: saleIdDocument,
    stateQuery: executeQuery,
    actionPDF: 'DownloadPDF',
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setSaleIdDocument('');
    },
  });

  useEffect(() => {
    if (hasValues) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [hasValues]);

  const contextValue: SalesModuleContextValues = {
    actionsSalesModule,
    querySales,
    dataTable,
    paramsQuery: {
      // ...paramsValues,
      filter_by_date: {
        type_filter_date: paramsValues.type_filter_date || TypeFilterDate.after,
        date: !paramsValues.date ? undefined : new Date(paramsValues.date),
      },
      filter_by_value_pay: {
        type_filter_value_pay: paramsValues.type_filter_value_pay,
        value_pay: paramsValues.value_pay,
      },
      filter_by_amount: {
        type_filter_amount: paramsValues.type_filter_amount,
        type_unit_of_measure: paramsValues.type_unit_of_measure,
        amount: paramsValues.amount,
      },
      clients: paramsValues.clients.map((cl: string) => ({ id: cl })),
      crops: paramsValues.crops.map((cr: string) => ({ id: cr })),
      // filter_by_is_receivable: {
      //   is_receivable: undefined,
      // },
    },
    mutationDeleteSales,
    mutationDeleteSale,
    hasParamsQuery: hasValues,
    saleIdDocument,
    setSaleIdDocument,
    setExecuteQuery,
    queryGetDocument,
    queryClients,
    queryCrops,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount,
  };

  return (
    <SalesModuleContext.Provider value={contextValue}>
      {children}
    </SalesModuleContext.Provider>
  );
};
