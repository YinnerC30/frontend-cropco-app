import { useAuthContext } from "@/auth";
import { useDataTableManual } from "@/modules/core/hooks";
import { useBasicQueryData } from "@/modules/core/hooks/";
import { useCreateColumnsTable } from "@/modules/core/hooks/data-table/useCreateColumnsTable";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  useDeleteBulkEmployees,
  useDeleteEmployee,
  useGetAllEmployees,
} from "../../hooks";
import { useGetCertificationEmployee } from "../../hooks/queries/useGetCertificationEmployee";
import { Employee } from "../../interfaces/Employee";
import { EmployeesModuleContextProps } from "../../interfaces/EmployeesModuleContextProps";
import { EmployeesModuleActionsTable } from "./EmployeesModuleActionsTable";
import { columnsTableEmployees } from "./columnsTableEmployees";

export const EmployeesModuleContext = createContext<
  EmployeesModuleContextProps | undefined
>(undefined);

export const EmployeesModuleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { value } = useBasicQueryData();

  const {
    query: queryEmployees,
    pagination,
    setPagination,
  } = useGetAllEmployees({
    queryValue: value,
    all_records: false,
  });

  const { getActionsModule } = useAuthContext();

  const actionsEmployeesModule = useMemo(
    () => getActionsModule("employees"),
    []
  );

  const columnsTable = useCreateColumnsTable<Employee>({
    columns: columnsTableEmployees,
    actions: EmployeesModuleActionsTable,
  });

  const dataTable = useDataTableManual<Employee>({
    columns: columnsTable,
    infoPagination: queryEmployees.isSuccess
      ? {
          pageCount: queryEmployees.data?.total_page_count ?? 0,
          rowCount: queryEmployees.data?.current_row_count ?? 0,
        }
      : { pageCount: 0, rowCount: 0 },
    rows: queryEmployees.data?.records ?? [],
    pagination,
    setPagination,
  });

  const [userIdCertification, setUserIdCertification] = useState("");
  const [executeQuery, setExecuteQuery] = useState(false);

  const queryGetCertification = useGetCertificationEmployee({
    userId: userIdCertification,
    stateQuery: executeQuery,
    actionPDF: "DownloadPDF",
    actionOnSuccess: () => {
      setExecuteQuery(false);
      setUserIdCertification("");
    },
  });

  const mutationDeleteEmployees = useDeleteBulkEmployees();
  const mutationDeleteEmployee = useDeleteEmployee();

  useEffect(() => {
    if (value.length > 0) {
      setPagination({ pageIndex: 0, pageSize: 10 });
    }
  }, [value]);

  const contextValue: EmployeesModuleContextProps = {
    paramQuery: value,
    queryEmployees,
    dataTable,
    mutationDeleteEmployees,
    mutationDeleteEmployee,
    queryGetCertification,
    userIdCertification,
    setUserIdCertification,
    setExecuteQuery,
    actionsEmployeesModule,
  };

  return (
    <EmployeesModuleContext.Provider value={contextValue}>
      {children}
    </EmployeesModuleContext.Provider>
  );
};
