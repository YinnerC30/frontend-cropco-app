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
import { useGetHarvest } from '@/modules/harvests/hooks';
import { Harvest } from '@/modules/harvests/interfaces';
import { memo, useMemo } from 'react';
import columnsHarvestProcessed from '../../columns/ColumnsTableHarvestProcessed';

const HarvestProcessedDataTable = memo(({ id }: { id: string }) => {
  // console.log('HarvestProcessedDataTable');
  const { data, isSuccess } = useGetHarvest(id!);

  const finalData = useMemo(() => {
    return isSuccess
      ? data.processed.map((item: Harvest) => {
          return {
            ...item,
            crop: data.crop,
            harvest: { id: data.id, date: data.date },
          };
        })
      : [];
  }, [data]);

  const { table, lengthColumns } = useDataTableGeneric({
    columns: columnsHarvestProcessed,
    data: finalData,
  });

  return (
    <div className="w-[800px]">
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
    </div>
  );
});

export default HarvestProcessedDataTable;
