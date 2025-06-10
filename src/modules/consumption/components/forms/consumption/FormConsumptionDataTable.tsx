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

import { FormConsumptionDetail } from '../consumption/details/FormConsumptionDetail';

import { ScrollArea, ScrollBar } from '@/components';
import { useFormConsumptionContext } from '@/modules/consumption/hooks/context/useFormConsumptionContext';
import { ConsumptionDetails } from '@/modules/consumption/interfaces';
import React from 'react';
import { Row } from '@tanstack/react-table';

export const FormConsumptionDataTable: React.FC = () => {
  const {
    dataTableConsumptionDetail: {
      table,
      lengthColumns,
      hasSelectedRecords,
      resetSelectionRows,
    },
    readOnly,
    handleDeleteBulkConsumptionDetails,
    setConsumptionDetail,
    handleOpenDialog,
  } = useFormConsumptionContext();

  const handleSetConsumptionDetail = (data: ConsumptionDetails) => {
    setConsumptionDetail(data);
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
          placeholder={'Buscar por nombre del cultivo...'}
          nameColumnFilter={'supply_name'}
          className="w-[280px] ml-10 self-start sm:self-center sm:m-0"
        />

        {/* Botones */}
        <div className="flex justify-end w-4/5 gap-2 mr-6 sm:mr-0">
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
          className="h-max-[460px] w-[85%] sm:w-full p-1 border rounded-sm self-start"
          type="auto"
        >
          <FormDataTable
            onCellDoubleClick={handleSetConsumptionDetail}
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
