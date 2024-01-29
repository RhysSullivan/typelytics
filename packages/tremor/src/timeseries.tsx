"use client";
import { Chart, ChartData, TimeSeriesChartTypes } from "@typelytics/core";
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
> = Pick<Chart<TimeSeriesChartTypes, Labels, IsBreakdown>, "results"> & {
  categories?: Labels[];
};

function getAllEntries(
  data: Record<string, Record<string, ChartData> | ChartData>
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

export function isChartData(
  data: ChartData | Record<string, ChartData> | undefined
): data is ChartData {
  if (!data) return false;
  return Array.isArray(data.data) && Array.isArray(data.days);
}

export function LineChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: LineChartProps<Labels, IsBreakdown>) {
  const { results: unformattedData } = props;

  // data is in the format of:
  // Record<string, chartdata | record<string, chartdata>>
  // we need to collapse it into one long array, where every key maps to a value

  // 1. get the time series we need to fill in
  const first = Object.values(unformattedData).at(0) as
    | ChartData
    | Record<string, ChartData>
    | undefined;
  const labels = isChartData(first)
    ? first.days
    : Object.values(first ?? {})?.at(0)?.days ?? [];

  // 2. for each time series, fill in the data
  const data = Array.from({ length: labels.length }, (_, index) => {
    const output: Record<string, string | number> = {};
    Object.keys(unformattedData).forEach((key) => {
      const val = unformattedData[key as keyof typeof unformattedData];
      if (!val) {
        return;
      }
      if (isChartData(val)) {
        const num = val.data[index];
        if (num) output[val.label] = num;
        output["label"] = labels[index]!;
      } else {
        Object.values(val).forEach((valEntry: ChartData) => {
          const num = valEntry.data[index];
          if (num) output[`${key} - ${valEntry.label}`] = num;
          output["label"] = labels[index]!;
        });
      }
    });
    return output;
  });
  const categories = Object.keys(data.at(0) ?? {}).filter((x) => x !== "label");
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
  const { results: unformattedData } = props;
  const categories = getAllEntries(unformattedData);
  const firstValue = Object.values(unformattedData).at(0) as
    | ChartData
    | Record<string, ChartData>
    | undefined;
  const dataLength = Array.isArray(firstValue?.data)
    ? firstValue?.data.length
    : (Object.values(firstValue ?? {}).at(0) as ChartData | undefined)?.data
        .length;

  const data = Array.from({ length: dataLength ?? 0 }, (_, index) => {
    const output: Record<string, number | string> = {};
    Object.keys(unformattedData).forEach((key) => {
      const val = unformattedData[key as keyof typeof unformattedData];
      if (Array.isArray(val.data) && typeof val.label === "string") {
        output[val.label] = val.data[index]!;
      } else if (val) {
        Object.keys(val).forEach((key) => {
          const val = unformattedData[key as keyof typeof unformattedData];
          if (Array.isArray(val.data) && typeof val.label === "string") {
            output[val.label] = val.data[index]!;
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
  const { results: unformattedData } = props;
  const categories = getAllEntries(unformattedData);
  const firstValue = Object.values(unformattedData).at(0) as
    | ChartData
    | Record<string, ChartData>
    | undefined;
  const dataLength = Array.isArray(firstValue?.data)
    ? firstValue?.data.length
    : (Object.values(firstValue ?? {}).at(0) as ChartData | undefined)?.data
        .length;

  const data = Array.from({ length: dataLength ?? 0 }, (_, index) => {
    const output: Record<string, number | string> = {};
    Object.keys(unformattedData).forEach((key) => {
      const val = unformattedData[key as keyof typeof unformattedData];
      if (Array.isArray(val.data) && typeof val.label === "string") {
        output[val.label] = val.data[index]!;
      } else if (val) {
        Object.keys(val).forEach((key) => {
          const val = unformattedData[key as keyof typeof unformattedData];
          if (Array.isArray(val.data) && typeof val.label === "string") {
            output[val.label] = val.data[index]!;
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
