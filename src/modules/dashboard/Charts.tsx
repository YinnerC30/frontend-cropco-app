'use client';

import { Label, Separator } from '@/components';
import { BreadCrumb } from '../core/components';
import { ChartTopEmployeesInHarvests } from '../employees/components/charts/ChartTopEmployeesInHarvests';
import { ChartTopEmployeesInWorks } from '../employees/components/charts/ChartTopEmployeesInWork';
import { ChartTopClientsInSales } from '../clients/components/charts/ChartTopClientsInSales';

export function Charts() {
  return (
    <div>
      <BreadCrumb finalItem={'Graficas'} hiddenSeparator />

      <Label className="text-xl">Graficas para el módulo de empleados</Label>
      <Separator className="my-2 " />

      <div className="flex flex-wrap items-center justify-center gap-4 my-5">
        <ChartTopEmployeesInHarvests />
        <ChartTopEmployeesInWorks />
      </div>
      <Label className="text-xl">Graficas para el módulo de clientes</Label>
      <Separator className="my-2 " />

      {/* <div className="flex flex-wrap items-center justify-center w-2/4 gap-4 my-5"> */}
        <ChartTopClientsInSales />
      {/* </div> */}

      {/* <ScrollArea className="w-[80vw]"> */}
      {/* <div className="flex flex-wrap gap-5"> */}
      {/* <CropStockChart /> */}
      {/* <CropTotalHarvestCrop /> */}
      {/* <ChartSales /> */}
      {/* <ChartHarvestTrend /> */}
      {/* </div> */}
      {/* </ScrollArea> */}
    </div>
  );
}
export default Charts;
