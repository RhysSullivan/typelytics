import { DashboardExample } from "./dashboard";
import { PostHog } from "@typecharts/posthog";
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
      .addSeries("Asked Question", {
        sampling: "total",
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
