import { useAuthContext } from '@/auth/hooks';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useGetAllCrops } from '../../hooks/queries/useGetAllCrops';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteCrop } from '../../hooks';
import { useDeleteBulkCrops } from '../../hooks/mutations/useDeleteBulkCrops';
import { Crop } from '../../interfaces/Crop';
import { columnsTableCrops } from './columnsTableCrops';
import { CropsModuleActionsTable } from './CropsModuleActionsTable';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';

export interface CropsModuleContextProps {
  paramQuery: string;
  queryCrops: UseQueryGetAllRecordsReturn<Crop>;
  dataTable: DataTableManualReturn<Crop>;
  mutationDeleteCrops: UseMutationReturn<UseDeleteBulkResponse, BulkRecords>;
  mutationDeleteCrop: UseMutationReturn<void, string>;
  actionsCropsModule: Record<string, boolean>;
  unitTypeToShowAmount: MassUnitOfMeasure;
  setUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
}

export const CropsModuleContext = createContext<
  CropsModuleContextProps | undefined
>(undefined);

export const CropsModuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value } = useBasicQueryData();

  const {
    query: queryCrops,
    pagination,
    setPagination,
  } = useGetAllCrops({
    queryValue: value,
    all_records: false,
  });

  const { getActionsModule } = useAuthContext();

  const actionsCropsModule = useMemo(() => getActionsModule('crops'), []);

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const columnsTable = useCreateColumnsTable<Crop>({
    columns: columnsTableCrops,
    actions: CropsModuleActionsTable,
  });

  const dataTable = useDataTableManual<Crop>({
    columns: columnsTable,
    infoPagination: queryCrops.isSuccess
      ? {
          pageCount: queryCrops.data?.total_page_count ?? 0,
          rowCount: queryCrops.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },

    rows: queryCrops.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteCrops = useDeleteBulkCrops();
  const mutationDeleteCrop = useDeleteCrop();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue: CropsModuleContextProps = {
    paramQuery: value,
    queryCrops,
    dataTable,
    actionsCropsModule,
    mutationDeleteCrops,
    mutationDeleteCrop,
    unitTypeToShowAmount,
    setUnitTypeToShowAmount
  };

  return (
    <CropsModuleContext.Provider value={contextValue}>
      {children}
    </CropsModuleContext.Provider>
  );
};
