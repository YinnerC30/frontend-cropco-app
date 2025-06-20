import { useDataTableManual } from "@/modules/core/hooks";
import { useBasicQueryData } from "@/modules/core/hooks/";
import { useCreateColumnsTable } from "@/modules/core/hooks/data-table/useCreateColumnsTable";
import React, { createContext, useEffect } from "react";


import { useDeleteAdministrator } from "../../hooks/mutations/useDeleteAdministrator";
import { useDeleteBulkAdministrators } from "../../hooks/mutations/useDeleteBulkAdministrators";
import { useGetAllAdministrators } from "../../hooks/queries/useGetAllAdministrators";
import { Administrator } from "../../interfaces/Administrator";
import { AdministratorsModuleContextProps } from "../../interfaces/context/AdministratorsModuleContextProps";
import { AdministratorsModuleActionsTable } from "./AdministratorsModuleActionsTable";
import { columnsTableAdministrators } from "./columnsTableAdministrators";

export const AdministratorsModuleContext = createContext<
  AdministratorsModuleContextProps | undefined
>(undefined);

export const AdministratorsModuleProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { value } = useBasicQueryData();

  const {
    query: queryAdministrators,
    pagination,
    setPagination,
  } = useGetAllAdministrators({
    value: value,
  });

  // const { getActionsModule } = useAuthContext();

  // const actionsAdministratorsModule = useMemo(() => getActionsModule("users"), []);

  const columnsTable = useCreateColumnsTable({
    columns: columnsTableAdministrators,
    actions: AdministratorsModuleActionsTable,
  });

  const dataTable = useDataTableManual<Administrator>({
    columns: columnsTable as any,
    infoPagination: queryAdministrators.isSuccess
      ? {
          pageCount: queryAdministrators.data?.total_page_count ?? 0,
          rowCount: queryAdministrators.data?.current_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryAdministrators.data?.records ?? [],
    pagination,
    setPagination,
  });

  const mutationDeleteAdministrators = useDeleteBulkAdministrators();
  const mutationDeleteAdministrator = useDeleteAdministrator();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue = {
    value,
    queryAdministrators,
    dataTable,
    mutationDeleteAdministrators,
    mutationDeleteAdministrator,
    // actionsAdministratorsModule,
    paramQuery: value,
  };

  return (
    <AdministratorsModuleContext.Provider value={contextValue}>
      {children}
    </AdministratorsModuleContext.Provider>
  );
};
