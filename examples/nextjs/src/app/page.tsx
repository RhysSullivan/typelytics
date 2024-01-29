import { DashboardExample } from "./dashboard";
import { PostHog } from "@typelytics/posthog";
import { Chart } from "@typelytics/tremor";
import { events } from "~/data/events";

const posthog = new PostHog({
  events,
});

export default async function DashboardSSR() {
  const lineNormal = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
      where: {
        match: "AND",
        filters: [
          {
            compare: "icontains",
            property: "$browser",
            value: "Chrome",
          },
        ],
      },
    })
    .execute({
      compare: true,
      type: "line",
      breakdown: "$browser",
    });

  console.log(lineNormal.results);

  return (
    <>
      <Chart {...lineNormal} />
      {/* <Chart {...lineCompare} />
      <Chart {...lineBreakdown} />
      <Chart {...multiBreakdown} /> */}
    </>
  );
}
