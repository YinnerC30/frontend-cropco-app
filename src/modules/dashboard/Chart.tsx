"use client";

import { Bar, BarChart } from "recharts";

import { ChartContainer } from "@/components/ui/chart";
import { chartConfig } from "./ChartConfig";
import { chartData } from "./ChartData";

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
export default Chart;
