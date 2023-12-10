export type LineChartType = "line";
export type BarChartType = "bar";
export type AreaChartType = "area";
export type CumulativeLineChartType = "cumulative-line";
export type NumberChartType = "number";
export type PieChartType = "pie";
export type BarTotalChartType = "bar-total";
export type TableChartType = "table";
export type WorldChartType = "world";

export type ChartType =
  | LineChartType
  | BarChartType
  | AreaChartType
  | CumulativeLineChartType
  | NumberChartType
  | PieChartType
  | BarTotalChartType
  | TableChartType
  | WorldChartType;
export type TimeSeriesChartTypes =
  | LineChartType
  | BarChartType
  | AreaChartType
  | CumulativeLineChartType;

export type TimeSeriesChart<T extends string> = {
  type: TimeSeriesChartTypes;
  data: ({
    date: string;
  } & Record<T, string>)[];
};

export type NumberChart<T extends string> = {
  type: NumberChartType;
  data: {
    value: number;
    label: T;
  };
};

export type PieChart<T extends string> = {
  type: PieChartType;
  data: {
    label: T;
    value: number;
  }[];
};

export type Chart<
  Type extends ChartType,
  Labels extends string,
> = Type extends TimeSeriesChartTypes
  ? TimeSeriesChart<Labels>
  : Type extends "number"
    ? NumberChart<Labels>
    : Type extends "pie"
      ? PieChart<Labels>
      : never;
