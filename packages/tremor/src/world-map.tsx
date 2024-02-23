import { Chart, ChartData, WorldChartType } from "@typelytics/core";
import { WorldMap as SVGWorldMap } from "react-svg-worldmap";

export type WorldMapProps<Labels extends string> = Pick<
  Chart<WorldChartType, Labels, true>,
  "results"
> &
  Parameters<typeof SVGWorldMap>[0];
export function WorldMap<Labels extends string>(props: WorldMapProps<Labels>) {
  const firstEntry = Object.values(props.results)[0] as Record<
    Labels,
    ChartData
  >;
  const formattedWorldMap = Object.keys(firstEntry).map((key) => {
    const casted = firstEntry[key as Labels] as ChartData;
    return {
      country: key,
      value: casted?.aggregated_value ?? 0,
    };
  });
  return <SVGWorldMap data={formattedWorldMap} color="blue" />;
}
