import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { LineChart } from "@typecharts/react";
import type { PostHogEvents } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog<PostHogEvents>();
  const data = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
      where: {
        filters: {
          compare: "equals",
          name: "$search_engine",
          value: "/about",
        },
        match: "all",
      },
    })
    .addSeries("Asked Question", {
      sampling: "dau",
    })
    .addFilterGroup({
      match: "all",
      filters: {
        name: "$current_url",
        compare: "equals",
        value: "US",
      },
    })
    .addFilterGroup({
      match: "all",
      filters: {
        compare: "equals",
        name: "$pathname",
        value: "/about",
      },
    })
    .execute({
      groupBy: "day",
      type: "line",
      breakdownBy: "Answer Overflow Account Id",
    });

  return <DashboardExample largeCard={<LineChart {...data} />} />;
}
