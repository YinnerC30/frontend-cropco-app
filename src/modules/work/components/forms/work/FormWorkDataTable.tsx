import {
  ButtonClearSelection,
  ButtonDeleteBulk,
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

import { FormWorkDetail } from './details/FormWorkDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { useFormWorkContext } from '@/modules/work/hooks/context/useFormWorkContext';

export const FormWorkDataTable = () => {
  const {
    table,
    readOnly,
    lengthColumns,
    handleDeleteBulkWorkDetails,
    hasSelectedRecords,
    setWorkDetail,
    handleOpenDialog,
    resetSelectionRows,
  } = useFormWorkContext();

  const handleSetWorkDetail = (data: any) => {
    setWorkDetail(data);
    handleOpenDialog();
  };

  return (
    <FormDataTableProvider
      table={table}
      disabledDoubleClick={readOnly}
      errorMessage={'Esta vaina tiene errores!!'}
      lengthColumns={lengthColumns}
    >
      <div className="flex flex-col items-center justify-center gap-2 ">
        {/* Barra */}
        <FormDataTableFilter
          placeholder={'Buscar por nombre de empleado...'}
          nameColumnFilter={'employee_first_name'}
          className="w-[250px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex w-full gap-2 pl-2 ml-16 sm:justify-end pr-7 sm:m-0">
          <ButtonClearSelection
            onClick={resetSelectionRows}
            visible={hasSelectedRecords}
          />
          <ButtonDeleteBulk
            disabled={readOnly}
            onClick={handleDeleteBulkWorkDetails}
            visible={hasSelectedRecords}
          />
          <FormWorkDetail />
        </div>

        {/* Paginacion */}
        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
          <FormDataTableRowCount />
          <FormDataTableRowSelection />
          <FormDataTableSelectPageSize />
        </div>

        {/* Tabla */}
        <ScrollArea
          className="h-max-[460px] w-[95%] sm:w-full p-1 border rounded-sm self-start"
          type="auto"
        >
          <FormDataTable
            onCellDoubleClick={handleSetWorkDetail}
            disabledDoubleClick={readOnly}
          />

          <ScrollBar className="mt-2" orientation="horizontal" forceMount />
        </ScrollArea>

        <FormDataTableButtonsPagination />
        <FormDataTablePageCount />
      </div>
    </FormDataTableProvider>
  );
};