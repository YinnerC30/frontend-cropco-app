import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ButtonRefetchData } from '@/modules/core/components';

import { ChartSkeleton } from '@/modules/core/components/charts/ChartSkeleton';
import { useGetAllCropsWithStockDashboard } from '../../hooks/queries/useGetAllCropsWithStockDashboard';
import { MassUnitOfMeasure } from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useState } from 'react';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';

const chartConfig: ChartConfig = {
  name: {
    label: 'Nombre',
  },
  stock: {
    label: 'N° Stock',
  },
} satisfies ChartConfig;

export function ChartTopCropsWithStock() {
  const queryCrops = useGetAllCropsWithStockDashboard();

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const { convert } = useUnitConverter();

  if (queryCrops.isLoading || queryCrops.isFetching) {
    return <ChartSkeleton />;
  }

  const chartData = queryCrops.isSuccess
    ? [...(queryCrops.data?.records.filter((row) => row.stock > 0) || [])]
    : [];

  const dataConvertedToUnitSelected = chartData.map((item) => {
    return {
      ...item,
      stock: convert(
        item.stock,
        MassUnitOfMeasure.GRAMOS,
        unitTypeToShowAmount
      ),
    };
  });

  return (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Top 5 cultivos con stock disponible</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row items-center justify-between ">
          <ButtonRefetchData
            onClick={async () => {
              await queryCrops.refetch();
            }}
            disabled={queryCrops.isLoading}
          />
          <div className="flex items-center justify-center gap-2 pb-2 ">
            <p className="text-sm font-medium text-muted-foreground">
              Unidad de medida:
            </p>
            <div className="font-medium">
              {' '}
              <SelectedMassUnitOfMeasure
                onChange={setUnitTypeToShowAmount}
                valueSelect={unitTypeToShowAmount}
              />
            </div>
          </div>
        </div>
        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              barCategoryGap={15}
              accessibilityLayer
              data={dataConvertedToUnitSelected}
              margin={{
                top: 40,
              }}
            >
              <YAxis
                dataKey={'stock'}
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
              />

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 10)}
              />

              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

              <Bar
                dataKey="stock"
                fill="hsl(var(--chart-1))"
                radius={4}
                yAxisId="left"
              ></Bar>

              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="w-full text-center h-[200px] flex items-center justify-center">
            <span>No hay información disponible</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
