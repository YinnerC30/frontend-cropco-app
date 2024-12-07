import { Badge, Label } from '@/components';
import { useDialogStatus } from '@/components/common/DialogStatusContext';
import {
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTable } from '@/modules/core/components/form/data-table/';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableRowSelection } from '@/modules/core/components/form/data-table/FormDataTableRowSelection';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { ConvertStringToDate, FormatNumber } from '@/modules/core/helpers';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { Harvest } from '@/modules/harvests/interfaces';
import { memo, useMemo } from 'react';
import columnsHarvestProcessed from './ColumnsTableHarvestProcessed';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

const HarvestProcessedDataTable = memo(() => {
  // console.log('HarvestProcessedDataTable');
  const { data, isSuccess, setHarvestProcessed, setOpenDialog } =
    useHarvestProcessedContext();

  const { setIsActiveDialog } = useDialogStatus();

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

  const handleDoubleClick = (data: any) => {
    setHarvestProcessed(data);
    setIsActiveDialog(true);
    setOpenDialog(true);
  };

  return (
    <div>
      <div className="w-[600px]">
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
          <div className="p-1 border rounded-md">
            <FormDataTable onCellDoubleClick={handleDoubleClick} />
          </div>
          <div>
            <Label>Total de cosecha procesada:</Label>
            <Badge
              className="block h-8 my-2 text-base text-center w-28"
              variant={'cyan'}
            >
              {FormatNumber(isSuccess ? data.total_processed : 0)}
            </Badge>
            <p className="text-[0.8rem] text-muted-foreground">{''}</p>
          </div>
          <FormDataTableButtonsPagination />
          <FormDataTablePageCount />
        </FormDataTableProvider>
      </div>
    </div>
  );
});

export default HarvestProcessedDataTable;
