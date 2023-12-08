"use client";
import { DonutChart, Metric, Text } from "@tremor/react";
import { ChartType, TimeSeriesChartTypes } from "~/data/events";
import {
  LineChart,
  BarChart,
  AreaChart,
  TimeSeriesChartProps,
} from "./line-chart";

export function Chart<
  const Type extends ChartType,
  const Labels extends string,
>(
  props: (Type extends TimeSeriesChartTypes
    ? TimeSeriesChartProps<Labels>
    : never) & {
    type: Type;
  },
) {
  const type = props.type;
  switch (type) {
    case "cumulative-line":
    case "line": {
      return <LineChart {...props} />;
    }
    case "bar": {
      return <BarChart {...props} />;
    }
    case "area": {
      return <AreaChart {...props} />;
    }
    case "pie": {
      if (props.chart.variant === "donut") {
        return (
          <DonutChart
            className="mt-6"
            data={data}
            index="label"
            category={"value"}
          />
        );
      }
    }
    case "number":
      return (
        <>
          <Text>{data.label}</Text>
          <Metric>{data.value}</Metric>
        </>
      );
    default:
  }
}
