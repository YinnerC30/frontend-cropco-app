"use client";

import { ChartContainer } from "@/components/ui/chart";
import { chartConfig } from "./ChartConfig";
import { chartData } from "./ChartData";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { BreadCrumb } from "../core/components";



export function Chart() {
  return (
    <div>

    <BreadCrumb finalItem={"Graficas"} hiddenSeparator/>
    
    <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
         <ChartTooltip content={<ChartTooltipContent />} />
         <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
    </div>
  );
}
export default Chart;
