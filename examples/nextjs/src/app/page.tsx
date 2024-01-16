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
        math_property: "$viewport_width",
      })
      .execute({
        groupBy: "day",
        breakdownBy: "$browser",
        excludeOther: true,
        type: "line",
      });
  },
  questionsAskedByUser() {
    return posthog
      .query()
      .addSeries("Solved Question", {
        sampling: "total",
      })
      .addFilterGroup({
        filters: [
          {
            compare: "icontains",
            name: "Answer Overflow Account Id",
            value: "5",
          },
        ],
        match: "all",
      })
      .execute({
        breakdownBy: "Answer Overflow Account Id",
        type: "table",
        groupBy: "day",
        excludeOther: true,
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
  return (
    <DashboardExample
      data={{
        pageViewsByBrowser: pvb,
        questionsAskedByUser: qau,
      }}
    />
  );
}
