export type LineChartType = "line";
export type BarChartType = "bar";
export type AreaChartType = "area";
export type CumulativeLineChartType = "cumulative-line";
export type NumberChartType = "number";
export type PieChartType = "pie";
export type BarTotalChartType = "bar-total";
export type TableChartType = "table";
// export type WorldChartType = "world";

export type ChartType =
  | LineChartType
  | BarChartType
  | AreaChartType
  | CumulativeLineChartType
  | NumberChartType
  | PieChartType
  | BarTotalChartType
  | TableChartType;
// | WorldChartType;

export type TimeSeriesChartTypes =
  | LineChartType
  | BarChartType
  | AreaChartType
  | CumulativeLineChartType;

export const defaultChartDataKeys = {
  line: "date",
  bar: "date",
  area: "date",
  "cumulative-line": "date",
  number: "value",
  pie: "value",
  "bar-total": "value",
  table: "value",
  // world: "value",
} as const;

export type DefaultDataKeyForChartType = typeof defaultChartDataKeys;

export type TimeSeriesChart<
  Entries extends string,
  Key extends string = DefaultDataKeyForChartType[ChartType],
> = {
  datakey?: Key;
} & Record<
  Entries,
  {
    value: number | string;
    datakey: Key;
  }[]
>;

export type NumberChart<
  Entries extends string,
  DataKey extends string = DefaultDataKeyForChartType[ChartType],
> = {
  datakey?: DataKey;
} & Record<Entries, string>;

export type PieChart<
  Entries extends string,
  DataKey extends string = DefaultDataKeyForChartType[ChartType],
> = {
  datakey?: DataKey;
} & Record<Entries, string>;

export type BarTotalChart<T extends string> = Record<T, number[]>;

export type Table<T extends string> = Record<T, string[]>;

type ChartInternal<
  Type extends ChartType,
  Labels extends string,
  DataKey extends string = DefaultDataKeyForChartType[ChartType],
> = Type extends TimeSeriesChartTypes
  ? TimeSeriesChart<Labels, DataKey>
  : Type extends NumberChartType
    ? NumberChart<Labels, DataKey>
    : Type extends PieChartType
      ? PieChart<Labels, DataKey>
      : Type extends BarTotalChartType
        ? BarTotalChart<Labels>
        : Type extends TableChartType
          ? Table<Labels>
          : never;

export type Chart<
  Type extends ChartType,
  Labels extends string,
  DataKey extends string = DefaultDataKeyForChartType[ChartType],
> = ChartInternal<Type, Labels, DataKey> & { type: Type };
