import { PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  BasicSearchBar,
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from '../../core/components';
import { BreadCrumb } from '../../core/components/BreadCrumb';
import { useGetAllCrops } from '../hooks/useGetAllCrops';
import { columnsTableCrops } from './ColumnsTableCrops';

export const CropsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get('search') || '';

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter,
    allRecords: false,
  });

  if (query.isLoading) return <Loading />;

  if (query.isError || !query.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={'Cultivos'} />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[1000px] p-1">
          {/* TODO: Implementar filtros por número de unidades, fecha de creación y eliminación */}
          <BasicSearchBar query={searchParameter} />
          <ToolTipTemplate content={'Crear'}>
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate('../create')}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>
        </div>
        <div className="w-[1000px]">
          <DataTable
            columns={columnsTableCrops}
            rows={query.data?.rows ?? 0}
            data={query.data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default CropsModule;
