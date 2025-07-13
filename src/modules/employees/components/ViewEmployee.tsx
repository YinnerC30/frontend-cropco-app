import { ScrollArea, ScrollBar } from '@/components';
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
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { WorkDetail } from '@/modules/work/interfaces/WorkDetail';
import { Pickaxe, Tractor } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Loading } from '../../core/components';
import { useGetEmployee } from '../hooks/queries/useGetEmployee';
import { HarvestDetailEmployee } from '../interfaces/HarvestDetailEmployee';
import { MODULE_EMPLOYEE_PATHS } from '../routes/pathRoutes';
import { ActionsTableHarvestDetailEmployee } from './form/actions/ActionsTableHarvestDetailEmployee';
import { ActionsTableWorkDetailEmployee } from './form/actions/ActionsTableWorkDetailEmployee';
import { columnsHarvestDetailEmployee } from './form/columns/ColumnsTableHarvestDetailEmployee';
import { columnsWorkDetailEmployee } from './form/columns/ColumnsTableWorkDetailEmployee';
import FormEmployee from './form/FormEmployee';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function TabsEmployeeTables() {
  return (
    <Tabs defaultValue="harvests" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="harvests">Cosechas</TabsTrigger>
        <TabsTrigger value="works">Trabajos</TabsTrigger>
      </TabsList>
      <TabsContent value="harvests">{/* TODO: implementar */}</TabsContent>
      <TabsContent value="works">{/* TODO: implementar */}</TabsContent>
    </Tabs>
  );
}

interface EmployeeHarvestDataTableProps {
  data: HarvestDetail[];
}

export const EmployeeHarvestDataTable: React.FC<
  EmployeeHarvestDataTableProps
> = (props) => {
  const { data } = props;

  const columnsTable = useCreateColumnsTable<HarvestDetailEmployee>({
    columns: columnsHarvestDetailEmployee,
    actions: ActionsTableHarvestDetailEmployee,
    hiddenCheckbox: true,
  });

  const dataTableHarvestDetail = useDataTableGeneric<HarvestDetailEmployee>({
    columns: columnsTable,
    rows: data,
  });

  return (
    <div>
      <FormDataTableProvider
        table={dataTableHarvestDetail.table}
        disabledDoubleClick={true}
        errorMessage={'Ha ocurrido un error en la tabla'}
        lengthColumns={dataTableHarvestDetail.lengthColumns}
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

interface EmployeeWorkDataTableProps {
  data: WorkDetail[];
}

export const EmployeeWorkDataTable: React.FC<EmployeeWorkDataTableProps> = (
  props
) => {
  const { data } = props;

  const columnsTable = useCreateColumnsTable<any>({
    columns: columnsWorkDetailEmployee,
    actions: ActionsTableWorkDetailEmployee,
    hiddenCheckbox: true,
  });

  const dataTableHarvestDetail = useDataTableGeneric<any>({
    columns: columnsTable,
    rows: data,
  });

  return (
    <div>
      <FormDataTableProvider
        table={dataTableHarvestDetail.table}
        disabledDoubleClick={true}
        errorMessage={'Ha ocurrido un error en la tabla'}
        lengthColumns={dataTableHarvestDetail.lengthColumns}
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

export const ViewEmployee: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetEmployee(id!);

  if (isLoading) {
    return <Loading />;
  }

  const harvestData = Array.isArray(data?.harvests_detail)
    ? data?.harvests_detail.map((item) => ({
        ...item,
        employee: { full_name: `${data.first_name} ${data.last_name}` },
      }))
    : [];

  const workData = Array.isArray(data?.works_detail)
    ? data?.works_detail.map((item) => ({
        ...item,
        employee: { full_name: `${data.first_name} ${data.last_name}` },
      }))
    : [];

  return (
    <>
      <BreadCrumb
        items={[{ link: MODULE_EMPLOYEE_PATHS.ViewAll, name: 'Empleados' }]}
        finalItem={`Información del empleado`}
      />

      <FormEmployee defaultValues={data} readOnly>
        <Tabs defaultValue="harvests" className="w-10/12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="harvests">
              <span className="flex items-center gap-2">
                <span>Cosechas</span>
                <Tractor className="w-4 h-4" />
              </span>
            </TabsTrigger>
            <TabsTrigger value="works">
              <span className="flex items-center gap-2">
                <span>Trabajos</span>
                <Pickaxe className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="harvests">
            <EmployeeHarvestDataTable data={[...(harvestData as any)]} />
          </TabsContent>
          <TabsContent value="works">
            <EmployeeWorkDataTable data={[...(workData as any)]} />
          </TabsContent>
        </Tabs>
      </FormEmployee>
    </>
  );
};

export default ViewEmployee;
