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
import { useState } from 'react';
import { useGetTopEmployeesInHarvests } from '../../hooks/queries/useGetTopEmployeesInHarvests';
import YearSelector from './YearSelector';
import { FormatMoneyValue, FormatNumber } from '@/modules/core/helpers';

const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
  },
  total_harvests: {
    label: 'Total Kg',
  },
  total_value_pay: {
    label: 'Pago',
  },
} satisfies ChartConfig;

export function ChartTopEmployeesInHarvests() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const queryEmployees = useGetTopEmployeesInHarvests({
    year: Number(selectedYear),
  });

  if (queryEmployees.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryEmployees.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[45%]">
      <CardHeader>
        <CardTitle>
          Top de los empleados con mayor recolección por año
        </CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="p-5">
        <div className="flex justify-end mb-5">
          <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </div>
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
              dataKey={'total_harvests'}
              yAxisId="left"
              orientation="left"
              stroke="hsl(var(--chart-3))"
            />
            <YAxis
              dataKey={'total_value_pay'}
              yAxisId="right"
              orientation="right"
              stroke="hsl(var(--chart-4))"
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

            {/* Barra de total_harvests */}
            <Bar
              dataKey="total_harvests"
              fill="hsl(var(--chart-3))"
              radius={4}
              yAxisId="left"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => `${FormatNumber(value)} Kg`} // Agregar "Kg" a cada valor
              />
            </Bar>

            {/* Barra de total_value_pay */}
            <Bar
              dataKey="total_value_pay"
              fill="hsl(var(--chart-4))" // Asignando un color distinto para la nueva barra
              radius={4}
              yAxisId="right"
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={11}
                formatter={(value: number) => `${FormatMoneyValue(value)}`}
              />
            </Bar>

            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
