"use client";
import { PieChart } from "@typelytics/core";
import {
  DonutChart as TremorPieChart,
  DonutChartProps as TremorPieChartProps,
} from "@tremor/react";

export type PieChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = {
  data: PieChart<Labels, IsBreakdown>;
  category?: Labels;
} & Omit<TremorPieChartProps, "index" | "data" | "category">;

export function PieChart<
  const Labels extends string,
  IsBreakdown extends boolean,
>(props: PieChartProps<Labels, IsBreakdown>) {
  return (
    <TremorPieChart
      index="label"
      variant="donut"
      category={"value"}
      {...props}
    />
  );
}
