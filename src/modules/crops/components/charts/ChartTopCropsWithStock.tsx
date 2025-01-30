import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Loading } from '@/modules/core/components';
import { FormatNumber } from '@/modules/core/helpers';

import { useGetAllHarvestsStock } from '@/modules/harvests/hooks';
// import YearSelector from './YearSelector';

const chartConfig: ChartConfig = {
  name: {
    label: 'Nombre',
  },
  stock: {
    label: 'N° Stock',
  },
} satisfies ChartConfig;

export function ChartTopCropsWithStock() {
  const queryCrops = useGetAllHarvestsStock();

  if (queryCrops.isLoading) {
    return <Loading />;
  }

  const chartData = [...(queryCrops.data?.rows || [])];

  return (
    <Card className="w-auto lg:w-[45%]">
      <CardHeader>
        <CardTitle>Top 5 cultivos con stock disponible</CardTitle>
        {/* <CardDescription>Enero - Diciembre {selectedYear}</CardDescription> */}
      </CardHeader>
      <CardContent className="">
        <div className="flex justify-end mb-5">
          {/* <YearSelector
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          /> */}
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
                dataKey={'stock'}
                yAxisId="left"
                orientation="left"
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

              {/* Barra de stock */}
              <Bar
                dataKey="stock"
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

              <ChartLegend content={<ChartLegendContent />} />
            </BarChart>
          </ChartContainer>
        ) : (
          <div className="w-full text-center h-[200px] flex items-center justify-center"></div>
        )}
      </CardContent>
    </Card>
  );
}
