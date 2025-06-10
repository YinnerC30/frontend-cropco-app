import {
  ButtonClearSelection,
  ButtonDeleteBulk,
} from '@/modules/core/components';
import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableFilter,
  FormDataTableProvider,
  ValidationCellReturn,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';

import { FormSaleDetail } from './details/FormSaleDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { useFormSaleContext } from '@/modules/sales/hooks';
import { SaleDetail } from '@/modules/sales/interfaces';
import { Row } from '@tanstack/react-table';
import React from 'react';

export const FormSaleDataTable: React.FC = () => {
  const {
    dataTableSaleDetail: {
      table,
      lengthColumns,
      hasSelectedRecords,
      resetSelectionRows,
    },
    readOnly,
    handleDeleteBulkSaleDetails,
    setSaleDetail,
    handleOpenDialog,
  } = useFormSaleContext();

  const handleSetSaleDetail = (data: SaleDetail) => {
    setSaleDetail(data);
    handleOpenDialog();
  };

  const validateIsDisabled = (row: Row<any>): ValidationCellReturn => {
    const { deletedDate } = row.original;
    const isDisabled = deletedDate !== null;
    return {
      status: isDisabled,
      cellColorError: 'restriction',
      message: 'No se puede modificar o eliminar este registro',
    };
  };

  return (
    <FormDataTableProvider
      table={table}
      disabledDoubleClick={readOnly}
      errorMessage={'Ha ocurrido un error en la tabla'}
      lengthColumns={lengthColumns}
    >
      <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-11/12">
        {/* Barra */}
        <FormDataTableFilter
          placeholder={'Buscar por nombre del cliente...'}
          nameColumnFilter={'client_full_name'}
          className="w-[270px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex justify-end w-4/5 gap-2 mr-6 sm:mr-0">
          <ButtonClearSelection
            onClick={resetSelectionRows}
            visible={hasSelectedRecords}
          />
          <ButtonDeleteBulk
            disabled={readOnly}
            onClick={handleDeleteBulkSaleDetails}
            visible={hasSelectedRecords}
          />
          <FormSaleDetail />
        </div>

        {/* Paginacion */}
        <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
          <FormDataTableRowCount />
          <FormDataTableRowSelection />
          <FormDataTableSelectPageSize />
        </div>

        {/* Tabla */}
        <ScrollArea
          className="h-max-[460px] w-[85%] sm:w-auto p-1 border rounded-sm self-start"
          type="auto"
        >
          <FormDataTable
            onCellDoubleClick={handleSetSaleDetail}
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
