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
    type AnalyticsEventName = keyof AnalyticsEvents;
    
    type SamplingOptions =
      | "TotalCount"
      | "CountPerUser"
      | "UniqueUsers"
      | "WeeklyActiveUsers"
      | "MonthlyActiveUsers"
      | "UniqueSessions";
    
    type Filter<T extends AnalyticsEventName> = {
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
    
    type FilterGroup<T extends AnalyticsEventName> = {
      match: "all" | "any";
      filters: Filter<T>[] | Filter<T>;
    };
    
    type SeriesEntry<T extends AnalyticsEventName> = {
      name: T;
      sampling?: SamplingOptions;
      where?: Filter<T> | Filter<T>[];
    };
    
    type ExecuteOptions<T extends AnalyticsEventName> = {
      groupBy?: "day" | "hour" | "week" | "month";
      filterMatch?: "all" | "any";
      type?:
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
      compareToPreviousPeriod?: boolean;
    };
    
    class QueryBuilder<
      K extends AnalyticsEventName,
      T extends SeriesEntry<K>,
      F extends FilterGroup<K>
    > {
      private constructor(
        private readonly scenarios: T[],
        private readonly filterGroups: F[]
      ) {}
    
      static create() {
        return new QueryBuilder([], []);
      }
    
      addScenario<V extends AnalyticsEventName, U extends SeriesEntry<V>>(
        event: U
      ): QueryBuilder<K | V, T | U, F> {
        return new QueryBuilder([...this.scenarios, event], this.filterGroups);
      }
    
      addFilterGroup<U extends FilterGroup<T["name"]>>(
        filter: U
      ): QueryBuilder<K, T, F | U> {
        return new QueryBuilder(this.scenarios, [...this.filterGroups, filter]);
      }
    
      execute(options: ExecuteOptions<T["name"]>) {
        console.log(this.scenarios, this.filterGroups, options);
        return this.scenarios;
      }
    }
    `;

  // write file to dist/events.ts
  const filePath = path.join(process.cwd(), "dist", "events.ts");
  await fs.writeFile(filePath, typeScriptFileContent, "utf-8");
  console.log(`Generated TypeScript file for ${events.length} events`);
}
