import {
  ChartType,
  Chart,
  // PieChart,
  // BarTotalChart,
  // Table,
} from "@typelytics/core";

const propertyMathTypes = [
  "avg",
  "sum",
  "min",
  "max",
  "median",
  "p90",
  "p95",
  "p99",
] as const;

const propertyMathSet = new Set<string>(propertyMathTypes);

type PropertyMathType = (typeof propertyMathTypes)[number];

const mathTypes = [
  "total",
  "dau",
  "weekly_active",
  "monthly_active",
  "unique_group",
  "unique_session",
  "min_count_per_actor",
  "max_count_per_actor",
  "avg_count_per_actor",
  "median_count_per_actor",
  "p90_count_per_actor",
  "p95_count_per_actor",
  "p99_count_per_actor",
  // "hogql", TODO: Support hogql
] as const;

export type PosthogPropertyType =
  | "DateTime"
  | "String"
  | "Numeric"
  | "Boolean"
  | null;
export type PostHogProperty = {
  name: string;
  type: PosthogPropertyType;
};

export type PostHogEvent = {
  name: string;
  properties: readonly PostHogProperty[];
};

type _ExtendOnlyEventMap = Record<string, PostHogEvent>;

export type PostHogSamplingOptions = (typeof mathTypes)[number];

export type PostHogFilter<
  EventName extends string,
  Events extends _ExtendOnlyEventMap,
> = {
  property: Events[EventName]["properties"][number]["name"];
  compare: PropertyOperator;
  value: PropertyFilterValue;
};

export type PostHogFilterGroup<
  T extends string,
  Events extends _ExtendOnlyEventMap,
> = {
  match: "AND" | "OR";
  filters: PostHogFilter<T, Events> | PostHogFilter<T, Events>[];
};

export type PostHogSeries<
  T extends string,
  Events extends _ExtendOnlyEventMap,
> = {
  name: T;
  label?: string;
  where?: PostHogFilterGroup<T, Events>;
  sampling: PropertyMathType | PostHogSamplingOptions;
  math_property?: Events[T]["properties"][number]["name"];
};

type IntervalType = "hour" | "day" | "week" | "month";

type PostHogExecuteOptions<PropertyNames extends string> = {
  type: ChartType;
  filterCompare?: FilterLogicalOperator;
  date_from?: Date | keyof DateMapping | null;
  date_to?: Date | keyof DateMapping | null;
} & Pick<
  PostHogInsightTrendParams<PropertyNames>,
  | "filter_test_accounts"
  | "sampling_factor"
  | "explicit_date"
  | "interval"
  | "breakdown"
  | "breakdown_normalize_url"
  | "breakdown_hide_other_aggregation"
  | "compare"
  | "formula"
  | "smoothing_intervals"
>;

type PostHogConfig<Events extends _ExtendOnlyEventMap> = {
  apiKey?: string;
  projectId?: string;
  url?: string;
  events: Events;
};

type TrendResult = {
  count: number;
  data: number[];
  days: string[];
  action: {
    id: string;
    order: number;
  };
  dates?: string[];
  label: string;
  labels: string[];
  breakdown_value?: string | number;
  aggregated_value: number;
  status?: string;
  compare?: boolean;
  compare_label?: string;
  persons_urls?: { url: string }[];
};

export type TrendAPIResponse<ResultType = TrendResult[]> = {
  type: "Trends";
  is_cached: boolean;
  last_refresh: string | null;
  result: ResultType;

  timezone: string;
  next: string | null;
};

function applyCompareToLabel<T extends string>(
  label: T,
  compare_label: string | undefined
) {
  return `${compare_label
    ? compare_label.slice(0, 1).toUpperCase() + compare_label.slice(1) + " - "
    : ""
    }${label}`;
}

