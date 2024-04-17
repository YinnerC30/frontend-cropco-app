import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { SearchBar } from '@/components/common/SearchBar';
import { ToolTipTemplate } from '@/components/common/ToolTipTemplate';
import { DataTable } from '@/components/table/DataTable';
import { PlusIcon } from 'lucide-react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import columns from './ColumnsCrop';
import { useGetAllCrops } from './hooks/useGetAllCrops';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CropsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get('search') || '';

  const { query, pagination, setPagination } = useGetAllCrops({
    searchParameter,
    allRecords: false,
  });

  if (query.isLoading) return <Loading />;

  if (query.isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <Label className="text-2xl">Cultivos</Label>

      <Separator className="my-2" />
      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[1000px] p-1">
          <SearchBar search={searchParameter} />
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
            columns={columns}
            rows={query.data.rows}
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
