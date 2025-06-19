import { createContext, useContext, useState } from 'react';
import { Tenant } from '../../interfaces/Tenant';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { columnsTableTenants } from './columnsTableTenants';
import { TenantsModuleActionsTable } from './TenantsModuleActionsTable';
import {
  DataTableManualReturn,
  useBasicQueryData,
  useDataTableManual,
} from '@/modules/core/hooks';
import { useDeleteTenant, useGetAllTenants } from '../../hooks';
import { UseQueryGetAllRecordsReturn } from '@/modules/core/interfaces/responses/UseQueryGetAllRecordsReturn';
import { UseMutationReturn } from '@/modules/core/interfaces/responses/UseMutationReturn';

interface TenantsModuleContextProps {
  selectedTenants: Tenant[];
  setSelectedTenants: (tenants: Tenant[]) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
  allRecords: boolean;
  setAllRecords: (value: boolean) => void;
  paramQuery: string;
  queryTenants: UseQueryGetAllRecordsReturn<Tenant>;
  dataTable: DataTableManualReturn<Tenant>;
  // mutationDeleteCrops: UseMutationReturn<UseDeleteBulkResponse, BulkRecords>;
  mutationDeleteTenant: UseMutationReturn<void, string>;
  // actionsCropsModule: Record<string, boolean>;
  // unitTypeToShowAmount: MassUnitOfMeasure;
  // setUnitTypeToShowAmount: React.Dispatch<
  //   React.SetStateAction<MassUnitOfMeasure>
  // >;
}

const TenantsModuleContext = createContext<
  TenantsModuleContextProps | undefined
>(undefined);

export const TenantsModuleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedTenants, setSelectedTenants] = useState<Tenant[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [allRecords, setAllRecords] = useState<boolean>(false);

  const { value } = useBasicQueryData();

  const {
    query: queryTenants,
    pagination,
    setPagination,
  } = useGetAllTenants({
    queryValue: value,
    all_records: false,
  });

  const columnsTable = useCreateColumnsTable<Tenant>({
    columns: columnsTableTenants,
    actions: TenantsModuleActionsTable,
  });

  const dataTable = useDataTableManual<Tenant>({
    columns: columnsTable,
    infoPagination: queryTenants.isSuccess
      ? {
          pageCount: queryTenants.data?.total_page_count ?? 0,
          rowCount: queryTenants.data?.total_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },

    rows: queryTenants.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteTenant = useDeleteTenant();

  const values: TenantsModuleContextProps = {
    selectedTenants,
    setSelectedTenants,
    searchValue,
    setSearchValue,
    allRecords,
    setAllRecords,
    dataTable,
    paramQuery: value,
    queryTenants,
    mutationDeleteTenant,
  };

  return (
    <TenantsModuleContext.Provider value={values}>
      {children}
    </TenantsModuleContext.Provider>
  );
};

export const useTenantsModuleContext = (): TenantsModuleContextProps => {
  const context = useContext(TenantsModuleContext);
  if (context === undefined) {
    throw new Error(
      'useTenantsModuleContext must be used within a TenantsModuleProvider'
    );
  }
  return context;
};
