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
                ? NumberChart<Labels, DataKey>
                : Type extends TableChartType
                  ? TableProps<Labels>
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
      return <BarTotalChart {...(props as BarTotalChartProps<Labels>)} />;
    }
    case "area": {
      return <AreaChart {...(props as AreaChartProps<Labels, DataKey>)} />;
    }
    case "pie": {
      return <PieChart {...(props as PieChartProps<Labels, DataKey>)} />;
    }
    case "number":
      const args = props as NumberChart<Labels, DataKey>;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const keys = Object.keys(args.data);
      if (keys.length !== 1) {
        return (
          <>
            <Text>{args.datakey}</Text>
            {keys
              .filter((key) => key.includes("Current"))
              .map((key) => (
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                <Metric key={key}>{args.data[key as Labels]}</Metric>
              ))}
          </>
        );
      } else {
        return (
          <>
            <Text>{args.datakey}</Text>
            <Metric>
              {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                args.data[keys[0]! as Labels]
              }
            </Metric>
          </>
        );
      }
    case "table":
      return <Table {...(props as TableProps<Labels>)} />;
  }
  throw new Error(`Unknown chart type: ${type}`);
}
