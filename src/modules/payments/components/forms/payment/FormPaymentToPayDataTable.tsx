import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';

import { Button, Label, ScrollArea, ScrollBar } from '@/components';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import {
  ButtonClearSelection,
  ToolTipTemplate,
} from '@/modules/core/components';
import { ActionsTablePaymentsToPay } from '../../columns/ActionsTablePaymentsToPay';
import { columnsPaymentsToPay } from '../../columns/ColumnsTablePaymentsToPay';
import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';
import React from 'react';
import { RecordToPay } from '@/modules/payments/interfaces/RecordToPay';
import { toast } from 'sonner';
import { Trash2 } from 'lucide-react';

export const FormPaymentToPayDataTable: React.FC = () => {
  const { paymentsState, readOnly, removeRecordToPay } =
    useFormPaymentContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsPaymentsToPay,
    actions: ActionsTablePaymentsToPay,
    hiddenActions: readOnly,
  });

  const {
    table,
    lengthColumns,
    resetSelectionRows,
    hasSelectedRecords,
    getDataOfRowsSelected,
  } = useDataTableGeneric({
    columns: columnsTable,
    rows: paymentsState.records_to_pay,
  });

  const handleBulkRemoveRecordsToPay = () => {
    const arrayRecords = getDataOfRowsSelected() as RecordToPay[];
    for (const record of arrayRecords) {
      removeRecordToPay(record);
    }
    resetSelectionRows();
    toast.success('Registros eliminados de la lista de pago');
  };

  return (
    <>
      <Label>Pagos a facturar:</Label>
      <FormDataTableProvider
        table={table}
        disabledDoubleClick={true}
        errorMessage={'Esta vaina tiene errores!!'}
        lengthColumns={lengthColumns}
      >
        <div className="flex flex-col items-center justify-center gap-2 ">
          {/* Botones */}
          <div className="flex justify-end sm:w-full gap-2 sm:m-0 w-[80%] h-12">
            <ButtonClearSelection
              onClick={resetSelectionRows}
              visible={hasSelectedRecords}
            />
            <ToolTipTemplate content={'Quitar de la lista de pago'}>
              <Button
                type="button"
                className={`${''} ${!hasSelectedRecords ? 'hidden' : ''} `}
                variant="outline"
                size="icon"
                disabled={false}
                onClick={handleBulkRemoveRecordsToPay}
              >
                <Trash2 className="w-4 h-4" />
                <span className="sr-only">Eliminar</span>
              </Button>
            </ToolTipTemplate>
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
