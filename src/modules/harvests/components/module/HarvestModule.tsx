import { ScrollArea } from '@/components/ui/scroll-area';
import {
  BreadCrumb,
  ButtonCreateRecord,
  DataTableTemplate,
  ErrorLoading,
  Loading,
} from '@/modules/core/components/';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

import { createColumnsTable } from '@/modules/core/helpers/createColumnsTable';
import { useDataTableManual } from '@/modules/core/hooks';

import {
  TypeFilterDate,
  TypeFilterNumber,
} from '@/modules/core/interfaces';
import { useGetAllHarvests } from '../../hooks';
import { MODULE_HARVESTS_PATHS } from '../../routes/pathRoutes';
import columnsHarvest from './ColumnsTableHarvest';
// import { SearchBarHarvest } from '../SearchBarHarvest';

export const HarvestModule = () => {
  const [searchParams] = useSearchParams();
  const {
    crop = '',
    after_date,
    before_date,
    min_total,
    max_total,
    min_value_pay,
    max_value_pay,
  } = Object.fromEntries(searchParams.entries());

  const min_total_value = parseInt(min_total ?? '0', 10);
  const max_total_value = parseInt(max_total ?? '0', 10);

  const min_value_pay_value = parseInt(min_value_pay ?? '0', 10);
  const max_value_pay_value = parseInt(max_value_pay ?? '0', 10);

  const { query, pagination, setPagination } = useGetAllHarvests({
    crop,
    after_date,
    before_date,
    min_total: min_total_value,
    max_total: max_total_value,
    min_value_pay: min_value_pay_value,
    max_value_pay: max_value_pay_value,
  });

  const columnsTable = createColumnsTable({
    actionsInFirstColumn: true,
    columns: columnsHarvest,
    actions: [],
  });

  const { table, lengthColumns } = useDataTableManual({
    columns: columnsTable,
    data: query.data ?? [],
    rows: query.data?.rows ?? [],
    pagination,
    setPagination,
  });

  useEffect(() => {
    if (query.isSuccess) {
      query?.data?.rows.length < 1 ? toast.success('No hay datos') : null;
    }
  }, [query.isSuccess]);

  const getDateSelection = () => {
    if (after_date) return { date: after_date, type: TypeFilterDate.after };
    if (before_date)
      return { date: before_date, type: TypeFilterDate.before };
    return { date: undefined, type: undefined };
  };
  const getTotalSelection = () => {
    if (min_total_value != 0)
      return { total: min_total_value, type: TypeFilterNumber.MIN };
    if (max_total_value != 0)
      return { total: max_total_value, type: TypeFilterNumber.MAX };
    return { total: undefined, type: undefined };
  };
  const getValuePaySelection = () => {
    if (min_value_pay_value != 0)
      return {
        value_pay: min_value_pay_value,
        type: TypeFilterNumber.MIN,
      };
    if (max_value_pay_value != 0)
      return {
        value_pay: max_value_pay_value,
        type: TypeFilterNumber.MAX,
      };
    return { value_pay: undefined, type: undefined };
  };

  if (query.isLoading) {
    return <Loading />;
  }

  if (query.isError || !query.data) return <ErrorLoading />;

  // const { date, type } = getDateSelection();
  // const { total, type: typeTotal } = getTotalSelection();
  // const { value_pay, type: typeValuePay } = getValuePaySelection();

  return (
    <>
      <BreadCrumb finalItem="Cosechas" />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex justify-evenly">
          <div className="w-[400px] border-r px-5">
            <ScrollArea className="w-full h-[80vh]">
              {/* <SearchBarHarvest
                crop={crop}
                date={date}
                time_date={type}
                total={total}
                type_total={typeTotal}
                value_pay={value_pay}
                type_value_pay={typeValuePay}
              /> */}
            </ScrollArea>
          </div>
          <div>
            <div className="flex  justify-end  gap-2 w-[700px] p-1">
              <ButtonCreateRecord route={MODULE_HARVESTS_PATHS.Create} />
            </div>
            <div className="w-[700px]">
              <DataTableTemplate
                table={table}
                disabledDoubleClick={false}
                errorMessage={'No se'}
                lengthColumns={lengthColumns}
                rowCount={query.data?.rowCount ?? 0}
                isLoading={query.isLoading || query.isRefetching}
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
};

export default HarvestModule;
