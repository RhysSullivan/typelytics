import fs from "node:fs/promises";
import path from "node:path";
import { AnalyticsEvent } from "./types";

export async function generateTypeScriptFile(events: AnalyticsEvent[]) {
  const eventMap = events.reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
  }, {} as Record<string, AnalyticsEvent>);
  const typeScriptFileContent = `
    const events = ${JSON.stringify(eventMap, null, 2)} as const;
    type AnalyticsEvents = typeof events;

type InsightOptions<T extends AnalyticsEvents> = {
  filters: [];
  breakdownBy: T[number]["name"];
};

function fetchInsight<T extends AnalyticsEvents[number]["name"]>(
  eventName: T
) {}
    `;

  // write file to dist/events.ts
  const filePath = path.join(process.cwd(), "dist", "events.ts");
  await fs.writeFile(filePath, typeScriptFileContent, "utf-8");
  console.log(`Generated TypeScript file for ${events.length} events`);
}
