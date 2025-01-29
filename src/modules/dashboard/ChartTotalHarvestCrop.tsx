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
  YAxis,
} from 'recharts';

const harvestData = [
  { name: 'Wheat', total: 4000, value_pay: 100000 },
  { name: 'Corn', total: 4000, value_pay: 100000 },
  { name: 'Rice', total: 2000, value_pay: 70000 },
].sort((a, b) => b.total - a.total);

export default function CropTotalHarvestCrop() {
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Cosecha y valor por cultivo</CardTitle>
        <CardDescription>
          Cantidad total cosechada y valor de pago para cada cultivo en el
          último período
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            total: {
              label: 'Total Cosechado',
              color: 'hsl(var(--chart-1))',
            },
            value_pay: {
              label: 'Valor de Pago',
              color: 'hsl(var(--chart-2))',
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={harvestData}
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
                dataKey="total"
                label="Total Kg"
                fill="var(--color-total)"
                yAxisId="left"
              />
              <Bar
                dataKey="value_pay"
                label="Valor a pagar"
                fill="var(--color-value_pay)"
                yAxisId="right"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
