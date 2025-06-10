import { useAuthContext } from '@/auth/hooks';
import {
  DataTableManualReturn,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useBasicQueryData } from '@/modules/core/hooks/';
import { createContext, useEffect, useMemo, useState } from 'react';

import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { BulkRecords } from '@/modules/core/interfaces';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { useDeleteSupply } from '../../hooks';
import { useDeleteBulkSupplies } from '../../hooks/mutations/useDeleteBulkSupplies';
import { useGetAllSupplies } from '../../hooks/queries/useGetAllSupplies';
import { Supply } from '../../interfaces/Supply';
import { columnsTableSupplies } from './columnsTableSupplies';
import { SuppliesModuleActionsTable } from './SuppliesModuleActionsTable';
import { UseDeleteBulkResponse } from '@/modules/core/interfaces/responses/UseDeleteBulkResponse';
import {
  MassUnitOfMeasure,
  VolumeUnitOfMeasure,
} from '../../interfaces/UnitOfMeasure';

export interface SuppliesModuleContextProps {
  paramQuery: string;
  querySupplies: UseQueryGetAllRecordsReturn<Supply>;
  dataTable: DataTableManualReturn<Supply>;
  mutationDeleteSupplies: UseMutationReturn<UseDeleteBulkResponse, BulkRecords>;
  mutationDeleteSupply: UseMutationReturn<void, string>;
  actionsSuppliesModule: Record<string, boolean>;
  unitMassTypeToShowAmount: MassUnitOfMeasure;
  setMassUnitTypeToShowAmount: React.Dispatch<
    React.SetStateAction<MassUnitOfMeasure>
  >;
  unitVolumeTypeToShowAmount: VolumeUnitOfMeasure;
  setUnitVolumeTypeToShowAmount: React.Dispatch<
    React.SetStateAction<VolumeUnitOfMeasure>
  >;
}

export const SuppliesModuleContext = createContext<
  SuppliesModuleContextProps | undefined
>(undefined);

export const SuppliesModuleProvider = ({ children }: any) => {
  const { value } = useBasicQueryData();

  const {
    query: querySupplies,
    pagination,
    setPagination,
  } = useGetAllSupplies({
    queryValue: value,
    all_records: false,
  });

  const { getActionsModule } = useAuthContext();

  const actionsSuppliesModule = useMemo(() => getActionsModule('supplies'), []);

  const [unitMassTypeToShowAmount, setMassUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);
  const [unitVolumeTypeToShowAmount, setUnitVolumeTypeToShowAmount] =
    useState<VolumeUnitOfMeasure>(VolumeUnitOfMeasure.LITROS);

  const columnsTable = useCreateColumnsTable<Supply>({
    columns: columnsTableSupplies,
    actions: SuppliesModuleActionsTable,
  });

  const dataTable = useDataTableManual<Supply>({
    columns: columnsTable,
    infoPagination: querySupplies.isSuccess
      ? {
          pageCount: querySupplies.data?.total_page_count ?? 0,
          rowCount: querySupplies.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: querySupplies.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteSupplies = useDeleteBulkSupplies();
  const mutationDeleteSupply = useDeleteSupply();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue: SuppliesModuleContextProps = {
    paramQuery: value,
    querySupplies,
    mutationDeleteSupplies,
    mutationDeleteSupply,
    actionsSuppliesModule,
    dataTable,
    unitMassTypeToShowAmount,
    setMassUnitTypeToShowAmount,
    unitVolumeTypeToShowAmount,
    setUnitVolumeTypeToShowAmount,
  };

  return (
    <SuppliesModuleContext.Provider value={contextValue}>
      {children}
    </SuppliesModuleContext.Provider>
  );
};
