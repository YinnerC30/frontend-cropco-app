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
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';

export const FormWorkDataTable: React.FC = () => {
  const {
    readOnly,
    dataTableWorkDetail: {
      table,
      lengthColumns,
      hasSelectedRecords,
      resetSelectionRows,
    },
    handleDeleteBulkWorkDetails,
    setWorkDetail,
    handleOpenDialog,
  } = useFormWorkContext();

  const handleSetWorkDetail = (data: WorkDetail) => {
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
      <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
        {/* Barra */}
        <FormDataTableFilter
          placeholder={'Buscar por nombre de empleado...'}
          nameColumnFilter={'employee_first_name'}
          className="w-[280px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex justify-end w-4/5 gap-2">
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
