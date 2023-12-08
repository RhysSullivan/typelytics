import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/core/src/posthog/insights";
import { Chart } from "~/components/chart";
import { AreaChart, LineChart } from "~/components/line-chart";
import { events } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog({ events: events });
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
      type: "area",
    });
  return (
    <DashboardExample
      largeCard={
        <Chart
          data={data.data}
          type={data.type}
          categories={["Asked Question"]}
        />
      }
    />
  );
}
