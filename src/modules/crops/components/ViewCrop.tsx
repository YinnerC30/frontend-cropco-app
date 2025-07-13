import { useParams } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BreadCrumb } from '@/modules/core/components/';
import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import { Harvest } from '@/modules/harvests/interfaces';
import { Tractor } from 'lucide-react';
import { Loading } from '../../core/components';
import { useGetCrop } from '../hooks/queries/useGetCrop';
import { MODULE_CROPS_PATHS } from '../routes/pathRoutes';
import { ActionsTableHarvestCrop } from './form/actions/ActionsTableHarvestCrop';
import columnsHarvestCrop from './form/columns/ColumnsTableHarvestCrop';
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

export const ViewCrop: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading } = useGetCrop(id!);

  if (isLoading) return <Loading />;

  const harvestData = Array.isArray(data?.harvests)
    ? data?.harvests.map((item) => ({
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
          Vinculo en otros registros:
        </h3>
        <Tabs defaultValue="harvests" className="w-10/12 lg:w-auto">
          <TabsList className="grid w-auto grid-cols-1 gap-1">
            <TabsTrigger value="harvests">
              <span className="flex items-center gap-2">
                <span>Cosechas</span>
                <Tractor className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="harvests">
            <CropHarvestsDataTable data={harvestData as any} />
          </TabsContent>
        </Tabs>
      </FormCrop>
    </>
  );
};
export default ViewCrop;
