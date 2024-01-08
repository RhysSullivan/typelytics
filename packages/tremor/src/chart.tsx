"use client";
import { Metric, Text } from "@tremor/react";
import {
  AreaChartType,
  BarChartType,
  BarTotalChartType,
  ChartType,
  CumulativeLineChartType,
  DefaultDataKeyForChartType,
  LineChartType,
  NumberChart,
  NumberChartType,
  PieChartType,
} from "@typecharts/core";
import {
  LineChart,
  BarChart,
  AreaChart,
  LineChartProps,
  BarChartProps,
  AreaChartProps,
} from "./timeseries";
import {
  BarTotalChart,
  BarTotalChartProps,
  PieChart,
  PieChartProps,
} from "./pie";

export function Chart<
  const Type extends ChartType,
  const Labels extends string,
  const DataKey extends string = DefaultDataKeyForChartType[Type],
>(
  props: (Type extends LineChartType
    ? LineChartProps<Labels, DataKey>
    : Type extends CumulativeLineChartType
      ? LineChartProps<Labels, DataKey>
      : Type extends BarChartType
        ? BarChartProps<Labels, DataKey>
        : Type extends BarTotalChartType
          ? BarTotalChartProps<Labels>
          : Type extends AreaChartType
            ? AreaChartProps<Labels, DataKey>
            : Type extends PieChartType
              ? PieChartProps<Labels, DataKey>
              : Type extends NumberChartType
                ? NumberChart<DataKey>
                : `!!! ${Type} chart is unsupported !!!`) & { type: Type }
) {
  const type = props.type;
  switch (type) {
    case "cumulative-line":
    case "line": {
      return <LineChart {...(props as LineChartProps<Labels, DataKey>)} />;
    }
    case "bar": {
      return <BarChart {...(props as BarChartProps<Labels, DataKey>)} />;
    }
    case "bar-total": {
      return (
        <BarTotalChart {...(props as unknown as BarTotalChartProps<Labels>)} />
      );
    }
    case "area": {
      return <AreaChart {...(props as AreaChartProps<Labels, DataKey>)} />;
    }
    case "pie": {
      return <PieChart {...(props as PieChartProps<Labels, DataKey>)} />;
    }
    case "number":
      const args = props as NumberChart<DataKey>;
      return (
        <>
          <Text>{args.dataKey}</Text>
          <Metric>{args.data}</Metric>
        </>
      );
  }
  throw new Error(`Unknown chart type: ${type}`);
}
