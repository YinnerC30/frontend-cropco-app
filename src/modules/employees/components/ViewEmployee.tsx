import { BreadCrumb } from '@/modules/core/components/';
import { HarvestDetail } from '@/modules/harvests/interfaces';
import { CreditCard, Pickaxe, Tractor } from 'lucide-react';
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
import { BasicDataTable } from '@/modules/core/components/form/basic/BasicDataTable';
import columnsPayment from '@/modules/payments/components/module/ColumnsTablePayment';
import { Payment } from '@/modules/payments/interfaces/Payment';
import { WorkDetailEmployee } from '../interfaces/WorkDetailEmployee';
import { ActionsTablePaymentEmployee } from './form/actions/ActionsTablePaymentEmployee';

// Componentes específicos usando el componente genérico
export const EmployeeHarvestDataTable: React.FC<{
  data: HarvestDetail[];
}> = ({ data }) => (
  <BasicDataTable<HarvestDetailEmployee>
    data={data as any}
    columns={columnsHarvestDetailEmployee}
    actions={ActionsTableHarvestDetailEmployee}
  />
);

export const EmployeeWorkDataTable: React.FC<{
  data: WorkDetailEmployee[];
}> = ({ data }) => (
  <BasicDataTable<WorkDetailEmployee>
    data={data}
    columns={columnsWorkDetailEmployee}
    actions={ActionsTableWorkDetailEmployee}
  />
);

export const EmployeePaymentDataTable: React.FC<{
  data: Payment[];
}> = ({ data }) => (
  <BasicDataTable<Payment>
    data={data}
    columns={columnsPayment}
    actions={ActionsTablePaymentEmployee}
  />
);

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
  const paymentData = Array.isArray(data?.payments)
    ? data?.payments.map((item) => ({
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
        <h3 className="my-5 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Vinculo en otros registros:
        </h3>
        <Tabs defaultValue="harvests" className="w-10/12 lg:w-auto">
          <TabsList className="grid w-auto grid-cols-3 gap-1">
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
            <TabsTrigger value="payments">
              <span className="flex items-center gap-2">
                <span>Pagos</span>
                <CreditCard className="w-4 h-4" />
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="harvests">
            <EmployeeHarvestDataTable
              data={[...(harvestData as HarvestDetailEmployee[])]}
            />
          </TabsContent>
          <TabsContent value="works">
            <EmployeeWorkDataTable
              data={[...(workData as WorkDetailEmployee[])]}
            />
          </TabsContent>
          <TabsContent value="payments">
            <EmployeePaymentDataTable data={[...(paymentData as any[])]} />
          </TabsContent>
        </Tabs>
      </FormEmployee>
    </>
  );
};

export default ViewEmployee;
