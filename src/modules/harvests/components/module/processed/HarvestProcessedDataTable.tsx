import { Badge, Label, ScrollArea, ScrollBar } from '@/components';
import {
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTable } from '@/modules/core/components/form/data-table/';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { FormatNumber } from '@/modules/core/helpers';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { HarvestProcessed } from '@/modules/harvests/interfaces';
import { memo, useMemo } from 'react';
import columnsHarvestProcessed from './ColumnsTableHarvestProcessed';
import { FormHarvestProcessed } from './FormHarvestProcessed';
import { useHarvestProcessedContext } from './HarvestProcessedContext';

const HarvestProcessedDataTable: React.FC = memo(() => {
  const {
    queryOneHarvest: { data, isSuccess },
    setHarvestProcessed,
    setOpenDialog,
  } = useHarvestProcessedContext();

  const finalData: HarvestProcessed[] = useMemo(() => {
    return isSuccess
      ? data?.processed!.map((item: HarvestProcessed) => {
          return {
            ...item,
            crop: data.crop,
            harvest: { id: data.id, date: data.date },
          } as HarvestProcessed;
        })
      : [];
  }, [data]);

  const { table, lengthColumns } = useDataTableGeneric<HarvestProcessed>({
    columns: columnsHarvestProcessed,
    rows: finalData,
  });

  const handleDoubleClick = (data: any) => {
    setHarvestProcessed(data);
    setOpenDialog(true);
  };

  return (
    <FormDataTableProvider
      table={table}
      disabledDoubleClick={false}
      errorMessage={'Esta vaina tiene errores!!'}
      lengthColumns={lengthColumns}
    >
      <div className="flex flex-col items-center justify-center gap-2 ">
        <Label>
          A continuación registre de forma individual la cosecha procesada que
          ha salido hasta el momento:
        </Label>
        <div className="self-end mr-2">
          <FormHarvestProcessed />
        </div>
        <div className="flex flex-row items-center w-full gap-2 justify-evenly">
          <FormDataTableRowCount />

          <FormDataTableSelectPageSize />
        </div>

        <ScrollArea
          className="h-max-[460px] w-[85%] sm:w-full p-1 border rounded-sm self-start"
          type="auto"
        >
          <FormDataTable onCellDoubleClick={handleDoubleClick} />

          <ScrollBar className="mt-2" orientation="horizontal" forceMount />
        </ScrollArea>
        <div className="self-start">
          <Label>Total de cosecha procesada:</Label>
          <Badge
            className="block h-8 my-2 text-base text-center w-28"
            variant={'cyan'}
          >
            {FormatNumber(isSuccess ? data?.total_processed ?? 0 : 0)}
          </Badge>
          <p className="text-[0.8rem] text-muted-foreground">{''}</p>
        </div>
        <FormDataTableButtonsPagination />
        <FormDataTablePageCount />
      </div>
    </FormDataTableProvider>
  );
});

export default HarvestProcessedDataTable;
