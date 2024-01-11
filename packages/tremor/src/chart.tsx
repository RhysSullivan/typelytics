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
  TableChartType,
} from "@typelytics/core";
import {
  LineChart,
  BarChart,
  AreaChart,
  LineChartProps,
  BarChartProps,
  AreaChartProps,
} from "./timeseries";
import { PieChart, PieChartProps } from "./pie";
import { BarTotalChart, BarTotalChartProps } from "./bar-total";
import { Table, TableProps } from "./table";

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
                : Type extends TableChartType
                  ? TableProps<Labels>
                  : `!!! ${Type} chart is unsupported !!!`) & { type: Type },
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
      return <BarTotalChart {...(props as BarTotalChartProps<Labels>)} />;
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
          <Text>{args.datakey}</Text>
          <Metric>{args.data}</Metric>
        </>
      );
    case "table":
      return <Table {...(props as TableProps<Labels>)} />;
  }
  throw new Error(`Unknown chart type: ${type}`);
}
