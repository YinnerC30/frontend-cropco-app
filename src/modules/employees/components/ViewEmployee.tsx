import { ScrollArea, ScrollBar, Separator } from '@/components';
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
        <Separator className="my-10" />
        <div className="flex items-center gap-2">
          <h3 className="mt-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Cosechas donde participo:
          </h3>
          <span className="mt-4">
            <Tractor />
          </span>
        </div>
        <EmployeeHarvestDataTable data={[...(harvestData as any)]} />
        <Separator className="my-10" />
        <div className="flex items-center gap-2">
          <h3 className="mt-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Trabajos donde participo:
          </h3>
          <span className="mt-4">
            <Pickaxe />
          </span>
        </div>
        <EmployeeWorkDataTable data={[...(workData as any)]} />
      </FormEmployee>
    </>
  );
};

export default ViewEmployee;
