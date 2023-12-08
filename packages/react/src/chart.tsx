"use client";
import { Metric, Text } from "@tremor/react";
import { ChartType, LineChartType, PieChartType } from "@typecharts/core";
import { LineChart, BarChart, AreaChart, LineChartProps } from "./timeseries";
import { PieChart, PieChartProps } from "./pie";

export function Chart<
  const Type extends ChartType,
  const Labels extends string,
>(
  props: (Type extends LineChartType
    ? LineChartProps<Labels>
    : Type extends PieChartType
      ? PieChartProps<Labels>
      : never) & { type: Type }
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
      return <PieChart {...props} />;
    }
    case "number":
      return (
        <>
          <Text>{data.label}</Text>
          <Metric>{data.value}</Metric>
        </>
      );
  }
}
