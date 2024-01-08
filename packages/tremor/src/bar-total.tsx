"use client";
import { BarTotalChart } from "@typecharts/core";
import {
  BarListProps as TremorBarTotalChartProps,
  BarList as TremorBarTotalChart,
  Color,
} from "@tremor/react";

export type BarTotalChartProps<Labels extends string> = {
  data: BarTotalChart<Labels>["data"];
  decorations?: {
    [key in Labels]?: Omit<
      TremorBarTotalChartProps["data"][number],
      keyof BarTotalChart<Labels>["data"][number] | "color"
    > & {
      color?: Color;
    };
  };
} & Omit<TremorBarTotalChartProps, "index" | "data" | "category">;

export function BarTotalChart<const Labels extends string>(
  props: BarTotalChartProps<Labels>
) {
  const { data, decorations, ...rest } = props;

  return (
    <TremorBarTotalChart
      data={data.map((d) => {
        return {
          ...d,
          ...decorations?.[d.name],
        };
      })}
      {...rest}
    />
  );
}
