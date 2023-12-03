import dayjs from "dayjs";
import { PostHogEndpoints, PosthogPropertyType } from "./posthog/types";
import { AnalyticsEvent, Property } from "./core/types";
import { generateTypeScriptFile } from "./posthog/generate";

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY as string;
const project_id = process.env.POSTHOG_PROJECT_ID as string;

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

function fetchFromPosthog<T extends keyof PostHogEndpoints>(
  endpoint: T,
  options: {
    queryParams?: PostHogEndpoints[T]["queryParams"];
  } = {}
) {
  const url = `https://app.posthog.com/api/projects/${project_id}/${endpoint}/`;
  return fetch(`${url}?${toParams(options.queryParams ?? {})}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${POSTHOG_API_KEY}`,
    },
  }).then(async (response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return (await response.json()) as PostHogEndpoints[T]["response"];
  });
}

function posthogPropertyTypeToGeneric(
  propertyType: PosthogPropertyType
): Property["type"] {
  switch (propertyType) {
    case "Numeric":
      return "number";
    case "String":
      return "string";
    case "Boolean":
      return "boolean";
    case "DateTime":
      return "date";
    default:
      return "unknown";
  }
}

void fetchFromPosthog("event_definitions").then(async (data) => {
  const events: AnalyticsEvent[] = [];
  for await (const event of data.results.slice(0, 20)) {
    const definitions = await fetchFromPosthog("property_definitions", {
      queryParams: {
        event_names: [event.name],
        filter_by_event_names: true,
      },
    });
    events.push({
      name: event.name,
      id: event.id,
      properties: definitions.results.map((definition) => ({
        id: definition.id,
        name: definition.name,
        type: posthogPropertyTypeToGeneric(definition.property_type),
      })),
    });
  }
  await generateTypeScriptFile(events);
});
