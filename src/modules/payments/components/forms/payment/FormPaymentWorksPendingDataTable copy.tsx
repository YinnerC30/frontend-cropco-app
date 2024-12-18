import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';

import { Label, ScrollArea, ScrollBar } from '@/components';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';

import { ButtonClearSelection } from '@/modules/core/components';
import { ActionsTablePaymentsPendingWork } from '../../columns/ActionsTablePaymentsPendingWork';
import { columnsPaymentsPendingWork } from '../../columns/ColumnsTablePaymentsPendingWork';

export const FormPaymentWorksPendingDataTable = () => {
  const { pendingWorks,readOnly } = useFormPaymentContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsPaymentsPendingWork,
    actions: ActionsTablePaymentsPendingWork,
    hiddenActions: readOnly,
  });

  const { table, lengthColumns, resetSelectionRows, hasSelectedRecords } =
    useDataTableGeneric({
      columns: columnsTable,
      data: pendingWorks,
    });

  return (
    <>
      <Label>Pagos de trabajo pendientes:</Label>
      <FormDataTableProvider
        table={table}
        disabledDoubleClick={true}
        errorMessage={'Esta vaina tiene errores!!'}
        lengthColumns={lengthColumns}
      >
        <div className="flex flex-col items-center justify-center gap-2 ">
          {/* Botones */}
          <div className="flex justify-end sm:w-full gap-2 sm:m-0 w-[80%]">
            <ButtonClearSelection
              onClick={resetSelectionRows}
              visible={hasSelectedRecords}
            />
            {/* <ButtonDeleteBulk
              disabled={readOnly}
              onClick={handleDeleteBulkPaymentDetails}
              visible={hasSelectedRecords}
            /> */}
            {/* <FormPaymentDetail /> */}
          </div>

          {/* Paginacion */}
          <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
            <FormDataTableRowCount />
            <FormDataTableRowSelection />
            <FormDataTableSelectPageSize />
          </div>

          {/* Tabla */}
          <ScrollArea
            className="h-max-[460px] w-screen sm:w-full p-1 border rounded-sm self-start"
            type="auto"
          >
            <FormDataTable
              onCellDoubleClick={(data) => console.log(data)}
              disabledDoubleClick={true}
            />

            <ScrollBar className="mt-2" orientation="horizontal" forceMount />
          </ScrollArea>

          <FormDataTableButtonsPagination />
          <FormDataTablePageCount />
        </div>
      </FormDataTableProvider>
    </>
  );
};