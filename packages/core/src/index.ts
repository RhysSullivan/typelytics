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

export type TimeSeriesChart<
  Entries extends string,
  IsBreakdown extends boolean,
> = {
  data: Record<
    Entries,
    IsBreakdown extends true ? Record<string, number[]> : number[]
  >;
  labels: string[];
};

export type NumberChart<
  Entries extends string,
  IsBreakdown extends boolean,
> = Record<Entries, IsBreakdown extends true ? Record<string, string> : string>;

export type PieChart<
  Entries extends string,
  IsBreakdown extends boolean,
> = Record<Entries, IsBreakdown extends true ? Record<string, string> : string>;

export type BarTotalChart<
  T extends string,
  IsBreakdown extends boolean,
> = Record<T, IsBreakdown extends true ? Record<string, string> : string>;

export type Table<T extends string, IsBreakdown extends boolean> = Record<
  T,
  IsBreakdown extends true ? Record<string, string> : string
>;

type ChartInternal<
  Type extends ChartType,
  Labels extends string,
  IsBreakdown extends boolean,
> = Type extends TimeSeriesChartTypes
  ? TimeSeriesChart<Labels, IsBreakdown>
  : Type extends NumberChartType
    ? NumberChart<Labels, IsBreakdown>
    : Type extends PieChartType
      ? PieChart<Labels, IsBreakdown>
      : Type extends BarTotalChartType
        ? BarTotalChart<Labels, IsBreakdown>
        : Type extends TableChartType
          ? Table<Labels, IsBreakdown>
          : never;

export type Chart<
  Type extends ChartType,
  Labels extends string,
  IsBreakdown extends boolean,
> = { type: Type } & ChartInternal<Type, Labels, IsBreakdown>;
