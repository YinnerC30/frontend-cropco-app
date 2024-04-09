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
      <div className="flex flex-col items-center justify-center my-4">
        <div className="flex items-center justify-center">
          <SearchBar search={searchParameter} />
          <ToolTipTemplate content={'Crear'}>
            <Button
              className="ml-4 bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate('../create')}
            >
              <PlusIcon className="w-4 h-4" />
            </Button>
          </ToolTipTemplate>
        </div>

        <div className="container py-2">
          <DataTable
            columns={columns}
            rows={query.data.rows}
            data={query.data}
            pagination={pagination}
            setPagination={setPagination}
          ></DataTable>
        </div>
      </div>
    </>
  );
};

export default CropsModule;
