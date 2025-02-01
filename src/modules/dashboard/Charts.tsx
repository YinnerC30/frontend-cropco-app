'use client';

import { ScrollArea, Separator } from '@/components';
import {
  BookUser,
  CircleDollarSign,
  Contact,
  Leaf,
  Pickaxe,
  Tractor,
} from 'lucide-react';
import { ChartTopClientsInSales } from '../clients/components/charts/ChartTopClientsInSales';
import { BreadCrumb } from '../core/components';
import { ChartTopCropsWithHarvestsAndTotalStock } from '../crops/components/charts/ChartTopCropsWithHarvestsAndTotalStock';
import { ChartTopCropsWithStock } from '../crops/components/charts/ChartTopCropsWithStock';
import { ChartTopEmployeesInHarvests } from '../employees/components/charts/ChartTopEmployeesInHarvests';
import { ChartTopEmployeesInWorks } from '../employees/components/charts/ChartTopEmployeesInWork';
import { ChartTotalHarvestsInYear } from '../harvests/components/charts/ChartTotalHarvestsInYear';
import { ChartTotalWorksInYear } from '../work/components/charts/ChartTotalWorksInYear';
import { ChartTotalSalesInYear } from '../sales/components/charts/ChartTotalSalesInYear';

export function Charts() {
  return (
    <div>
      <BreadCrumb finalItem={'Graficas'} />
      <div className="flex justify-center">
        <ScrollArea className="h-[85vh] w-full pb-2">
          <div className="flex flex-col gap-10">
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
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
export default Charts;
