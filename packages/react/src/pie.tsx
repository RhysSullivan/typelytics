"use client";
import { PieChart } from "@typecharts/core";
import {
  DonutChart as TremorPieChart,
  DonutChartProps as TremorPieChartProps,
} from "@tremor/react";

export type PieChartProps<Labels extends string> = {
  data: PieChart<Labels>["data"];
  category?: Labels;
} & Omit<TremorPieChartProps, "index" | "data" | "category">;

export function PieChart<const Labels extends string>(
  props: PieChartProps<Labels>
) {
  return (
    <TremorPieChart
      index="label"
      variant="donut"
      category={"value"}
      {...props}
    />
  );
}
