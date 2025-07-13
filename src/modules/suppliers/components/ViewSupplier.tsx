import { Separator } from '@/components';
import { BreadCrumb } from '@/modules/core/components/';
import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import { ShoppingBagIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetSupplier } from '../hooks/queries/useGetSupplier';
import { MODULE_SUPPLIER_PATHS } from '../routes/pathRoutes';
import { ActionsTableShoppingDetailSupplier } from './form/actions/ActionsTableShoppingDetailSupplier';
import { columnsShoppingDetailSupplier } from './form/columns/ColumnsTableShoppingDetailSupplier';
import { FormSupplier } from './form/FormSupplier';

export const SupplierShoppingDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data as any}
    columns={columnsShoppingDetailSupplier}
    actions={ActionsTableShoppingDetailSupplier}
  />
);

export const ViewSupplier: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupplier(id!);

  if (isLoading) {
    return <Loading />;
  }

  const shoppingData = Array.isArray(data?.supplies_shopping_details)
    ? data?.supplies_shopping_details.map((item) => ({
        ...item,
        supplier: { full_name: `${data.first_name} ${data.last_name}` },
      }))
    : [];

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIER_PATHS.ViewAll, name: 'Proveedores' }]}
        finalItem={`Información del proveedor`}
      />

      <FormSupplier defaultValues={data} readOnly>
        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Vinculo en otros registros:
        </h3>
        <Separator />
        <span className="flex items-center gap-2 my-4">
          <span>Compras</span>
          <ShoppingBagIcon className="w-4 h-4" />
        </span>
        <SupplierShoppingDataTable data={[...(shoppingData as any)]} />
      </FormSupplier>
    </>
  );
};

export default ViewSupplier;
