import { DataTableTemplate } from '@/modules/core/components';
import { useEmployeesModuleContext } from './EmployeesModuleContext';

export const EmployeesTable = () => {
  const { table, lengthColumns, query, hasPermission, isPending } =
    useEmployeesModuleContext();

  return (
    <DataTableTemplate
      errorMessage={
        !hasPermission('employees', 'find_all_employees')
          ? 'No tienes permiso para ver el listado de empleados 😢'
          : 'No hay registros.'
      }
      disabledDoubleClick={!hasPermission('employees', 'find_one_employee')}
      table={table}
      lengthColumns={lengthColumns}
      rowCount={query.data?.rowCount ?? 0}
      isLoading={query.isLoading || query.isRefetching || isPending}
    />
  );
};
