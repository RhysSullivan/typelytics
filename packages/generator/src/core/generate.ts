import fs from "node:fs/promises";
import path from "node:path";
import { AnalyticsEvent } from "./types";

export async function generateTypeScriptFile(events: AnalyticsEvent[]) {
  const eventMap = events.reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
  }, {} as Record<string, AnalyticsEvent>);
  const typeScriptFileContent = `
    const events = ${JSON.stringify(eventMap, null, 2)} as const;


    
type AnalyticsEvents = typeof events;
type AnalyticsEventNames = keyof AnalyticsEvents;

type AnalyticsEvent = AnalyticsEvents[keyof AnalyticsEvents];

type SamplingOptions =
  | "TotalCount"
  | "CountPerUser"
  | "UniqueUsers"
  | "WeeklyActiveUsers"
  | "MonthlyActiveUsers"
  | "UniqueSessions";

type Filter<T extends AnalyticsEventNames> = {
  name: AnalyticsEvents[T]["properties"][number]["name"];
  compare:
    | "equals"
    | "does_not_equal"
    | "contains"
    | "does_not_contain"
    | "matches_regex"
    | "does_not_match_regex"
    | "greater_than"
    | "less_than"
    | "is_set"
    | "is_not_set";
  value: string | number | boolean;
};

type SeriesEntry<T extends AnalyticsEventNames> = {
  name: T;
  sampling?: SamplingOptions;
  where?: Filter<T> | Filter<T>[];
};

type InsightOptions<T extends AnalyticsEventNames> = {
  events: SeriesEntry<T> | SeriesEntry<T>[];
  filters?: [];
  breakdownBy?: AnalyticsEvents[T]["properties"][number]["name"];
};

type ExecuteOptions<T extends AnalyticsEventNames> = {
  groupBy?: "day" | "hour" | "week" | "month";
  filterMatch: "all" | "any";
  type:
    | "line"
    | "bar"
    | "area"
    | "cumulative-line"
    | "number"
    | "pie"
    | "bar-total"
    | "table"
    | "world";
  breakdownBy?: AnalyticsEvents[T]["properties"][number]["name"];
};

function addFilter<T extends AnalyticsEventNames>(
  series: SeriesEntry<T>,
  existingFilters?: Filter<T> | Filter<T>[]
) {
  const existing = Array.isArray(existingFilters)
    ? existingFilters
    : existingFilters
    ? [existingFilters]
    : [];
  return {
    addFilter: (filter: Filter<T>) => addFilter(series, [...existing, filter]),
    execute: (opts: ExecuteOptions<T>) => execute([...existing, series], opts),
  };
}

function execute<T extends AnalyticsEventNames>(
  series: SeriesEntry<T>[],
  opts: ExecuteOptions<T>
) {
  console.log("series", series);
  return [
    {
      hello: "world",
    },
  ];
}

function addSeries<
  Current extends AnalyticsEventNames,
  Existing extends AnalyticsEventNames,
  Next extends AnalyticsEventNames,
  ExecOpts extends ExecuteOptions<Current | Existing | Next>,
  FilterOpts extends Filter<Current | Existing | Next>
>(
  series: SeriesEntry<Current>,
  existingSeries?: SeriesEntry<Existing> | SeriesEntry<Existing>[]
) {
  const existing = Array.isArray(existingSeries)
    ? existingSeries
    : existingSeries
    ? [existingSeries]
    : [];
  return {
    addSeries: (series: SeriesEntry<Next>) =>
      addSeries(series, [...existing, series]),
    addFilter: (opts: FilterOpts) => addFilter(series, opts),
    execute: (opts: ExecOpts) => execute([...existing, series], opts),
  };
}

function buildQuery() {
  return {
    addSeries,
  };
}

const data = buildQuery()
  .addSeries({
    name: "User Grant Consent",
    sampling: "TotalCount",
    where: {
      name: "Answer Overflow Account Id",
      compare: "equals",
      value: 123,
    },
  })
  .addSeries({
    name: "$autocapture",
    where: {
      name: "Answer Overflow Account Id",
      compare: "equals",
      value: 123,
    },
  }).addFilter({
name: "Server"
  })
  .execute({
    breakdownBy: "Answer Overflow Account Id",
    type: "line",
    filterMatch: "all",
  });

console.log(data);

    `;

  // write file to dist/events.ts
  const filePath = path.join(process.cwd(), "dist", "events.ts");
  await fs.writeFile(filePath, typeScriptFileContent, "utf-8");
  console.log(`Generated TypeScript file for ${events.length} events`);
}
