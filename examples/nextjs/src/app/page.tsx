import { Chart } from "@typelytics/tremor";
import { events } from "~/data/events";
import { PostHog } from "@typelytics/posthog";
import { DashboardExample } from "./dashboard";
import { Client } from "./client";

export default async function PageViewLineChart() {
  const posthog = new PostHog({
    events,
    host: "eu.posthog.com",
    executionOptions: {
      type: "line",
      date_from: "Last 7 days",
    },
  });
  const pageViews = await posthog
    .query()
    .addSeries("Message Page View", {
      sampling: "total",
      label: "Page View",
    })
    .execute({
      type: "world",
    });

  const questionsSolved = await posthog.query().addSeries("Solved Question", {
    sampling: "total",
    label: "Page View",
  });

  const questionsAsked = await posthog.query().addSeries("Asked Question", {
    sampling: "total",
    label: "Page View",
  });

  return <Client {...pageViews} />;
}
