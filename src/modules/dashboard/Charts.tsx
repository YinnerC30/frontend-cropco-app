import { useAuthContext } from '@/auth';
import { ScrollArea, Separator, useSidebar } from '@/components';
import {
  BookUser,
  Cable,
  CircleDollarSign,
  Contact,
  Leaf,
  LucideIcon,
  Pickaxe,
  Tractor,
} from 'lucide-react';
import React from 'react';
import { ChartTopClientsInSales } from '../clients/components/charts/ChartTopClientsInSales';
import { ChartTotalConsumptionsInYear } from '../consumption/components/charts/ChartTotalConsumptionsInYear';
import { BreadCrumb } from '../core/components';
import { ChartTopCropsWithHarvestsAndTotalStock } from '../crops/components/charts/ChartTopCropsWithHarvestsAndTotalStock';
import { ChartTopCropsWithStock } from '../crops/components/charts/ChartTopCropsWithStock';
import { ChartTopEmployeesInHarvests } from '../employees/components/charts/ChartTopEmployeesInHarvests';
import { ChartTopEmployeesInWorks } from '../employees/components/charts/ChartTopEmployeesInWork';
import { ChartTotalHarvestsInYear } from '../harvests/components/charts/ChartTotalHarvestsInYear';
import { ChartTotalSalesInYear } from '../sales/components/charts/ChartTotalSalesInYear';
import { ChartTotalWorksInYear } from '../work/components/charts/ChartTotalWorksInYear';

interface TitleModuleProps {
  label: string;
  IconTitle: LucideIcon;
}

const TitleModule: React.FC<TitleModuleProps> = ({ label, IconTitle }) => {
  return (
    <div className="flex items-center gap-5">
      <h1 className="text-xl">{label}</h1>
      <IconTitle />
    </div>
  );
};

const ContainerCharts: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={`flex flex-wrap gap-10 justify-evenly ${className}`}>
      {children}
    </div>
  );
};

const EmployeeCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Empleados'} IconTitle={Contact} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission('dashboard', 'find_top_employees_in_harvests_chart') && (
          <ChartTopEmployeesInHarvests />
        )}
        {hasPermission('dashboard', 'find_top_employees_in_works_chart') && (
          <ChartTopEmployeesInWorks />
        )}
      </ContainerCharts>
    </div>
  );
};

const ClientCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Clientes'} IconTitle={BookUser} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission('dashboard', 'find_top_clients_in_sales_chart') && (
          <ChartTopClientsInSales />
        )}
      </ContainerCharts>
    </div>
  );
};

const CropCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Cultivos'} IconTitle={Leaf} />
      <Separator className="my-2 " />
      <ContainerCharts className="flex-col justify-center items-center">
        {hasPermission('dashboard', 'find_all_crops_stock_chart') && (
          <ChartTopCropsWithStock />
        )}
        {hasPermission(
          'dashboard',
          'find_count_harvests_and_total_stock_chart'
        ) && <ChartTopCropsWithHarvestsAndTotalStock />}
      </ContainerCharts>
    </div>
  );
};

const HarvestCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Cosechas'} IconTitle={Tractor} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission('dashboard', 'find_total_harvest_in_year_chart') && (
          <ChartTotalHarvestsInYear />
        )}
      </ContainerCharts>
    </div>
  );
};
const WorkCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Trabajos'} IconTitle={Pickaxe} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission('dashboard', 'find_total_work_in_year_chart') && (
          <ChartTotalWorksInYear />
        )}
      </ContainerCharts>
    </div>
  );
};
const SalesCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Ventas'} IconTitle={CircleDollarSign} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission('dashboard', 'find_total_sales_in_year_chart') && (
          <ChartTotalSalesInYear />
        )}
      </ContainerCharts>
    </div>
  );
};
const ConsumptionCharts: React.FC = () => {
  const { hasPermission } = useAuthContext();
  return (
    <div>
      <TitleModule label={'Consumos'} IconTitle={Cable} />
      <Separator className="my-2 " />
      <ContainerCharts>
        {hasPermission(
          'dashboard',
          'find_total_consumptions_in_year_chart'
        ) && <ChartTotalConsumptionsInYear />}
      </ContainerCharts>
    </div>
  );
};

export function Charts() {
  const { isMobile, open } = useSidebar();
  const { getActionsModule } = useAuthContext();
  const actionsDashboard = getActionsModule('dashboard');

  return (
    <div>
      <BreadCrumb finalItem={'Gráficas'} />
      <div className="flex justify-center">
        <ScrollArea
          className={`h-[85vh] px-2 pt-5  ${
            isMobile
              ? 'w-screen'
              : open
              ? 'w-[calc(100vw-var(--sidebar-width))]'
              : 'w-screen'
          }`}
        >
          <div className="flex flex-col gap-10">
            {(actionsDashboard['find_top_employees_in_harvests_chart'] ||
              actionsDashboard['find_top_employees_in_works_chart']) && (
              <EmployeeCharts />
            )}
            {actionsDashboard['find_top_clients_in_sales_chart'] && (
              <ClientCharts />
            )}

            {(actionsDashboard['find_count_harvests_and_total_stock_chart'] ||
              actionsDashboard['find_all_crops_stock_chart']) && <CropCharts />}

            {actionsDashboard['find_total_harvest_in_year_chart'] && (
              <HarvestCharts />
            )}
            {actionsDashboard['find_total_work_in_year_chart'] && (
              <WorkCharts />
            )}
            {actionsDashboard['find_total_sales_in_year_chart'] && (
              <SalesCharts />
            )}
            {actionsDashboard['find_total_consumptions_in_year_chart'] && (
              <ConsumptionCharts />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
export default Charts;
