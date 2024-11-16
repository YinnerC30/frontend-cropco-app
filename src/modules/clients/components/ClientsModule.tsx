import { Button } from '@/components/ui/button';

import { PlusIcon } from '@radix-ui/react-icons';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { ScrollArea } from '@/components/ui/scroll-area';
import { BreadCrumb } from '@/modules/core/components/BreadCrumb';
import { dowloadPDF } from '@/modules/core/helpers/utilities/dowloadPDF';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { toast } from 'sonner';
import {
  BasicSearchBar,
  DataTable,
  ErrorLoading,
  Loading,
  ToolTipTemplate,
} from '../../core/components';
import { useGetAllClients } from '../hooks/useGetAllClients';
import { useGetReportClients } from '../hooks/useGetReportClients';
import { columnsTableClients } from './ColumnsTableClients';
import { ExportInformation } from './ExportInformation';

export const ClientsModule = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchParameter = searchParams.get('search') || '';

  const [executeQueryReport, setExecuteQueryReport] = useState(false);

  const queryClient = useQueryClient();

  const queryReport = useGetReportClients();

  if (executeQueryReport && queryReport.isSuccess) {
    dowloadPDF(queryReport.data, 'clients-report');
    queryClient.invalidateQueries({ queryKey: ['report'] });
    setExecuteQueryReport(false);
    toast.success('Se ha descargado el documento');
  }
  if (queryReport.isError) {
    toast.error('Hubo un problema, no se pudo descargar el documento 😢');
  }

  const handleDownload = () => {
    setExecuteQueryReport(true);
  };

  const {
    query: queryClients,
    pagination,
    setPagination,
  } = useGetAllClients(searchParameter);

  if (queryClients.isLoading || queryReport.isLoading) return <Loading />;

  if (queryClients.isError || !queryClients.data) {
    return <ErrorLoading />;
  }

  return (
    <>
      <BreadCrumb finalItem={`Clientes`} />

      <ScrollArea className="w-full h-[80vh]">
        <div className="flex items-center justify-between gap-2 w-[750px] p-1">
          <BasicSearchBar query={searchParameter} />
          <ToolTipTemplate content={'Crear'}>
            <Button
              className="bg-blue-600 rounded-full hover:bg-blue-400"
              onClick={() => navigate('../create')}
            >
              <PlusIcon className="w-4 h-4 mr-2" /> Crear
            </Button>
          </ToolTipTemplate>

          <ExportInformation
            actionDowloadPDF={handleDownload}
            isLoading={queryReport.isLoading}
          />
        </div>
        <div className="w-[750px]">
          <DataTable
            columns={columnsTableClients}
            rows={queryClients.data?.rows ?? 0}
            data={queryClients.data}
            pagination={pagination}
            setPagination={setPagination}
          />
        </div>
      </ScrollArea>
    </>
  );
};

export default ClientsModule;
