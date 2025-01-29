'use client';

import { Label } from '@/components';
import { BreadCrumb } from '../core/components';
import { ChartTopEmployeesInHarvests } from '../employees/components/charts/ChartTopEmployeesInHarvests';

export function Charts() {
  return (
    <div>
      <BreadCrumb finalItem={'Graficas'} hiddenSeparator />

      <Label>Graficas para el módulo de empleados</Label>

      <div className="my-5">
        <ChartTopEmployeesInHarvests />
      </div>

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
