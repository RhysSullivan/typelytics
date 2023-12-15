"use client";
import { PieChart } from "@typecharts/core";
import {
  DonutChart as TremorPieChart,
  DonutChartProps as TremorPieChartProps,
} from "@tremor/react";

export type PieChartProps<Labels extends string, DataKey extends string> = {
  data: PieChart<Labels, DataKey>["data"];
  category?: Labels;
} & Omit<TremorPieChartProps, "index" | "data" | "category">;

export function PieChart<const Labels extends string, DataKey extends string>(
  props: PieChartProps<Labels, DataKey>
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
