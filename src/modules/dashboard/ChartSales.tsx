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
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis
} from 'recharts';

const salesData = [
  { name: 'Wheat', quantity: 200, total: 200 },
  { name: 'Rice', quantity: 250, total: 300 },
].sort((a, b) => b.total - a.total);

export default function ChartSales() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Ventas por Cultivo</CardTitle>
        <CardDescription>
          Cantidad vendida y total de venta para cada cultivo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            quantity: {
              label: 'Cantidad Vendida',
              color: 'hsl(var(--chart-1))',
            },
            total: {
              label: 'Total de Venta',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-2))"
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar
                dataKey="quantity"
                fill="var(--color-quantity)"
                yAxisId="left"
              />
              <Bar dataKey="total" fill="var(--color-total)" yAxisId="right" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
