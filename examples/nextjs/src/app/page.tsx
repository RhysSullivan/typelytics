import { DashboardExample } from "./dashboard";
import { PostHog } from "@typelytics/posthog";
import { Chart, LineChart } from "@typelytics/tremor";
import { events } from "~/data/events";

const posthog = new PostHog({
  events,
});

export default async function DashboardSSR() {
  const lineNormal = await posthog
    .query()
    .addSeries("$pageview", {
      label: "Page View (Unique)",
      sampling: "unique_session",
    })
    .addSeries("Message Page View", {
      sampling: "unique_session",
    })
    .execute({
      // breakdown: "$geoip_country_code",
      // compare: true,
      type: "number",
    });
  return (
    <>
      <Chart {...lineNormal} />
    </>
  );
}
