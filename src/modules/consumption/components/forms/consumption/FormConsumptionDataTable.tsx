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

import { FormConsumptionDetail } from '../consumption/details/FormConsumptionDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';

export const FormConsumptionDataTable = () => {
  const {
    table,
    readOnly,
    lengthColumns,
    handleDeleteBulkConsumptionDetails,
    hasSelectedRecords,
    setConsumptionDetail,
    handleOpenDialog,
    resetSelectionRows,
  } = useFormConsumptionContext();

  const handleSetConsumptionDetail = (data: any) => {
    setConsumptionDetail(data);
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
          placeholder={'Buscar por nombre del cultivo...'}
          nameColumnFilter={'supply_name'}
          className="w-[250px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex justify-end sm:w-full gap-2 sm:m-0 w-[80%]">
          <ButtonClearSelection
            onClick={resetSelectionRows}
            visible={hasSelectedRecords}
          />
          <ButtonDeleteBulk
            disabled={readOnly}
            onClick={handleDeleteBulkConsumptionDetails}
            visible={hasSelectedRecords}
          />
          <FormConsumptionDetail />
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
            onCellDoubleClick={handleSetConsumptionDetail}
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