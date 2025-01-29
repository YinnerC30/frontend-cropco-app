'use client';

import { Label, Separator } from '@/components';
import { BreadCrumb } from '../core/components';
import { ChartTopEmployeesInHarvests } from '../employees/components/charts/ChartTopEmployeesInHarvests';
import { ChartTopEmployeesInWorks } from '../employees/components/charts/ChartTopEmployeesInWork';


export function Charts() {
  return (
    <div>
      <BreadCrumb finalItem={'Graficas'} hiddenSeparator />

      <Label className='text-xl'>Graficas para el módulo de empleados</Label>
      <Separator className='w-full my-2'/>

      <div className="flex flex-wrap items-center justify-center gap-4 my-5">
        <ChartTopEmployeesInHarvests />
        <ChartTopEmployeesInWorks />
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
