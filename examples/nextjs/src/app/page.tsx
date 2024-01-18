import { DashboardExample } from "./dashboard";
import { PostHog } from "@typelytics/posthog";
import type { PostHogEvents } from "~/data/events";

const posthog = new PostHog<PostHogEvents>();
export const analyticsQueries = {
  pageViewsByBrowser() {
    return posthog
      .query()
      .addSeries("$pageview", {
        sampling: "unique_session",
      })
      .addFilterGroup({
        filters: {
          property: "$browser",
          compare: "icontains",
          value: "chrome",
        },
        match: "any",
      })
      .addFilterGroup({
        filters: [
          {
            compare: "icontains",
            property: "$browser",
            value: "safari",
          },
          {
            compare: "icontains",
            property: "$browser",
            value: "firefox",
          },
        ],
        match: "any",
      })
      .execute({
        interval: "day",
        breakdown: "$browser",
        date_from: "-48h",
        breakdown_hide_other_aggregation: true,
        type: "line",
        filterCompare: "OR",
        compare: true,
      });
  },
  async pageViews() {
    const data = await posthog
      .query()
      .addSeries("$pageview", {
        // label: "Page Views",
        sampling: "unique_session",
      })
      .execute({
        interval: "day",
        date_from: "Last 14 days",
        type: "number",
        dataIndex: "time",
        // compare: true,
      });
    return data;
  },
  async questionsAskedByUser() {
    const bu = await posthog
      .query()
      .addSeries("Solved Question", {
        sampling: "total",
      })
      .execute({
        // breakdown: "Answer Overflow Account Id",
        type: "table",

        interval: "day",
        date_from: "Last 7 days",
        breakdown_hide_other_aggregation: true,
        compare: true,
      });
    return bu;
  },
};
export type AnalyticsQueries = {
  [K in keyof typeof analyticsQueries]: Awaited<
    ReturnType<(typeof analyticsQueries)[K]>
  >;
};

export default async function DashboardSSR() {
  const pvb = await analyticsQueries.pageViewsByBrowser();
  const qau = await analyticsQueries.questionsAskedByUser();
  const pvs = await analyticsQueries.pageViews();

  return (
    <DashboardExample
      data={{
        pageViewsByBrowser: pvb,
        questionsAskedByUser: qau,
        pageViews: pvs,
      }}
    />
  );
}
