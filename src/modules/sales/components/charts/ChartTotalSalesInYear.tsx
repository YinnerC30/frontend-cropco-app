'use client';

import {
  Card,
  CardContent,
  CardDescription,
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

import YearSelector from '@/modules/core/components/shared/YearSelector';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import ClientSelector from '@/modules/core/components/shared/ClientSelector';
import CropSelector from '@/modules/core/components/shared/CropSelector';
import { HiddenPreviousYearSelector } from '@/modules/core/components/shared/HiddenPreviousYearSelector';
import { organizeSaleData } from '../../helpers/organizeSaleData';
import { useGetTotalSalesInYear } from '../../hooks/queries/useGetTotalSalesInYear';
import { Label, Switch } from '@/components';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';

export function ChartTotalSalesInYear() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedClient, setSelectedClient] = useState('');

  const [showPreviousYear, setShowPreviousYear] = useState(true);

  const querySales = useGetTotalSalesInYear({
    year: selectedYear,
    crop: selectedCrop,
    client: selectedClient,
  });

  if (querySales.isLoading) {
    return <Loading />;
  }

  const chartConfig = {
    current_total: {
      label: querySales.data?.years[0].year,
      color: 'hsl(var(--chart-1))',
    },
    previous_total: {
      label: querySales.data?.years[1].year,
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const chartData = organizeSaleData(querySales.data as any);

  return querySales.isSuccess ? (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Total de las ventas por año</CardTitle>
        <CardDescription>
          Se muestra la cantidad de ventas en cada mes del año comparado con el
          año anterior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <div className="inline-flex items-center px-4 py-2 my-4 space-x-2 border rounded-sm">
            <Switch
              defaultChecked={showPreviousYear}
              onCheckedChange={(value) => {
                setShowPreviousYear(value);
              }}
              id="show-previous-year"
            />
            <Label htmlFor="show-previous-year">
              Mostrar información del año anterior
            </Label>
          </div>

          <div className="flex justify-between mb-5">
            <ClientSelector
              selectedClient={selectedClient}
              setSelectedClient={setSelectedClient}
            />
            <CropSelector
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
            />
            <YearSelector
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              initialYear={2023}
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
                dataKey="month_name"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    formatter={(value, name, item, index) => {
                      return (
                        <>
                          <div
                            className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-[--color-bg]"
                            style={
                              {
                                '--color-bg': `var(--color-${name})`,
                              } as React.CSSProperties
                            }
                          />
                          {chartConfig[name as keyof typeof chartConfig]
                            ?.label || name}
                          <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                            {FormatMoneyValue(Number(value))}
                          </div>
                        </>
                      );
                    }}
                  />
                }
              />
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

                {showPreviousYear && (
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
                )}
              </defs>

              <Area
                dataKey="current_total"
                type="linear"
                fill="url(#fillCurrentTotal)"
                fillOpacity={0.4}
                stroke="var(--color-current_total)"
                stackId="a"
              />
              {showPreviousYear && (
                <Area
                  dataKey="previous_total"
                  type="linear"
                  fill="url(#fillPreviousTotal"
                  fillOpacity={0.4}
                  stroke="var(--color-previous_total)"
                  stackId="a"
                />
              )}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  ) : (
    <div className="h-[200px]">Error al generar el grafico</div>
  );
}
