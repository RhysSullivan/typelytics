"use client";
import { Metric, Text } from "@tremor/react";
import {
  ChartType,
  DefaultDataKeyForChartType,
  LineChartType,
  PieChartType,
} from "@typecharts/core";
import { LineChart, BarChart, AreaChart, LineChartProps } from "./timeseries";
import { PieChart, PieChartProps } from "./pie";

export function Chart<
  const Type extends ChartType,
  const Labels extends string,
  const DataKey extends string = DefaultDataKeyForChartType<Type>,
>(
  props: (Type extends LineChartType
    ? LineChartProps<Labels, DataKey>
    : Type extends PieChartType
      ? PieChartProps<Labels, DataKey>
      : never) & { type: Type }
) {
  const type = props.type;
  switch (type) {
    case "cumulative-line":
    case "line": {
      return <LineChart {...(props as LineChartProps<Labels, DataKey>)} />;
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
