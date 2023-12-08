import { DashboardExample } from "./dashboard";
import { PostHog } from "~/data/events";
import { Chart } from "~/components/chart";
import { AreaChart, LineChart } from "~/components/line-chart";

export default async function DashboardSSR() {
  const posthog = new PostHog();
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
