import {
  ButtonClearSelection,
  ButtonDeleteBulk,
} from '@/modules/core/components';
import {
  ErrorCell,
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableFilter,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { FormHarvestDetail } from './details/FormHarvestDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { Row } from '@tanstack/react-table';

export const FormHarvestDataTable: React.FC = () => {
  const {
    dataTableHarvestDetail,
    readOnly,
    handleDeleteBulkHarvestDetails,
    setHarvestDetail,
    handleOpenDialog,
  } = useFormHarvestContext();

  const handleSetHarvestDetail = (data: HarvestDetail) => {
    setHarvestDetail(data);
    handleOpenDialog();
  };

  const validateIsDisabled = (
    row: Row<any>
  ): { status: boolean; cellColorError: ErrorCell; message: string } => {
    const { deletedDate, payment_is_pending } = row.original;
    const isDisabled = deletedDate !== null || payment_is_pending === false;
    return {
      status: isDisabled,
      cellColorError: payment_is_pending === false ? 'restriction' : 'caution',
      message:
        payment_is_pending === false
          ? 'No se puede eliminar o modificar este registro porque ya ha sido pagado'
          : 'No se puede modificar este registro porque el empleado ya ha sido eliminado',
    };
  };

  return (
    <FormDataTableProvider
      table={dataTableHarvestDetail.table}
      disabledDoubleClick={readOnly}
      errorMessage={'Ha ocurrido un error en la tabla'}
      lengthColumns={dataTableHarvestDetail.lengthColumns}
    >
      <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
        {/* Barra */}
        <FormDataTableFilter
          placeholder={'Buscar por nombre de empleado...'}
          nameColumnFilter={'employee_full_name'}
          className="w-[280px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex justify-end w-4/5 gap-2 mr-6 sm:mr-0">
          <ButtonClearSelection
            onClick={dataTableHarvestDetail.resetSelectionRows}
            visible={dataTableHarvestDetail.hasSelectedRecords}
          />
          <ButtonDeleteBulk
            disabled={readOnly}
            onClick={handleDeleteBulkHarvestDetails}
            visible={dataTableHarvestDetail.hasSelectedRecords}
          />
          <FormHarvestDetail />
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
            onCellDoubleClick={handleSetHarvestDetail}
            disabledDoubleClick={readOnly}
            validationDisabledCell={validateIsDisabled}
          />

          <ScrollBar className="mt-2" orientation="horizontal" forceMount />
        </ScrollArea>

        <FormDataTableButtonsPagination />
        <FormDataTablePageCount />
      </div>
    </FormDataTableProvider>
  );
};
