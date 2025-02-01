import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ButtonRefetchData, Loading } from '@/modules/core/components';

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

  const chartData = [
    ...(queryCrops.data?.rows.filter((row) => row.stock > 0) || []),
  ];

  return (
    <Card className="w-auto lg:w-[450px] ">
      <CardHeader>
        <CardTitle>Top 5 cultivos con stock disponible</CardTitle>
      </CardHeader>
      <CardContent className="">
        <div className='flex justify-end'>
          <ButtonRefetchData
            onClick={async () => {
              await queryCrops.refetch();
            }}
            disabled={queryCrops.isLoading}
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

              <Bar
                dataKey="stock"
                fill="hsl(var(--chart-1))"
                radius={4}
                yAxisId="left"
              ></Bar>

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
