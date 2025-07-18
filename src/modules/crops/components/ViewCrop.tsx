import { useParams } from 'react-router-dom';

import { Badge } from '@/components';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BreadCrumb } from '@/modules/core/components/';
import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import { FormatNumber } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { Harvest } from '@/modules/harvests/interfaces';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { Work } from '@/modules/work/interfaces/Work';
import {
  Cable,
  CircleDollarSign,
  LayersIcon,
  Pickaxe,
  Tractor,
} from 'lucide-react';
import { Loading } from '../../core/components';
import { useGetCrop } from '../hooks/queries/useGetCrop';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { ActionsTableConsumptionCrop } from './form/actions/ActionsTableConsumptionCrop';
import { ActionsTableHarvestCrop } from './form/actions/ActionsTableHarvestCrop';
import { ActionsTableHarvestProcessedCrop } from './form/actions/ActionsTableHarvestProcessedCrop';
import { ActionsTableSaleDetailCrop } from './form/actions/ActionsTableSaleDetailCrop';
import { ActionsTableWorkCrop } from './form/actions/ActionsTableWorkCrop';
import { columnsConsumptionDetailCrop } from './form/columns/ColumnsTableConsumptionDetailCrop';
import columnsHarvestCrop from './form/columns/ColumnsTableHarvestCrop';
import columnsHarvestProcessedCrop from './form/columns/ColumnsTableHarvestProcessedCrop';
import { columnsSaleDetailCrop } from './form/columns/ColumnsTableSaleDetailCrop';
import columnsWorkCrop from './form/columns/ColumnsTableWorkCrop';
import { FormCrop } from './form/FormCrop';

export const CropHarvestsDataTable: React.FC<{
  data: Harvest[];
}> = ({ data }) => (
  <BasicDataTable<Harvest>
    data={data}
    columns={columnsHarvestCrop}
    actions={ActionsTableHarvestCrop}
  />
);

export const CropWorksDataTable: React.FC<{
  data: Work[];
}> = ({ data }) => (
  <BasicDataTable<Work>
    data={data}
    columns={columnsWorkCrop}
    actions={ActionsTableWorkCrop}
  />
);

export const CropSalesDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data}
    columns={columnsSaleDetailCrop}
    actions={ActionsTableSaleDetailCrop}
  />
);

export const CropHarvestProcessedDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data}
    columns={columnsHarvestProcessedCrop}
    actions={ActionsTableHarvestProcessedCrop}
  />
);

export const CropConsumptionsDataTable: React.FC<{
  data: any[];
}> = ({ data }) => (
  <BasicDataTable<any>
    data={data}
    columns={columnsConsumptionDetailCrop}
    actions={ActionsTableConsumptionCrop}
  />
);

export const ViewCrop: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCrop(id!);

  const { convert } = useUnitConverter();

  if (isLoading) return <Loading />;

  const currentStock = data?.harvests_stock?.amount || 0;
  const convertedAmount = convert(
    currentStock,
    MassUnitOfMeasure.GRAMOS,
    MassUnitOfMeasure.KILOGRAMOS
  );

  const harvestData = Array.isArray(data?.harvests)
    ? data?.harvests.map((item) => ({
        ...item,
        crop: { id: data.id, name: data.name },
      }))
    : [];

  const workData = Array.isArray(data?.works)
    ? data?.works.map((item) => ({
        ...item,
        crop: { id: data.id, name: data.name },
      }))
    : [];

  const saleData = Array.isArray(data?.sales_detail)
    ? data?.sales_detail.map((item) => ({
        ...item,
      }))
    : [];

  const harvestProcessedData = Array.isArray(data?.harvests_processed)
    ? data?.harvests_processed.map((item) => ({
        ...item,
      }))
    : [];

  const consumptionData = Array.isArray(data?.supplies_consumption_details)
    ? data?.supplies_consumption_details.map((item) => ({
        ...item,
        crop: { id: data.id, name: data.name },
      }))
    : [];

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_CROPS_PATHS.ViewAll, name: 'Cultivos' }]}
        finalItem={'Información del cultivo'}
      />

      <FormCrop defaultValues={data} readOnly>
        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Stock disponible:
        </h3>
        <div className="flex gap-2">
          <span>{FormatNumber(convertedAmount)}</span>
          <Badge className="w-auto" variant={'zinc'}>
            {UnitSymbols[MassUnitOfMeasure.KILOGRAMOS]}
          </Badge>
        </div>

        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Vinculo en otros registros:
        </h3>
        <Tabs defaultValue="harvests" className="w-10/12 p-4 border rounded-sm lg:w-auto">
          <TabsList className="flex flex-wrap w-auto h-32 lg:h-10">
            <TabsTrigger value="harvests">
              <span className="flex items-center gap-2">
                <span>Cosechas</span>
                <Tractor className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="harvests_processed">
              <span className="flex items-center gap-2">
                <span>Cosecha Procesada</span>
                <LayersIcon className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="works">
              <span className="flex items-center gap-2">
                <span>Trabajos</span>
                <Pickaxe className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="sales">
              <span className="flex items-center gap-2">
                <span>Ventas</span>
                <CircleDollarSign className="w-4 h-4" />
              </span>
            </TabsTrigger>

            <TabsTrigger value="consumptions">
              <span className="flex items-center gap-2">
                <span>Consumos</span>
                <Cable className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="harvests">
            <CropHarvestsDataTable data={harvestData as any} />
          </TabsContent>
          <TabsContent value="works">
            <CropWorksDataTable data={workData as any} />
          </TabsContent>
          <TabsContent value="sales">
            <CropSalesDataTable data={saleData as any} />
          </TabsContent>
          <TabsContent value="harvests_processed">
            <CropHarvestProcessedDataTable data={harvestProcessedData as any} />
          </TabsContent>
          <TabsContent value="consumptions">
            <CropConsumptionsDataTable data={consumptionData as any} />
          </TabsContent>
        </Tabs>

        {/* <Tabs defaultValue="harvests_processed" className="w-10/12 lg:w-3/4">
          <TabsList className="grid w-2/4 grid-cols-2 gap-1">
            <TabsTrigger value="harvests_processed">
              <span className="flex items-center gap-2">
                <span>Cosechas Procesadas</span>
                <LayersIcon className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="consumptions">
              <span className="flex items-center gap-2">
                <span>Consumos</span>
                <Cable className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="harvests_processed">
            <CropHarvestProcessedDataTable data={harvestProcessedData as any} />
          </TabsContent>
          <TabsContent value="consumptions">
            <CropConsumptionsDataTable data={consumptionData as any} />
          </TabsContent>
        </Tabs> */}
      </FormCrop>
    </>
  );
};
export default ViewCrop;
