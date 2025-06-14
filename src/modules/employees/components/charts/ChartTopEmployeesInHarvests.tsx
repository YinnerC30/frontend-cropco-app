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
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';
import YearSelector from '@/modules/core/components/shared/YearSelector';
import { FormatMoneyValue } from '@/modules/core/helpers';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { useState } from 'react';
import { useGetTopEmployeesInHarvests } from '../../hooks/queries/useGetTopEmployeesInHarvests';

const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
    color: 'var()',
  },
  total_harvests_amount: {
    label: 'Cosecha',
    color: 'hsl(var(--chart-3))',
  },
  total_value_pay: {
    label: 'Pago',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig;

export function ChartTopEmployeesInHarvests() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [showValuePayBar, setshowValuePayBar] = useState(true);

  const { convert } = useUnitConverter();

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const queryEmployees = useGetTopEmployeesInHarvests({
    year: Number(selectedYear),
  });

  if (queryEmployees.isLoading || queryEmployees.isFetching) {
    return <ChartSkeleton />;
  }

  const chartData = queryEmployees.isSuccess
    ? [...(queryEmployees.data?.records || [])]
    : [];

  const dataConvertedToUnitSelected = chartData.map((item) => {
    return {
      ...item,
      total_harvests_amount: convert(
        item.total_harvests_amount,
        MassUnitOfMeasure.GRAMOS,
        unitTypeToShowAmount
      ),
    };
  });

  return (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Top 5 empleados de las cosechas</CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap justify-between gap-4 mb-5">
          <div className="flex items-center px-4 py-2 space-x-2 border rounded-sm">
            <Label htmlFor="show-value-pay">Mostrar pago</Label>
            <Switch
              defaultChecked={showValuePayBar}
              onCheckedChange={(value) => {
                setshowValuePayBar(value);
              }}
              id="show-value-pay"
            />
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
          <div className="flex items-center w-full gap-2 pb-2">
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
                dataKey={'total_harvests_amount'}
                yAxisId="left"
                orientation="left"
                stroke="var(--color-total_harvests_amount)"
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
                            {name === 'total_harvests_amount'
                              ? Number(value)
                              : FormatMoneyValue(Number(value))}
                            {name === 'total_harvests_amount' && (
                              <span className="font-normal text-muted-foreground">
                                {UnitSymbols[unitTypeToShowAmount]}
                              </span>
                            )}
                          </div>
                        </>
                      );
                    }}
                  />
                }
              />

              {/* Barra de total_harvests_amount */}
              <Bar
                dataKey="total_harvests_amount"
                fill="var(--color-total_harvests_amount)"
                radius={4}
                yAxisId="left"
              ></Bar>

              {/* Barra de total_value_pay */}
              {showValuePayBar && (
                <Bar
                  dataKey="total_value_pay"
                  fill="var(--color-total_value_pay)"
                  radius={4}
                  yAxisId="right"
                ></Bar>
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
