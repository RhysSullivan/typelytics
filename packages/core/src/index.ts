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

export type DefaultDataKeyForChartType<Type extends ChartType> =
  Type extends TimeSeriesChartTypes
    ? "date"
    : Type extends "number"
      ? "value"
      : Type extends "pie"
        ? "value"
        : never;
       
export type TimeSeriesChart<
  Entries extends string,
  Key extends string = DefaultDataKeyForChartType<ChartType>,
> = {
  dataKey?: Key;
  data: Record<Entries | Key, string>[];
};

export type NumberChart<Entries extends string, DataKey extends string> = {
  dataKey?: DataKey;
  data: {
    label: Entries;
  } & Record<DataKey, number>;
};

export type PieChart<T extends string, DataKey extends string> = {
  dataKey?: DataKey;
  data: {
    label: T;
    value: number;
  }[];
};

export type Chart<
  Type extends ChartType,
  Labels extends string,
  DataKey extends string = DefaultDataKeyForChartType<Type>,
> = Type extends TimeSeriesChartTypes
  ? TimeSeriesChart<Labels, DataKey>
  : Type extends "number"
    ? NumberChart<Labels, DataKey>
    : Type extends "pie"
      ? PieChart<Labels, DataKey>
      : never;
