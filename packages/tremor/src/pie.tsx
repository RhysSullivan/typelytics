"use client";
import { PieChart, BarTotalChart } from "@typecharts/core";
import {
  DonutChart as TremorPieChart,
  DonutChartProps as TremorPieChartProps,
  BarListProps as TremorBarTotalChartProps,
  BarList as TremorBarTotalChart,
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

export type BarTotalChartProps<Labels extends string> = {
  data: (BarTotalChart<Labels>["data"][number] &
    Omit<
      TremorBarTotalChartProps["data"][number],
      keyof BarTotalChart<Labels>["data"][number]
    >)[];
} & Omit<TremorBarTotalChartProps, "index" | "data" | "category">;

export function BarTotalChart<const Labels extends string>(
  props: BarTotalChartProps<Labels>
) {
  return <TremorBarTotalChart {...props} />;
}
