import { ScrollArea, ScrollBar } from '@/components';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import {
  FormDataTableProvider,
  FormDataTable,
  FormDataTableButtonsPagination,
} from '../data-table';
import { FormDataTablePageCount } from '../data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '../data-table/FormDataTableRowCount';
import { FormDataTableSelectPageSize } from '../data-table/FormDataTableSelectPageSize';

interface BasicDataTableProps<T> {
  data: T[];
  columns: any[];
  actions: React.ComponentType<any>;
  hiddenCheckbox?: boolean;
  hiddenActions?: boolean;
}

export const BasicDataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  hiddenCheckbox = true,
  hiddenActions = false,
}: BasicDataTableProps<T>) => {
  const columnsTable = useCreateColumnsTable<T>({
    columns,
    actions: actions as any,
    hiddenCheckbox,
    hiddenActions,
  });

  const dataTable = useDataTableGeneric<T>({
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
          {/* Paginacion */}
          <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
            <FormDataTableRowCount />
            <FormDataTableSelectPageSize />
          </div>

          {/* Tabla */}
          <ScrollArea
            className="h-max-[460px] w-[85%] sm:w-full  p-1 border rounded-sm self-start"
            type="auto"
          >
            <FormDataTable
              onCellDoubleClick={(data) => {}}
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
