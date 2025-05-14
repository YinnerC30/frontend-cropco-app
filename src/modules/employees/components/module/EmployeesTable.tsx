import { DataTableTemplate } from '@/modules/core/components';
import { useEmployeesModuleContext } from '../../hooks';

export const EmployeesTable: React.FC = () => {
  const {
    dataTable,
    actionsEmployeesModule,
    queryEmployees,
    mutationDeleteEmployees,
    mutationDeleteEmployee
  } = useEmployeesModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !actionsEmployeesModule['find_all_employees']
          ? 'No tienes permiso para ver el listado de empleados 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!actionsEmployeesModule['find_one_employee']}
      table={dataTable.table}
      lengthColumns={dataTable.lengthColumns}
      rowCount={queryEmployees.data?.total_row_count ?? 0}
      isLoading={
        queryEmployees.isLoading ||
        queryEmployees.isRefetching ||
        mutationDeleteEmployees.isPending || 
        mutationDeleteEmployee.isPending
      }
    />
  );
};
