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
import { Loading } from '@/modules/core/components';
import YearSelector from '@/modules/core/components/shared/YearSelector';
import { useState } from 'react';
import { useGetTopClientsInSales } from '../../hooks/queries/useGetTopClientsInSales';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { Label, Switch } from '@/components';

const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
  },
  total_quantity: {
    label: 'N° Stock',
    color: 'hsl(var(--chart-7))',
  },
  total_sale: {
    label: 'Pago',
    color: 'hsl(var(--chart-8))',
  },
} satisfies ChartConfig;

export function ChartTopClientsInSales() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showTotalSaleBar, setshowTotalSaleBar] = useState(true);
  const queryClients = useGetTopClientsInSales({
    year: Number(selectedYear),
  });

  if (queryClients.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryClients.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[450px] ">
      <CardHeader>
        <CardTitle>Top 5 clientes de las ventas</CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-between mb-5">
          <div className="flex items-center px-4 py-2 space-x-2 border rounded-sm">
            <Switch
              defaultChecked={showTotalSaleBar}
              onCheckedChange={(value) => {
                setshowTotalSaleBar(value);
              }}
              id="show-value-pay"
            />
            <Label htmlFor="show-value-pay">Mostrar pago</Label>
          </div>
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
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
                dataKey={'total_quantity'}
                yAxisId="left"
                orientation="left"
                stroke="var(--color-total_quantity)"
              />
              {showTotalSaleBar && (
                <YAxis
                  dataKey={'total_sale'}
                  yAxisId="right"
                  orientation="right"
                  stroke="var(--color-total_sale)"
                />
              )}
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="first_name"
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
                            {name === 'total_quantity'
                              ? FormatNumber(Number(value))
                              : FormatMoneyValue(Number(value))}
                            {name === 'total_quantity' && (
                              <span className="font-normal text-muted-foreground">
                                kg
                              </span>
                            )}
                          </div>
                        </>
                      );
                    }}
                  />
                }
              />

              {/* Barra de total_quantity */}
              <Bar
                dataKey="total_quantity"
                fill="var(--color-total_quantity)"
                radius={4}
                yAxisId="left"
              ></Bar>

              {/* Barra de total_sale */}

              {showTotalSaleBar && (
                <Bar
                  dataKey="total_sale"
                  fill="var(--color-total_sale)" // Asignando un color distinto para la nueva barra
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
