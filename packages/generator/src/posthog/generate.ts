import fs from "node:fs/promises";
import path from "node:path";
import { AnalyticsEvent } from "../core/types";

export async function generateTypeScriptFile(events: AnalyticsEvent[]) {
  const eventMap = events.reduce((acc, event) => {
    acc[event.name] = event;
    return acc;
  }, {} as Record<string, AnalyticsEvent>);

  // read in the file contents of 'insights.ts'
  const fileContents = await fs.readFile("./src/posthog/insights.ts", "utf-8");
  const cleaned = fileContents.replace("const events = {} as const;", "");
  const typeScriptFileContent = `
    const events = ${JSON.stringify(eventMap, null, 2)} as const;
    ${cleaned}
    `;

  // write file to dist/events.ts
  const filePath = path.join(process.cwd(), "dist", "events.ts");
  await fs.writeFile(filePath, typeScriptFileContent, "utf-8");
  console.log(`Generated TypeScript file for ${events.length} events`);
}
