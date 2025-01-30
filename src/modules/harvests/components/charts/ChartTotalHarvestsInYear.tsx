'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Loading } from '@/modules/core/components';

import { useState } from 'react';
import { organizeHarvestData } from '../../helpers/organizeHarvestData';
import { useGetTotalHarvestsInYear } from '../../hooks/queries/useGetTotalHarvestsInYear';
import CropSelector from './CropSelector';

import YearSelector from '@/modules/core/components/shared/YearSelector';
import { TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { FormatNumber } from '@/modules/core/helpers';

export function ChartTotalHarvestsInYear() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCrop, setSelectedCrop] = useState('');
  const queryHarvests = useGetTotalHarvestsInYear({
    year: selectedYear,
    crop: selectedCrop,
  });

  if (queryHarvests.isLoading) {
    return <Loading />;
  }

  const chartConfig = {
    current_total: {
      label: queryHarvests.data?.years[0].year,
      color: 'hsl(var(--chart-1))',
    },
    previous_total: {
      label: queryHarvests.data?.years[1].year,
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const percentage = queryHarvests.data?.growth.growth_value.toFixed(2) ?? 0;

  const chartData = organizeHarvestData(queryHarvests.data as any);

  return queryHarvests.isSuccess ? (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Total de las cosechas por año</CardTitle>
        <CardDescription>
          Se muestra la cantidad cosechada en cada mes del año comparado con el
          año anterior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="flex justify-between mb-5">
            <CropSelector
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
            />
            <YearSelector
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              initialYear={2024}
            />
          </div>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 12,
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient
                  id="fillCurrentTotal"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-current_total)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-current_total)"
                    stopOpacity={0.1}
                  />
                </linearGradient>

                <linearGradient
                  id="fillPreviousTotal"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-previous_total)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-previous_total)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <Area
                dataKey="current_total"
                type="natural"
                fill="url(#fillCurrentTotal)"
                fillOpacity={0.4}
                stroke="var(--color-current_total)"
                stackId="a"
              />
              <Area
                dataKey="previous_total"
                type="natural"
                fill="url(#fillPreviousTotal"
                fillOpacity={0.4}
                stroke="var(--color-previous_total)"
                stackId="a"
              />
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-start w-full gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Hubo un{' '}
              {queryHarvests.data?.growth.is_increment
                ? 'incremento'
                : 'disminución'}{' '}
              del {Math.abs(Number(percentage))} % en el año {selectedYear}
              {queryHarvests.data?.growth.is_increment ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              <span>
                Total del año {queryHarvests.data?.years[0].year} :
                {' ' +
                  FormatNumber(queryHarvests.data?.growth.total_current ?? 0) +
                  ' kg'}
              </span>
              <span>Total del año {queryHarvests.data?.years[1].year} : </span>
              {' ' +
                FormatNumber(queryHarvests.data?.growth.total_previous ?? 0) +
                ' kg'}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  ) : (
    <div className="h-[200px]">Error al generar el grafico</div>
  );
}
