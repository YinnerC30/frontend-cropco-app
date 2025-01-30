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
import { useGetTopClientsInSales } from '../../hooks/queries/useGetTopClientsInSales';
import YearSelector from '@/modules/core/components/shared/YearSelector';


const chartConfig: ChartConfig = {
  first_name: {
    label: 'Nombre',
  },
  total_quantity: {
    label: 'N° Stock',
  },
  total_sale: {
    label: 'Pago',
  },
} satisfies ChartConfig;

export function ChartTopClientsInSales() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const queryClients = useGetTopClientsInSales({
    year: Number(selectedYear),
  });

  if (queryClients.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryClients.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[45%]">
      <CardHeader>
        <CardTitle>Top 5 clientes de las ventas</CardTitle>
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
                dataKey={'total_quantity'}
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
              />
              <YAxis
                dataKey={'total_sale'}
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

              {/* Barra de total_quantity */}
              <Bar
                dataKey="total_quantity"
                fill="hsl(var(--chart-1))"
                radius={4}
                yAxisId="left"
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${FormatNumber(value)} kg`} // Agregar "Kg" a cada valor
                />
              </Bar>

              {/* Barra de total_sale */}
              <Bar
                dataKey="total_sale"
                fill="hsl(var(--chart-2))" // Asignando un color distinto para la nueva barra
                radius={4}
                yAxisId="right"
              >
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `${FormatMoneyValue(value)}`}
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
