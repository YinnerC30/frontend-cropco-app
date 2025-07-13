import { useParams } from 'react-router-dom';

import { ScrollArea, ScrollBar, Separator } from '@/components';
import { Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import {
  FormDataTable,
  FormDataTableButtonsPagination,
  FormDataTableProvider,
} from '@/modules/core/components/form/data-table';
import { FormDataTablePageCount } from '@/modules/core/components/form/data-table/FormDataTablePageCount';
import { FormDataTableRowCount } from '@/modules/core/components/form/data-table/FormDataTableRowCount';
import { FormDataTableSelectPageSize } from '@/modules/core/components/form/data-table/FormDataTableSelectPageSize';
import { useCreateColumnsTable } from '@/modules/core/hooks/data-table/useCreateColumnsTable';
import { useDataTableGeneric } from '@/modules/core/hooks/data-table/useDataTableGeneric';
import { useGetClient } from '../hooks/queries/useGetClient';
import { MODULE_CLIENTS_PATHS } from '../routes/pathRoutes';
import { FormClient } from './form';

import { CircleDollarSign } from 'lucide-react';
import { SaleDetailClient } from '../interfaces/SaleDetailClient';
import { ActionsTableSaleDetailClient } from './form/actions/ActionsTableSaleDetailEmployee';
import { columnsSaleDetailClient } from './form/columns/ColumnsTableSaleDetailEmployee';

// Componente genérico para todas las tablas de empleados
interface ClientDataTableProps<T> {
  data: T[];
  columns: any[];
  actions: React.ComponentType<any>;
  hiddenCheckbox?: boolean;
  hiddenActions?: boolean;
}

export const ClientDataTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  hiddenCheckbox = true,
  hiddenActions = false,
}: ClientDataTableProps<T>) => {
  const columnsTable = useCreateColumnsTable<T>({
    columns,
    actions: actions as any,
    hiddenCheckbox,
    hiddenActions,
  });

  const dataTable = useDataTableGeneric<T>({
    columns: columnsTable,
    rows: data,
  });

  return (
    <div>
      <FormDataTableProvider
        table={dataTable.table}
        disabledDoubleClick={true}
        errorMessage={'Ha ocurrido un error en la tabla'}
        lengthColumns={dataTable.lengthColumns}
      >
        <div className="flex flex-col items-center justify-center w-screen gap-2 sm:w-full">
          {/* Paginacion */}
          <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:justify-evenly">
            <FormDataTableRowCount />
            <FormDataTableSelectPageSize />
          </div>

          {/* Tabla */}
          <ScrollArea
            className="h-max-[460px] w-[85%] sm:w-full p-1 border rounded-sm self-start"
            type="auto"
          >
            <FormDataTable
              onCellDoubleClick={(data) => {}}
              disabledDoubleClick={true}
            />

            <ScrollBar className="mt-2" orientation="horizontal" forceMount />
          </ScrollArea>

          <FormDataTableButtonsPagination />
          <FormDataTablePageCount />
        </div>
      </FormDataTableProvider>
    </div>
  );
};

// Componentes específicos usando el componente genérico
export const ClientSaleDataTable: React.FC<{
  data: SaleDetailClient[];
}> = ({ data }) => (
  <ClientDataTable<SaleDetailClient>
    data={data as any}
    columns={columnsSaleDetailClient}
    actions={ActionsTableSaleDetailClient}
  />
);

export const ViewClient: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetClient(id!);

  if (isLoading) {
    return <Loading />;
  }

  const saleData = Array.isArray(data?.sales_detail)
    ? data?.sales_detail.map((item) => ({
        ...item,
        client: { full_name: `${data.first_name} ${data.last_name}` },
      }))
    : [];

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CLIENTS_PATHS.ViewAll, name: 'Clientes' }]}
        finalItem={`Información del cliente`}
      />

      <FormClient defaultValues={data} readOnly>
        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Vinculo en otros registros:
        </h3>
        <Separator />
        <span className="flex items-center gap-2 my-4">
          <span>Ventas</span>
          <CircleDollarSign className="w-4 h-4" />
        </span>
        <ClientSaleDataTable data={[...(saleData as any)]} />
      </FormClient>
    </>
  );
};

export default ViewClient;
