import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { Chart } from "@typecharts/tremor";
import type { PostHogEvents } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog<PostHogEvents>();
  const data = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
    })
    .addSeries("$autocapture", {
      sampling: "total",
    })
    .execute({
      groupBy: "day",
      breakdownBy: "$current_url",
      excludeOther: true,
      type: "table",
    });

  return <DashboardExample largeCard={<Chart {...data} />} />;
}
