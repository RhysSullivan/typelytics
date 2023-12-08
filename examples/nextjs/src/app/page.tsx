import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { Chart } from "@typecharts/next";
import { events } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog({ events });
  const data = await posthog
    .query()
    .addSeries({
      name: "Asked Question",
      sampling: "total",
    })
    .addSeries({
      name: "Solved Question",
      sampling: "total",
    })
    .execute({
      groupBy: "day",
      type: "line",
    });

  return <DashboardExample largeCard={<Chart {...data} />} />;
}