export function toParams(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<string, any>,
  explodeArrays = false
): string {
  if (!obj) {
    return "";
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleVal(val: any): string {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    val = typeof val === "object" ? JSON.stringify(val) : val;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return encodeURIComponent(val);
  }

  return Object.entries(obj)
    .filter((item) => item[1] != undefined && item[1] != null)
    .reduce(
      (acc, [key, val]) => {
        /**
         *  query parameter arrays can be handled in two ways
         *  either they are encoded as a single query parameter
         *    a=[1, 2] => a=%5B1%2C2%5D
         *  or they are "exploded" so each item in the array is sent separately
         *    a=[1, 2] => a=1&a=2
         **/
        if (explodeArrays && Array.isArray(val)) {
          val.forEach((v) => acc.push([key, v]));
        } else {
          acc.push([key, val]);
        }

        return acc;
      },
      [] as [string, unknown][]
    )
    .map(([key, val]) => `${key}=${handleVal(val)}`)
    .join("&");
}

type PostHogDisplayType =
  | "BoldNumber"
  | "ActionsLineGraph"
  | "ActionsTable"
  | "ActionsPie"
  | "ActionsBar"
  | "ActionsBarValue"
  | "ActionsLineGraphCumulative"
  | "ActionsAreaGraph";
// | "WorldMap";

type FilterLogicalOperator = "AND" | "OR";
type PropertyFilterValue = string | number | (string | number)[] | null;

const propertyOperators = [
  "exact",
  "is_not",
  "icontains",
  "not_icontains",
  "regex",
  "not_regex",
  "gt",
  "gte",
  "lt",
  "lte",
  "is_set",
  "is_not_set",
  "is_date_exact",
  "is_date_before",
  "is_date_after",
  "between",
  "not_between",
  "min",
  "max",
] as const;
type PropertyOperator = (typeof propertyOperators)[number];

type BasePropertyFilter<T extends string = string> = {
  key: T;
  value?: PropertyFilterValue;
  type?: "event";
};

type EventPropertyFilter<T extends string = string> = BasePropertyFilter<T> & {
  type: "event";
  operator: PropertyOperator;
};

type PropertyGroupFilterValue<T extends string = string> = {
  type: FilterLogicalOperator;
  values: (EventPropertyFilter<T> | PropertyGroupFilterValue<T>)[];
};

type PropertyGroupFilter<T extends string = string> = {
  type: FilterLogicalOperator;
  values: PropertyGroupFilterValue<T>[];
};

type Year = number;
type Month = number;
type Day = number;
type Date = `${Year}-${Month}-${Day}` | `-${number}h` | `-${number}d`;

const dateMapping = {
  Today: {
    values: ["dStart"],
    defaultInterval: "hour",
  },
  Yesterday: {
    values: ["-1dStart", "-1dEnd"],
    defaultInterval: "hour",
  },
  "Last 24 hours": {
    values: ["-24h"],
    defaultInterval: "hour",
  },
  "Last 48 hours": {
    values: ["-48h"],
    defaultInterval: "hour",
  },
  "Last 7 days": {
    values: ["-7d"],
    defaultInterval: "day",
  },
  "Last 14 days": {
    values: ["-14d"],
    defaultInterval: "day",
  },
  "Last 30 days": {
    values: ["-30d"],
    defaultInterval: "day",
  },
  "Last 90 days": {
    values: ["-90d"],
    defaultInterval: "day",
  },
  "Last 180 days": {
    values: ["-180d"],
    defaultInterval: "month",
  },
  "This month": {
    values: ["mStart"],
    defaultInterval: "day",
  },
  "Previous month": {
    values: ["-1mStart", "-1mEnd"],
    defaultInterval: "day",
  },
  "Year to date": {
    values: ["yStart"],
    defaultInterval: "month",
  },
  "All time": {
    values: ["all"],
    defaultInterval: "month",
  },
} as const;

type DateMapping = typeof dateMapping;

type PostHogInsightTrendParams<PropertyNames extends string> = {
  insight: "TRENDS";
  properties?: PropertyGroupFilter;
  entity_type: "events";
  filter_test_accounts?: boolean;
  refresh: boolean;
  events: {
    type: "events";
    id: string;
    order: number;
    name: string;
    math: PostHogSamplingOptions | PropertyMathType;
    math_property?: PropertyMathType;
    properties?: PropertyGroupFilterValue;
  }[];
  formula?: string;
  smoothing_intervals?: number;
  compare?: boolean;
  sampling_factor?: number | null;
  // year-month-day
  date_from?: string | null;
  // year-month-day
  date_to?: string | null;
  explicit_date?: boolean | string | null;
  interval?: IntervalType;
  breakdown?: PropertyNames;
  breakdown_type: "event";
  breakdown_normalize_url?: boolean;
  breakdown_hide_other_aggregation?: boolean | null;
  display: PostHogDisplayType;
};

const chartTypeToPostHogType: Record<ChartType, PostHogDisplayType> = {
  "bar-total": "ActionsBarValue",
  "cumulative-line": "ActionsLineGraphCumulative",
  line: "ActionsLineGraph",
  bar: "ActionsBar",
  area: "ActionsAreaGraph",
  number: "BoldNumber",
  pie: "ActionsPie",
  table: "ActionsTable",
  // world: "WorldMap",
} as const;

type AllLabelsOrNames<
  EventName extends string,
  Events extends _ExtendOnlyEventMap,
  Series extends PostHogSeries<EventName, Events> = PostHogSeries<
    EventName,
    Events
  >,
> = {
  [K in keyof Series as "label"]: Series["label"] extends string
  ? Series["label"]
  : Series["name"];
}["label"];

class PostHogQuery<
  const Events extends _ExtendOnlyEventMap,
  const EventNames extends Extract<keyof Events, string>,
  const Filters extends PostHogFilterGroup<EventNames, Events>,
  const Series extends PostHogSeries<EventNames, Events>,
> {
  constructor(
    private readonly series: Series[],
    private readonly filterGroups: Filters[],
    private readonly config: PostHogConfig<Events>
  ) { }

  addSeries<
    const NewEventName extends EventNames,
    const NewSeries extends Omit<PostHogSeries<NewEventName, Events>, "name">,
  >(
    name: NewEventName,
    event: NewSeries
  ): PostHogQuery<
    Events,
    EventNames | NewEventName,
    Filters,
    Series | (NewSeries & { name: NewEventName })
  > {
    return new PostHogQuery(
      [
        ...this.series,
        {
          ...event,
          name,
        },
      ],
      this.filterGroups,
      this.config
    );
  }

  addFilterGroup<NewFilter extends PostHogFilterGroup<Series["name"], Events>>(
    filter: NewFilter
  ): PostHogQuery<Events, EventNames, Filters | NewFilter, Series> {
    return new PostHogQuery<Events, EventNames, Filters | NewFilter, Series>(
      this.series,
      [...this.filterGroups, filter],
      this.config
    );
  }

  async execute<
    ExecutionOptions extends PostHogExecuteOptions<
      Events[Series["name"]]["properties"][number]["name"]
    >,
    ChartType extends ExecutionOptions["type"],
    Labels extends AllLabelsOrNames<Series["name"], Events, Series>,
    Output extends Chart<
      ChartType,
      ExecutionOptions["compare"] extends boolean
      ? `Previous - ${Labels}` | `Current - ${Labels}`
      : Labels,
      ExecutionOptions["breakdown"] extends string ? true : false
    >,
  >(options: ExecutionOptions): Promise<Output> {

    const toPostHogPropertyFilter = (group: PostHogFilterGroup<string, Events>) => {
      const asArray = Array.isArray(group.filters) ? group.filters : [group.filters];
      return {
        type: group.match,
        values: asArray.map(
          (filter) =>
            ({
              key: filter.property,
              operator: filter.compare,
              value: filter.value,
              type: "event",
            }) satisfies EventPropertyFilter
        ),
      };
    }

    const properties: PropertyGroupFilter = {
      type: options.filterCompare ?? "AND",
      values: Array.isArray(this.filterGroups) ? this.filterGroups.map(toPostHogPropertyFilter) : [toPostHogPropertyFilter(this.filterGroups)],
    };
    const date_from =
      options.date_from && options.date_from in dateMapping
        ? dateMapping[options.date_from as keyof DateMapping].values[0]
        : options.date_from;
    const date_to =
      options.date_to && options.date_to in dateMapping
        ? dateMapping[options.date_to as keyof DateMapping].values[0]
        : options.date_to;

    const reqData: PostHogInsightTrendParams<
      Events[Series["name"]]["properties"][number]["name"]
    > = {
      insight: "TRENDS",
      refresh: false,
      filter_test_accounts: false,
      entity_type: "events",
      events: this.series.map((scenario, index) => {
        if (
          propertyMathSet.has(scenario.sampling as string) &&
          !scenario.math_property
        ) {
          // TODO: Do this on a type level
          throw new Error(`math_property is required for ${scenario.sampling}`);
        }
        return {
          id: scenario.name,
          name: scenario.name,
          order: index,
          type: "events",
          math: scenario.sampling,
          properties: scenario.where ? toPostHogPropertyFilter(scenario.where) : undefined,
          math_property: propertyMathSet.has(scenario.sampling as string)
            ? scenario.math_property
            : undefined,
        } as PostHogInsightTrendParams<
          Events[Series["name"]]["properties"][number]["name"]
        >["events"][number];
      }),
      properties,
      breakdown_type: "event",
      breakdown: options.breakdown,
      display: chartTypeToPostHogType[options.type],
      breakdown_hide_other_aggregation:
        options.breakdown_hide_other_aggregation,
      breakdown_normalize_url: options.breakdown_normalize_url,
      date_from,
      date_to,
      explicit_date: options.explicit_date,
      interval:
        !options.interval &&
          options.date_from &&
          options.date_from in dateMapping
          ? dateMapping[options.date_from as keyof DateMapping].defaultInterval
          : options.interval,
      sampling_factor: options.sampling_factor,
      compare: options.compare,
      formula: options.formula,
      smoothing_intervals: options.smoothing_intervals,
    };
    const encodedQueryString = toParams(reqData);
    const url = `https://app.posthog.com/api/projects/${this.config.projectId}/insights/trend/?${encodedQueryString}`;
    const fetchResponse = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.config.apiKey}`,
      },
      method: "GET",
    });
    if (!fetchResponse.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const text = await fetchResponse.json();
      throw new Error(
        `Failed to fetch data: ${fetchResponse.statusText} ${JSON.stringify(
          text
        )}`
      );
    }
    const json = (await fetchResponse.json()) as TrendAPIResponse;
    if (options.breakdown) {
      const output: Chart<ChartType, string, true> = {
        type: options.type as ChartType,
        results: {},
      };
      json.result.forEach((result) => {
        const series = this.series.at(result.action.order);
        if (!series) {
          console.error(`Series ${result.action.order} not found`);
          return;
        }
        const parentLabel = applyCompareToLabel(
          series.label ?? series.name,
          result.compare_label
        )
        const existing = output.results[parentLabel];

        const label = result.label.replace(`${result.action.id} - `, "");

        if (!existing) {
          output.results[
            parentLabel
          ] = {
            [label]: {
              aggregated_value: result.aggregated_value ?? result.count,
              data: result.data,
              days: result.days,
              labels: result.labels,
              label: `${parentLabel} - ${label}`,
            },
          };
        } else {
          existing[label] = {
            aggregated_value: result.aggregated_value ?? result.count,
            data: result.data,
            days: result.days,
            labels: result.labels,
            label: `${parentLabel} - ${label}`,
          };
        }
      });
      return output as Output;
    } else {
      const output: Chart<ChartType, string, false> = {
        type: options.type as ChartType,
        results: {},
      };
      json.result.forEach((result) => {
        const series = this.series.at(result.action.order);
        if (!series) {
          console.error(`Series ${result.action.order} not found`);
          return;
        }
        const label = applyCompareToLabel(series.label ?? series.name, result.compare_label)
        output.results[
          label
        ] = {
          data: result.data,
          days: result.days,
          labels: result.labels,
          label: label,
          aggregated_value: result.aggregated_value ?? result.count,
        };
      });
      return output as Output;
    }
  }
}

export class PostHog<const Events extends _ExtendOnlyEventMap> {
  private config: PostHogConfig<Events>;
  constructor(opts: PostHogConfig<Events>) {
    const apiKey = opts?.apiKey ?? process.env.POSTHOG_API_KEY;

    if (!apiKey) {
      throw new Error("PostHog ApiKey is required");
    }
    const projectId = opts?.projectId ?? process.env.POSTHOG_PROJECT_ID;

    if (!projectId) {
      throw new Error("PostHog ProjectId is required");
    }
    const url =
      opts?.url ??
      process.env.POSTHOG_URL ??
      `https://app.posthog.com/api/projects/${projectId}/`;
    this.config = {
      apiKey,
      projectId,
      url,
      events: opts.events,
    };
  }

  query() {
    return new PostHogQuery([], [], this.config);
  }
}
