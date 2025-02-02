import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import { ButtonRefetchData } from '@/modules/core/components';
import { useState } from 'react';

import { Label, Switch } from '@/components';
import { ChartSkeleton } from '@/modules/core/components/charts/ChartSkeleton';
import YearSelector from '@/modules/core/components/shared/YearSelector';
import { FormatNumber } from '@/modules/core/helpers';
import { useGetTopCropsInHarvests } from '../../hooks/queries/useGetTopCropsInHarvests';

const chartConfig: ChartConfig = {
  name: {
    label: 'Nombre',
  },
  total_stock: {
    label: 'N° Stock',
    color: 'hsl(var(--chart-6))',
  },
  total_harvests: {
    label: 'N° Cosechas',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function ChartTopCropsWithHarvestsAndTotalStock() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const queryCrops = useGetTopCropsInHarvests({ year: selectedYear });
  const [showQuantityHarvests, setshowQuantityHarvests] = useState(true);

  if (queryCrops.isLoading) {
    return <ChartSkeleton />;
  }

  const chartData = queryCrops.isSuccess
    ? [...(queryCrops.data?.rows || [])]
    : [];

  return (
    <Card className="w-auto lg:w-[450px] ">
      <CardHeader>
        <CardTitle>
          Top 5 cultivos con más cosechas y total recolectado
        </CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-wrap justify-between gap-4 mb-5">
          <div className="flex items-center px-4 py-2 space-x-2 border rounded-sm">
            <Switch
              defaultChecked={showQuantityHarvests}
              onCheckedChange={(value) => {
                setshowQuantityHarvests(value);
              }}
              id="show-value-pay"
            />
            <Label htmlFor="show-value-pay">Mostrar N° cosechas</Label>
          </div>
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <ButtonRefetchData
            onClick={async () => {
              await queryCrops.refetch();
            }}
            disabled={queryCrops.isLoading}
          />
        </div>

        {chartData.length > 0 ? (
          <ChartContainer config={chartConfig}>
            <BarChart
              barCategoryGap={15}
              accessibilityLayer
              data={chartData}
              margin={{
                top: 40,
              }}
            >
              <YAxis
                dataKey={'total_stock'}
                yAxisId="left"
                orientation="left"
                stroke="var(--color-total_stock)"
              />

              {showQuantityHarvests && (
                <YAxis
                  dataKey={'total_harvests'}
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-total_harvests)"
                />
              )}

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
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
                            {FormatNumber(Number(value))}
                          </div>
                          {name === 'total_stock' && (
                            <span className="font-normal text-muted-foreground">
                              kg
                            </span>
                          )}
                        </>
                      );
                    }}
                  />
                }
              />

              {showQuantityHarvests && (
                <Bar
                  dataKey="total_harvests"
                  fill="var(--color-total_harvests)"
                  radius={4}
                  yAxisId="right"
                />
              )}

              <Bar
                dataKey="total_stock"
                fill="var(--color-total_stock)" // Asignando un color distinto para la nueva barra
                radius={4}
                yAxisId="left"
              ></Bar>

              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="w-full text-center h-[200px] flex items-center justify-center">
            <span>No hay información del año {selectedYear}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
