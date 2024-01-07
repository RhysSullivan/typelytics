"use client";
import { TimeSeriesChart } from "@typecharts/core";
import {
  LineChart as TremorLineChart,
  LineChartProps as TremorLineChartProps,
  BarChart as TremorBarChart,
  BarChartProps as TremorBarChartProps,
  AreaChart as TremorAreaChart,
  AreaChartProps as TremorAreaChartProps,
} from "@tremor/react";
export type TimeSeriesChartProps<
  Labels extends string,
  Key extends string,
> = Omit<TimeSeriesChart<Labels, Key>, "type"> & {
  categories?: Labels[];
};

export type LineChartProps<
  Labels extends string,
  Key extends string,
> = TimeSeriesChartProps<Labels, Key> &
  Omit<TremorLineChartProps, "data" | "categories">;

export function LineChart<
  const Labels extends string,
  const Key extends string,
>(props: LineChartProps<Labels, Key>) {
  const { data } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== props.dataKey) {
          categories.add(key as Labels);
        }
      });
    });
  }
  return (
    <TremorLineChart
      className="mt-6"
      data={data}
      index={props.dataKey}
      categories={[...categories]}
    />
  );
}

export type BarChartProps<
  Labels extends string,
  Key extends string,
> = TimeSeriesChartProps<Labels, Key> &
  Omit<TremorBarChartProps, "data" | "categories">;

export function BarChart<const Labels extends string, const Key extends string>(
  props: BarChartProps<Labels, Key>
) {
  const { data } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== props.dataKey) {
          categories.add(key as Labels);
        }
      });
    });
  }
  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index={props.dataKey}
      categories={[...categories]}
    />
  );
}

export type AreaChartProps<
  Labels extends string,
  DataKey extends string,
> = TimeSeriesChartProps<Labels, DataKey> &
  Omit<TremorAreaChartProps, "index" | "data" | "categories">;

export function AreaChart<
  const Labels extends string,
  const DataKey extends string,
>(props: AreaChartProps<Labels, DataKey>) {
  const { data } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== props.dataKey) {
          categories.add(key as Labels);
        }
      });
    });
  }

  return (
    <TremorAreaChart
      className="mt-6"
      data={data}
      index={props.dataKey}
      categories={[...categories]}
    />
  );
}
