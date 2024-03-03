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

export type LineChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorLineChartProps, "data" | "categories" | "index" | "results">;

export function isChartData(
  data: ChartData | Record<string, ChartData> | undefined
): data is ChartData {
  if (!data) return false;
  return Array.isArray(data.data) && Array.isArray(data.days);
}

export function toTremorTimeseriesData<
  const Labels extends string,
  const IsBreakdown extends boolean,
  T extends Record<
    Labels,
    IsBreakdown extends true ? Record<string, ChartData> : ChartData
  >,
>(unformattedData: T) {
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
        output[val.label] = num ?? 0;
        output["label"] = labels[index]!;
      } else {
        Object.values(val).forEach((valEntry: ChartData) => {
          const num = valEntry.data[index];
          if (num) output[valEntry.label] = num;
          output["label"] = labels[index]!;
        });
      }
    });
    return output;
  });
  const categories = [
    ...new Set(
      data.flatMap((d) => Object.keys(d).filter((key) => key !== "label")),
    ),
  ];
  
  return { data, categories, labels };
}

export function LineChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: LineChartProps<Labels, IsBreakdown>) {
  const { results, ...rest } = props;
  const { data, categories } = toTremorTimeseriesData(results);
  return (
    <TremorLineChart
      className="mt-6"
      data={data}
      index={"label"}
      enableLegendSlider={true}
      categories={[...categories]}
      {...rest}
    />
  );
}

export type BarChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorBarChartProps, "data" | "categories" | "index" | "results">;

export function BarChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: BarChartProps<Labels, IsBreakdown>) {
  const { results, ...rest } = props;
  const { data, categories } = toTremorTimeseriesData(results);
  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index={"label"}
      categories={[...categories]}
      {...rest}
    />
  );
}

export type AreaChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = TimeSeriesChartProps<Labels, IsBreakdown> &
  Omit<TremorAreaChartProps, "index" | "data" | "categories" | "results">;

export function AreaChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: AreaChartProps<Labels, IsBreakdown>) {
  const { results, ...rest } = props;
  const { data, categories } = toTremorTimeseriesData(results);
  return (
    <TremorAreaChart
      className="mt-6"
      data={data}
      index={"label"}
      categories={[...categories]}
      {...rest}
    />
  );
}
