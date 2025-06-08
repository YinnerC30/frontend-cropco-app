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

import { FormShoppingDetail } from './details/FormShoppingDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { useFormShoppingContext } from '@/modules/shopping/hooks/context/useFormShoppingContext';
import { ShoppingDetail } from '@/modules/shopping/interfaces';
import { Row } from '@tanstack/react-table';

export const FormShoppingDataTable: React.FC = () => {
  const {
    dataTableShoppingDetail: {
      table,
      lengthColumns,
      hasSelectedRecords,
      resetSelectionRows,
    },
    readOnly,
    handleDeleteBulkShoppingDetails,
    setShoppingDetail,
    handleOpenDialog,
  } = useFormShoppingContext();

  const handleSetShoppingDetail = (data: ShoppingDetail) => {
    setShoppingDetail(data);
    handleOpenDialog();
  };

  const validateIsDisabled = (
    row: Row<any>
  ): { status: boolean; cellColorError: ErrorCell; message: string } => {
    const { deletedDate } = row.original;
    const isDisabled = deletedDate !== null;
    return {
      status: isDisabled,
      cellColorError: 'restriction',
      message: 'No se puede eliminar o modificar este registro porque...',
    };
  };

  return (
    <FormDataTableProvider
      table={table}
      disabledDoubleClick={readOnly}
      errorMessage={'Ha ocurrido un error en la tabla'}
      lengthColumns={lengthColumns}
    >
      <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
        {/* Barra */}
        <FormDataTableFilter
          placeholder={'Buscar por nombre del proveedor...'}
          nameColumnFilter={'supplier_full_name'}
          className="w-[300px] ml-10 self-start sm:self-center sm:m-0 "
        />

        {/* Botones */}
        <div className="flex justify-end w-4/5 gap-2 mr-6 sm:mr-0">
          <ButtonClearSelection
            onClick={resetSelectionRows}
            visible={hasSelectedRecords}
          />
          <ButtonDeleteBulk
            disabled={readOnly}
            onClick={handleDeleteBulkShoppingDetails}
            visible={hasSelectedRecords}
          />
          <FormShoppingDetail />
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
            onCellDoubleClick={handleSetShoppingDetail}
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
