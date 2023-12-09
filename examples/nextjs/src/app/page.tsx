import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
import { Chart } from "@typecharts/next";
import { events } from "~/data/events";

export default async function DashboardSSR() {
  const posthog = new PostHog<typeof events>();
  const data = await posthog
    .query()
    .addSeries({
      name: "$autocapture",
      sampling: "dau",
      label: "$autocapture",
    })
    .addSeries({
      sampling: "dau",
      name: "$autocapture",
      label: "autocapture",
    })
    .execute({
      groupBy: "day",
      type: "line",
    });
    data.data[0]?.

  return <DashboardExample largeCard={<Chart {...data} />} />;
}
