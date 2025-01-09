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
import { useFormPaymentContext } from '@/modules/payments/hooks/context/useFormPaymentContext';

import {
  ButtonClearSelection,
  ToolTipTemplate,
} from '@/modules/core/components';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { CircleDollarSignIcon } from 'lucide-react';
import { toast } from 'sonner';
import { ActionsTablePaymentsPendingHarvest } from '../../columns/ActionsTablePaymentsPendingHarvest';
import { columnsPaymentsPendingHarvest } from '../../columns/ColumnsTablePaymentsPendingHarvest';

export const FormPaymentHarvestsPendingDataTable: React.FC = () => {
  const { paymentsState, readOnly, addRecordToPay } = useFormPaymentContext();

  const columnsTable = useCreateColumnsTable({
    columns: columnsPaymentsPendingHarvest,
    actions: ActionsTablePaymentsPendingHarvest,
    hiddenActions: readOnly,
  });

  const {
    table,
    lengthColumns,
    resetSelectionRows,
    hasSelectedRecords,
    getDataOfRowsSelected,
  } = useDataTableGeneric<HarvestDetail>({
    columns: columnsTable,
    rows: paymentsState.current_data.harvests_detail,
  });

  const handleBulkAddRecordsToPay = () => {
    const arrayRecords = getDataOfRowsSelected() as HarvestDetail[];
    for (const record of arrayRecords) {
      addRecordToPay({ ...record, date: record.harvest.date, type: 'harvest' });
    }
    resetSelectionRows();
    toast.success('Registros añadidos a la lista de pago');
  };

  return (
    <>
      <Label>Pagos de cosecha pendientes:</Label>
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
            {/* Boton pagar todo */}
            <ToolTipTemplate content={'Agregar a lista de pago'}>
              <Button
                type="button"
                className={`${''} ${!hasSelectedRecords ? 'hidden' : ''} `}
                variant="outline"
                size="icon"
                disabled={false}
                onClick={handleBulkAddRecordsToPay}
              >
                <CircleDollarSignIcon className="w-4 h-4" />
                <span className="sr-only">Pagar todo</span>
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
