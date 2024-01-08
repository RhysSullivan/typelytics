import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { Chart, AreaChart, BarChart, LineChart } from "@typecharts/tremor";
import type { PostHogEvents } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog<PostHogEvents>();
  const data = await posthog
    .query()
    .addSeries("$pageview", {
      sampling: "total",
      label: "Hello!",
    })
    .addSeries("Community Page View", {
      sampling: "dau",
    })
    .execute({
      groupBy: "day",
      type: "bar-total",
      dataIndex: "time",
    });

  return (
    <DashboardExample
      largeCard={
        <Chart
          decorations={{
            "Community Page View": { href: "https://google.com", color: "red" },
            "Hello!": { color: "amber" },
          }}
          {...data}
        />
      }
    />
  );
}
