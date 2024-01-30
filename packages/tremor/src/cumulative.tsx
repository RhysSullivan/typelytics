"use client";
import {
  BarTotalChartType,
  Chart,
  ChartData,
  NumberChartType,
  TableChartType,
} from "@typelytics/core";
import {
  BarListProps as TremorBarTotalChartProps,
  BarList as TremorBarTotalChart,
  Card,
} from "@tremor/react";
import { isChartData } from "./timeseries";

export type BarTotalChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = Pick<Chart<BarTotalChartType, Labels, IsBreakdown>, "results"> &
  Omit<TremorBarTotalChartProps, "index" | "data" | "category" | "results">;

export function toTremorCumulativeData<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(
  results: Record<
    Labels,
    IsBreakdown extends true ? Record<string, ChartData> : ChartData
  >
) {
  const output: { name: string; value: number; label: string }[] = [];
  Object.keys(results).forEach((key) => {
    const casted = results[key as keyof typeof results];
    if (isChartData(casted)) {
      output.push({
        name: casted.label,
        value: casted.aggregated_value,
        label: casted.label,
      });
    } else {
      Object.values(casted).forEach((subVal: ChartData) => {
        output.push({
          name: subVal.label,
          value: subVal.aggregated_value,
          label: subVal.label,
        });
      });
    }
  });
  return output;
}

export function BarTotalChart<
  const Labels extends string,
  const IsBreakdown extends boolean,
>(props: BarTotalChartProps<Labels, IsBreakdown>) {
  const { results, ...rest } = props;
  const data = toTremorCumulativeData(results);

  return <TremorBarTotalChart data={data} {...rest} />;
}

import {
  DonutChart as TremorPieChart,
  DonutChartProps as TremorPieChartProps,
} from "@tremor/react";

export type PieChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = {
  results: Record<
    Labels,
    IsBreakdown extends true ? Record<string, ChartData> : ChartData
  >;
  category?: Labels;
} & Omit<TremorPieChartProps, "index" | "data" | "category" | "results">;

export function PieChart<
  const Labels extends string,
  IsBreakdown extends boolean,
>(props: PieChartProps<Labels, IsBreakdown>) {
  const { results, ...rest } = props;
  const data = toTremorCumulativeData(results);

  return (
    <TremorPieChart
      index="name"
      variant="donut"
      category={"value"}
      data={data}
      {...rest}
    />
  );
}

import {
  Table as TremorTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

export type TableProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = Chart<TableChartType, Labels, IsBreakdown>;

export function Table<Labels extends string, IsBreakdown extends boolean>(
  props: TableProps<Labels, IsBreakdown>
) {
  const data = toTremorCumulativeData(props.results);
  return (
    <TremorTable className="mt-5">
      <TableHead>
        <TableRow>
          <TableHeaderCell>Label</TableHeaderCell>
          <TableHeaderCell>Value</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={`${item.label} - ${index}`}>
            <TableCell>{item.label}</TableCell>
            <TableCell>{item.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TremorTable>
  );
}

export type NumberChartProps<
  Labels extends string,
  IsBreakdown extends boolean,
> = Chart<NumberChartType, Labels, IsBreakdown>;
import { Metric, Text } from "@tremor/react";
export function NumberChart<Labels extends string, IsBreakdown extends boolean>(
  props: PieChartProps<Labels, IsBreakdown>
) {
  const data = toTremorCumulativeData(props.results);

  return data.map((item) => (
    <>
      <Card className="max-w-xs mt-4 mx-auto">
        <Text>{item.name}</Text>
        <Metric>{item.value}</Metric>
      </Card>
    </>
  ));
}
