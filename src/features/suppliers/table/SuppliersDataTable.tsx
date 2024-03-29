import { DataTable } from '@/components/table/DataTable';

import { ErrorLoading } from '@/components/common/ErrorLoading';
import { Loading } from '@/components/common/Loading';
import { SearchBar } from '@/components/form/SearchBar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { getSuppliers } from '@/services/cropco/SupplierMethods';
import { PlusIcon } from '@radix-ui/react-icons';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { columns } from './ColumnsSupplier';

export const SupplierDataTable = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const parameter = searchParams.get('search') || '';

  const {
    isLoading,
    data = [],
    isError,
  } = useQuery({
    queryKey: ['suppliers', parameter],
    queryFn: () => getSuppliers({ parameter: parameter || '' }),
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
          <DataTable columns={columns} data={data}></DataTable>
        </div>
      </div>
    </>
  );
};
