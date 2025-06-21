import { ScrollArea, ScrollBar } from '@/components';
import {
  ActionCopyIdRecord,
  ButtonRefetchData,
  DropDownMenuActions,
} from '@/modules/core/components';
import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableFilter,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { columnsTableUsers } from '@/modules/users/components';
import { User } from '@/modules/users/interfaces';
import { Row } from '@tanstack/react-table';
import { FormTenantUser } from './FormTenantUser';

interface Props {
  tenantId: string;
  data: User[];
  refetchAction: () => Promise<void>;
}

export const TenantUsersTable = ({ tenantId, data, refetchAction }: Props) => {
  const columnsTable = useCreateColumnsTable({
    columns: columnsTableUsers,
    actions: ActionsTenantUsersTable,
  });

  const dataTable = useDataTableGeneric<User>({
    columns: columnsTable,
    rows: data,
  });

  return (
    <div>
      <FormDataTableProvider
        table={dataTable.table}
        disabledDoubleClick={true}
        errorMessage={'Ha ocurrido un error en la tabla'}
        lengthColumns={dataTable.lengthColumns}
      >
        <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
          {/* Barra */}
          <FormDataTableFilter
            placeholder={'Buscar por nombre de empleado...'}
            nameColumnFilter={'first_name'}
            className="w-[380px] ml-10 self-start sm:self-center sm:m-0"
          />

          {/* Botones */}
          <div className="flex justify-between w-4/5 gap-2 mr-6 sm:mr-0">
            <ButtonRefetchData
              onClick={async () => {
                await refetchAction();
              }}
              disabled={false}
            />
            <FormTenantUser tenantId={tenantId} />
          </div>

          {/* Paginacion */}
          <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
            <FormDataTableRowCount />
            <FormDataTableRowSelection />
            <FormDataTableSelectPageSize />
          </div>

          {/* Tabla */}
          <ScrollArea
            className="h-max-[460px] w-[85%] sm:w-full p-1 border rounded-sm self-start"
            type="auto"
          >
            <FormDataTable
              onCellDoubleClick={() => {}}
              disabledDoubleClick={true}
            />

            <ScrollBar className="mt-2" orientation="horizontal" forceMount />
          </ScrollArea>

          <FormDataTableButtonsPagination />
          <FormDataTablePageCount />
        </div>
      </FormDataTableProvider>
    </div>
  );
};

const ActionsTenantUsersTable = ({ row }: { row: Row<User> }) => {
  const user: User = row.original;
  return (
    <DropDownMenuActions>
      <ActionCopyIdRecord id={user?.id!} />
    </DropDownMenuActions>
  );
};
