import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis
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

import YearSelector from '@/modules/core/components/shared/YearSelector';
import { useGetTopCropsInHarvests } from '../../hooks/queries/useGetTopCropsInHarvests';

const chartConfig: ChartConfig = {
  name: {
    label: 'Nombre',
  },
  total_harvests: {
    label: 'N° Cosechas',
  },
  total_stock: {
    label: 'N° Stock',
  },
} satisfies ChartConfig;

export function ChartTopCropsWithHarvestsAndTotalStock() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const queryCrops = useGetTopCropsInHarvests({ year: selectedYear });

  if (queryCrops.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryCrops.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[450px] ">
      <CardHeader>
        <CardTitle>
          Top 5 cultivos con más cosechas y total recolectado
        </CardTitle>
        <CardDescription>Enero - Diciembre {selectedYear}</CardDescription>
      </CardHeader>
      <CardContent className="">
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
                dataKey={'total_harvests'}
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
              />
              <YAxis
                dataKey={'total_stock'}
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-1))"
              />

              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
              />

              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />

              <Bar
                dataKey="total_harvests"
                fill="hsl(var(--chart-1))"
                radius={4}
                yAxisId="left"
              ></Bar>

              <Bar
                dataKey="total_stock"
                fill="hsl(var(--chart-2))" // Asignando un color distinto para la nueva barra
                radius={4}
                yAxisId="right"
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
