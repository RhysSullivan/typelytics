import dayjs from "dayjs";

const events = {} as const;

export type PostHogAnalyticsEvents = typeof events;
type AnalyticsEventName = keyof PostHogAnalyticsEvents;

export type PostHogSamplingOptions =
  | "TotalCount"
  | "CountPerUser"
  | "UniqueUsers"
  | "WeeklyActiveUsers"
  | "MonthlyActiveUsers"
  | "UniqueSessions";

export type PostHogFilter<T extends AnalyticsEventName> = {
  name: PostHogAnalyticsEvents[T]["properties"][number]["name"];
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

export type PostHogFilterGroup<T extends AnalyticsEventName> = {
  match: "all" | "any";
  filters: PostHogFilter<T>[] | PostHogFilter<T>;
};

export type PostHogSeries<T extends AnalyticsEventName> = {
  name: T;
  sampling?: PostHogSamplingOptions;
  where?: PostHogFilter<T> | PostHogFilter<T>[];
};

type PostHogExecuteOptions<T extends AnalyticsEventName> = {
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
  breakdownBy?: PostHogAnalyticsEvents[T]["properties"][number]["name"];
  compareToPreviousPeriod?: boolean;
};

type PostHogConfig = {
  apiKey: string;
  projectId: string;
  url: string;
};

function toParams(obj: Record<string, any>, explodeArrays = false): string {
  if (!obj) {
    return "";
  }

  function handleVal(val: any): string {
    if (dayjs.isDayjs(val)) {
      return encodeURIComponent(val.format("YYYY-MM-DD"));
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    val = typeof val === "object" ? JSON.stringify(val) : val;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return encodeURIComponent(val);
  }

  return Object.entries(obj)
    .filter((item) => item[1] != undefined && item[1] != null)
    .reduce((acc, [key, val]) => {
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
    }, [] as [string, any][])
    .map(([key, val]) => `${key}=${handleVal(val)}`)
    .join("&");
}

class PostHogQuery<
  K extends AnalyticsEventName,
  T extends PostHogSeries<K>,
  F extends PostHogFilterGroup<K>
> {
  constructor(
    private readonly scenarios: T[],
    private readonly filterGroups: F[],
    private readonly config: PostHogConfig
  ) {}

  addSeries<V extends AnalyticsEventName, U extends PostHogSeries<V>>(
    event: U
  ): PostHogQuery<K | V, T | U, F> {
    return new PostHogQuery([...this.scenarios, event], this.filterGroups);
  }

  addFilterGroup<U extends PostHogFilterGroup<T["name"]>>(
    filter: U
  ): PostHogQuery<K, T, F | U> {
    return new PostHogQuery(this.scenarios, [...this.filterGroups, filter]);
  }

  async execute(options: PostHogExecuteOptions<T["name"]>) {
    const encodedQueryString = toParams({
      insight: "TRENDS",
      refresh: false,
      filter_test_accounts: false,
      entity_type: "events",
      events: [
        {
          type: "events",
          id: "Community Page View",
          order: 0,
          name: "Community Page View",
          math: "total",
        },
        {
          type: "events",
          id: "Message Page View",
          order: 1,
          name: "Message Page View",
          math: "total",
        },
      ],
      date_from: "mStart",
      interval: "day",
      formula: "A + B",
    });
    const url = `https://app.posthog.com/api/projects/insights/trend/?${encodedQueryString}`;
    const data = await fetch(
      `https://app.posthog.com/api/projects/${this.config.projectId}/${
        url.startsWith("/") ? url.slice(1) : url
      }`,
      {
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
        },
        method: "GET",
      }
    );
    const json = await data.json();
    console.log(json);
  }
}

export class PostHog {
  private config: PostHogConfig;
  constructor(opts?: Partial<PostHogConfig>) {
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
    };
  }

  query() {
    return new PostHogQuery([], [], this.config);
  }
}
