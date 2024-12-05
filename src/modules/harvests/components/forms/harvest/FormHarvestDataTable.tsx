import {
  ButtonClearSelection,
  ButtonDeleteBulk,
} from '@/modules/core/components';
import {
  FormDataTable,
  FormDataTableActions,
  FormDataTableButtonsPagination,
  FormDataTableFilter,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { useFormHarvestContext } from '@/modules/harvests/hooks';
import { FormHarvestDetail } from './FormHarvestDetail';

export const FormHarvestDataTable = () => {
  const {
    table,
    readOnly,
    lengthColumns,
    handleDeleteBulkHarvestDetails,
    hasSelectedRecords,
    setHarvestDetail,
    handleOpenDialog,
    resetSelectionRows,
  } = useFormHarvestContext();

  const handleSetHarvestDetail = (data: any) => {
    setHarvestDetail(data);
    handleOpenDialog();
  };

  return (
    <div className="w-[800px]">
      <FormDataTableProvider
        table={table}
        disabledDoubleClick={readOnly}
        errorMessage={'Esta vaina tiene errores!!'}
        lengthColumns={lengthColumns}
      >
        <FormDataTableFilter
          placeholder={'Buscar por nombre de empleado...'}
          nameColumnFilter={'employee_first_name'}
        >
          <FormDataTableActions>
            <ButtonClearSelection
              onClick={resetSelectionRows}
              visible={hasSelectedRecords}
            />
            <ButtonDeleteBulk
              disabled={readOnly}
              onClick={handleDeleteBulkHarvestDetails}
              visible={hasSelectedRecords}
            />
            <FormHarvestDetail />
          </FormDataTableActions>
        </FormDataTableFilter>

        <div className="flex justify-between my-2">
          <div className="flex flex-col gap-2">
            <FormDataTableRowCount />
            <FormDataTableRowSelection />
          </div>
          <FormDataTableSelectPageSize />
        </div>
        <FormDataTable onCellDoubleClick={handleSetHarvestDetail} />
        <FormDataTableButtonsPagination />
        <FormDataTablePageCount />
      </FormDataTableProvider>
    </div>
  );
};
