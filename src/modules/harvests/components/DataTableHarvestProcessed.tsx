import {
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTable } from '@/modules/core/components/form/data-table/';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { memo } from 'react';
import columnsHarvestProcessed from './columns/ColumnsTableHarvestProcessed';

interface Props {
  data: any;
}

const DataTableHarvestProcessed = memo(({ data }: Props) => {
  const { table, lengthColumns } = useDataTableGeneric({
    columns: columnsHarvestProcessed,
    data,
  });

  return (
    <FormDataTableProvider
      table={table}
      disabledDoubleClick={false}
      errorMessage={'Esta vaina tiene errores!!'}
      lengthColumns={lengthColumns}
    >
      <div className="flex justify-between my-2">
        <div className="flex flex-col gap-2">
          <FormDataTableRowCount />
          <FormDataTableRowSelection />
        </div>
        <FormDataTableSelectPageSize />
      </div>
      <FormDataTable onCellDoubleClick={(data) => console.log(data)} />
      <FormDataTableButtonsPagination />
      <FormDataTablePageCount />
    </FormDataTableProvider>
  );
});

export default DataTableHarvestProcessed;
