import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

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
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';
import { useState } from 'react';
import { useGetTopEmployeesInWorks } from '../../hooks/queries/useGetTopEmployeesInWorks';
import YearSelector from './YearSelector';

const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
  },
  value_pay_works: {
    label: 'Pago',
  },
  total_works: {
    label: 'N° Trabajos',
  },
} satisfies ChartConfig;

export function ChartTopEmployeesInWorks() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const queryEmployees = useGetTopEmployeesInWorks({
    year: Number(selectedYear),
  });

  if (queryEmployees.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryEmployees.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[45%]">
      <CardHeader>
        <CardTitle>Top 5 empleados de los trabajos</CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex justify-end mb-5">
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
                dataKey={'value_pay_works'}
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
              />
              <YAxis
                dataKey={'total_works'}
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-2))"
              />
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="first_name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />

              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

              {/* Barra de value_pay_works */}
              <Bar
                dataKey="value_pay_works"
                fill="hsl(var(--chart-1))"
                radius={4}
                yAxisId="left"
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${FormatMoneyValue(value)}`} // Agregar "Kg" a cada valor
                />
              </Bar>

              {/* Barra de total_works */}
              <Bar
                dataKey="total_works"
                fill="hsl(var(--chart-2))" // Asignando un color distinto para la nueva barra
                radius={4}
                yAxisId="right"
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${FormatNumber(value)}`}
                />
              </Bar>

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
