import { Chart } from "@typelytics/tremor";
import { events } from "~/data/events";
import { PostHog } from "@typelytics/posthog";
import { DashboardExample } from "./dashboard";

const posthog = new PostHog({
  events,
});

export default async function DashboardSSR() {
  const query = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "unique_session",
    })
    .addFilterGroup({
      filters: {
        compare: "icontains",
        property: "$browser",
        value: "Chrome",
      },
      match: "AND",
    })
    .execute({
      type: "area",
      compare: true,
      breakdown: "$browser",
    });

  return (
    <>
      <DashboardExample data={<Chart {...query} />} />
    </>
  );
}
