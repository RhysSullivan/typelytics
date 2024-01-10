import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { Chart } from "@typecharts/tremor";
import type { PostHogEvents } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog<PostHogEvents>();
  const data = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "unique_session",
      math_property: "$viewport_width",
    })
    .addSeries("Asked Question", {
      sampling: "total",
    })
    .execute({
      groupBy: "day",
      breakdownBy: "$browser",
      excludeOther: true,
      type: "pie",
    });

  return <DashboardExample largeCard={<Chart {...data} />} />;
}
