"use client";
import { TimeSeriesChart } from "@typelytics/core";
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
  IsBreakdown extends boolean,
> = TimeSeriesChart<Labels, IsBreakdown> & {
  categories?: Labels[];
};

function getAllEntries(
  data: Record<string, Record<string, number[]> | number[]>
) {
  const entries = new Set<string>();
  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (Array.isArray(value)) {
      entries.add(key);
    } else if (value) {
      Object.keys(value).forEach((key) => {
        entries.add(key);
      });
    }
  });
  return entries;
}

export type LineChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorLineChartProps, "data" | "categories" | "index">;

export function LineChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: LineChartProps<Labels, IsBreakdown>) {
  console.log(props);
  const { data: unformattedData, labels } = props;
  const categories = getAllEntries(unformattedData);

  const data = labels.map((label, index) => {
    const output: Record<string, number | string> = { label };
    Object.keys(unformattedData).forEach((key) => {
      const value = unformattedData[key as keyof typeof unformattedData];
      if (Array.isArray(value)) {
        output[key] = value[index]!;
      } else if (value) {
        Object.keys(value).forEach((key) => {
          const value = unformattedData[key as keyof typeof unformattedData];
          if (Array.isArray(value)) {
            output[key] = value[index]!;
          }
        });
      }
    });
    return output;
  });

  return (
    <TremorLineChart
      className="mt-6"
      data={data}
      index={"label"}
      categories={[...categories]}
    />
  );
}

export type BarChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorBarChartProps, "data" | "categories" | "index">;

export function BarChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: BarChartProps<Labels, IsBreakdown>) {
  const { data: unformattedData, labels } = props;
  const categories = getAllEntries(unformattedData);

  const data = labels.map((label, index) => {
    const output: Record<string, number | string> = { label };
    Object.keys(unformattedData).forEach((key) => {
      const value = unformattedData[key as keyof typeof unformattedData];
      if (Array.isArray(value)) {
        output[key] = value[index]!;
      } else if (value) {
        Object.keys(value).forEach((key) => {
          const value = unformattedData[key as keyof typeof unformattedData];
          if (Array.isArray(value)) {
            output[key] = value[index]!;
          }
        });
      }
    });
    return output;
  });
  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index={"label"}
      categories={[...categories]}
    />
  );
}

export type AreaChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorAreaChartProps, "index" | "data" | "categories">;

export function AreaChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: AreaChartProps<Labels, IsBreakdown>) {
  const { data: unformattedData, labels } = props;
  const categories = getAllEntries(unformattedData);

  const data = labels.map((label, index) => {
    const output: Record<string, number | string> = { label };
    Object.keys(unformattedData).forEach((key) => {
      const value = unformattedData[key as keyof typeof unformattedData];
      if (Array.isArray(value)) {
        output[key] = value[index]!;
      } else if (value) {
        Object.keys(value).forEach((key) => {
          const value = unformattedData[key as keyof typeof unformattedData];
          if (Array.isArray(value)) {
            output[key] = value[index]!;
          }
        });
      }
    });
    return output;
  });

  return (
    <TremorAreaChart
      className="mt-6"
      data={data}
      index={"label"}
      categories={[...categories]}
    />
  );
}
