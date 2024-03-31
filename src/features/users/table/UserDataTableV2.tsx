import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { SearchBar } from '@/components/common/SearchBar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { DataTableV2 } from '@/components/table/DataTableV2';
import { PlusIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { PaginationState } from '@tanstack/react-table';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getUsers } from '../UserActions';
import { columns } from './ColumnsUser';

export const UserDataTableV2 = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parameter = searchParams.get('search') || '';

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['users', { parameter, ...pagination }],
    queryFn: () =>
      getUsers({
        parameter,
        limit: pagination.pageSize,
        offset: pagination.pageIndex,
      }),
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorLoading />;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        <div className="flex flex-row items-center ">
          <SearchBar parameter={parameter} />
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  className="ml-8 bg-blue-600 rounded-full hover:bg-blue-400 "
                  onClick={() => navigate('../create')}
                >
                  <PlusIcon className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Crear</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="container py-2">
          <DataTableV2
            columns={columns}
            rows={data.rows}
            data={data}
            pagination={pagination}
            setPagination={setPagination}
          ></DataTableV2>
        </div>
      </div>
    </>
  );
};
