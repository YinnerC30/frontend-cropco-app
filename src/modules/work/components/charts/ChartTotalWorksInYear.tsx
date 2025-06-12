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

import YearSelector from '@/modules/core/components/shared/YearSelector';

import { Label, Switch } from '@/components';
import { ChartSkeleton } from '@/modules/core/components/charts/ChartSkeleton';
import CropSelector from '@/modules/core/components/shared/CropSelector';
import EmployeeSelector from '@/modules/core/components/shared/EmployeeSelector';
import { useGetAllCropsWithWork } from '@/modules/crops/hooks';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import { organizeWorkData } from '../../helpers/organizeWorkData';
import { useGetTotalWorksInYear } from '../../hooks/queries/useGetTotalWorksInYear';

export function ChartTotalWorksInYear() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [showPreviousYear, setShowPreviousYear] = useState(true);

  const queryWorks = useGetTotalWorksInYear({
    year: selectedYear,
    crop: selectedCrop,
    employee: selectedEmployee,
  });

  const queryCrops = useGetAllCropsWithWork();

  if (queryWorks.isLoading) {
    return <ChartSkeleton />;
  }

  const chartConfig = {
    current_value_pay: {
      label: queryWorks.data?.years[0].year,
      color: 'hsl(var(--chart-1))',
    },
    previous_value_pay: {
      label: queryWorks.data?.years[1].year,
      color: 'hsl(var(--chart-2))',
    },
  } satisfies ChartConfig;

  const chartData = organizeWorkData(queryWorks.data as any);

  return queryWorks.isSuccess ? (
    <Card className="w-auto lg:w-[650px] ">
      <CardHeader>
        <CardTitle>Total de los trabajos por año</CardTitle>
        <CardDescription>
          Se muestra la cantidad de trabajos en cada mes del año comparado con
          el año anterior
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
          <div className="flex flex-wrap justify-between gap-4 mb-5">
            <CropSelector
              selectedCrop={selectedCrop}
              setSelectedCrop={setSelectedCrop}
              query={queryCrops}
            />
            <EmployeeSelector
              employeesIn="works"
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
                await queryWorks.refetch();
              }}
              disabled={queryWorks.isLoading}
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
                    stopColor="var(--color-current_value_pay)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-current_value_pay)"
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
                      stopColor="var(--color-previous_value_pay)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-previous_value_pay)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                )}
              </defs>

              <Area
                dataKey="current_value_pay"
                type="linear"
                fill="url(#fillCurrentTotal)"
                fillOpacity={0.4}
                stroke="var(--color-current_value_pay)"
                stackId="a"
              />
              {showPreviousYear && (
                <Area
                  dataKey="previous_value_pay"
                  type="linear"
                  fill="url(#fillPreviousTotal"
                  fillOpacity={0.4}
                  stroke="var(--color-previous_value_pay)"
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
    <div className="h-[200px]">Error al generar el gráfico</div>
  );
}
