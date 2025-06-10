import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';

import { Button, ScrollArea, ScrollBar } from '@/components';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';

import {
  ButtonClearSelection,
  ToolTipTemplate,
} from '@/modules/core/components';
import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';
import { RecordToPay } from '@/modules/payments/interfaces/RecordToPay';
import { Trash2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { ActionsTablePaymentsToPay } from '../../columns/ActionsTablePaymentsToPay';
import { columnsPaymentsToPay } from '../../columns/ColumnsTablePaymentsToPay';

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
      <FormDataTableProvider
        table={table}
        disabledDoubleClick={true}
        errorMessage={'Ha ocurrido un error en la tabla'}
        lengthColumns={lengthColumns}
      >
        <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
          {/* Botones */}
          <div className="flex justify-end w-4/5 gap-2 mr-6 sm:mr-0">
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
            className="h-max-[460px] w-[85%] sm:w-full p-1 border rounded-sm self-start"
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
    </>
  );
};
