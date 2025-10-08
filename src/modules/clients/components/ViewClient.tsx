import { useParams } from 'react-router-dom';

import { Separator } from '@/components';
import { Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import { useGetClient } from '../hooks/queries/useGetClient';
import { MODULE_CLIENTS_PATHS } from '../routes/pathRoutes';
import { FormClient } from './form';

import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import { CircleDollarSign } from 'lucide-react';
import { SaleDetailClient } from '../interfaces/SaleDetailClient';
import { ActionsTableSaleDetailClient } from './form/actions/ActionsTableSaleDetailEmployee';
import { columnsSaleDetailClient } from './form/columns/ColumnsTableSaleDetailEmployee';

// Componentes específicos usando el componente genérico
export const ClientSaleDataTable: React.FC<{
  data: SaleDetailClient[];
}> = ({ data }) => (
  <BasicDataTable<SaleDetailClient>
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
