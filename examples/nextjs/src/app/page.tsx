import { Chart } from "@typelytics/tremor";
import { events } from "~/data/events";
import { PostHog } from "@typelytics/posthog";
import { DashboardExample } from "./dashboard";

const posthog = new PostHog({
  events,
});

export default async function Demo() {
  const query = await posthog
    .query()
    .addSeries("Solved Question", {
      sampling: "unique_session",
    })
    .addSeries("Asked Question", {
      sampling: "unique_session",
    })
    .execute({
      type: "pie",
    });
  query.results.return(
    <>
      <DashboardExample data={<Chart {...query} />} />
    </>,
  );
}
