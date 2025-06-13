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
import { ButtonRefetchData } from '@/modules/core/components';

import { useState } from 'react';
import { useGetTotalHarvestsInYear } from '../../hooks/queries/useGetTotalHarvestsInYear';

import YearSelector from '@/modules/core/components/shared/YearSelector';
import { FormatNumber } from '@/modules/core/helpers';
import { Equal, TrendingDown, TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Label, Switch } from '@/components';
import { ChartSkeleton } from '@/modules/core/components/charts/ChartSkeleton';
import CropSelector from '@/modules/core/components/shared/CropSelector';
import EmployeeSelector from '@/modules/core/components/shared/EmployeeSelector';
import { SelectedMassUnitOfMeasure } from '@/modules/core/components/shared/SelectedMassUnitOfMeasure';
import { useUnitConverter } from '@/modules/core/hooks/useUnitConverter';
import { useGetAllCropsWithHarvest } from '@/modules/crops/hooks';
import {
  MassUnitOfMeasure,
  UnitSymbols,
} from '@/modules/supplies/interfaces/UnitOfMeasure';
import { organizeHarvestData } from '../../helpers/organizeHarvestData';

export function ChartTotalHarvestsInYear() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');

  const [showPreviousYear, setShowPreviousYear] = useState(true);

  const [unitTypeToShowAmount, setUnitTypeToShowAmount] =
    useState<MassUnitOfMeasure>(MassUnitOfMeasure.KILOGRAMOS);

  const { convert } = useUnitConverter();

  const queryHarvests = useGetTotalHarvestsInYear({
    year: selectedYear,
    crop: selectedCrop,
    employee: selectedEmployee,
  });

  const { query: queryCrops } = useGetAllCropsWithHarvest({
    queryValue: '',
    all_records: true,
  });

  if (queryHarvests.isLoading || queryHarvests.isFetching) {
    return <ChartSkeleton />;
  }

  if (queryHarvests.isError) {
    return <ErrorCard />;
  }

  const chartConfig = {
    current_amount: {
      label: queryHarvests.data?.years[0].year,
      color: 'hsl(var(--chart-1))',
    },
    previous_amount: {
      label: queryHarvests.data?.years[1].year,
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const percentage = queryHarvests.data?.growth.growth_value.toFixed(2) ?? 0;

  const chartData = organizeHarvestData(queryHarvests.data as any);

  const chartDataConverted = chartData.map(
    ({ current_amount, previous_amount, ...rest }) => {
      return {
        ...rest,
        current_amount:
          current_amount !== 0
            ? convert(
                current_amount,
                MassUnitOfMeasure.GRAMOS,
                unitTypeToShowAmount
              )
            : 0,
        previous_amount:
          previous_amount !== 0
            ? convert(
                previous_amount,
                MassUnitOfMeasure.GRAMOS,
                unitTypeToShowAmount
              )
            : 0,
      };
    }
  );

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
        <div className="space-y-4"></div>
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

          <div className="flex flex-wrap justify-between gap-4 mb-5">
            <CropSelector
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              query={queryCrops}
            />
            <EmployeeSelector
              employeesIn="harvests"
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={setSelectedEmployee}
            />
            <YearSelector
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              initialYear={2023}
            />
            <ButtonRefetchData
              onClick={async () => {
                await queryHarvests.refetch();
              }}
              disabled={queryHarvests.isLoading}
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
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartDataConverted}
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
                content={
                  <ChartTooltipContent
                    indicator="line"
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
                            {value}

                            <span className="font-normal text-muted-foreground">
                              {UnitSymbols[unitTypeToShowAmount]}
                            </span>
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
                    stopColor="var(--color-current_amount)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-current_amount)"
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
                      stopColor="var(--color-previous_amount)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-previous_amount)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                )}
              </defs>

              <Area
                dataKey="current_amount"
                type="linear"
                fill="url(#fillCurrentTotal)"
                fillOpacity={0.4}
                stroke="var(--color-current_amount)"
                stackId="a"
              />

              {showPreviousYear && (
                <Area
                  dataKey="previous_amount"
                  type="linear"
                  fill="url(#fillPreviousTotal"
                  fillOpacity={0.4}
                  stroke="var(--color-previous_amount)"
                  stackId="a"
                />
              )}
              <ChartLegend content={<ChartLegendContent />} />
            </AreaChart>
          </ChartContainer>
        </div>
      </CardContent>
      {showPreviousYear && (
        <CardFooter>
          <div className="flex items-start w-full gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 font-medium leading-none">
                {queryHarvests.data?.growth.status === 'increment' && (
                  <span>
                    Hubo un incremento del {Math.abs(Number(percentage))} % en
                    el año {selectedYear}
                  </span>
                )}
                {queryHarvests.data?.growth.status === 'decrement' && (
                  <span>
                    Hubo un decremento del {Math.abs(Number(percentage))} % en
                    el año {selectedYear}
                  </span>
                )}

                {queryHarvests.data?.growth.status === 'stable' && (
                  <span>No hubieron cambios en el año {selectedYear}</span>
                )}
                {queryHarvests.data?.growth.status === 'no-valid' && (
                  <span>
                    No hay datos suficientes para realizar la comparación
                  </span>
                )}

                {queryHarvests.data?.growth.status === 'increment' && (
                  <TrendingUp className="w-4 h-4" />
                )}
                {queryHarvests.data?.growth.status === 'decrement' && (
                  <TrendingDown className="w-4 h-4" />
                )}
                {queryHarvests.data?.growth.status === 'stable' && (
                  <Equal className="w-4 h-4" />
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 leading-none text-muted-foreground">
                <span>
                  Total del año {queryHarvests.data?.years[0].year} :
                  {' ' +
                    FormatNumber(
                      queryHarvests.data?.growth.amount_current ?? 0
                    ) +
                    ' kg'}
                </span>
                <span>
                  Total del año {queryHarvests.data?.years[1].year} :{' '}
                </span>
                {' ' +
                  FormatNumber(
                    queryHarvests.data?.growth.amount_previous ?? 0
                  ) +
                  ' kg'}
              </div>
            </div>
          </div>
        </CardFooter>
      )}
    </Card>
  ) : (
    <div className="h-[200px]">Error al generar el gráfico</div>
  );
}

const ErrorCard = () => {
  return (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Total de las cosechas por año</CardTitle>
        <CardDescription>
          Se muestra la cantidad cosechada en cada mes del año comparado con el
          año anterior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div>Error</div>
      </CardContent>
    </Card>
  );
};
