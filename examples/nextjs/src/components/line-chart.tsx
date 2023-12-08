import { TimeSeriesChart, TimeSeriesChartTypes } from "~/data/events";
import {
  LineChart as TremorLineChart,
  LineChartProps as TremorLineChartProps,
  BarChart as TremorBarChart,
  BarChartProps as TremorBarChartProps,
  AreaChart as TremorAreaChart,
  AreaChartProps as TremorAreaChartProps,
} from "@tremor/react";
export type TimeSeriesChartProps<Labels extends string> = {
  data: TimeSeriesChart<Labels>["data"];
  categories?: Labels[];
};

export type LineChartProps<Labels extends string> =
  TimeSeriesChartProps<Labels> &
    Omit<TremorLineChartProps, "index" | "data" | "categories">;

export function LineChart<const Labels extends string>(
  props: LineChartProps<Labels>,
) {
  const { data } = props;
  const categories = data[0]
    ? Object.keys(data[0]).filter((key) => key !== "date")
    : [];
  return (
    <TremorLineChart
      className="mt-6"
      data={data}
      index="date"
      categories={props.categories || categories}
    />
  );
}

export type BarChartProps<Labels extends string> =
  TimeSeriesChartProps<Labels> &
    Omit<TremorBarChartProps, "index" | "data" | "categories">;
export function BarChart<const Labels extends string>(
  props: BarChartProps<Labels>,
) {
  const { data } = props;
  const categories = data[0]
    ? Object.keys(data[0]).filter((key) => key !== "date")
    : [];
  return (
    <TremorBarChart
      className="mt-6"
      data={data}
      index="date"
      categories={props.categories || categories}
    />
  );
}
export type AreaChartProps<Labels extends string> =
  TimeSeriesChartProps<Labels> &
    Omit<TremorAreaChartProps, "index" | "data" | "categories">;
export function AreaChart<const Labels extends string>(
  props: AreaChartProps<Labels>,
) {
  const { data } = props;
  const categories = data[0]
    ? Object.keys(data[0]).filter((key) => key !== "date")
    : [];

  console.log(data, categories, props.categories);
  return (
    <TremorAreaChart
      className="mt-6"
      data={data}
      index="date"
      categories={props.categories || categories}
    />
  );
}
