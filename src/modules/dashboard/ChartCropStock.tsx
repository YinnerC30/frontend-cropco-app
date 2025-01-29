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
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const cropData = [
  {
    name: 'Corn',
    stock: 1500,
  },
  {
    name: 'Rice',
    stock: 1250,
  },
].sort((a, b) => b.stock - a.stock);

export default function CropStockChart() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Inventario de los cultivos</CardTitle>
        <CardDescription>Cantidad total de Kg de cada cultivo</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            stock: {
              label: 'Inventario actual:  ',
              color: 'hsl(var(--chart-1))',
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={cropData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="stock" fill="var(--color-stock)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
