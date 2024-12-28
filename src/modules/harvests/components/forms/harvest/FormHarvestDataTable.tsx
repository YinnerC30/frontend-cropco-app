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
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { FormHarvestDetail } from './details/FormHarvestDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { HarvestDetail } from '@/modules/harvests/interfaces';

export const FormHarvestDataTable = () => {
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

  return (
    <FormDataTableProvider
      table={dataTableHarvestDetail.table}
      disabledDoubleClick={readOnly}
      errorMessage={'Esta vaina tiene errores!!'}
      lengthColumns={dataTableHarvestDetail.lengthColumns}
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
          className="h-max-[460px] w-[95%] sm:w-full p-1 border rounded-sm self-start"
          type="auto"
        >
          <FormDataTable
            onCellDoubleClick={handleSetHarvestDetail}
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
