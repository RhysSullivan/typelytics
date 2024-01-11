"use client";
import {
  DefaultDataKeyForChartType,
  TimeSeriesChart,
  defaultChartDataKeys,
} from "@typelytics/core";
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
  Key extends string = DefaultDataKeyForChartType["line"],
> = TimeSeriesChartProps<Labels, Key> &
  Omit<TremorLineChartProps, "data" | "categories" | "index">;

export function LineChart<
  const Labels extends string,
  const Key extends string,
>(props: LineChartProps<Labels, Key>) {
  const { data, datakey = defaultChartDataKeys["line"] } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== datakey) {
          categories.add(key as Labels);
        }
      });
    });
  }
  return (
    <TremorLineChart
      className="mt-6"
      data={data}
      index={datakey}
      categories={[...categories]}
    />
  );
}

export type BarChartProps<
  Labels extends string,
  Key extends string,
> = TimeSeriesChartProps<Labels, Key> &
  Omit<TremorBarChartProps, "data" | "categories" | "index">;

export function BarChart<const Labels extends string, const Key extends string>(
  props: BarChartProps<Labels, Key>,
) {
  const { data, datakey = defaultChartDataKeys["bar"] } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== datakey) {
          categories.add(key as Labels);
        }
      });
    });
  }
  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index={datakey}
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
  const { data, datakey = defaultChartDataKeys["area"] } = props;
  const categories = new Set<Labels>(props.categories || []);
  if (!props.categories) {
    data.forEach((d) => {
      Object.keys(d).forEach((key) => {
        if (key !== props.datakey) {
          categories.add(key as Labels);
        }
      });
    });
  }

  return (
    <TremorAreaChart
      className="mt-6"
      data={data}
      index={datakey}
      categories={[...categories]}
    />
  );
}
