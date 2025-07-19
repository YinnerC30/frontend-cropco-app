import { Badge } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ErrorLoading, Loading } from '@/modules/core/components';
import { BreadCrumb } from '@/modules/core/components/';
import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import { FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { ActionsTableShoppingDetailSupplier } from '@/modules/suppliers/components/form/actions/ActionsTableShoppingDetailSupplier';
import { columnsShoppingDetailSupplier } from '@/modules/suppliers/components/form/columns/ColumnsTableShoppingDetailSupplier';
import { Cable, ShoppingBagIcon } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useGetSupply } from '../hooks/';
import {
  MassUnitOfMeasure,
  UnitOfMeasure,
  UnitSymbols,
  VolumeUnitOfMeasure,
  LengthUnitOfMeasure,
} from '../interfaces/UnitOfMeasure';
import { MODULE_SUPPLIES_PATHS } from '../routes/pathRoutes';
import { FormSupply } from './form/FormSupply';
import { ActionsTableConsumptionSupply } from './form/actions/ActionsTableConsumptionSupply';
import { columnsConsumptionDetailSupply } from './form/columns/ColumnsTableConsumptionDetailSupply';

export const SupplyConsumptionsDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data}
    columns={columnsConsumptionDetailSupply}
    actions={ActionsTableConsumptionSupply}
  />
);

export const SupplyShoppingDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data as any}
    columns={columnsShoppingDetailSupplier}
    actions={ActionsTableShoppingDetailSupplier}
  />
);

export const ViewSupply = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSupply(id!);

  const { convert, getUnitType } = useUnitConverter();

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <ErrorLoading />;
  }

  const consumptionData = Array.isArray(data?.consumption_details)
    ? data?.consumption_details.map((item) => ({
        ...item,
      }))
    : [];

  const shoppingData = Array.isArray(data?.shopping_details)
    ? data?.shopping_details.map((item) => ({
        ...item,
        supplier: {
          ...item.supplier,
          full_name: `${item.supplier.first_name} ${item.supplier.last_name}`,
        },
      }))
    : [];

  const currentStock = data?.stock?.amount || 0;
  const currentUnitType = data.unit_of_measure;
  const unitType = getUnitType(currentUnitType as UnitOfMeasure);

  let convertedAmount = 0;
  let displayUnit = currentUnitType;

  if (unitType === 'mass') {
    convertedAmount = convert(
      currentStock,
      currentUnitType as UnitOfMeasure,
      MassUnitOfMeasure.KILOGRAMOS
    );
    displayUnit = MassUnitOfMeasure.KILOGRAMOS;
  } else if (unitType === 'volume') {
    convertedAmount = convert(
      currentStock,
      currentUnitType as UnitOfMeasure,
      VolumeUnitOfMeasure.LITROS
    );
    displayUnit = VolumeUnitOfMeasure.LITROS;
  } else if (unitType === 'length') {
    convertedAmount = convert(
      currentStock,
      currentUnitType as UnitOfMeasure,
      LengthUnitOfMeasure.METROS
    );
    displayUnit = LengthUnitOfMeasure.METROS;
  }

  const getBadgeVariant = (unitType: string) => {
    switch (unitType) {
      case 'mass':
        return 'zinc';
      case 'volume':
        return 'blue';
      case 'length':
        return 'success';
      default:
        return 'zinc';
    }
  };

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_SUPPLIES_PATHS.ViewAll, name: 'Insumos' }]}
        finalItem={`Información del insumo`}
      />

      <FormSupply defaultValues={data} readOnly>
        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Stock disponible:
        </h3>
        <div className="flex gap-2">
          <span>{FormatNumber(convertedAmount)}</span>
          <Badge
            className="w-auto"
            variant={getBadgeVariant(unitType)}
          >
            {UnitSymbols[displayUnit as UnitOfMeasure]}
          </Badge>
        </div>

        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Vinculo en otros registros:
        </h3>

        <Tabs
          defaultValue="consumptions"
          className="w-10/12 p-4 border rounded-sm lg:w-auto"
        >
          <TabsList className="flex flex-wrap w-auto lg:h-10">
            <TabsTrigger value="consumptions">
              <span className="flex items-center gap-2">
                <span>Consumos</span>
                <Cable className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="shopping">
              <span className="flex items-center gap-2">
                <span>Compras</span>
                <ShoppingBagIcon className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consumptions">
            <SupplyConsumptionsDataTable data={consumptionData as any} />
          </TabsContent>
          <TabsContent value="shopping">
            <SupplyShoppingDataTable data={shoppingData as any} />
          </TabsContent>
        </Tabs>
      </FormSupply>
    </>
  );
};
export default ViewSupply;
