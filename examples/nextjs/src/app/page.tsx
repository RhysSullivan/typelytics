import { DashboardExample } from "./dashboard";
import { PostHog } from "~/data/events";
import { ClientLine } from "./client-line";
import { LineChart } from "@tremor/react";

export default async function DashboardSSR() {
  const posthog = new PostHog();
  const data = await posthog
    .query()
    .addSeries({ name: "Community Page View", sampling: "total" })
    .addSeries({
      name: "Community Page View",
      label: "Community Page View (DAU)",
      sampling: "dau",
    })
    .execute({
      groupBy: "hour",
      type: "line",
    });
  const chart = (
    <LineChart
      className="mt-6"
      data={data}
      index="date"
      categories={
        Object.keys(data[0]).filter((key) => key !== "date") as string[]
      }
      colors={["emerald", "gray"]}
      yAxisWidth={40}
    />
  );

  return <DashboardExample largeCard={chart} />;
}
