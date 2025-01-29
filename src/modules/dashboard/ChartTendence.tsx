'use client';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart';
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';

// Ejemplo de datos de cosecha
const harvestData = [
  { date: '2024-01-01', total: 1000 },
  { date: '2024-02-01', total: 1200 },
  { date: '2024-03-01', total: 1100 },
  { date: '2024-04-01', total: 1300 },
  { date: '2024-05-01', total: 1500 },
  { date: '2024-06-01', total: 1400 },
];

export default function ChartHarvestTrend() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Tendencia de Cosecha</CardTitle>
        <CardDescription>Total cosechado a lo largo del tiempo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: 'Total Cosechado',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={harvestData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <YAxis />
              <ChartTooltip
                content={<ChartTooltipContent />}
                labelFormatter={(value) => new Date(value).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="var(--color-total)"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
