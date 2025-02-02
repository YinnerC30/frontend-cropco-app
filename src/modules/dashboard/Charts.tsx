'use client';

import { ScrollArea, Separator, useSidebar } from '@/components';
import {
  BookUser,
  Cable,
  CircleDollarSign,
  Contact,
  Leaf,
  Pickaxe,
  Tractor,
} from 'lucide-react';
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

const EmployeeCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Empleados</h1>
        <Contact />
      </div>

      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTopEmployeesInHarvests />
        <ChartTopEmployeesInWorks />
      </div>
    </div>
  );
};

const ClientCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Clientes</h1>
        <BookUser />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTopClientsInSales />
      </div>
    </div>
  );
};

const CropCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Cultivos</h1>
        <Leaf />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTopCropsWithStock />
        <ChartTopCropsWithHarvestsAndTotalStock />
      </div>
    </div>
  );
};

const HarvestCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Cosechas</h1>
        <Tractor />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTotalHarvestsInYear />
      </div>
    </div>
  );
};
const WorkCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Trabajos</h1>
        <Pickaxe />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTotalWorksInYear />
      </div>
    </div>
  );
};
const SalesCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Ventas</h1>
        <CircleDollarSign />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTotalSalesInYear />
      </div>
    </div>
  );
};
const ConsumptionCharts: React.FC = () => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <h1 className="text-xl">Consumos</h1>
        <Cable />
      </div>
      <Separator className="my-2 " />

      <div className="flex flex-wrap gap-10 justify-evenly">
        <ChartTotalConsumptionsInYear />
      </div>
    </div>
  );
};

export function Charts() {
  const { isMobile, open } = useSidebar();
  return (
    <div>
      <BreadCrumb finalItem={'Graficas'} />
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
            <EmployeeCharts />
            <ClientCharts />
            <CropCharts />
            <HarvestCharts />
            <WorkCharts />
            <SalesCharts />
            <ConsumptionCharts />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
export default Charts;
