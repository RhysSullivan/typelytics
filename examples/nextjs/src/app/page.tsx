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
        date_from: "7d",
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
        date_from: "7d",
        type: "number",
        dataIndex: "time",
        compare: true,
      });
    console.log(data.data["Current - $pageview"]);
    return data;
  },
  questionsAskedByUser() {
    return posthog
      .query()
      .addSeries("Solved Question", {
        sampling: "total",
        where: {
          filters: {
            compare: "icontains",
            property: "$geoip_country_code",
            value: "USAAAAA",
          },
          match: "all",
        },
      })
      .addFilterGroup({
        filters: [
          {
            compare: "exact",
            property: "Answer Overflow Account Id",
            value: "523949187663134754",
          },
        ],
        match: "all",
      })
      .execute({
        breakdown: "Answer Overflow Account Id",
        type: "table",
        interval: "day",
        date_from: "7d",
        breakdown_hide_other_aggregation: true,
        compare: true,
      });
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
