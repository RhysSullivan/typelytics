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
    })
    .execute({
      type: "line",
    });

  const lineCompare = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
    })
    .execute({
      type: "line",
      compare: true,
      date_from: "Last 7 days", // TODO: this one is weird
    });
  lineCompare["Current - $pageview"];
  lineCompare.data.at(0)?.["Previous - $pageview"];

  const lineBreakdown = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
    })
    .execute({
      type: "line",
      breakdown: "$search_engine",
    });

  // edge cases

  const multiBreakdown = await posthog
    .query()
    .addSeries("Asked Question", {
      sampling: "total",
    })
    .addSeries("Solved Question", {
      sampling: "total",
    })
    .execute({
      type: "line",
      breakdown_hide_other_aggregation: true,
      breakdown: "Answer Overflow Account Id",
    });

  // it should be
  // multiBreakdown.Asked Question <--- this is an array, same length
  // multiBreakdown.Solved Question <--- this is an array, same length

  return (
    <>
      <Chart {...lineNormal} />
      <Chart {...lineCompare} />
      <Chart {...lineBreakdown} />
      <Chart {...multiBreakdown} />
    </>
  );
}
