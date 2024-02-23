import {
  AreaChartType,
  BarChartType,
  BarTotalChartType,
  ChartType,
  CumulativeLineChartType,
  LineChartType,
  NumberChartType,
  PieChartType,
  TableChartType,
  WorldChartType,
} from "@typelytics/core";
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
  NumberChart,
  NumberChartProps,
  PieChart,
  PieChartProps,
  Table,
  TableProps,
} from "./cumulative";
import { WorldMap, WorldMapProps } from "./world-map";

export function Chart<
  const Type extends ChartType,
  const Labels extends string,
  const IsBreakdown extends boolean,
>(
  props: (Type extends LineChartType
    ? LineChartProps<Labels, IsBreakdown>
    : Type extends CumulativeLineChartType
      ? LineChartProps<Labels, IsBreakdown>
      : Type extends BarChartType
        ? BarChartProps<Labels, IsBreakdown>
        : Type extends AreaChartType
          ? AreaChartProps<Labels, IsBreakdown>
          : Type extends BarTotalChartType
            ? BarTotalChartProps<Labels, IsBreakdown>
            : Type extends PieChartType
              ? PieChartProps<Labels, IsBreakdown>
              : Type extends TableChartType
                ? TableProps<Labels, IsBreakdown>
                : Type extends NumberChartType
                  ? NumberChartProps<Labels, IsBreakdown>
                  : Type extends WorldChartType
                    ? WorldMapProps<Labels>
                    : `!!!${Type} is not supported!`) & { type: Type }
) {
  const type = props.type;
  switch (type) {
    // Time series
    case "cumulative-line":
    case "line": {
      return <LineChart {...(props as LineChartProps<Labels, IsBreakdown>)} />;
    }
    case "bar": {
      return <BarChart {...(props as BarChartProps<Labels, IsBreakdown>)} />;
    }
    case "area": {
      return <AreaChart {...(props as AreaChartProps<Labels, IsBreakdown>)} />;
    }
    // Cumulative
    case "bar-total": {
      return (
        <BarTotalChart
          {...(props as BarTotalChartProps<Labels, IsBreakdown>)}
        />
      );
    }
    case "pie": {
      return <PieChart {...(props as PieChartProps<Labels, IsBreakdown>)} />;
    }
    case "number":
      return (
        <NumberChart {...(props as NumberChartProps<Labels, IsBreakdown>)} />
      );
    case "table":
      return <Table {...(props as TableProps<Labels, IsBreakdown>)} />;
    case "world":
      return <WorldMap {...(props as WorldMapProps<Labels>)} />;
  }
  throw new Error(`Unknown chart type: ${type}`);
}
