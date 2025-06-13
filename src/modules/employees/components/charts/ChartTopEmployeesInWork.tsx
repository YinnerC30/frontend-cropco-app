import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Label, Switch } from '@/components';
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
import { ChartSkeleton } from '@/modules/core/components/charts/ChartSkeleton';
import YearSelector from '@/modules/core/components/shared/YearSelector';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useState } from 'react';
import { useGetTopEmployeesInWorks } from '../../hooks/queries/useGetTopEmployeesInWorks';

const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
  },
  total_value_pay: {
    label: 'Pago',
    color: 'hsl(var(--chart-1))',
  },
  total_works: {
    label: 'N° Jornales',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function ChartTopEmployeesInWorks() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showValuePayBar, setshowValuePayBar] = useState(true);
  const queryEmployees = useGetTopEmployeesInWorks({
    year: Number(selectedYear),
  });

  if (queryEmployees.isLoading || queryEmployees.isFetching) {
    return <ChartSkeleton />;
  }

  const chartData = queryEmployees.isSuccess
    ? [...(queryEmployees.data?.records || [])]
    : [];

  return (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Top 5 empleados de los trabajos</CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex flex-wrap justify-between gap-4 mb-5">
          <div className="flex items-center px-4 py-2 space-x-2 border rounded-sm">
            <Switch
              defaultChecked={showValuePayBar}
              onCheckedChange={(value) => {
                setshowValuePayBar(value);
              }}
              id="show-value-pay"
            />
            <Label htmlFor="show-value-pay">Mostrar pago</Label>
          </div>
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
          <ButtonRefetchData
            onClick={async () => {
              await queryEmployees.refetch();
            }}
            disabled={queryEmployees.isLoading}
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
                dataKey={'total_works'}
                yAxisId="left"
                orientation="left"
                stroke="var(--color-total_works)"
              />

              {showValuePayBar && (
                <YAxis
                  dataKey={'total_value_pay'}
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-total_value_pay)"
                />
              )}

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="full_name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => {
                  const firstName = value.split(' ')[0];
                  return firstName.slice(0, 10);
                }}
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
                            {name === 'total_works'
                              ? FormatNumber(Number(value))
                              : FormatMoneyValue(Number(value))}
                          </div>
                        </>
                      );
                    }}
                  />
                }
              />

              <Bar
                dataKey="total_works"
                fill="var(--color-total_works)" // Asignando un color distinto para la nueva barra
                radius={4}
                yAxisId="left"
              />
              {showValuePayBar && (
                <Bar
                  dataKey="total_value_pay"
                  fill="var(--color-total_value_pay)"
                  radius={4}
                  yAxisId="right"
                />
              )}

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
